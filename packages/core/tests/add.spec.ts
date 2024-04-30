import { expect, it } from "vitest";
import { Integer } from "../src/integer";

it("should add two small positive integers correctly", () => {
  expect(Integer.parse("0").add(Integer.parse("0"))).toEqual({
    digits: new Uint32Array([0]),
    negative: false
  });

  expect(Integer.parse("-0").add(Integer.parse("0"))).toEqual({
    digits: new Uint32Array([0]),
    negative: false
  });

  expect(Integer.parse("0").add(Integer.parse("-0"))).toEqual({
    digits: new Uint32Array([0]),
    negative: false
  });

  expect(Integer.parse("-0").add(Integer.parse("-0"))).toEqual({
    digits: new Uint32Array([0]),
    negative: false
  });

  expect(Integer.parse("18").add(Integer.parse("0"))).toEqual({
    digits: new Uint32Array([18]),
    negative: false
  });

  expect(Integer.parse("0").add(Integer.parse("11"))).toEqual({
    digits: new Uint32Array([11]),
    negative: false
  });

  expect(Integer.parse("18").add(Integer.parse("-0"))).toEqual({
    digits: new Uint32Array([18]),
    negative: false
  });

  expect(Integer.parse("-0").add(Integer.parse("11"))).toEqual({
    digits: new Uint32Array([11]),
    negative: false
  });

  expect(Integer.parse("18").add(Integer.parse("11"))).toEqual({
    digits: new Uint32Array([29]),
    negative: false
  });

  expect(Integer.parse(`${2 ** 30}`).add(Integer.parse(`${2 ** 31}`))).toEqual({
    digits: new Uint32Array([3 * 2 ** 30]),
    negative: false
  });
});

it("should add multiple small positive integers correctly", () => {
  expect(
    Integer.parse("18").add(Integer.parse("11")).add(Integer.parse("2003"))
  ).toEqual({ digits: new Uint32Array([2032]), negative: false });

  expect(
    Integer.parse("05").add(Integer.parse("07")).add(Integer.parse("2003"))
  ).toEqual({ digits: new Uint32Array([2015]), negative: false });

  expect(
    Integer.parse("18")
      .add(Integer.parse("11"))
      .add(Integer.parse("2003"))
      .add(Integer.parse("05"))
      .add(Integer.parse("07"))
      .add(Integer.parse("2003"))
  ).toEqual({ digits: new Uint32Array([4047]), negative: false });
});

it("should add two small negative integers correctly", () => {
  expect(Integer.parse("-18").add(Integer.parse("-11"))).toEqual({
    digits: new Uint32Array([29]),
    negative: true
  });

  expect(Integer.parse("-05").add(Integer.parse("-07"))).toEqual({
    digits: new Uint32Array([12]),
    negative: true
  });

  expect(
    Integer.parse(`-${2 ** 30}`).add(Integer.parse(`-${2 ** 31}`))
  ).toEqual({ digits: new Uint32Array([3 * 2 ** 30]), negative: true });
});

it("should add multiple small negative integers correctly", () => {
  expect(
    Integer.parse("-18").add(Integer.parse("-11")).add(Integer.parse("-2003"))
  ).toEqual({ digits: new Uint32Array([2032]), negative: true });

  expect(
    Integer.parse("-05").add(Integer.parse("-07")).add(Integer.parse("-2003"))
  ).toEqual({ digits: new Uint32Array([2015]), negative: true });

  expect(
    Integer.parse("-18")
      .add(Integer.parse("-11"))
      .add(Integer.parse("-2003"))
      .add(Integer.parse("-05"))
      .add(Integer.parse("-07"))
      .add(Integer.parse("-2003"))
  ).toEqual({ digits: new Uint32Array([4047]), negative: true });
});

