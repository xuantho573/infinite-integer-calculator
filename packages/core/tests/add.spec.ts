import { expect, it } from "vitest";
import { Integer } from "../src/integer";
import { IntegerArray } from "../src/types";

it("should add two small positive integers correctly", () => {
  expect(Integer.parse("0").add(Integer.parse("0"))).toEqual({
    digits: new IntegerArray([0]),
    negative: false
  });

  expect(Integer.parse("-0").add(Integer.parse("0"))).toEqual({
    digits: new IntegerArray([0]),
    negative: false
  });

  expect(Integer.parse("0").add(Integer.parse("-0"))).toEqual({
    digits: new IntegerArray([0]),
    negative: false
  });

  expect(Integer.parse("-0").add(Integer.parse("-0"))).toEqual({
    digits: new IntegerArray([0]),
    negative: false
  });

  expect(Integer.parse("18").add(Integer.parse("0"))).toEqual({
    digits: new IntegerArray([18]),
    negative: false
  });

  expect(Integer.parse("0").add(Integer.parse("11"))).toEqual({
    digits: new IntegerArray([11]),
    negative: false
  });

  expect(Integer.parse("18").add(Integer.parse("-0"))).toEqual({
    digits: new IntegerArray([18]),
    negative: false
  });

  expect(Integer.parse("-0").add(Integer.parse("11"))).toEqual({
    digits: new IntegerArray([11]),
    negative: false
  });

  expect(Integer.parse("18").add(Integer.parse("11"))).toEqual({
    digits: new IntegerArray([29]),
    negative: false
  });

  expect(Integer.parse(`${2 ** 30}`).add(Integer.parse(`${2 ** 31}`))).toEqual({
    digits: new IntegerArray([0, 0, 0, 192]),
    negative: false
  });
});

it("should add multiple small positive integers correctly", () => {
  expect(
    Integer.parse("18").add(Integer.parse("11")).add(Integer.parse("2003"))
  ).toEqual({ digits: new IntegerArray([240, 7]), negative: false });

  expect(
    Integer.parse("05").add(Integer.parse("07")).add(Integer.parse("2003"))
  ).toEqual({ digits: new IntegerArray([223, 7]), negative: false });

  expect(
    Integer.parse("18")
      .add(Integer.parse("11"))
      .add(Integer.parse("2003"))
      .add(Integer.parse("05"))
      .add(Integer.parse("07"))
      .add(Integer.parse("2003"))
  ).toEqual({ digits: new IntegerArray([207, 15]), negative: false });
});

it("should add two small negative integers correctly", () => {
  expect(Integer.parse("-18").add(Integer.parse("-11"))).toEqual({
    digits: new IntegerArray([29]),
    negative: true
  });

  expect(Integer.parse("-05").add(Integer.parse("-07"))).toEqual({
    digits: new IntegerArray([12]),
    negative: true
  });

  expect(
    Integer.parse(`-${2 ** 30}`).add(Integer.parse(`-${2 ** 31}`))
  ).toEqual({ digits: new IntegerArray([0, 0, 0, 192]), negative: true });
});

it("should add multiple small negative integers correctly", () => {
  expect(
    Integer.parse("-18").add(Integer.parse("-11")).add(Integer.parse("-2003"))
  ).toEqual({ digits: new IntegerArray([240, 7]), negative: true });

  expect(
    Integer.parse("-05").add(Integer.parse("-07")).add(Integer.parse("-2003"))
  ).toEqual({ digits: new IntegerArray([223, 7]), negative: true });

  expect(
    Integer.parse("-18")
      .add(Integer.parse("-11"))
      .add(Integer.parse("-2003"))
      .add(Integer.parse("-05"))
      .add(Integer.parse("-07"))
      .add(Integer.parse("-2003"))
  ).toEqual({ digits: new IntegerArray([207, 15]), negative: true });
});

