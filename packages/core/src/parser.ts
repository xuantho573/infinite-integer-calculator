import { Integer } from "./integer";
import { ASTNode, Option, Some, Token } from "./types";

const EOF = { type: "", match: "" };

class Lexer {
  private tokens: Token[];
  private position: number;

  private constructor(tokens: Token[]) {
    this.tokens = tokens;
    this.position = 0;
  }

  peek(): Token {
    return this.tokens[this.position] || EOF;
  }

  next(): Token {
    return this.tokens[this.position++] || EOF;
  }

  expect(type: string): void {
    const t = this.next();
    if (type != t.type)
      throw new Error(`Unexpected token: ${t.match || "<<EOF>>"}`);
  }

  eof(): boolean {
    return this.position >= this.tokens.length;
  }

  static createLexer(s: string): Lexer {
    const tokens = [
      { type: "NUMBER", re: /(?:\d+(?:\d*)?|\d+)/ },
      { type: "+", re: /\+/ },
      { type: "-", re: /-/ },
      { type: "*", re: /\*/ },
      { type: "(", re: /\(/ },
      { type: ")", re: /\)/ }
    ];

    const normalizeRegExp = (re: RegExp) => new RegExp(`^${re.source}`);
    s = s.replace(/\s+/g, "");
    const tkns: Token[] = [];
    while (s.length > 0) {
      let token = { type: "", re: /./ };
      tokens.forEach((t: { type: string; re: RegExp }) => {
        if (normalizeRegExp(t.re).test(s) && !token.type) {
          token = t;
        }
      });
      const match = normalizeRegExp(token.re).exec(s);
      if (!match?.length) break;
      tkns.push({ type: token.type, match: match[0] });
      s = s.substring(match[0].length);
    }
    return new Lexer(tkns);
  }
}

class Parser {
  private readonly lexer: Lexer;

  private readonly BPS: { [key: string]: number } = {
    NUMBER: 0,
    ")": 0,
    "+": 20,
    "-": 20,
    "*": 30,
    "(": 50
  };

  private readonly NUDS: {
    [key: string]: (t: Token, bp: number) => ASTNode;
  } = {
    NUMBER: (token) => new ASTNode({ type: "NUMBER", value: token.match }),

    "+": (_, bp) => this.parse(bp),

    "-": (_, bp) => new ASTNode({ type: "neg", left: this.parse(bp) }),

    "(": () => {
      const inner = this.parse();
      this.lexer.expect(")");
      return inner;
    }
  };

  private readonly LEDS: {
    [key: string]: (left: ASTNode, t: Token, bp: number) => ASTNode;
  } = {
    "+": (left, _, bp) =>
      new ASTNode({ type: "+", left, right: this.parse(bp) }),

    "-": (left, _, bp) =>
      new ASTNode({ type: "-", left, right: this.parse(bp) }),

    "*": (left, _, bp) =>
      new ASTNode({ type: "*", left, right: this.parse(bp) }),

    "(": () => {
      const left = this.parse();
      this.lexer.expect(")");
      return new ASTNode({ type: "()", left });
    }
  };

  constructor(s: string) {
    this.lexer = Lexer.createLexer(s);
  }

  private bp(token: Token): number {
    return this.BPS[token.type] || 0;
  }

  private nud(token: Token): ASTNode {
    if (!this.NUDS[token.type])
      throw new Error(
        `NUD not defined for token type: ${JSON.stringify(token.type)}`
      );
    return this.NUDS[token.type](token, this.bp(token));
  }

  private led(left: ASTNode, token: Token): ASTNode {
    if (!this.LEDS[token.type])
      throw new Error(
        `LED not defined for token type: ${JSON.stringify(token.type)}`
      );
    return this.LEDS[token.type](left, token, this.bp(token));
  }

  public parse(rbp = 0): ASTNode {
    let left = this.nud(this.lexer.next());
    while (this.bp(this.lexer.peek()) > rbp) {
      left = this.led(left, this.lexer.next());
    }
    return left;
  }
}

function visit(node: Option<ASTNode>): Option<Integer> {
  if (node.unWrap().type === "NUMBER")
    return new Some(Integer.parse(node.unWrap().value.unWrap()));
  const funcs: { [key: string]: (n: ASTNode) => Integer } = {
    "+": (n: ASTNode) => visit(n.left).unWrap().add(visit(n.right).unWrap()),
    "-": (n: ASTNode) => visit(n.left).unWrap().sub(visit(n.right).unWrap()),
    "*": (n: ASTNode) => visit(n.left).unWrap().mul(visit(n.right).unWrap()),
    "()": (node: ASTNode) => visit(node.left).unWrap(),
    neg: (n: ASTNode) => Integer.parse("0").sub(visit(n.left).unWrap())
  };
  return new Some(funcs[node.unWrap().type](node.unWrap()));
}

export function calc(s: string): Integer {
  const parser = new Parser(s);
  return visit(new Some(parser.parse())).unWrap();
}
