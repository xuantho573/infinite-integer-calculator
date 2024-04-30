import { IntegerInternal } from "../types";

export function sub(
  lhs: IntegerInternal,
  rhs: IntegerInternal,
  base: number
): IntegerInternal {
  const digits = new Uint32Array(lhs.digits.length);

  if (lhs.digits.length < rhs.digits.length)
    return { digits: sub(rhs, lhs, base).digits, negative: !lhs.negative };

  if (lhs.digits.length === rhs.digits.length)
    for (let i = lhs.digits.length - 1; i >= 0; i--)
      if (lhs.digits[i] < rhs.digits[i])
        return { digits: sub(rhs, lhs, base).digits, negative: !lhs.negative };
      else if (lhs.digits[i] > rhs.digits[i]) break;

  const max = Math.pow(2, base) - 1;

  let carried = false;
  let nextCarried: boolean;

  for (let i = 0; i < lhs.digits.length; i++) {
    nextCarried = false;
    digits[i] = lhs.digits[i];

    if (carried)
      if (digits[i] === 0) {
        nextCarried = true;
        digits[i] = max;
      } else digits[i]--;

    if (i < rhs.digits.length) {
      if (digits[i] < rhs.digits[i]) {
        digits[i] = max - rhs.digits[i] + digits[i] + 1;
        nextCarried = true;
      } else digits[i] -= rhs.digits[i];
    }

    carried = nextCarried;
  }

  let i = lhs.digits.length - 1;
  while (i > 0 && digits[i] === 0) i--;

  return { digits: digits.slice(0, i + 1), negative: lhs.negative };
}
