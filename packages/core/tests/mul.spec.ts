import { expect, it } from "vitest";
import { Integer } from "../src/integer";
import { IntegerArray } from "../src/types";

it("should multiply two small positive integers correctly", () => {
  expect(Integer.parse("0").mul(Integer.parse("0"))).toEqual({
    digits: new IntegerArray([0]),
    negative: false
  });

  expect(Integer.parse("-0").mul(Integer.parse("0"))).toEqual({
    digits: new IntegerArray([0]),
    negative: false
  });

  expect(Integer.parse("0").mul(Integer.parse("-0"))).toEqual({
    digits: new IntegerArray([0]),
    negative: false
  });

  expect(Integer.parse("-0").mul(Integer.parse("-0"))).toEqual({
    digits: new IntegerArray([0]),
    negative: false
  });

  expect(Integer.parse("18").mul(Integer.parse("0"))).toEqual({
    digits: new IntegerArray([0]),
    negative: false
  });

  expect(Integer.parse("0").mul(Integer.parse("11"))).toEqual({
    digits: new IntegerArray([0]),
    negative: false
  });

  expect(Integer.parse("18").mul(Integer.parse("-0"))).toEqual({
    digits: new IntegerArray([0]),
    negative: false
  });

  expect(Integer.parse("-0").mul(Integer.parse("11"))).toEqual({
    digits: new IntegerArray([0]),
    negative: false
  });

  expect(Integer.parse("18").mul(Integer.parse("11"))).toEqual({
    digits: new IntegerArray([198]),
    negative: false
  });

  expect(Integer.parse("11").mul(Integer.parse("18"))).toEqual({
    digits: new IntegerArray([198]),
    negative: false
  });

  expect(Integer.parse(`${2 ** 30}`).mul(Integer.parse(`${2 ** 31}`))).toEqual({
    digits: new IntegerArray([0, 0, 0, 0, 0, 0, 0, 32]),
    negative: false
  });

  expect(Integer.parse(`${2 ** 31}`).mul(Integer.parse(`${2 ** 30}`))).toEqual({
    digits: new IntegerArray([0, 0, 0, 0, 0, 0, 0, 32]),
    negative: false
  });
});

it("should multiply two small negative integers correctly", () => {
  expect(Integer.parse("-18").mul(Integer.parse("-11"))).toEqual({
    digits: new IntegerArray([198]),
    negative: false
  });

  expect(Integer.parse("-05").mul(Integer.parse("-07"))).toEqual({
    digits: new IntegerArray([35]),
    negative: false
  });

  expect(
    Integer.parse(`-${2 ** 30}`).mul(Integer.parse(`-${2 ** 31}`))
  ).toEqual({
    digits: new IntegerArray([0, 0, 0, 0, 0, 0, 0, 32]),
    negative: false
  });

  expect(
    Integer.parse(`-${2 ** 31}`).mul(Integer.parse(`-${2 ** 30}`))
  ).toEqual({
    digits: new IntegerArray([0, 0, 0, 0, 0, 0, 0, 32]),
    negative: false
  });
});