it("should add two large positive integers correctly", () => {
  expect(
    Integer.parse(`${2n ** 76n}`).add(Integer.parse(`${2n ** 340n}`))
  ).toEqual({
    digits: new IntegerArray([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16
    ]),
    negative: false
  });

  expect(
    Integer.parse("78321659017483256987").add(
      Integer.parse("85250259285934732937")
    )
  ).toEqual({
    digits: new IntegerArray([36, 251, 113, 72, 14, 49, 4, 222, 8]),
    negative: false
  });

  expect(
    Integer.parse(
      "6240686999209324223794027489686748786523022309376707563414438454561215092023155022197432651463960585"
    ).add(
      Integer.parse(
        "5223710690685194676620817383040471082029762281306644809401872561035911587241781965642069291951390568"
      )
    )
  ).toEqual({
    digits: new IntegerArray([
      113, 167, 17, 13, 85, 202, 97, 67, 15, 115, 163, 221, 208, 236, 176, 90,
      161, 221, 161, 144, 138, 168, 4, 80, 125, 171, 224, 104, 79, 86, 243, 26,
      198, 254, 230, 90, 219, 164, 140, 66, 247, 20
    ]),
    negative: false
  });

  expect(
    Integer.parse(
      "213208900062992173575480871142946357088783328361757913035135907337941250309863862808881892342313356799103757648671775496555656527633462254664828415299"
    ).add(
      Integer.parse(
        "2001612063869983781666866540727864302796739430514748244877452040971554446684392273827084325208021255"
      )
    )
  ).toEqual({
    digits: new IntegerArray([
      74, 198, 118, 236, 135, 130, 96, 250, 116, 197, 206, 245, 99, 248, 125,
      119, 146, 112, 28, 38, 162, 130, 247, 123, 195, 23, 181, 196, 95, 7, 245,
      135, 67, 92, 201, 79, 40, 131, 27, 170, 46, 152, 164, 154, 148, 180, 178,
      36, 186, 33, 116, 205, 73, 65, 14, 67, 17, 235, 214, 232, 201, 10, 1
    ]),
    negative: false
  });
});

it("should add multiple large positive integers correctly", () => {
  expect(
    Integer.parse(`${2n ** 76n}`)
      .add(Integer.parse(`${2n ** 340n}`))
      .add(Integer.parse(`${32456n * 2n ** 161n}`))
  ).toEqual({
    digits: new IntegerArray([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 144, 253, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16
    ]),
    negative: false
  });

  expect(
    Integer.parse("78321659017483256987")
      .add(Integer.parse("85250259285934732937"))
      .add(Integer.parse("50327966626329420363"))
      .add(Integer.parse("54510035744350657430"))
      .add(Integer.parse("65160031984897674294"))
  ).toEqual({
    digits: new IntegerArray([59, 5, 79, 47, 157, 136, 54, 21, 18]),
    negative: false
  });

  expect(
    Integer.parse(
      "6240686999209324223794027489686748786523022309376707563414438454561215092023155022197432651463960585"
    )
      .add(
        Integer.parse(
          "5223710690685194676620817383040471082029762281306644809401872561035911587241781965642069291951390568"
        )
      )
      .add(
        Integer.parse(
          "7743081938139364671671244234695090874418610523676001407944028568162572998387017289421102069393171840"
        )
      )
  ).toEqual({
    digits: new IntegerArray([
      241, 76, 242, 124, 72, 17, 100, 169, 35, 135, 244, 205, 3, 66, 108, 192,
      233, 130, 181, 160, 217, 190, 213, 172, 242, 138, 83, 112, 157, 79, 137,
      154, 234, 74, 11, 157, 233, 138, 0, 82, 32, 35
    ]),
    negative: false
  });

  expect(
    Integer.parse(
      "213208900062992173575480871142946357088783328361757913035135907337941250309863862808881892342313356799103757648671775496555656527633462254664828415299"
    )
      .add(
        Integer.parse(
          "2001612063869983781666866540727864302796739430514748244877452040971554446684392273827084325208021255"
        )
      )
      .add(
        Integer.parse(
          "163962662099102369952088244789397505784257404082072829260812438792133696466275402735720061918800969303865294109563604947"
        )
      )
      .add(
        Integer.parse(
          "4949453783502835705174054835024007573173706993953142041702289632916673853711740628781459371971875098693535826631635396159438680476495580108713138156169322115342952755764059306611195"
        )
      )
  ).toEqual({
    digits: new IntegerArray([
      24, 232, 211, 43, 121, 41, 27, 24, 34, 40, 117, 70, 223, 175, 137, 209,
      185, 20, 253, 13, 101, 39, 10, 52, 241, 71, 194, 106, 114, 83, 84, 182,
      132, 62, 219, 164, 121, 82, 79, 94, 161, 188, 249, 99, 37, 249, 188, 253,
      228, 225, 82, 40, 175, 89, 72, 191, 223, 148, 207, 87, 96, 157, 157, 178,
      178, 211, 103, 71, 220, 192, 103, 225, 241, 89, 49, 1
    ]),
    negative: false
  });
});

