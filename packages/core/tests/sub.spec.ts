import { expect, it } from "vitest";
import { Integer } from "../src/integer";

it("should subtract two small positive integers correctly", () => {
  expect(Integer.parse("05072003").sub(Integer.parse("05072003"))).toEqual({
    digits: new Uint32Array([0]),
    negative: false
  });

  expect(Integer.parse("0").sub(Integer.parse("0"))).toEqual({
    digits: new Uint32Array([0]),
    negative: false
  });

  expect(Integer.parse("-0").sub(Integer.parse("0"))).toEqual({
    digits: new Uint32Array([0]),
    negative: false
  });

  expect(Integer.parse("0").sub(Integer.parse("-0"))).toEqual({
    digits: new Uint32Array([0]),
    negative: false
  });

  expect(Integer.parse("-0").sub(Integer.parse("-0"))).toEqual({
    digits: new Uint32Array([0]),
    negative: false
  });

  expect(Integer.parse("18").sub(Integer.parse("0"))).toEqual({
    digits: new Uint32Array([18]),
    negative: false
  });

  expect(Integer.parse("0").sub(Integer.parse("11"))).toEqual({
    digits: new Uint32Array([11]),
    negative: true
  });

  expect(Integer.parse("18").sub(Integer.parse("-0"))).toEqual({
    digits: new Uint32Array([18]),
    negative: false
  });

  expect(Integer.parse("-0").sub(Integer.parse("11"))).toEqual({
    digits: new Uint32Array([11]),
    negative: true
  });

  expect(Integer.parse("18").sub(Integer.parse("11"))).toEqual({
    digits: new Uint32Array([7]),
    negative: false
  });

  expect(Integer.parse("11").sub(Integer.parse("18"))).toEqual({
    digits: new Uint32Array([7]),
    negative: true
  });

  expect(Integer.parse(`${2 ** 30}`).sub(Integer.parse(`${2 ** 31}`))).toEqual({
    digits: new Uint32Array([2 ** 30]),
    negative: true
  });

  expect(Integer.parse(`${2 ** 31}`).sub(Integer.parse(`${2 ** 30}`))).toEqual({
    digits: new Uint32Array([2 ** 30]),
    negative: false
  });
});

it("should subtract two small negative integers correctly", () => {
  expect(Integer.parse("-18").sub(Integer.parse("-11"))).toEqual({
    digits: new Uint32Array([7]),
    negative: true
  });

  expect(Integer.parse("-05").sub(Integer.parse("-07"))).toEqual({
    digits: new Uint32Array([2]),
    negative: false
  });

  expect(
    Integer.parse(`-${2 ** 30}`).sub(Integer.parse(`-${2 ** 31}`))
  ).toEqual({
    digits: new Uint32Array([2 ** 30]),
    negative: false
  });

  expect(
    Integer.parse(`-${2 ** 31}`).sub(Integer.parse(`-${2 ** 30}`))
  ).toEqual({
    digits: new Uint32Array([2 ** 30]),
    negative: true
  });
});