it("should multiply two large positive integers correctly", () => {
  expect(
    Integer.parse(`${2n ** 76n}`).mul(Integer.parse(`${2n ** 340n}`))
  ).toEqual({
    digits: new IntegerArray([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 1
    ]),
    negative: false
  });

  expect(
    Integer.parse("78321659017483256987").mul(
      Integer.parse("85250259285934732937")
    )
  ).toEqual({
    digits: new IntegerArray([
      243, 104, 98, 46, 47, 227, 253, 213, 167, 0, 136, 172, 4, 52, 44, 159, 19
    ]),
    negative: false
  });

  expect(
    Integer.parse(
      "6240686999209324223794027489686748786523022309376707563414438454561215092023155022197432651463960585"
    ).mul(
      Integer.parse(
        "5223710690685194676620817383040471082029762281306644809401872561035911587241781965642069291951390568"
      )
    )
  ).toEqual({
    digits: new IntegerArray([
      168, 58, 235, 48, 94, 3, 226, 28, 104, 191, 239, 199, 6, 58, 51, 243, 151,
      89, 24, 95, 29, 137, 85, 247, 5, 92, 104, 232, 217, 174, 217, 87, 26, 172,
      147, 133, 20, 73, 206, 57, 119, 14, 58, 39, 20, 142, 193, 27, 131, 224,
      186, 39, 127, 71, 138, 82, 106, 128, 27, 189, 151, 174, 154, 56, 198, 70,
      124, 186, 17, 237, 21, 8, 111, 141, 77, 46, 206, 54, 14, 102, 238, 6, 109
    ]),
    negative: false
  });

  expect(
    Integer.parse(
      "213208900062992173575480871142946357088783328361757913035135907337941250309863862808881892342313356799103757648671775496555656527633462254664828415299"
    ).mul(
      Integer.parse(
        "2001612063869983781666866540727864302796739430514748244877452040971554446684392273827084325208021255"
      )
    )
  ).toEqual({
    digits: new IntegerArray([
      213, 71, 165, 12, 168, 252, 60, 123, 143, 143, 64, 97, 85, 28, 217, 176,
      234, 116, 110, 60, 94, 219, 11, 211, 60, 132, 170, 172, 114, 141, 78, 161,
      102, 244, 237, 89, 1, 60, 97, 45, 243, 165, 70, 235, 211, 222, 245, 83,
      117, 239, 24, 79, 23, 26, 135, 85, 13, 150, 117, 85, 140, 242, 81, 50,
      120, 93, 158, 230, 119, 43, 253, 189, 63, 231, 169, 30, 185, 87, 150, 171,
      10, 14, 211, 39, 106, 188, 35, 251, 121, 183, 65, 118, 54, 29, 212, 12,
      168, 10, 96, 40, 7, 149, 208, 3
    ]),
    negative: false
  });

  expect(
    Integer.parse(
      "17463824986574846464383774207567635033166289136468153538760403913306057206233411512289382366790153193618290226711979720388933649386157504076908231649343097282263001347515278563790637219396426054777622"
    ).mul(
      Integer.parse(
        "6442585908744959041428585141967522936341963350668298478001513160373576906996563805678545031066369850650189799354843132484229408819230536483421928167588380162050765875808203588929922509571608308141850588264818176700201089400268627667874838999226369294"
      )
    )
  ).toEqual({
    digits: new IntegerArray([
      52, 41, 149, 129, 203, 167, 114, 125, 193, 101, 234, 148, 114, 250, 177,
      71, 209, 33, 234, 79, 200, 169, 13, 74, 226, 169, 45, 188, 125, 203, 165,
      241, 199, 241, 105, 119, 210, 171, 233, 238, 65, 203, 57, 75, 4, 234, 88,
      52, 179, 253, 105, 4, 147, 61, 34, 88, 24, 214, 223, 216, 159, 113, 101,
      104, 186, 187, 38, 47, 120, 152, 2, 101, 162, 226, 84, 116, 250, 131, 250,
      142, 108, 74, 227, 123, 214, 60, 134, 153, 91, 19, 246, 187, 169, 116,
      218, 90, 166, 56, 41, 218, 67, 211, 119, 141, 210, 219, 118, 237, 109,
      193, 166, 138, 104, 33, 50, 6, 90, 218, 49, 63, 41, 2, 104, 40, 221, 243,
      11, 74, 35, 130, 188, 196, 186, 53, 197, 255, 12, 92, 206, 0, 114, 98,
      166, 138, 92, 50, 229, 205, 72, 246, 172, 73, 55, 111, 56, 87, 24, 39, 52,
      131, 154, 182, 84, 18, 79, 175, 31, 163, 84, 38, 160, 202, 227, 1, 30, 2,
      231, 175, 174, 203, 2, 195, 89, 229, 156, 35, 13
    ]),
    negative: false
  });
});

