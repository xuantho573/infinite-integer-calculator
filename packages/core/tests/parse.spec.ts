import { expect, it } from "vitest";
import { Integer } from "../src/integer";

it("should parse a small positive integer correctly", () => {
  expect(Integer.parse("0")).toEqual({
    digits: new Uint32Array([0]),
    negative: false
  });

  expect(Integer.parse("-0")).toEqual({
    digits: new Uint32Array([0]),
    negative: false
  });

  expect(Integer.parse("123")).toEqual({
    digits: new Uint32Array([123]),
    negative: false
  });

  expect(Integer.parse(`${2 ** 32 - 1}`)).toEqual({
    digits: new Uint32Array([2 ** 32 - 1]),
    negative: false
  });

  expect(Integer.parse(`${2 ** 32}`)).toEqual({
    digits: new Uint32Array([0, 1]),
    negative: false
  });
});

it("should parse a small negative integer correctly", () => {
  expect(Integer.parse("-123")).toEqual({
    digits: new Uint32Array([123]),
    negative: true
  });

  expect(Integer.parse(`-${2 ** 32 - 1}`)).toEqual({
    digits: new Uint32Array([2 ** 32 - 1]),
    negative: true
  });

  expect(Integer.parse(`-${2 ** 32}`)).toEqual({
    digits: new Uint32Array([0, 1]),
    negative: true
  });
});

it("should parse a large positive integer correctly", () => {
  expect(
    Integer.parse(`${2n ** 31n + 2n ** 32n + 2n ** 31n * 2n ** 96n}`)
  ).toEqual({
    digits: new Uint32Array([2 ** 31, 1, 0, 2 ** 31]),
    negative: false
  });

  expect(
    Integer.parse(
      `${2n ** 31n + 2n ** 32n + 2n ** 30n * 2n ** 64n + 2n ** 31n * 2n ** 96n}`
    )
  ).toEqual({
    digits: new Uint32Array([2 ** 31, 1, 2 ** 30, 2 ** 31]),
    negative: false
  });

  expect(
    Integer.parse(
      `${18n + 11n * 2n ** 32n + 2003n * 2n ** 64n + 5n * 2n ** 96n + 7n * 2n ** 128n + 2003n * 2n ** 160n}`
    )
  ).toEqual({
    digits: new Uint32Array([18, 11, 2003, 5, 7, 2003]),
    negative: false
  });

  expect(Integer.parse(`${2n ** 1024n}`)).toEqual({
    digits: new Uint32Array([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1
    ]),
    negative: false
  });

  expect(
    Integer.parse(
      "6442585908744959041428585141967522936341963350668298478001513160373576906996563805678545031066369850650189799354843132484229408819230536483421928167588380162050765875808203588929922509571608308141850588264818176700201089400268627667874838999226369294"
    )
  ).toEqual({
    digits: new Uint32Array([
      4160210190, 3482368029, 1501886170, 1426685197, 1155320504, 992499522,
      3629557885, 2040571350, 3160542127, 4275085016, 2273398190, 2397671207,
      31619361, 4024315854, 1540301825, 1423220908, 2601838665, 2878404132,
      2641956019, 2153786941, 882246993, 3997069161, 126051360, 806988658,
      254993614, 966192556
    ]),
    negative: false
  });
});

it("should parse a large negative integer correctly", () => {
  expect(Integer.parse("-85250259285934732937")).toEqual({
    digits: new Uint32Array([873854601, 2669003557, 4]),
    negative: true
  });

  expect(
    Integer.parse(`-${2n ** 31n + 2n ** 32n + 2n ** 31n * 2n ** 96n}`)
  ).toEqual({
    digits: new Uint32Array([2 ** 31, 1, 0, 2 ** 31]),
    negative: true
  });

  expect(
    Integer.parse(
      `-${2n ** 31n + 2n ** 32n + 2n ** 30n * 2n ** 64n + 2n ** 31n * 2n ** 96n}`
    )
  ).toEqual({
    digits: new Uint32Array([2 ** 31, 1, 2 ** 30, 2 ** 31]),
    negative: true
  });

  expect(
    Integer.parse(
      `-${18n + 11n * 2n ** 32n + 2003n * 2n ** 64n + 5n * 2n ** 96n + 7n * 2n ** 128n + 2003n * 2n ** 160n}`
    )
  ).toEqual({
    digits: new Uint32Array([18, 11, 2003, 5, 7, 2003]),
    negative: true
  });

  expect(Integer.parse(`-${2n ** 1024n}`)).toEqual({
    digits: new Uint32Array([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1
    ]),
    negative: true
  });

  expect(
    Integer.parse(
      "-6442585908744959041428585141967522936341963350668298478001513160373576906996563805678545031066369850650189799354843132484229408819230536483421928167588380162050765875808203588929922509571608308141850588264818176700201089400268627667874838999226369294"
    )
  ).toEqual({
    digits: new Uint32Array([
      4160210190, 3482368029, 1501886170, 1426685197, 1155320504, 992499522,
      3629557885, 2040571350, 3160542127, 4275085016, 2273398190, 2397671207,
      31619361, 4024315854, 1540301825, 1423220908, 2601838665, 2878404132,
      2641956019, 2153786941, 882246993, 3997069161, 126051360, 806988658,
      254993614, 966192556
    ]),
    negative: true
  });
});
