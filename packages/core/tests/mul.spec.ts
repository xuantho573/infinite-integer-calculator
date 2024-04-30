import { expect, it } from "vitest";
import { Integer } from "../src/integer";

it("should multiply two small positive integers correctly", () => {
  expect(Integer.parse("0").mul(Integer.parse("0"))).toEqual({
    digits: new Uint32Array([0]),
    negative: false
  });

  expect(Integer.parse("-0").mul(Integer.parse("0"))).toEqual({
    digits: new Uint32Array([0]),
    negative: false
  });

  expect(Integer.parse("0").mul(Integer.parse("-0"))).toEqual({
    digits: new Uint32Array([0]),
    negative: false
  });

  expect(Integer.parse("-0").mul(Integer.parse("-0"))).toEqual({
    digits: new Uint32Array([0]),
    negative: false
  });

  expect(Integer.parse("18").mul(Integer.parse("0"))).toEqual({
    digits: new Uint32Array([0]),
    negative: false
  });

  expect(Integer.parse("0").mul(Integer.parse("11"))).toEqual({
    digits: new Uint32Array([0]),
    negative: false
  });

  expect(Integer.parse("18").mul(Integer.parse("-0"))).toEqual({
    digits: new Uint32Array([0]),
    negative: false
  });

  expect(Integer.parse("-0").mul(Integer.parse("11"))).toEqual({
    digits: new Uint32Array([0]),
    negative: false
  });

  expect(Integer.parse("18").mul(Integer.parse("11"))).toEqual({
    digits: new Uint32Array([198]),
    negative: false
  });

  expect(Integer.parse("11").mul(Integer.parse("18"))).toEqual({
    digits: new Uint32Array([198]),
    negative: false
  });

  expect(Integer.parse(`${2 ** 30}`).mul(Integer.parse(`${2 ** 31}`))).toEqual({
    digits: new Uint32Array([0, 2 ** 29]),
    negative: false
  });

  expect(Integer.parse(`${2 ** 31}`).mul(Integer.parse(`${2 ** 30}`))).toEqual({
    digits: new Uint32Array([0, 2 ** 29]),
    negative: false
  });
});

it("should multiply two small negative integers correctly", () => {
  expect(Integer.parse("-18").mul(Integer.parse("-11"))).toEqual({
    digits: new Uint32Array([198]),
    negative: false
  });

  expect(Integer.parse("-05").mul(Integer.parse("-07"))).toEqual({
    digits: new Uint32Array([35]),
    negative: false
  });

  expect(
    Integer.parse(`-${2 ** 30}`).mul(Integer.parse(`-${2 ** 31}`))
  ).toEqual({
    digits: new Uint32Array([0, 2 ** 29]),
    negative: false
  });

  expect(
    Integer.parse(`-${2 ** 31}`).mul(Integer.parse(`-${2 ** 30}`))
  ).toEqual({
    digits: new Uint32Array([0, 2 ** 29]),
    negative: false
  });
});