it("should multiply two large negative integers correctly", () => {
  expect(
    Integer.parse(`-${2n ** 340n}`).mul(Integer.parse(`-${2n ** 76n}`))
  ).toEqual({
    digits: new IntegerArray([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 1
    ]),
    negative: false
  });

  expect(
    Integer.parse("-78321659017483256987").mul(
      Integer.parse("-85250259285934732937")
    )
  ).toEqual({
    digits: new IntegerArray([
      243, 104, 98, 46, 47, 227, 253, 213, 167, 0, 136, 172, 4, 52, 44, 159, 19
    ]),
    negative: false
  });

  expect(
    Integer.parse(
      "-6240686999209324223794027489686748786523022309376707563414438454561215092023155022197432651463960585"
    ).mul(
      Integer.parse(
        "-5223710690685194676620817383040471082029762281306644809401872561035911587241781965642069291951390568"
      )
    )
  ).toEqual({
    digits: new IntegerArray([
      168, 58, 235, 48, 94, 3, 226, 28, 104, 191, 239, 199, 6, 58, 51, 243, 151,
      89, 24, 95, 29, 137, 85, 247, 5, 92, 104, 232, 217, 174, 217, 87, 26, 172,
      147, 133, 20, 73, 206, 57, 119, 14, 58, 39, 20, 142, 193, 27, 131, 224,
      186, 39, 127, 71, 138, 82, 106, 128, 27, 189, 151, 174, 154, 56, 198, 70,
      124, 186, 17, 237, 21, 8, 111, 141, 77, 46, 206, 54, 14, 102, 238, 6, 109
    ]),
    negative: false
  });

  expect(
    Integer.parse(
      "-213208900062992173575480871142946357088783328361757913035135907337941250309863862808881892342313356799103757648671775496555656527633462254664828415299"
    ).mul(
      Integer.parse(
        "-2001612063869983781666866540727864302796739430514748244877452040971554446684392273827084325208021255"
      )
    )
  ).toEqual({
    digits: new IntegerArray([
      213, 71, 165, 12, 168, 252, 60, 123, 143, 143, 64, 97, 85, 28, 217, 176,
      234, 116, 110, 60, 94, 219, 11, 211, 60, 132, 170, 172, 114, 141, 78, 161,
      102, 244, 237, 89, 1, 60, 97, 45, 243, 165, 70, 235, 211, 222, 245, 83,
      117, 239, 24, 79, 23, 26, 135, 85, 13, 150, 117, 85, 140, 242, 81, 50,
      120, 93, 158, 230, 119, 43, 253, 189, 63, 231, 169, 30, 185, 87, 150, 171,
      10, 14, 211, 39, 106, 188, 35, 251, 121, 183, 65, 118, 54, 29, 212, 12,
      168, 10, 96, 40, 7, 149, 208, 3
    ]),
    negative: false
  });
});

it("should multiply two small different sign integers correctly", () => {
  expect(Integer.parse("0").mul(Integer.parse("-18112003"))).toEqual({
    digits: new IntegerArray([0]),
    negative: false
  });

  expect(Integer.parse("-18112003").mul(Integer.parse("0"))).toEqual({
    digits: new IntegerArray([0]),
    negative: false
  });

  expect(Integer.parse("-05072003").mul(Integer.parse("-0"))).toEqual({
    digits: new IntegerArray([0]),
    negative: false
  });

  expect(Integer.parse("-0").mul(Integer.parse("-05072003"))).toEqual({
    digits: new IntegerArray([0]),
    negative: false
  });

  expect(Integer.parse("18112003").mul(Integer.parse("-05072003"))).toEqual({
    digits: new IntegerArray([137, 71, 12, 201, 140, 83]),
    negative: true
  });

  expect(Integer.parse("05072003").mul(Integer.parse("-18112003"))).toEqual({
    digits: new IntegerArray([137, 71, 12, 201, 140, 83]),
    negative: true
  });

  expect(Integer.parse(`${2 ** 30}`).mul(Integer.parse(`-${2 ** 31}`))).toEqual(
    {
      digits: new IntegerArray([0, 0, 0, 0, 0, 0, 0, 32]),
      negative: true
    }
  );

  expect(Integer.parse(`${2 ** 31}`).mul(Integer.parse(`-${2 ** 30}`))).toEqual(
    {
      digits: new IntegerArray([0, 0, 0, 0, 0, 0, 0, 32]),
      negative: true
    }
  );

  expect(Integer.parse(`-${2 ** 31}`).mul(Integer.parse(`${2 ** 30}`))).toEqual(
    {
      digits: new IntegerArray([0, 0, 0, 0, 0, 0, 0, 32]),
      negative: true
    }
  );
});

