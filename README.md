<p align="center">
  <!-- <a href="https://mui.com/x/" rel="noopener" target="_blank"><img width="150" height="133" src="https://mui.com/static/logo.svg" alt="MUI X logo"></a> -->
</p>
<h1 align="center">Infinite Integer Calculator</h1>

Infinite Integer Calculator is a web-based calculator supporting basic
arithmetic operations on integers with lots of digits. It is designed as the
assignment for the internship challenge of Holistics.

---

## Installation

### Install Node.js

Ensure you have Node.js installed on your machine. If not, download and install
it from [nodejs.org](https://nodejs.org/).

### Install pnpm

Pnpm is a package manager for Node.js. If you haven't installed pnpm yet, you
can do so by following the instructions on
[pnpm.io](https://pnpm.io/installation/).

### Clone the Repository

```bash
git clone https://github.com/xuantho573/infinite-integer-calculator.git
```

### Install Node Dependencies

Navigate to the project directory and install the Node dependencies using pnpm:

```bash
cd infinite-integer-calculator
pnpm install
```

## Environment variables

You'll need the host address of the server in order for the frontend to access
the calculation service.

You just need to rename the file `example.env` in the `ui` directory to `.env`
and you are good to go.

## Running

Once you've got all things set up, you can follow the steps below to run the
application:

- First navigate to the server directory with and start the server with the
  following commands:

```bash
cd packages/server
pnpm dev:server
```

- Then create a new terminal instance at the project's root directory and run
  the following commands:

```bash
cd packages/ui
pnpm dev
```

---

## License

Infinite Integer Calculator is licensed under the [Apache 2.0 License](LICENSE).

---

## Code Structure

### Core package

```
📦 core
 ┗📦 src
   ┣📂 ops          # Include logic handlers for arithmetic operations
   ┣📜 integer.ts   # Class Integer representing an infinite integer
   ┣📜 parser.ts    # Utilities for parsing expressions
   ┣📜 server.ts    # Http server
   ┗📜 types.ts     # Types and interfaces for annotation
```

### UI package

```
📦 ui
 ┣📦 src
 ┃ ┣📂 assets         # Contains static assets
 ┃ ┣📂 components     # Main components of the application
 ┃ ┣📂 customHooks    # Custom hooks
 ┃ ┣📂 store          # Redux store implementation
 ┃ ┣📜 App.css        # Main css implementation
 ┃ ┣📜 App.tsx        # Application container
 ┃ ┣📜 index.css      # Root css
 ┃ ┗📜 main.tsx       # Entry point
 ┗📜 index.html       # Root html page
```

---

## Problems & Solutions

### Storing integers

Since the input integers may be very large, using normal integer type will
result in overflow.

In order to resolve this problem, we will transform the integers into arrays of
digits and calculate the expressions on the arrays instead.

### Memory management

Using single numbers as digits leads to inefficient use of memory since they
don't use all the space allocated for numbers.

Therefore, we will convert the base from decimal to base $2^{32}$ and treat a
digit as 4-byte binary data. We will call the data structure representing the
infinite integers in our system `Integer`. It contains an array of binary data
represent the digits and a boolean variable indicating whether the number is
negative or not. The class also has a static property representing the bit
numbers of the base of the converted integers.

```ts
class Integer {
  private readonly negative: boolean;
  private readonly digits: Readonly<Uint32Array>;
  private static base: number = 32; // 32-bit integer
}
```

### Parsing integers

Remember the algorithm to convert a decimal integer to a binary string? It looks
somewhat like this:

```ts
function decToBinary(n: number) {
  const binaryNum: number[] = [];
  let result = "";
  let i = 0;
  while (n > 0) {
    binaryNum.push(n % 2);
    n = Math.floor(n / 2);
    i++;
  }
  while (number.length > 0) result += number.pop().toString();
  return result;
}
```

This is a very simple implementation to convert a decimal number to a binary
string. We could also convert the input integers to base $2^{32}$ using this
algorithm. However, we cannot start with the whole integer since it will cause
overflow. Therefore, we need another solution.

A simple solution is also based on the previous algorithm, but instead of
calculating the quotient directly from the integer, we will traverse the integer
digit-by-digit and update the dividend and the quotient accordingly. Let's take
a look at an example using new base of $2^4=16$:

| Iteration | Dividend at start | Dividend at end | Quotient |
| :-------: | :---------------: | :-------------: | :------: |
|     1     |         2         |        2        |    0     |
|     2     |        20         |        4        |    01    |
|     3     |        42         |       10        |   012    |
|     4     |        104        |        8        |   0126   |

Since there is no digit left and the final dividend is 8, the first digit of the
final parsed integer will be 8. The final array will equal to `[8, 14, 7]`. Note
that we store the digits in little-endian order for future convenience.

### Addition

For addition operations, we will use elementary math to implement it. However,
considering the overflow problem, we will do some comparisons to determine the
outcome of digit additions. The steps of the algorithm is demonstrated below:

1. At each digit position, we first assign the result as the digit of the first
   `Integer` if it exists, else we assign 0 to the result.
2. If there is a carry from the previous iteration, then we need to increase the
   result by 1. However, we need to check if the result is currently the maximum
   value, which is $2^{32} - 1$, then we need to assign 0 to the result and flag
   the carry for the next iteration to `true` instead.
3. We then compute the difference between the maximum value and the current
   result and compare it with the digit from the second `Integer` (if exists).
   If the digit exceeds the difference value, we assign `digit - diff - 1` to
   the result and flag the carry for the next iteration to `true`. Else we
   increase the result by `digit`.
4. Finally, we push the result to the end of the result array.

After iterating through the digits, if the carry is flagged as `true`, we push 1
to the final array.

Let's take a look at the following example of adding two `Integer` objects in
base $2^4$:

```ts
const obj1 = {
  digits: [13, 13, 4, 9],
  negative: false
};
const obj2 = {
  digits: [15, 6, 2],
  negative: false
};
```

The algorithm states will look like this:

| Iteration | Current carry | Initial result | Result after carry | Difference | Digit of the second `Integer` | Result after second digit | Next carry |
| :-------: | :-----------: | :------------: | :----------------: | :--------: | :---------------------------: | :-----------------------: | :--------: |
|     1     |     false     |       13       |         13         |     2      |              15               |            12             |    true    |
|     2     |     true      |       13       |         14         |     1      |               6               |             4             |    true    |
|     3     |     true      |       4        |         5          |     10     |               2               |             7             |   false    |
|     4     |     false     |       9        |         9          |     6      |               0               |             9             |   false    |

So the final array will equal to `[12, 4, 7, 9]`

### Subtraction

For subtraction operations, we will also use elementary math to implement it.
However, the minuend may be smaller then the subtrahend, so we will check if it
is and revoke the function with reversed order of arguments.

Now that we have simplify the operation, we will dive into the implementation of
the operation:

1. For each digit position, we will assign the digit of the minuend to the
   result.
2. We then check if the current result if 0 and there is a carry from the
   previous iteration. If it is, then we assign the maximum value to the result
   and flag the carry for the next iteration to `true`. Otherwise we decrease
   the result by 1 if there is a carry.
3. Next, we check if the current result is smaller than the digit of the
   subtrahend (if exists). If so, we assign `max - (digit - result) + 1` to the
   result and flag the carry for the next iteration to `true`.
4. Finally we push the result to the end of the result array.

After iterating through the digits, if the last digits of the final array are 0,
then we remove those elements until the array is not empty and the last digit is
not 0.

Let's take a look at the following example of subtracting two `Integer` objects
in base $2^4$:

```ts
const obj1 = {
  digits: [13, 13, 4, 9],
  negative: false
};
const obj2 = {
  digits: [15, 6, 2],
  negative: false
};
```

The algorithm states will look like this:

| Iteration | Current carry | Initial result | Result after carry | Digit of the second `Integer` | Result after second digit | Next carry |
| :-------: | :-----------: | :------------: | :----------------: | :---------------------------: | :-----------------------: | :--------: |
|     1     |     false     |       13       |         13         |              15               |            14             |    true    |
|     2     |     true      |       13       |         12         |               6               |             6             |   false    |
|     3     |     false     |       4        |         4          |               2               |             2             |   false    |
|     4     |     false     |       9        |         9          |               0               |             9             |   false    |

So the final array will equal to `[14, 6, 2, 9]`

### Multiplication

For multiplication operations, the product of two digits may exceed the maximum
value for a digit, which will cause loss of data. We can solve this problem by
splitting digits into two parts: high bits and low bits. Let's say that we have
two `Integer` $int_1$ and $int_2$. After splitting them, we get
$int_1 = high_1 * 2 ^ {16} + low_1$ and $int_2 = high_2 * 2 ^ {16} + low_2$
Let's transform the expression $int_1 * int_2$:

$$
int_1 * int_2 = (high_1 * 2 ^ {16} + low_1) * (high_2 * 2 ^ {16} + low_2)
$$

$$
= high_1 * high_2 * 2 ^ {32} + (high_1 * low_2 + high_2 * low_1) * 2 ^ {16} + low_1 * low_2
$$

We can see that the result of the first summand of the last equation will not
affect the result digit at the current position, but rather the next position
since it is left-shifted by 32 bits. We can also see that only the last 16 bits
of the second summand affect the result digit, since it is left-shifted by 16
bits. So the result digit will be equal to

$$(low_1*low_2+((high_1*low_2+high_2*low_1)\mod 2^{16})*2^{16}+C)\mod 2^{32}$$

, where $C$ is the carry from the previous iteration, and the carry for the next
iteration is equal to

$$high_1*high_2+floor((high_1 * low_2 + high_2 * low_1)/2^{16})$$

However, if the value before getting $\mod 2^{32}$ of the current digit is
larger than the max value, then we need to increase the carry for the next
iteration by 1. To avoid overflow, we will use the algorithm discussed above to
add two numbers.

That is for the multiplication between two digits. For multiplication of two
arrays of digits, we have to consider the position of each digits in the two
arrays, since the position of the multiplication between two digits is equal to
the sum of each digit's position. We can also split each array into two sub
arrays and apply the above algorithm recursively like they are just digits. Then
at each recursive call, if either array is empty, we just return 0, or if both
arrays have exactly 1 digit each, we return the multiple of the digits. At other
recursive calls, we apply addition operations on arrays with offset value
according to the length of the longer array.

The implementation will look something like this:

```ts
function mul(lhs: number[], rhs: number[], base: number) {
  const digits = mulHelper(lhs.digits, rhs.digits, base);
  let i = digits.length - 1;
  while (i > 0 && digits[i] === 0) i--;
  return digits.slice(0, i + 1);
}

function mulNums(lhs: number, rhs: number, base: number): number[] {
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

  if (val2 > 0) return [val1 % max, val2];
  else return [val1 % max];
}

function update(
  lhs: number[],
  offset: number,
  rhs: number[],
  base: number
): number[] {
  const res = new Array(Math.max(lhs.length, offset + rhs.length) + 1).fill(0);
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

function mulHelper(lhs: number[], rhs: number[], base: number): number[] {
  const leftLength = lhs.length;
  const rightLength = rhs.length;
  if (leftLength * rightLength === 0) return [0];
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
```

### Parsing expressions

The current implementation only supports parsing large integers into `Integer`
objects, so we will need to implement a parser to parse expressions. To parse a
simple expression, we will use the Pratt Parsing algorithm, which will parse the
expression and return an Abstract Syntax Tree representation of the expression.
We then can traverse the tree and calculate the final result.

More detail on the algorithm can be found
[here](https://matklad.github.io/2020/04/13/simple-but-powerful-pratt-parsing.html).

---
