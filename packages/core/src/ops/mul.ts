import { IntegerArray, IntegerInternal } from "../types";

export function mul(
  lhs: IntegerInternal,
  rhs: IntegerInternal,
  base: number
): IntegerInternal {
  const digits = mulHelper(lhs.digits, rhs.digits, base);
  let i = digits.length - 1;
  while (i > 0 && digits[i] === 0) i--;
  return { digits: digits.slice(0, i + 1), negative: lhs.negative };
}

function mulNums(lhs: number, rhs: number, base: number): IntegerArray {
  const max = Math.pow(2, base);
  const min = Math.pow(2, base / 2);

  const leftHigh = Math.floor(lhs / min);
  const leftLow = lhs % min;
  const rightHigh = Math.floor(rhs / min);
  const rightLow = rhs % min;

  const val = leftLow * rightHigh + leftHigh * rightLow;
  const val1 = leftLow * rightLow + (val % min) * min;
  const val2 =
    leftHigh * rightHigh + Math.floor(val / min) + Math.floor(val1 / max);

  if (val2 > 0) return new IntegerArray([val1 % max, val2]);
  else return new IntegerArray([val1 % max]);
}

function update(
  lhs: IntegerArray,
  offset: number,
  rhs: IntegerArray,
  base: number
): IntegerArray {
  const res = new IntegerArray(Math.max(lhs.length, offset + rhs.length) + 1);

  const max = Math.pow(2, base) - 1;

  let carried = false;
  let nextCarried: boolean;
  for (let i = 0; i < lhs.length; i++) res[i] = lhs[i];
  for (let i = 0; i < rhs.length; i++) {
    nextCarried = false;

    if (carried)
      if (res[offset + i] === max) {
        res[offset + i] = 0;
        nextCarried = true;
      } else res[offset + i]++;

    if (rhs[i] > max - res[offset + i]) {
      res[offset + i] = rhs[i] - (max - res[offset + i]) - 1;
      nextCarried = true;
    } else res[offset + i] += rhs[i];

    carried = nextCarried;
  }

  if (carried) {
    let i = offset + rhs.length;
    while (res[i] === max) {
      res[i] = 0;
      i++;
    }
    res[i]++;
  }
  return res;
}

function mulHelper(
  lhs: Readonly<IntegerArray>,
  rhs: Readonly<IntegerArray>,
  base: number
): IntegerArray {
  const leftLength = lhs.length;
  const rightLength = rhs.length;
  if (leftLength * rightLength === 0) return new IntegerArray(0);
  if (leftLength * rightLength === 1) return mulNums(lhs[0], rhs[0], base);

  const mid = Math.ceil(Math.max(leftLength, rightLength) / 2);
  let res = mulHelper(lhs.slice(0, mid), rhs.slice(0, mid), base);

  const left = mulHelper(lhs.slice(mid), rhs.slice(0, mid), base);
  res = update(res, mid, left, base);

  const right = mulHelper(lhs.slice(0, mid), rhs.slice(mid), base);
  res = update(res, mid, right, base);

  const both = mulHelper(lhs.slice(mid), rhs.slice(mid), base);
  res = update(res, mid * 2, both, base);

  return res;
}