it("should sub two large positive integers correctly", () => {
  expect(
    Integer.parse(`${2n ** 76n}`).sub(Integer.parse(`${2n ** 340n}`))
  ).toEqual({
    digits: new Uint32Array([
      0, 0, 4294963200, 4294967295, 4294967295, 4294967295, 4294967295,
      4294967295, 4294967295, 4294967295, 1048575
    ]),
    negative: true
  });

  expect(
    Integer.parse(`${2n ** 340n}`).sub(Integer.parse(`${2n ** 76n}`))
  ).toEqual({
    digits: new Uint32Array([
      0, 0, 4294963200, 4294967295, 4294967295, 4294967295, 4294967295,
      4294967295, 4294967295, 4294967295, 1048575
    ]),
    negative: false
  });

  expect(
    Integer.parse("78321659017483256987").sub(
      Integer.parse("85250259285934732937")
    )
  ).toEqual({
    digits: new Uint32Array([532279790, 1613190460]),
    negative: true
  });

  expect(
    Integer.parse("85250259285934732937").sub(
      Integer.parse("78321659017483256987")
    )
  ).toEqual({
    digits: new Uint32Array([532279790, 1613190460]),
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
    digits: new Uint32Array([
      520333473, 3940146323, 2280371864, 2907682727, 231191909, 629265381,
      727233576, 97371990, 2286334609, 495612124, 476
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
    digits: new Uint32Array([
      520333473, 3940146323, 2280371864, 2907682727, 231191909, 629265381,
      727233576, 97371990, 2286334609, 495612124, 476
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
    digits: new Uint32Array([
      3498841148, 926239997, 1676871269, 3646284905, 3052126673, 277092880,
      2624733907, 3298709991, 1137090602, 2080946734, 2594476252, 615691412,
      3446940090, 1125007689, 3906398993, 68297
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
    digits: new Uint32Array([
      3498841148, 926239997, 1676871269, 3646284905, 3052126673, 277092880,
      2624733907, 3298709991, 1137090602, 2080946734, 2594476252, 615691412,
      3446940090, 1125007689, 3906398993, 68297
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
    digits: new Uint32Array([
      3991767301, 3858530062, 1210394029, 3506253826, 2131183184, 739583092,
      669266846, 1993660694, 2736025450, 1932092221, 3121170520, 1277641782,
      3864080625, 1830857574, 3454761340, 30687737, 1327324701, 3714908025,
      4172721637, 2911017006, 2390230797, 3800130959, 3089992701, 2055939339,
      3965438944, 236774644
    ]),
    negative: true
  });
});

it("should sub two large negative integers correctly", () => {
  expect(
    Integer.parse(`-${2n ** 76n}`).sub(Integer.parse(`-${2n ** 340n}`))
  ).toEqual({
    digits: new Uint32Array([
      0, 0, 4294963200, 4294967295, 4294967295, 4294967295, 4294967295,
      4294967295, 4294967295, 4294967295, 1048575
    ]),
    negative: false
  });

  expect(
    Integer.parse(`-${2n ** 340n}`).sub(Integer.parse(`-${2n ** 76n}`))
  ).toEqual({
    digits: new Uint32Array([
      0, 0, 4294963200, 4294967295, 4294967295, 4294967295, 4294967295,
      4294967295, 4294967295, 4294967295, 1048575
    ]),
    negative: true
  });

  expect(
    Integer.parse("-78321659017483256987").sub(
      Integer.parse("-85250259285934732937")
    )
  ).toEqual({
    digits: new Uint32Array([532279790, 1613190460]),
    negative: false
  });

  expect(
    Integer.parse("-85250259285934732937").sub(
      Integer.parse("-78321659017483256987")
    )
  ).toEqual({
    digits: new Uint32Array([532279790, 1613190460]),
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
    digits: new Uint32Array([
      520333473, 3940146323, 2280371864, 2907682727, 231191909, 629265381,
      727233576, 97371990, 2286334609, 495612124, 476
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
    digits: new Uint32Array([
      520333473, 3940146323, 2280371864, 2907682727, 231191909, 629265381,
      727233576, 97371990, 2286334609, 495612124, 476
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
    digits: new Uint32Array([
      3498841148, 926239997, 1676871269, 3646284905, 3052126673, 277092880,
      2624733907, 3298709991, 1137090602, 2080946734, 2594476252, 615691412,
      3446940090, 1125007689, 3906398993, 68297
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
    digits: new Uint32Array([
      3498841148, 926239997, 1676871269, 3646284905, 3052126673, 277092880,
      2624733907, 3298709991, 1137090602, 2080946734, 2594476252, 615691412,
      3446940090, 1125007689, 3906398993, 68297
    ]),
    negative: false
  });
});

it("should sub two small different sign integers correctly", () => {
  expect(Integer.parse("0").sub(Integer.parse("-18112003"))).toEqual({
    digits: new Uint32Array([18112003]),
    negative: false
  });

  expect(Integer.parse("-18112003").sub(Integer.parse("0"))).toEqual({
    digits: new Uint32Array([18112003]),
    negative: true
  });

  expect(Integer.parse("-05072003").sub(Integer.parse("-0"))).toEqual({
    digits: new Uint32Array([5072003]),
    negative: true
  });

  expect(Integer.parse("-0").sub(Integer.parse("-05072003"))).toEqual({
    digits: new Uint32Array([5072003]),
    negative: false
  });

  expect(Integer.parse("18112003").sub(Integer.parse("-05072003"))).toEqual({
    digits: new Uint32Array([23184006]),
    negative: false
  });

  expect(Integer.parse("05072003").sub(Integer.parse("-18112003"))).toEqual({
    digits: new Uint32Array([23184006]),
    negative: false
  });

  expect(Integer.parse(`${2 ** 30}`).sub(Integer.parse(`-${2 ** 31}`))).toEqual(
    {
      digits: new Uint32Array([3 * 2 ** 30]),
      negative: false
    }
  );

  expect(Integer.parse(`${2 ** 31}`).sub(Integer.parse(`-${2 ** 30}`))).toEqual(
    {
      digits: new Uint32Array([3 * 2 ** 30]),
      negative: false
    }
  );

  expect(Integer.parse(`-${2 ** 31}`).sub(Integer.parse(`${2 ** 30}`))).toEqual(
    {
      digits: new Uint32Array([3 * 2 ** 30]),
      negative: true
    }
  );
});

it("should sub two large different sign integers correctly", () => {
  expect(
    Integer.parse(`${-(2n ** 76n)}`).sub(Integer.parse(`${2n ** 340n}`))
  ).toEqual({
    digits: new Uint32Array([0, 0, 2 ** 12, 0, 0, 0, 0, 0, 0, 0, 2 ** 20]),
    negative: true
  });

  expect(
    Integer.parse(`${2n ** 76n}`).sub(Integer.parse(`-${2n ** 340n}`))
  ).toEqual({
    digits: new Uint32Array([0, 0, 2 ** 12, 0, 0, 0, 0, 0, 0, 0, 2 ** 20]),
    negative: false
  });

  expect(
    Integer.parse("78321659017483256987").sub(
      Integer.parse("-85250259285934732937")
    )
  ).toEqual({
    digits: new Uint32Array([1215429412, 3724816654, 8]),
    negative: false
  });

  expect(
    Integer.parse("-78321659017483256987").sub(
      Integer.parse("85250259285934732937")
    )
  ).toEqual({
    digits: new Uint32Array([1215429412, 3724816654, 8]),
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
    digits: new Uint32Array([
      219260785, 1130482261, 3718476559, 1521544400, 2426527137, 1342482570,
      1759554429, 452154959, 1525087942, 1116513499, 5367
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
    digits: new Uint32Array([
      219260785, 1130482261, 3718476559, 1521544400, 2426527137, 1342482570,
      1759554429, 452154959, 1525087942, 1116513499, 5367
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
    digits: new Uint32Array([
      3967206986, 4200628871, 4123968884, 2004744291, 639398034, 2079818402,
      3300202435, 2280982367, 1338596419, 2853929768, 2594478126, 615691412,
      3446940090, 1125007689, 3906398993, 68297
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
    digits: new Uint32Array([
      3967206986, 4200628871, 4123968884, 2004744291, 639398034, 2079818402,
      3300202435, 2280982367, 1338596419, 2853929768, 2594478126, 615691412,
      3446940090, 1125007689, 3906398993, 68297
    ]),
    negative: true
  });
});
