import { expect, it } from "vitest";
import { Integer } from "../src/integer";
import { IntegerArray } from "../src/types";

it("should subtract two small positive integers correctly", () => {
  expect(Integer.parse("05072003").sub(Integer.parse("05072003"))).toEqual({
    digits: new IntegerArray([0]),
    negative: false
  });

  expect(Integer.parse("0").sub(Integer.parse("0"))).toEqual({
    digits: new IntegerArray([0]),
    negative: false
  });

  expect(Integer.parse("-0").sub(Integer.parse("0"))).toEqual({
    digits: new IntegerArray([0]),
    negative: false
  });

  expect(Integer.parse("0").sub(Integer.parse("-0"))).toEqual({
    digits: new IntegerArray([0]),
    negative: false
  });

  expect(Integer.parse("-0").sub(Integer.parse("-0"))).toEqual({
    digits: new IntegerArray([0]),
    negative: false
  });

  expect(Integer.parse("18").sub(Integer.parse("0"))).toEqual({
    digits: new IntegerArray([18]),
    negative: false
  });

  expect(Integer.parse("0").sub(Integer.parse("11"))).toEqual({
    digits: new IntegerArray([11]),
    negative: true
  });

  expect(Integer.parse("18").sub(Integer.parse("-0"))).toEqual({
    digits: new IntegerArray([18]),
    negative: false
  });

  expect(Integer.parse("-0").sub(Integer.parse("11"))).toEqual({
    digits: new IntegerArray([11]),
    negative: true
  });

  expect(Integer.parse("18").sub(Integer.parse("11"))).toEqual({
    digits: new IntegerArray([7]),
    negative: false
  });

  expect(Integer.parse("11").sub(Integer.parse("18"))).toEqual({
    digits: new IntegerArray([7]),
    negative: true
  });

  expect(Integer.parse(`${2 ** 30}`).sub(Integer.parse(`${2 ** 31}`))).toEqual({
    digits: new IntegerArray([0, 0, 0, 64]),
    negative: true
  });

  expect(Integer.parse(`${2 ** 31}`).sub(Integer.parse(`${2 ** 30}`))).toEqual({
    digits: new IntegerArray([0, 0, 0, 64]),
    negative: false
  });
});

it("should subtract two small negative integers correctly", () => {
  expect(Integer.parse("-18").sub(Integer.parse("-11"))).toEqual({
    digits: new IntegerArray([7]),
    negative: true
  });

  expect(Integer.parse("-05").sub(Integer.parse("-07"))).toEqual({
    digits: new IntegerArray([2]),
    negative: false
  });

  expect(
    Integer.parse(`-${2 ** 30}`).sub(Integer.parse(`-${2 ** 31}`))
  ).toEqual({
    digits: new IntegerArray([0, 0, 0, 64]),
    negative: false
  });

  expect(
    Integer.parse(`-${2 ** 31}`).sub(Integer.parse(`-${2 ** 30}`))
  ).toEqual({
    digits: new IntegerArray([0, 0, 0, 64]),
    negative: true
  });
});

