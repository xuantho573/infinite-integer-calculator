export class IntegerArray extends Uint8Array {}

export interface IntegerInternal {
  negative: boolean;
  digits: Readonly<IntegerArray>;
}

export type Option<T> = Some<T> | None<T>;

export class Some<T> {
  private value: T;
  constructor(value: T) {
    this.value = value;
  }

  isSome(): boolean {
    return true;
  }

  isNone(): boolean {
    return false;
  }

  unWrap(): T {
    return this.value;
  }
}

export class None<T> {
  isSome(): boolean {
    return false;
  }

  isNone(): boolean {
    return true;
  }

  unWrap(): T {
    throw new Error("Cannot unwrap None");
  }
}

interface ASTNodeArgs {
  type: string;
  left?: ASTNode;
  right?: ASTNode;
  value?: string;
}

export class ASTNode {
  type: string;
  left: Option<ASTNode>;
  right: Option<ASTNode>;
  value: Option<string>;

  constructor({ type, left, right, value }: ASTNodeArgs) {
    this.type = type;
    this.left = left ? new Some(left) : new None();
    this.right = right ? new Some(right) : new None();
    this.value = value ? new Some(value) : new None();
  }
}

export interface Token {
  type: string;
  match: string;
}
