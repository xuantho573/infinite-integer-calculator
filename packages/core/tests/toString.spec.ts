import { expect, it } from "vitest";
import { Integer } from "../src/integer";

it("should convert a positive integer to string correctly", () => {
  expect(Integer.parse("0").toString()).toEqual("0");

  expect(Integer.parse("-0").toString()).toEqual("0");

  expect(Integer.parse("1180591620734591172608").toString()).toEqual(
    "1180591620734591172608"
  );

  expect(
    Integer.parse(
      "6442585908744959041428585141967522936341963350668298478001513160373576906996563805678545031066369850650189799354843132484229408819230536483421928167588380162050765875808203588929922509571608308141850588264818176700201089400268627667874838999226369294"
    ).toString()
  ).toEqual(
    "6442585908744959041428585141967522936341963350668298478001513160373576906996563805678545031066369850650189799354843132484229408819230536483421928167588380162050765875808203588929922509571608308141850588264818176700201089400268627667874838999226369294"
  );
});

it("should convert a negative integer to string correctly", () => {
  expect(Integer.parse("-1180591620734591172608").toString()).toEqual(
    "-1180591620734591172608"
  );

  expect(
    Integer.parse(
      "-6442585908744959041428585141967522936341963350668298478001513160373576906996563805678545031066369850650189799354843132484229408819230536483421928167588380162050765875808203588929922509571608308141850588264818176700201089400268627667874838999226369294"
    ).toString()
  ).toEqual(
    "-6442585908744959041428585141967522936341963350668298478001513160373576906996563805678545031066369850650189799354843132484229408819230536483421928167588380162050765875808203588929922509571608308141850588264818176700201089400268627667874838999226369294"
  );
});

it("should convert the result of an addition to string correctly", () => {
  expect(
    Integer.parse("-1180591620734591172608")
      .add(Integer.parse("12346541304550"))
      .toString()
  ).toEqual("-1180591608388049868058");

  expect(
    Integer.parse(
      "6442585908744959041428585141967522936341963350668298478001513160373576906996563805678545031066369850650189799354843132484229408819230536483421928167588380162050765875808203588929922509571608308141850588264818176700201089400268627667874838999226369294"
    )
      .add(
        Integer.parse(
          "8021402658433364137162706425920853749388710612292128760206823424024557607130073800624354290475325312185757352138658777157298636535975652348982366317925786841681594460929706691356137011408100089598309341831051549156697029059066254012038787600281325075"
        )
      )
      .toString()
  ).toEqual(
    "14463988567178323178591291567888376685730673962960427238208336584398134514126637606302899321541695162835947151493501909641528045355206188832404294485514167003732360336737910280286059520979708397740159930095869725856898118459334881679913626599507694369"
  );
});

it("should convert the result of a subtraction to string correctly", () => {
  expect(
    Integer.parse("-1180591620734591172608")
      .sub(Integer.parse("12346541304550"))
      .toString()
  ).toEqual("-1180591633081132477158");

  expect(
    Integer.parse(
      "6442585908744959041428585141967522936341963350668298478001513160373576906996563805678545031066369850650189799354843132484229408819230536483421928167588380162050765875808203588929922509571608308141850588264818176700201089400268627667874838999226369294"
    )
      .sub(
        Integer.parse(
          "8021402658433364137162706425920853749388710612292128760206823424024557607130073800624354290475325312185757352138658777157298636535975652348982366317925786841681594460929706691356137011408100089598309341831051549156697029059066254012038787600281325075"
        )
      )
      .toString()
  ).toEqual(
    "-1578816749688405095734121283953330813046747261623830282205310263650980700133509994945809259408955461535567552783815644673069227716745115865560438150337406679630828585121503102426214501836491781456458753566233372456495939658797626344163948601054955781"
  );
});

it("should convert the result of a multiplication to string correctly", () => {
  expect(
    Integer.parse("-1180591620734591172608")
      .mul(Integer.parse("12346541304550"))
      .toString()
  ).toEqual("-14576223209205258125562490545766400");

  expect(
    Integer.parse(
      "6442585908744959041428585141967522936341963350668298478001513160373576906996563805678545031066369850650189799354843132484229408819230536483421928167588380162050765875808203588929922509571608308141850588264818176700201089400268627667874838999226369294"
    )
      .mul(
        Integer.parse(
          "8021402658433364137162706425920853749388710612292128760206823424024557607130073800624354290475325312185757352138658777157298636535975652348982366317925786841681594460929706691356137011408100089598309341831051549156697029059066254012038787600281325075"
        )
      )
      .toString()
  ).toEqual(
    "51678575735592145582456255029946589790658108590066322253907136305332997209984809205365792435982434783746649526505475619520993409273085926966747376798504498103229897983276179558506577493661843113370536093395412556355368499125185017576661797401015009875549299110794965927547913928159881899819888747796750548250651790471863014136573213965323565422738219583461524374493108176516180871678276249083385423874304862768453569020300086195793234218411140900003588518957368791678865011899464421698237683612247050"
  );
});