it("should sub two large positive integers correctly", () => {
  expect(
    Integer.parse(`${2n ** 76n}`).sub(Integer.parse(`${2n ** 340n}`))
  ).toEqual({
    digits: new IntegerArray([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 240, 255, 255, 255, 255, 255, 255, 255, 255,
      255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
      255, 255, 255, 255, 255, 255, 255, 255, 255, 15
    ]),
    negative: true
  });

  expect(
    Integer.parse(`${2n ** 340n}`).sub(Integer.parse(`${2n ** 76n}`))
  ).toEqual({
    digits: new IntegerArray([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 240, 255, 255, 255, 255, 255, 255, 255, 255,
      255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
      255, 255, 255, 255, 255, 255, 255, 255, 255, 15
    ]),
    negative: false
  });

  expect(
    Integer.parse("78321659017483256987").sub(
      Integer.parse("85250259285934732937")
    )
  ).toEqual({
    digits: new IntegerArray([238, 241, 185, 31, 60, 85, 39, 96]),
    negative: true
  });

  expect(
    Integer.parse("85250259285934732937").sub(
      Integer.parse("78321659017483256987")
    )
  ).toEqual({
    digits: new IntegerArray([238, 241, 185, 31, 60, 85, 39, 96]),
    negative: false
  });

  expect(
    Integer.parse(
      "6240686999209324223794027489686748786523022309376707563414438454561215092023155022197432651463960585"
    ).sub(
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
    negative: false
  });

  expect(
    Integer.parse(
      "5223710690685194676620817383040471082029762281306644809401872561035911587241781965642069291951390568"
    ).sub(
      Integer.parse(
        "6240686999209324223794027489686748786523022309376707563414438454561215092023155022197432651463960585"
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
    ).sub(
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
    negative: false
  });

  expect(
    Integer.parse(
      "2001612063869983781666866540727864302796739430514748244877452040971554446684392273827084325208021255"
    ).sub(
      Integer.parse(
        "213208900062992173575480871142946357088783328361757913035135907337941250309863862808881892342313356799103757648671775496555656527633462254664828415299"
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

  expect(
    Integer.parse(
      "6442585908744959041428585141967522936341963350668298478001513160373576906996563805678545031066369850650189799354843132484229408819230536483421928167588380162050765875808203588929922509571608308141850588264818176700201089400268627667874838999226369294"
    ).sub(
      Integer.parse(
        "8021402658433364137162706425920853749388710612292128760206823424024557607130073800624354290475325312185757352138658777157298636535975652348982366317925786841681594460929706691356137011408100089598309341831051549156697029059066254012038787600281325075"
      )
    )
  ).toEqual({
    digits: new IntegerArray([
      5, 137, 237, 237, 14, 127, 252, 229, 173, 37, 37, 72, 2, 48, 253, 208, 80,
      70, 7, 127, 116, 36, 21, 44, 158, 51, 228, 39, 22, 217, 212, 118, 106,
      111, 20, 163, 61, 99, 41, 115, 88, 72, 9, 186, 54, 68, 39, 76, 241, 48,
      81, 230, 102, 171, 32, 109, 124, 121, 235, 205, 249, 65, 212, 1, 29, 94,
      29, 79, 121, 255, 108, 221, 229, 173, 182, 248, 46, 152, 130, 173, 13, 7,
      120, 142, 143, 101, 129, 226, 253, 139, 45, 184, 11, 37, 139, 122, 224,
      203, 91, 236, 244, 228, 28, 14
    ]),
    negative: true
  });
});

it("should sub two large negative integers correctly", () => {
  expect(
    Integer.parse(`-${2n ** 76n}`).sub(Integer.parse(`-${2n ** 340n}`))
  ).toEqual({
    digits: new IntegerArray([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 240, 255, 255, 255, 255, 255, 255, 255, 255,
      255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
      255, 255, 255, 255, 255, 255, 255, 255, 255, 15
    ]),
    negative: false
  });

  expect(
    Integer.parse(`-${2n ** 340n}`).sub(Integer.parse(`-${2n ** 76n}`))
  ).toEqual({
    digits: new IntegerArray([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 240, 255, 255, 255, 255, 255, 255, 255, 255,
      255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
      255, 255, 255, 255, 255, 255, 255, 255, 255, 15
    ]),
    negative: true
  });

  expect(
    Integer.parse("-78321659017483256987").sub(
      Integer.parse("-85250259285934732937")
    )
  ).toEqual({
    digits: new IntegerArray([238, 241, 185, 31, 60, 85, 39, 96]),
    negative: false
  });

  expect(
    Integer.parse("-85250259285934732937").sub(
      Integer.parse("-78321659017483256987")
    )
  ).toEqual({
    digits: new IntegerArray([238, 241, 185, 31, 60, 85, 39, 96]),
    negative: true
  });

  expect(
    Integer.parse(
      "-6240686999209324223794027489686748786523022309376707563414438454561215092023155022197432651463960585"
    ).sub(
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
    negative: true
  });

  expect(
    Integer.parse(
      "-5223710690685194676620817383040471082029762281306644809401872561035911587241781965642069291951390568"
    ).sub(
      Integer.parse(
        "-6240686999209324223794027489686748786523022309376707563414438454561215092023155022197432651463960585"
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
      "-213208900062992173575480871142946357088783328361757913035135907337941250309863862808881892342313356799103757648671775496555656527633462254664828415299"
    ).sub(
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
    negative: true
  });

  expect(
    Integer.parse(
      "-2001612063869983781666866540727864302796739430514748244877452040971554446684392273827084325208021255"
    ).sub(
      Integer.parse(
        "-213208900062992173575480871142946357088783328361757913035135907337941250309863862808881892342313356799103757648671775496555656527633462254664828415299"
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
});

it("should sub two small different sign integers correctly", () => {
  expect(Integer.parse("0").sub(Integer.parse("-18112003"))).toEqual({
    digits: new IntegerArray([3, 94, 20, 1]),
    negative: false
  });

  expect(Integer.parse("-18112003").sub(Integer.parse("0"))).toEqual({
    digits: new IntegerArray([3, 94, 20, 1]),
    negative: true
  });

  expect(Integer.parse("-05072003").sub(Integer.parse("-0"))).toEqual({
    digits: new IntegerArray([131, 100, 77]),
    negative: true
  });

  expect(Integer.parse("-0").sub(Integer.parse("-05072003"))).toEqual({
    digits: new IntegerArray([131, 100, 77]),
    negative: false
  });

  expect(Integer.parse("18112003").sub(Integer.parse("-05072003"))).toEqual({
    digits: new IntegerArray([134, 194, 97, 1]),
    negative: false
  });

  expect(Integer.parse("05072003").sub(Integer.parse("-18112003"))).toEqual({
    digits: new IntegerArray([134, 194, 97, 1]),
    negative: false
  });

  expect(Integer.parse(`${2 ** 30}`).sub(Integer.parse(`-${2 ** 31}`))).toEqual(
    {
      digits: new IntegerArray([0, 0, 0, 192]),
      negative: false
    }
  );

  expect(Integer.parse(`${2 ** 31}`).sub(Integer.parse(`-${2 ** 30}`))).toEqual(
    {
      digits: new IntegerArray([0, 0, 0, 192]),
      negative: false
    }
  );

  expect(Integer.parse(`-${2 ** 31}`).sub(Integer.parse(`${2 ** 30}`))).toEqual(
    {
      digits: new IntegerArray([0, 0, 0, 192]),
      negative: true
    }
  );
});

it("should sub two large different sign integers correctly", () => {
  expect(
    Integer.parse(`${-(2n ** 76n)}`).sub(Integer.parse(`${2n ** 340n}`))
  ).toEqual({
    digits: new IntegerArray([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16
    ]),
    negative: true
  });

  expect(
    Integer.parse(`${2n ** 76n}`).sub(Integer.parse(`-${2n ** 340n}`))
  ).toEqual({
    digits: new IntegerArray([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16
    ]),
    negative: false
  });

  expect(
    Integer.parse("78321659017483256987").sub(
      Integer.parse("-85250259285934732937")
    )
  ).toEqual({
    digits: new IntegerArray([36, 251, 113, 72, 14, 49, 4, 222, 8]),
    negative: false
  });

  expect(
    Integer.parse("-78321659017483256987").sub(
      Integer.parse("85250259285934732937")
    )
  ).toEqual({
    digits: new IntegerArray([36, 251, 113, 72, 14, 49, 4, 222, 8]),
    negative: true
  });

  expect(
    Integer.parse(
      "6240686999209324223794027489686748786523022309376707563414438454561215092023155022197432651463960585"
    ).sub(
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
    negative: false
  });

  expect(
    Integer.parse(
      "-6240686999209324223794027489686748786523022309376707563414438454561215092023155022197432651463960585"
    ).sub(
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
    negative: true
  });

  expect(
    Integer.parse(
      "213208900062992173575480871142946357088783328361757913035135907337941250309863862808881892342313356799103757648671775496555656527633462254664828415299"
    ).sub(
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
    negative: false
  });

  expect(
    Integer.parse(
      "-213208900062992173575480871142946357088783328361757913035135907337941250309863862808881892342313356799103757648671775496555656527633462254664828415299"
    ).sub(
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
    negative: true
  });
});