it("should add two large positive integers correctly", () => {
  expect(
    Integer.parse(`${2n ** 76n}`).add(Integer.parse(`${2n ** 340n}`))
  ).toEqual({
    digits: new Uint32Array([0, 0, 4096, 0, 0, 0, 0, 0, 0, 0, 1048576]),
    negative: false
  });

  expect(
    Integer.parse("78321659017483256987").add(
      Integer.parse("85250259285934732937")
    )
  ).toEqual({
    digits: new Uint32Array([1215429412, 3724816654, 8]),
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
    digits: new Uint32Array([
      219260785, 1130482261, 3718476559, 1521544400, 2426527137, 1342482570,
      1759554429, 452154959, 1525087942, 1116513499, 5367
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
    digits: new Uint32Array([
      3967206986, 4200628871, 4123968884, 2004744291, 639398034, 2079818402,
      3300202435, 2280982367, 1338596419, 2853929768, 2594478126, 615691412,
      3446940090, 1125007689, 3906398993, 68297
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
    digits: new Uint32Array([0, 0, 4096, 0, 0, 64912, 0, 0, 0, 0, 1048576]),
    negative: false
  });

  expect(
    Integer.parse("78321659017483256987")
      .add(Integer.parse("85250259285934732937"))
      .add(Integer.parse("50327966626329420363"))
      .add(Integer.parse("54510035744350657430"))
      .add(Integer.parse("65160031984897674294"))
  ).toEqual({
    digits: new Uint32Array([793707835, 355895453, 18]),
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
    digits: new Uint32Array([
      2096254193, 2841907528, 3455354659, 3228320259, 2696250089, 2899689177,
      1884523250, 2592690077, 2634762986, 1375767273, 8992
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
    digits: new Uint32Array([
      735307800, 404433273, 1182083106, 3515461599, 234689721, 873080677,
      1791117297, 3058979698, 2765831812, 1582256761, 1677311137, 4257020197,
      676520420, 3209189807, 1473221855, 2996673888, 1197986738, 3781673180,
      20011505
    ]),
    negative: false
  });
});

it("should add two large negative integers correctly", () => {
  expect(
    Integer.parse(`-${2n ** 76n}`).add(Integer.parse(`-${2n ** 340n}`))
  ).toEqual({
    digits: new Uint32Array([0, 0, 2 ** 12, 0, 0, 0, 0, 0, 0, 0, 2 ** 20]),
    negative: true
  });

  expect(
    Integer.parse("-78321659017483256987").add(
      Integer.parse("-85250259285934732937")
    )
  ).toEqual({
    digits: new Uint32Array([1215429412, 3724816654, 8]),
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
    digits: new Uint32Array([
      219260785, 1130482261, 3718476559, 1521544400, 2426527137, 1342482570,
      1759554429, 452154959, 1525087942, 1116513499, 5367
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
    digits: new Uint32Array([
      3967206986, 4200628871, 4123968884, 2004744291, 639398034, 2079818402,
      3300202435, 2280982367, 1338596419, 2853929768, 2594478126, 615691412,
      3446940090, 1125007689, 3906398993, 68297
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
    digits: new Uint32Array([0, 0, 2 ** 12, 0, 0, 64912, 0, 0, 0, 0, 2 ** 20]),
    negative: true
  });

  expect(
    Integer.parse("-78321659017483256987")
      .add(Integer.parse("-85250259285934732937"))
      .add(Integer.parse("-50327966626329420363"))
      .add(Integer.parse("-54510035744350657430"))
      .add(Integer.parse("-65160031984897674294"))
  ).toEqual({
    digits: new Uint32Array([793707835, 355895453, 18]),
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
    digits: new Uint32Array([
      2096254193, 2841907528, 3455354659, 3228320259, 2696250089, 2899689177,
      1884523250, 2592690077, 2634762986, 1375767273, 8992
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
    digits: new Uint32Array([
      735307800, 404433273, 1182083106, 3515461599, 234689721, 873080677,
      1791117297, 3058979698, 2765831812, 1582256761, 1677311137, 4257020197,
      676520420, 3209189807, 1473221855, 2996673888, 1197986738, 3781673180,
      20011505
    ]),
    negative: true
  });
});

it("should add two small different sign integers correctly", () => {
  expect(Integer.parse("18112003").add(Integer.parse("-18112003"))).toEqual({
    digits: new Uint32Array([0]),
    negative: false
  });

  expect(Integer.parse("0").add(Integer.parse("-18112003"))).toEqual({
    digits: new Uint32Array([18112003]),
    negative: true
  });

  expect(Integer.parse("-18112003").add(Integer.parse("0"))).toEqual({
    digits: new Uint32Array([18112003]),
    negative: true
  });

  expect(Integer.parse("-05072003").add(Integer.parse("-0"))).toEqual({
    digits: new Uint32Array([5072003]),
    negative: true
  });

  expect(Integer.parse("-0").add(Integer.parse("-05072003"))).toEqual({
    digits: new Uint32Array([5072003]),
    negative: true
  });

  expect(Integer.parse("18112003").add(Integer.parse("-05072003"))).toEqual({
    digits: new Uint32Array([13040000]),
    negative: false
  });

  expect(Integer.parse("05072003").add(Integer.parse("-18112003"))).toEqual({
    digits: new Uint32Array([13040000]),
    negative: true
  });

  expect(
    Integer.parse(`${2 ** 30}`).add(Integer.parse(`${-(2 ** 31)}`))
  ).toEqual({
    digits: new Uint32Array([2 ** 30]),
    negative: true
  });

  expect(
    Integer.parse(`${2 ** 31}`).add(Integer.parse(`${-(2 ** 30)}`))
  ).toEqual({
    digits: new Uint32Array([2 ** 30]),
    negative: false
  });
});

it("should add two large different sign integers correctly", () => {
  expect(
    Integer.parse(`-${2n ** 76n}`).add(Integer.parse(`${2n ** 76n}`))
  ).toEqual({
    digits: new Uint32Array([0]),
    negative: false
  });

  expect(
    Integer.parse(`${-(2n ** 76n)}`).add(Integer.parse(`${2n ** 340n}`))
  ).toEqual({
    digits: new Uint32Array([
      0, 0, 4294963200, 4294967295, 4294967295, 4294967295, 4294967295,
      4294967295, 4294967295, 4294967295, 1048575
    ]),
    negative: false
  });

  expect(
    Integer.parse(`${2n ** 76n}`).add(Integer.parse(`${-(2n ** 340n)}`))
  ).toEqual({
    digits: new Uint32Array([
      0, 0, 4294963200, 4294967295, 4294967295, 4294967295, 4294967295,
      4294967295, 4294967295, 4294967295, 1048575
    ]),
    negative: true
  });

  expect(
    Integer.parse("78321659017483256987").add(
      Integer.parse("-85250259285934732937")
    )
  ).toEqual({
    digits: new Uint32Array([532279790, 1613190460]),
    negative: true
  });

  expect(
    Integer.parse("-78321659017483256987").add(
      Integer.parse("85250259285934732937")
    )
  ).toEqual({
    digits: new Uint32Array([532279790, 1613190460]),
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
    digits: new Uint32Array([
      520333473, 3940146323, 2280371864, 2907682727, 231191909, 629265381,
      727233576, 97371990, 2286334609, 495612124, 476
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
    digits: new Uint32Array([
      520333473, 3940146323, 2280371864, 2907682727, 231191909, 629265381,
      727233576, 97371990, 2286334609, 495612124, 476
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
    digits: new Uint32Array([
      3498841148, 926239997, 1676871269, 3646284905, 3052126673, 277092880,
      2624733907, 3298709991, 1137090602, 2080946734, 2594476252, 615691412,
      3446940090, 1125007689, 3906398993, 68297
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
    digits: new Uint32Array([
      3498841148, 926239997, 1676871269, 3646284905, 3052126673, 277092880,
      2624733907, 3298709991, 1137090602, 2080946734, 2594476252, 615691412,
      3446940090, 1125007689, 3906398993, 68297
    ]),
    negative: true
  });
});
