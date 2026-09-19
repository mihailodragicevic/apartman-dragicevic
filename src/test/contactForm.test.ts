import { describe, expect, it } from "vitest";
import {
  extractFormspreeErrors,
  readContactFormValues,
  validateContactForm,
  type ContactFormValues,
} from "@/lib/contactForm";

const TODAY = "2026-09-20";

function values(overrides: Partial<ContactFormValues> = {}): ContactFormValues {
  return {
    ime_prezime: "Marko Marković",
    telefon: "+381 65 8103247",
    datum_dolaska: "2026-10-01",
    datum_odlaska: "2026-10-05",
    broj_gostiju: "2",
    napomena: "",
    ...overrides,
  };
}

describe("validateContactForm", () => {
  it("ne prijavljuje probleme za ispravno popunjenu formu", () => {
    expect(validateContactForm(values(), TODAY)).toEqual([]);
  });

  it("prijavljuje prazna obavezna polja", () => {
    const problems = validateContactForm(values({ ime_prezime: "", telefon: "", broj_gostiju: "" }), TODAY);
    expect(problems.map((problem) => problem.field)).toEqual(["ime_prezime", "telefon", "broj_gostiju"]);
  });

  it("odbija datum dolaska u prošlosti", () => {
    const problems = validateContactForm(values({ datum_dolaska: "2026-09-01", datum_odlaska: "2026-09-10" }), TODAY);
    expect(problems).toEqual([{ field: "datum_dolaska", message: "Datum dolaska ne može biti u prošlosti." }]);
  });

  it("odbija odlazak pre dolaska", () => {
    const problems = validateContactForm(values({ datum_odlaska: "2026-09-30" }), TODAY);
    expect(problems.map((problem) => problem.field)).toEqual(["datum_odlaska"]);
  });

  it("ograničava broj gostiju na 1-4", () => {
    expect(validateContactForm(values({ broj_gostiju: "5" }), TODAY).map((problem) => problem.field)).toEqual(["broj_gostiju"]);
    expect(validateContactForm(values({ broj_gostiju: "0" }), TODAY).map((problem) => problem.field)).toEqual(["broj_gostiju"]);
    expect(validateContactForm(values({ broj_gostiju: "abc" }), TODAY).map((problem) => problem.field)).toEqual(["broj_gostiju"]);
  });

  it("prijavljuje neispravan broj telefona", () => {
    expect(validateContactForm(values({ telefon: "065" }), TODAY).map((problem) => problem.field)).toEqual(["telefon"]);
  });

  it("prijavljuje sva nedostajuća polja odjednom", () => {
    const problems = validateContactForm(
      { ime_prezime: "", telefon: "", datum_dolaska: "", datum_odlaska: "", broj_gostiju: "", napomena: "" },
      TODAY
    );
    expect(problems.map((problem) => problem.field)).toEqual([
      "ime_prezime",
      "telefon",
      "datum_dolaska",
      "datum_odlaska",
      "broj_gostiju",
    ]);
  });
});

describe("readContactFormValues", () => {
  it("čita i trimuje vrednosti iz forme", () => {
    const form = document.createElement("form");
    form.innerHTML = `<input name="ime_prezime" value="  Ana Anić  " /><input name="telefon" value="+381 60 123 4567" /><input name="datum_dolaska" value="2026-10-01" /><input name="datum_odlaska" value="2026-10-03" /><input name="broj_gostiju" value="3" /><textarea name="napomena">  Dolazim uveče  </textarea>`;

    expect(readContactFormValues(form)).toEqual({
      ime_prezime: "Ana Anić",
      telefon: "+381 60 123 4567",
      datum_dolaska: "2026-10-01",
      datum_odlaska: "2026-10-03",
      broj_gostiju: "3",
      napomena: "Dolazim uveče",
    });
  });

  it("vraća prazne stringove kada polja ne postoje", () => {
    expect(readContactFormValues(document.createElement("form"))).toEqual({
      ime_prezime: "",
      telefon: "",
      datum_dolaska: "",
      datum_odlaska: "",
      broj_gostiju: "",
      napomena: "",
    });
  });
});

describe("extractFormspreeErrors", () => {
  it("izvlači tekstualne poruke iz Formspree odgovora", () => {
    expect(
      extractFormspreeErrors({ errors: [{ message: "Email je obavezan." }, { code: "TYPE_EMAIL" }, { message: "   " }] })
    ).toEqual(["Email je obavezan."]);
  });

  it("vraća prazan niz za neočekivane odgovore", () => {
    expect(extractFormspreeErrors(null)).toEqual([]);
    expect(extractFormspreeErrors("greska")).toEqual([]);
    expect(extractFormspreeErrors({ ok: true })).toEqual([]);
  });
});