it("should multiply two large positive integers correctly", () => {
  expect(
    Integer.parse(`${2n ** 76n}`).mul(Integer.parse(`${2n ** 340n}`))
  ).toEqual({
    digits: new Uint32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]),
    negative: false
  });

  expect(
    Integer.parse("78321659017483256987").mul(
      Integer.parse("85250259285934732937")
    )
  ).toEqual({
    digits: new Uint32Array([
      778201331, 3590185775, 2894594215, 2670474244, 19
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
    digits: new Uint32Array([
      820722344, 484574046, 3354378088, 4080220678, 1595431319, 4149578013,
      3899153413, 1473883865, 2241047578, 969820436, 658116215, 465669652,
      666558595, 1384793983, 3172696170, 949661335, 3128706758, 135654673,
      776834415, 1712207566, 7145198
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
    digits: new Uint32Array([
      212158421, 2067594408, 1631621007, 2967018581, 1013871850, 3540769630,
      2896856124, 2706279794, 1508766822, 761347073, 3947275763, 1408622291,
      1327034229, 1434917399, 1433769485, 844231308, 3869138296, 3187485559,
      514451263, 2878756793, 668143114, 4213423210, 1984018297, 215227702,
      677382824, 64001287
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
    digits: new Uint32Array([
      2174036276, 2104666059, 2498389441, 1202846322, 1340744145, 1242409416,
      3157109218, 4054174589, 2003431879, 4008291282, 1262078785, 878242308,
      74055091, 1478638995, 3638547992, 1751478687, 791067578, 1694668920,
      1951720098, 2398782458, 2078493292, 2575711446, 3153466203, 1524266153,
      3660134566, 2373440323, 3983989714, 2326184301, 103948648, 1060231770,
      677904937, 1242297309, 3300688419, 4291114426, 13523980, 2326159986,
      3454349916, 1236072008, 1463316279, 2201233176, 307541658, 2736762703,
      3399493204, 35520995, 3417223143, 3847865090, 861084
    ]),
    negative: false
  });
});

it("should multiply two large negative integers correctly", () => {
  expect(
    Integer.parse(`-${2n ** 340n}`).mul(Integer.parse(`-${2n ** 76n}`))
  ).toEqual({
    digits: new Uint32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]),
    negative: false
  });

  expect(
    Integer.parse("-78321659017483256987").mul(
      Integer.parse("-85250259285934732937")
    )
  ).toEqual({
    digits: new Uint32Array([
      778201331, 3590185775, 2894594215, 2670474244, 19
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
    digits: new Uint32Array([
      820722344, 484574046, 3354378088, 4080220678, 1595431319, 4149578013,
      3899153413, 1473883865, 2241047578, 969820436, 658116215, 465669652,
      666558595, 1384793983, 3172696170, 949661335, 3128706758, 135654673,
      776834415, 1712207566, 7145198
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
    digits: new Uint32Array([
      212158421, 2067594408, 1631621007, 2967018581, 1013871850, 3540769630,
      2896856124, 2706279794, 1508766822, 761347073, 3947275763, 1408622291,
      1327034229, 1434917399, 1433769485, 844231308, 3869138296, 3187485559,
      514451263, 2878756793, 668143114, 4213423210, 1984018297, 215227702,
      677382824, 64001287
    ]),
    negative: false
  });
});

it("should multiply two small different sign integers correctly", () => {
  expect(Integer.parse("0").mul(Integer.parse("-18112003"))).toEqual({
    digits: new Uint32Array([0]),
    negative: false
  });

  expect(Integer.parse("-18112003").mul(Integer.parse("0"))).toEqual({
    digits: new Uint32Array([0]),
    negative: false
  });

  expect(Integer.parse("-05072003").mul(Integer.parse("-0"))).toEqual({
    digits: new Uint32Array([0]),
    negative: false
  });

  expect(Integer.parse("-0").mul(Integer.parse("-05072003"))).toEqual({
    digits: new Uint32Array([0]),
    negative: false
  });

  expect(Integer.parse("18112003").mul(Integer.parse("-05072003"))).toEqual({
    digits: new Uint32Array([3373025161, 21388]),
    negative: true
  });

  expect(Integer.parse("05072003").mul(Integer.parse("-18112003"))).toEqual({
    digits: new Uint32Array([3373025161, 21388]),
    negative: true
  });

  expect(Integer.parse(`${2 ** 30}`).mul(Integer.parse(`-${2 ** 31}`))).toEqual(
    {
      digits: new Uint32Array([0, 2 ** 29]),
      negative: true
    }
  );

  expect(Integer.parse(`${2 ** 31}`).mul(Integer.parse(`-${2 ** 30}`))).toEqual(
    {
      digits: new Uint32Array([0, 2 ** 29]),
      negative: true
    }
  );

  expect(Integer.parse(`-${2 ** 31}`).mul(Integer.parse(`${2 ** 30}`))).toEqual(
    {
      digits: new Uint32Array([0, 2 ** 29]),
      negative: true
    }
  );
});

it("should multiply two large different sign integers correctly", () => {
  expect(
    Integer.parse(`-${2n ** 76n}`).mul(Integer.parse(`${2n ** 340n}`))
  ).toEqual({
    digits: new Uint32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]),
    negative: true
  });

  expect(
    Integer.parse(`${2n ** 76n}`).mul(Integer.parse(`-${2n ** 340n}`))
  ).toEqual({
    digits: new Uint32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]),
    negative: true
  });

  expect(
    Integer.parse("78321659017483256987").mul(
      Integer.parse("-85250259285934732937")
    )
  ).toEqual({
    digits: new Uint32Array([
      778201331, 3590185775, 2894594215, 2670474244, 19
    ]),
    negative: true
  });

  expect(
    Integer.parse("-78321659017483256987").mul(
      Integer.parse("85250259285934732937")
    )
  ).toEqual({
    digits: new Uint32Array([
      778201331, 3590185775, 2894594215, 2670474244, 19
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
    digits: new Uint32Array([
      820722344, 484574046, 3354378088, 4080220678, 1595431319, 4149578013,
      3899153413, 1473883865, 2241047578, 969820436, 658116215, 465669652,
      666558595, 1384793983, 3172696170, 949661335, 3128706758, 135654673,
      776834415, 1712207566, 7145198
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
    digits: new Uint32Array([
      820722344, 484574046, 3354378088, 4080220678, 1595431319, 4149578013,
      3899153413, 1473883865, 2241047578, 969820436, 658116215, 465669652,
      666558595, 1384793983, 3172696170, 949661335, 3128706758, 135654673,
      776834415, 1712207566, 7145198
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
    digits: new Uint32Array([
      212158421, 2067594408, 1631621007, 2967018581, 1013871850, 3540769630,
      2896856124, 2706279794, 1508766822, 761347073, 3947275763, 1408622291,
      1327034229, 1434917399, 1433769485, 844231308, 3869138296, 3187485559,
      514451263, 2878756793, 668143114, 4213423210, 1984018297, 215227702,
      677382824, 64001287
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
    digits: new Uint32Array([
      212158421, 2067594408, 1631621007, 2967018581, 1013871850, 3540769630,
      2896856124, 2706279794, 1508766822, 761347073, 3947275763, 1408622291,
      1327034229, 1434917399, 1433769485, 844231308, 3869138296, 3187485559,
      514451263, 2878756793, 668143114, 4213423210, 1984018297, 215227702,
      677382824, 64001287
    ]),
    negative: true
  });
});
