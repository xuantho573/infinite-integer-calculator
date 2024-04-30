import { add } from "./ops/add";
import { mul } from "./ops/mul";
import { sub } from "./ops/sub";
import { IntegerInternal } from "./types";

export class Integer {
  private readonly negative: boolean;
  private readonly digits: Readonly<Uint32Array>;

  private static base: number = 32;

  private constructor(negative: boolean, digits: Readonly<Uint32Array>) {
    this.negative = negative;
    this.digits = digits;
    if (digits.length === 1 && digits[0] === 0) this.negative = false;
  }

  public static parse(value: string): Integer {
    if (!value.match(/^[-]?\d+$/)) throw new Error();
    const negative = value.startsWith("-");
    const digits: number[] = [];
    Integer.parseHelper(negative ? value.substring(1) : value, digits);
    return new Integer(negative, new Uint32Array(digits));
  }

  private static parseHelper(value: string, result: number[]): void {
    if (!value.length) return;
    let nextValue = "";
    let curValue = 0;
    const max = Math.pow(2, Integer.base);
    for (const digit of value) {
      curValue = curValue * 10 + parseInt(digit);
      const val = Math.floor(curValue / max);
      if (val + nextValue.length) nextValue += val.toString();
      curValue %= max;
    }
    result.push(curValue);
    Integer.parseHelper(nextValue, result);
  }

  public toString(): string {
    const resultDigits = [0];
    let j: number;
    const over = Math.pow(2, Integer.base);
    let cur;

    for (let i = this.digits.length - 1; i >= 0; i--) {
      for (j = resultDigits.length - 1; j >= 0; j--) {
        cur = resultDigits[j] * over;
        resultDigits[j] = 0;
        let k = 0;
        while (cur > 0) {
          if (resultDigits.length == j + k) resultDigits.push(0);
          resultDigits[j + k] += cur % 10;
          cur = Math.floor(cur / 10) + Math.floor(resultDigits[j + k] / 10);
          resultDigits[j + k] %= 10;
          k++;
        }
      }

      j = 0;
      cur = this.digits[i];
      while (cur > 0) {
        if (j == resultDigits.length) resultDigits.push(0);
        resultDigits[j] += cur % 10;
        cur = Math.floor(cur / 10) + Math.floor(resultDigits[j] / 10);
        resultDigits[j] %= 10;
        j++;
      }
    }
    return (
      (this.negative ? "-" : "") +
      resultDigits
        .map((num) => num.toString())
        .reverse()
        .join("")
    );
  }

  public add(rhs: Integer): Integer {
    let result: IntegerInternal;
    const cb =
      (this.negative && !rhs.negative) || (!this.negative && rhs.negative)
        ? sub
        : add;
    result = cb(
      { negative: this.negative, digits: this.digits },
      { negative: rhs.negative, digits: rhs.digits },
      Integer.base
    );
    return new Integer(result.negative, result.digits);
  }

  public sub(rhs: Integer): Integer {
    let result: IntegerInternal;
    const cb =
      (this.negative && !rhs.negative) || (!this.negative && rhs.negative)
        ? add
        : sub;
    result = cb(
      { negative: this.negative, digits: this.digits },
      { negative: rhs.negative, digits: rhs.digits },
      Integer.base
    );
    return new Integer(result.negative, result.digits);
  }

  public mul(rhs: Integer): Integer {
    const result = mul(
      { negative: this.negative, digits: this.digits },
      { negative: rhs.negative, digits: rhs.digits },
      Integer.base
    );
    return new Integer(
      (this.negative && !rhs.negative) || (!this.negative && rhs.negative),
      result.digits
    );
  }
}
