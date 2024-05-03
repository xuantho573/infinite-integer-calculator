import { expect, it } from "vitest";
import { Integer } from "../src/integer";
import { IntegerArray } from "../src/types";

it("should parse a small positive integer correctly", () => {
  expect(Integer.parse("0")).toEqual({
    digits: new IntegerArray([0]),
    negative: false
  });

  expect(Integer.parse("-0")).toEqual({
    digits: new IntegerArray([0]),
    negative: false
  });

  expect(Integer.parse("123")).toEqual({
    digits: new IntegerArray([123]),
    negative: false
  });

  expect(Integer.parse(`${2 ** 32 - 1}`)).toEqual({
    digits: new IntegerArray([255, 255, 255, 255]),
    negative: false
  });

  expect(Integer.parse(`${2 ** 32}`)).toEqual({
    digits: new IntegerArray([0, 0, 0, 0, 1]),
    negative: false
  });
});

it("should parse a small negative integer correctly", () => {
  expect(Integer.parse("-123")).toEqual({
    digits: new IntegerArray([123]),
    negative: true
  });

  expect(Integer.parse(`-${2 ** 32 - 1}`)).toEqual({
    digits: new IntegerArray([255, 255, 255, 255]),
    negative: true
  });

  expect(Integer.parse(`-${2 ** 32}`)).toEqual({
    digits: new IntegerArray([0, 0, 0, 0, 1]),
    negative: true
  });
});

it("should parse a large positive integer correctly", () => {
  expect(
    Integer.parse(`${2n ** 31n + 2n ** 32n + 2n ** 31n * 2n ** 96n}`)
  ).toEqual({
    digits: new IntegerArray([
      0, 0, 0, 128, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128
    ]),
    negative: false
  });

  expect(
    Integer.parse(
      `${2n ** 31n + 2n ** 32n + 2n ** 30n * 2n ** 64n + 2n ** 31n * 2n ** 96n}`
    )
  ).toEqual({
    digits: new IntegerArray([
      0, 0, 0, 128, 1, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 128
    ]),
    negative: false
  });

  expect(
    Integer.parse(
      `${18n + 11n * 2n ** 32n + 2003n * 2n ** 64n + 5n * 2n ** 96n + 7n * 2n ** 128n + 2003n * 2n ** 160n}`
    )
  ).toEqual({
    digits: new IntegerArray([
      18, 0, 0, 0, 11, 0, 0, 0, 211, 7, 0, 0, 5, 0, 0, 0, 7, 0, 0, 0, 211, 7
    ]),
    negative: false
  });

  expect(Integer.parse(`${2n ** 1024n}`)).toEqual({
    digits: new IntegerArray([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 1
    ]),
    negative: false
  });

  expect(
    Integer.parse(
      "6442585908744959041428585141967522936341963350668298478001513160373576906996563805678545031066369850650189799354843132484229408819230536483421928167588380162050765875808203588929922509571608308141850588264818176700201089400268627667874838999226369294"
    )
  ).toEqual({
    digits: new IntegerArray([
      14, 197, 247, 247, 29, 184, 144, 207, 218, 246, 132, 89, 13, 125, 9, 85,
      184, 202, 220, 68, 66, 87, 40, 59, 125, 168, 86, 216, 214, 165, 160, 121,
      175, 11, 98, 188, 216, 158, 208, 254, 174, 77, 129, 135, 39, 143, 233,
      142, 33, 121, 226, 1, 206, 47, 222, 239, 1, 36, 207, 91, 172, 160, 212,
      84, 73, 232, 20, 155, 36, 246, 144, 171, 179, 12, 121, 157, 61, 46, 96,
      128, 81, 5, 150, 52, 105, 111, 62, 238, 32, 100, 131, 7, 114, 171, 25, 48,
      206, 228, 50, 15, 172, 237, 150, 57
    ]),
    negative: false
  });
});

it("should parse a large negative integer correctly", () => {
  expect(Integer.parse("-85250259285934732937")).toEqual({
    digits: new IntegerArray([137, 246, 21, 52, 37, 195, 21, 159, 4]),
    negative: true
  });

  expect(
    Integer.parse(`-${2n ** 31n + 2n ** 32n + 2n ** 31n * 2n ** 96n}`)
  ).toEqual({
    digits: new IntegerArray([
      0, 0, 0, 128, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128
    ]),
    negative: true
  });

  expect(
    Integer.parse(
      `-${2n ** 31n + 2n ** 32n + 2n ** 30n * 2n ** 64n + 2n ** 31n * 2n ** 96n}`
    )
  ).toEqual({
    digits: new IntegerArray([
      0, 0, 0, 128, 1, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 128
    ]),
    negative: true
  });

  expect(
    Integer.parse(
      `-${18n + 11n * 2n ** 32n + 2003n * 2n ** 64n + 5n * 2n ** 96n + 7n * 2n ** 128n + 2003n * 2n ** 160n}`
    )
  ).toEqual({
    digits: new IntegerArray([
      18, 0, 0, 0, 11, 0, 0, 0, 211, 7, 0, 0, 5, 0, 0, 0, 7, 0, 0, 0, 211, 7
    ]),
    negative: true
  });

  expect(Integer.parse(`-${2n ** 1024n}`)).toEqual({
    digits: new IntegerArray([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 1
    ]),
    negative: true
  });

  expect(
    Integer.parse(
      "-6442585908744959041428585141967522936341963350668298478001513160373576906996563805678545031066369850650189799354843132484229408819230536483421928167588380162050765875808203588929922509571608308141850588264818176700201089400268627667874838999226369294"
    )
  ).toEqual({
    digits: new IntegerArray([
      14, 197, 247, 247, 29, 184, 144, 207, 218, 246, 132, 89, 13, 125, 9, 85,
      184, 202, 220, 68, 66, 87, 40, 59, 125, 168, 86, 216, 214, 165, 160, 121,
      175, 11, 98, 188, 216, 158, 208, 254, 174, 77, 129, 135, 39, 143, 233,
      142, 33, 121, 226, 1, 206, 47, 222, 239, 1, 36, 207, 91, 172, 160, 212,
      84, 73, 232, 20, 155, 36, 246, 144, 171, 179, 12, 121, 157, 61, 46, 96,
      128, 81, 5, 150, 52, 105, 111, 62, 238, 32, 100, 131, 7, 114, 171, 25, 48,
      206, 228, 50, 15, 172, 237, 150, 57
    ]),
    negative: true
  });
});