it("should add two large negative integers correctly", () => {
  expect(
    Integer.parse(`-${2n ** 76n}`).add(Integer.parse(`-${2n ** 340n}`))
  ).toEqual({
    digits: new IntegerArray([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16
    ]),
    negative: true
  });

  expect(
    Integer.parse("-78321659017483256987").add(
      Integer.parse("-85250259285934732937")
    )
  ).toEqual({
    digits: new IntegerArray([36, 251, 113, 72, 14, 49, 4, 222, 8]),
    negative: true
  });

  expect(
    Integer.parse(
      "-6240686999209324223794027489686748786523022309376707563414438454561215092023155022197432651463960585"
    ).add(
      Integer.parse(
        "-5223710690685194676620817383040471082029762281306644809401872561035911587241781965642069291951390568"
      )
    )
  ).toEqual({
    digits: new IntegerArray([
      113, 167, 17, 13, 85, 202, 97, 67, 15, 115, 163, 221, 208, 236, 176, 90,
      161, 221, 161, 144, 138, 168, 4, 80, 125, 171, 224, 104, 79, 86, 243, 26,
      198, 254, 230, 90, 219, 164, 140, 66, 247, 20
    ]),
    negative: true
  });

  expect(
    Integer.parse(
      "-213208900062992173575480871142946357088783328361757913035135907337941250309863862808881892342313356799103757648671775496555656527633462254664828415299"
    ).add(
      Integer.parse(
        "-2001612063869983781666866540727864302796739430514748244877452040971554446684392273827084325208021255"
      )
    )
  ).toEqual({
    digits: new IntegerArray([
      74, 198, 118, 236, 135, 130, 96, 250, 116, 197, 206, 245, 99, 248, 125,
      119, 146, 112, 28, 38, 162, 130, 247, 123, 195, 23, 181, 196, 95, 7, 245,
      135, 67, 92, 201, 79, 40, 131, 27, 170, 46, 152, 164, 154, 148, 180, 178,
      36, 186, 33, 116, 205, 73, 65, 14, 67, 17, 235, 214, 232, 201, 10, 1
    ]),
    negative: true
  });
});

