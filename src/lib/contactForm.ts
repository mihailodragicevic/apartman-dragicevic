export const CONTACT_FIELD_NAMES = [
  "ime_prezime",
  "telefon",
  "datum_dolaska",
  "datum_odlaska",
  "broj_gostiju",
  "napomena",
] as const;

export type ContactFieldName = (typeof CONTACT_FIELD_NAMES)[number];

export type ContactFormValues = Record<ContactFieldName, string>;

export type ContactFormProblem = {
  field: ContactFieldName;
  message: string;
};

export const CONTACT_GUEST_LIMIT = { min: 1, max: 4 } as const;

/** Trimovane vrednosti svih polja kontakt forme. */
export function readContactFormValues(form: HTMLFormElement): ContactFormValues {
  const values = {} as ContactFormValues;

  CONTACT_FIELD_NAMES.forEach((name) => {
    const field = form.elements.namedItem(name);
    const isTextField = field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement;
    values[name] = isTextField ? field.value.trim() : "";
  });

  return values;
}

/** Validacija kontakt forme - vraca listu problema koji se prikazuju u crvenom popupu. */
export function validateContactForm(values: ContactFormValues, today: string): ContactFormProblem[] {
  const problems: ContactFormProblem[] = [];

  if (values.ime_prezime.length < 2) {
    problems.push({ field: "ime_prezime", message: "Unesite ime i prezime." });
  }

  if (values.telefon.replace(/\D/g, "").length < 6) {
    problems.push({ field: "telefon", message: "Unesite ispravan broj telefona." });
  }

  if (!values.datum_dolaska) {
    problems.push({ field: "datum_dolaska", message: "Izaberite datum dolaska." });
  } else if (today && values.datum_dolaska < today) {
    problems.push({ field: "datum_dolaska", message: "Datum dolaska ne može biti u prošlosti." });
  }

  if (!values.datum_odlaska) {
    problems.push({ field: "datum_odlaska", message: "Izaberite datum odlaska." });
  } else if (values.datum_dolaska && values.datum_odlaska < values.datum_dolaska) {
    problems.push({ field: "datum_odlaska", message: "Datum odlaska mora biti posle datuma dolaska." });
  }

  if (!values.broj_gostiju) {
    problems.push({ field: "broj_gostiju", message: "Unesite broj gostiju." });
  } else {
    const guests = Number(values.broj_gostiju);
    if (!Number.isFinite(guests) || guests < CONTACT_GUEST_LIMIT.min || guests > CONTACT_GUEST_LIMIT.max) {
      problems.push({
        field: "broj_gostiju",
        message: `Apartman prima od ${CONTACT_GUEST_LIMIT.min} do ${CONTACT_GUEST_LIMIT.max} osobe.`,
      });
    }
  }

  return problems;
}

/** Izvlaci tekstualne poruke gresaka iz Formspree JSON odgovora. */
export function extractFormspreeErrors(payload: unknown): string[] {
  if (!payload || typeof payload !== "object") return [];

  const errors = (payload as { errors?: unknown }).errors;
  if (!Array.isArray(errors)) return [];

  return errors
    .map((error) => (error && typeof error === "object" ? (error as { message?: unknown }).message : null))
    .filter((message): message is string => typeof message === "string" && message.trim().length > 0);
}
