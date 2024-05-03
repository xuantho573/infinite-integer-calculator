import { IntegerArray, IntegerInternal } from "../types";

export function add(
  lhs: IntegerInternal,
  rhs: IntegerInternal,
  base: number
): IntegerInternal {
  const maxLength = Math.max(lhs.digits.length, rhs.digits.length);
  const digits = new IntegerArray(maxLength + 1);

  let carried = false;
  let nextCarried;
  const max = Math.pow(2, base) - 1;
  for (let i = 0; i < maxLength; i++) {
    nextCarried = false;
    digits[i] = i < lhs.digits.length ? lhs.digits[i] : 0;

    if (carried)
      if (digits[i] === max) {
        digits[i] = 0;
        nextCarried = true;
      } else digits[i]++;

    if (i < rhs.digits.length)
      if (rhs.digits[i] > max - digits[i]) {
        digits[i] = rhs.digits[i] - (max - digits[i]) - 1;
        nextCarried = true;
      } else digits[i] += rhs.digits[i];

    carried = nextCarried;
  }

  digits[maxLength] = 1;

  return {
    digits: carried ? digits : digits.slice(0, maxLength),
    negative: lhs.negative
  };
}