it("should add multiple large negative integers correctly", () => {
  expect(
    Integer.parse(`-${2n ** 76n}`)
      .add(Integer.parse(`-${2n ** 340n}`))
      .add(Integer.parse(`-${32456n * 2n ** 161n}`))
  ).toEqual({
    digits: new IntegerArray([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 144, 253, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16
    ]),
    negative: true
  });

  expect(
    Integer.parse("-78321659017483256987")
      .add(Integer.parse("-85250259285934732937"))
      .add(Integer.parse("-50327966626329420363"))
      .add(Integer.parse("-54510035744350657430"))
      .add(Integer.parse("-65160031984897674294"))
  ).toEqual({
    digits: new IntegerArray([59, 5, 79, 47, 157, 136, 54, 21, 18]),
    negative: true
  });

  expect(
    Integer.parse(
      "-6240686999209324223794027489686748786523022309376707563414438454561215092023155022197432651463960585"
    )
      .add(
        Integer.parse(
          "-5223710690685194676620817383040471082029762281306644809401872561035911587241781965642069291951390568"
        )
      )
      .add(
        Integer.parse(
          "-7743081938139364671671244234695090874418610523676001407944028568162572998387017289421102069393171840"
        )
      )
  ).toEqual({
    digits: new IntegerArray([
      241, 76, 242, 124, 72, 17, 100, 169, 35, 135, 244, 205, 3, 66, 108, 192,
      233, 130, 181, 160, 217, 190, 213, 172, 242, 138, 83, 112, 157, 79, 137,
      154, 234, 74, 11, 157, 233, 138, 0, 82, 32, 35
    ]),
    negative: true
  });

  expect(
    Integer.parse(
      "-213208900062992173575480871142946357088783328361757913035135907337941250309863862808881892342313356799103757648671775496555656527633462254664828415299"
    )
      .add(
        Integer.parse(
          "-2001612063869983781666866540727864302796739430514748244877452040971554446684392273827084325208021255"
        )
      )
      .add(
        Integer.parse(
          "-163962662099102369952088244789397505784257404082072829260812438792133696466275402735720061918800969303865294109563604947"
        )
      )
      .add(
        Integer.parse(
          "-4949453783502835705174054835024007573173706993953142041702289632916673853711740628781459371971875098693535826631635396159438680476495580108713138156169322115342952755764059306611195"
        )
      )
  ).toEqual({
    digits: new IntegerArray([
      24, 232, 211, 43, 121, 41, 27, 24, 34, 40, 117, 70, 223, 175, 137, 209,
      185, 20, 253, 13, 101, 39, 10, 52, 241, 71, 194, 106, 114, 83, 84, 182,
      132, 62, 219, 164, 121, 82, 79, 94, 161, 188, 249, 99, 37, 249, 188, 253,
      228, 225, 82, 40, 175, 89, 72, 191, 223, 148, 207, 87, 96, 157, 157, 178,
      178, 211, 103, 71, 220, 192, 103, 225, 241, 89, 49, 1
    ]),
    negative: true
  });
});

it("should add two small different sign integers correctly", () => {
  expect(Integer.parse("18112003").add(Integer.parse("-18112003"))).toEqual({
    digits: new IntegerArray([0]),
    negative: false
  });

  expect(Integer.parse("0").add(Integer.parse("-18112003"))).toEqual({
    digits: new IntegerArray([3, 94, 20, 1]),
    negative: true
  });

  expect(Integer.parse("-18112003").add(Integer.parse("0"))).toEqual({
    digits: new IntegerArray([3, 94, 20, 1]),
    negative: true
  });

  expect(Integer.parse("-05072003").add(Integer.parse("-0"))).toEqual({
    digits: new IntegerArray([131, 100, 77]),
    negative: true
  });

  expect(Integer.parse("-0").add(Integer.parse("-05072003"))).toEqual({
    digits: new IntegerArray([131, 100, 77]),
    negative: true
  });

  expect(Integer.parse("18112003").add(Integer.parse("-05072003"))).toEqual({
    digits: new IntegerArray([128, 249, 198]),
    negative: false
  });

  expect(Integer.parse("05072003").add(Integer.parse("-18112003"))).toEqual({
    digits: new IntegerArray([128, 249, 198]),
    negative: true
  });

  expect(
    Integer.parse(`${2 ** 30}`).add(Integer.parse(`${-(2 ** 31)}`))
  ).toEqual({
    digits: new IntegerArray([0, 0, 0, 64]),
    negative: true
  });

  expect(
    Integer.parse(`${2 ** 31}`).add(Integer.parse(`${-(2 ** 30)}`))
  ).toEqual({
    digits: new IntegerArray([0, 0, 0, 64]),
    negative: false
  });
});