it("should multiply two large different sign integers correctly", () => {
  expect(
    Integer.parse(`-${2n ** 76n}`).mul(Integer.parse(`${2n ** 340n}`))
  ).toEqual({
    digits: new IntegerArray([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 1
    ]),
    negative: true
  });

  expect(
    Integer.parse(`${2n ** 76n}`).mul(Integer.parse(`-${2n ** 340n}`))
  ).toEqual({
    digits: new IntegerArray([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 1
    ]),
    negative: true
  });

  expect(
    Integer.parse("78321659017483256987").mul(
      Integer.parse("-85250259285934732937")
    )
  ).toEqual({
    digits: new IntegerArray([
      243, 104, 98, 46, 47, 227, 253, 213, 167, 0, 136, 172, 4, 52, 44, 159, 19
    ]),
    negative: true
  });

  expect(
    Integer.parse("-78321659017483256987").mul(
      Integer.parse("85250259285934732937")
    )
  ).toEqual({
    digits: new IntegerArray([
      243, 104, 98, 46, 47, 227, 253, 213, 167, 0, 136, 172, 4, 52, 44, 159, 19
    ]),
    negative: true
  });

  expect(
    Integer.parse(
      "6240686999209324223794027489686748786523022309376707563414438454561215092023155022197432651463960585"
    ).mul(
      Integer.parse(
        "-5223710690685194676620817383040471082029762281306644809401872561035911587241781965642069291951390568"
      )
    )
  ).toEqual({
    digits: new IntegerArray([
      168, 58, 235, 48, 94, 3, 226, 28, 104, 191, 239, 199, 6, 58, 51, 243, 151,
      89, 24, 95, 29, 137, 85, 247, 5, 92, 104, 232, 217, 174, 217, 87, 26, 172,
      147, 133, 20, 73, 206, 57, 119, 14, 58, 39, 20, 142, 193, 27, 131, 224,
      186, 39, 127, 71, 138, 82, 106, 128, 27, 189, 151, 174, 154, 56, 198, 70,
      124, 186, 17, 237, 21, 8, 111, 141, 77, 46, 206, 54, 14, 102, 238, 6, 109
    ]),
    negative: true
  });

  expect(
    Integer.parse(
      "-6240686999209324223794027489686748786523022309376707563414438454561215092023155022197432651463960585"
    ).mul(
      Integer.parse(
        "5223710690685194676620817383040471082029762281306644809401872561035911587241781965642069291951390568"
      )
    )
  ).toEqual({
    digits: new IntegerArray([
      168, 58, 235, 48, 94, 3, 226, 28, 104, 191, 239, 199, 6, 58, 51, 243, 151,
      89, 24, 95, 29, 137, 85, 247, 5, 92, 104, 232, 217, 174, 217, 87, 26, 172,
      147, 133, 20, 73, 206, 57, 119, 14, 58, 39, 20, 142, 193, 27, 131, 224,
      186, 39, 127, 71, 138, 82, 106, 128, 27, 189, 151, 174, 154, 56, 198, 70,
      124, 186, 17, 237, 21, 8, 111, 141, 77, 46, 206, 54, 14, 102, 238, 6, 109
    ]),
    negative: true
  });

  expect(
    Integer.parse(
      "213208900062992173575480871142946357088783328361757913035135907337941250309863862808881892342313356799103757648671775496555656527633462254664828415299"
    ).mul(
      Integer.parse(
        "-2001612063869983781666866540727864302796739430514748244877452040971554446684392273827084325208021255"
      )
    )
  ).toEqual({
    digits: new IntegerArray([
      213, 71, 165, 12, 168, 252, 60, 123, 143, 143, 64, 97, 85, 28, 217, 176,
      234, 116, 110, 60, 94, 219, 11, 211, 60, 132, 170, 172, 114, 141, 78, 161,
      102, 244, 237, 89, 1, 60, 97, 45, 243, 165, 70, 235, 211, 222, 245, 83,
      117, 239, 24, 79, 23, 26, 135, 85, 13, 150, 117, 85, 140, 242, 81, 50,
      120, 93, 158, 230, 119, 43, 253, 189, 63, 231, 169, 30, 185, 87, 150, 171,
      10, 14, 211, 39, 106, 188, 35, 251, 121, 183, 65, 118, 54, 29, 212, 12,
      168, 10, 96, 40, 7, 149, 208, 3
    ]),
    negative: true
  });

  expect(
    Integer.parse(
      "-213208900062992173575480871142946357088783328361757913035135907337941250309863862808881892342313356799103757648671775496555656527633462254664828415299"
    ).mul(
      Integer.parse(
        "2001612063869983781666866540727864302796739430514748244877452040971554446684392273827084325208021255"
      )
    )
  ).toEqual({
    digits: new IntegerArray([
      213, 71, 165, 12, 168, 252, 60, 123, 143, 143, 64, 97, 85, 28, 217, 176,
      234, 116, 110, 60, 94, 219, 11, 211, 60, 132, 170, 172, 114, 141, 78, 161,
      102, 244, 237, 89, 1, 60, 97, 45, 243, 165, 70, 235, 211, 222, 245, 83,
      117, 239, 24, 79, 23, 26, 135, 85, 13, 150, 117, 85, 140, 242, 81, 50,
      120, 93, 158, 230, 119, 43, 253, 189, 63, 231, 169, 30, 185, 87, 150, 171,
      10, 14, 211, 39, 106, 188, 35, 251, 121, 183, 65, 118, 54, 29, 212, 12,
      168, 10, 96, 40, 7, 149, 208, 3
    ]),
    negative: true
  });
});