it("should add two large different sign integers correctly", () => {
  expect(
    Integer.parse(`-${2n ** 76n}`).add(Integer.parse(`${2n ** 76n}`))
  ).toEqual({
    digits: new IntegerArray([0]),
    negative: false
  });

  expect(
    Integer.parse(`${-(2n ** 76n)}`).add(Integer.parse(`${2n ** 340n}`))
  ).toEqual({
    digits: new IntegerArray([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 240, 255, 255, 255, 255, 255, 255, 255, 255,
      255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
      255, 255, 255, 255, 255, 255, 255, 255, 255, 15
    ]),
    negative: false
  });

  expect(
    Integer.parse(`${2n ** 76n}`).add(Integer.parse(`${-(2n ** 340n)}`))
  ).toEqual({
    digits: new IntegerArray([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 240, 255, 255, 255, 255, 255, 255, 255, 255,
      255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
      255, 255, 255, 255, 255, 255, 255, 255, 255, 15
    ]),
    negative: true
  });

  expect(
    Integer.parse("78321659017483256987").add(
      Integer.parse("-85250259285934732937")
    )
  ).toEqual({
    digits: new IntegerArray([238, 241, 185, 31, 60, 85, 39, 96]),
    negative: true
  });

  expect(
    Integer.parse("-78321659017483256987").add(
      Integer.parse("85250259285934732937")
    )
  ).toEqual({
    digits: new IntegerArray([238, 241, 185, 31, 60, 85, 39, 96]),
    negative: false
  });

  expect(
    Integer.parse(
      "6240686999209324223794027489686748786523022309376707563414438454561215092023155022197432651463960585"
    ).add(
      Integer.parse(
        "-5223710690685194676620817383040471082029762281306644809401872561035911587241781965642069291951390568"
      )
    )
  ).toEqual({
    digits: new IntegerArray([
      161, 168, 3, 31, 147, 220, 217, 234, 152, 182, 235, 135, 167, 183, 79,
      173, 101, 181, 199, 13, 229, 211, 129, 37, 40, 180, 88, 43, 86, 199, 205,
      5, 145, 178, 70, 136, 220, 112, 138, 29, 220, 1
    ]),
    negative: false
  });

  expect(
    Integer.parse(
      "-6240686999209324223794027489686748786523022309376707563414438454561215092023155022197432651463960585"
    ).add(
      Integer.parse(
        "5223710690685194676620817383040471082029762281306644809401872561035911587241781965642069291951390568"
      )
    )
  ).toEqual({
    digits: new IntegerArray([
      161, 168, 3, 31, 147, 220, 217, 234, 152, 182, 235, 135, 167, 183, 79,
      173, 101, 181, 199, 13, 229, 211, 129, 37, 40, 180, 88, 43, 86, 199, 205,
      5, 145, 178, 70, 136, 220, 112, 138, 29, 220, 1
    ]),
    negative: true
  });

  expect(
    Integer.parse(
      "213208900062992173575480871142946357088783328361757913035135907337941250309863862808881892342313356799103757648671775496555656527633462254664828415299"
    ).add(
      Integer.parse(
        "-2001612063869983781666866540727864302796739430514748244877452040971554446684392273827084325208021255"
      )
    )
  ).toEqual({
    digits: new IntegerArray([
      60, 20, 140, 208, 253, 76, 53, 55, 101, 6, 243, 99, 105, 228, 85, 217,
      209, 193, 235, 181, 16, 26, 132, 16, 211, 66, 114, 156, 231, 81, 158, 196,
      42, 160, 198, 67, 46, 186, 8, 124, 220, 144, 164, 154, 148, 180, 178, 36,
      186, 33, 116, 205, 73, 65, 14, 67, 17, 235, 214, 232, 201, 10, 1
    ]),
    negative: false
  });

  expect(
    Integer.parse(
      "-213208900062992173575480871142946357088783328361757913035135907337941250309863862808881892342313356799103757648671775496555656527633462254664828415299"
    ).add(
      Integer.parse(
        "2001612063869983781666866540727864302796739430514748244877452040971554446684392273827084325208021255"
      )
    )
  ).toEqual({
    digits: new IntegerArray([
      60, 20, 140, 208, 253, 76, 53, 55, 101, 6, 243, 99, 105, 228, 85, 217,
      209, 193, 235, 181, 16, 26, 132, 16, 211, 66, 114, 156, 231, 81, 158, 196,
      42, 160, 198, 67, 46, 186, 8, 124, 220, 144, 164, 154, 148, 180, 178, 36,
      186, 33, 116, 205, 73, 65, 14, 67, 17, 235, 214, 232, 201, 10, 1
    ]),
    negative: true
  });
});
