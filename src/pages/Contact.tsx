import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { SITE } from "@/lib/site";
import { FormEvent, useCallback, useState } from "react";
import { CalendarDays, Loader2, LogIn, LogOut, Mail, MapPin, Phone, Send } from "lucide-react";
import Seo from "@/components/Seo";
import { baseSchemas, pageSeo } from "@/lib/seo";
import FormStatusPopup, { type FormStatusVariant } from "@/components/FormStatusPopup";
import { extractFormspreeErrors, readContactFormValues, validateContactForm } from "@/lib/contactForm";
import { cn } from "@/lib/utils";

type PopupState = {
  variant: FormStatusVariant;
  title: string;
  message: string;
  details?: string[];
};

const FIELD_CLASS = "flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const FIELD_ERROR_CLASS = "border-red-400 bg-red-50 focus-visible:ring-red-400";
const TEXTAREA_CLASS = "w-full resize-y rounded-xl border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function ViberMark() {
  return <img src="/brand/viber-logo.svg" alt="Viber" className="h-7 w-7 object-contain" />;
}

function WhatsAppMark() {
  return <img src="/brand/whatsapp-logo.svg" alt="WhatsApp" className="h-7 w-7 object-contain" />;
}

export default function Contact() {
  const [popup, setPopup] = useState<PopupState | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const [arrivalDate, setArrivalDate] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const isFormEnabled = !SITE.formspreeEndpoint.includes("REPLACE_WITH_FORM_ID");
  const closePopup = useCallback(() => setPopup(null), []);

  const clearFieldError = (field: string) => {
    setInvalidFields((current) => (current.includes(field) ? current.filter((item) => item !== field) : current));
  };

  const fieldClass = (field: string) => cn(FIELD_CLASS, invalidFields.includes(field) && FIELD_ERROR_CLASS);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormEnabled) {
      setPopup({
        variant: "error",
        title: "Forma još nije aktivna",
        message: `Online upit trenutno nije u funkciji. Pozovite nas na ${SITE.phone} ili nam pišite na Viber/WhatsApp.`,
      });
      return;
    }

    const form = event.currentTarget;
    const problems = validateContactForm(readContactFormValues(form), today);

    if (problems.length > 0) {
      setInvalidFields(problems.map((problem) => problem.field));
      setPopup({
        variant: "error",
        title: "Proverite unete podatke",
        message:
          problems.length === 1
            ? "Jedno polje nedostaje ili nije ispravno:"
            : "Nedostaju ili nisu ispravni sledeći podaci:",
        details: problems.map((problem) => problem.message),
      });

      const firstInvalid = form.elements.namedItem(problems[0].field);
      if (firstInvalid instanceof HTMLElement) firstInvalid.focus();
      return;
    }

    setInvalidFields([]);
    setIsSubmitting(true);

    try {
      const response = await fetch(SITE.formspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        const serverErrors = extractFormspreeErrors(payload);
        setPopup({
          variant: "error",
          title: "Upit nije poslat",
          message:
            serverErrors.length > 0
              ? "Servis je prijavio sledeće greške:"
              : `Došlo je do greške pri slanju. Pokušajte ponovo ili nas pozovite na ${SITE.phone}.`,
          details: serverErrors,
        });
        return;
      }

      form.reset();
      setArrivalDate("");
      setPopup({
        variant: "success",
        title: "Upit je uspešno poslat!",
        message: `Hvala na poverenju. Proveravamo dostupnost i javljamo vam se sa cenom. Za brži odgovor pozovite ${SITE.phone}.`,
      });
    } catch {
      setPopup({
        variant: "error",
        title: "Greška u povezivanju",
        message: `Proverite internet konekciju i pokušajte ponovo ili nas pozovite na ${SITE.phone}.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <Seo {...pageSeo.contact} schema={baseSchemas} />
      <section className="container pb-12 pt-36">
        <SectionHeading
          as="h1"
          eyebrow="Kontakt"
          title={<>Brz upit za vaš <em className="italic text-accent">boravak</em></>}
          subtitle="Pošaljite nam detalje dolaska ili se javite direktno preko Vibera i WhatsAppa. Odgovaramo u najkraćem roku."
        />
      </section>

      <section className="container grid gap-8 pb-24 lg:grid-cols-2">
        <div className="reveal space-y-4">
          <a
            href={SITE.phoneHref}
            className="flex items-center gap-5 rounded-3xl bg-gradient-accent p-7 text-accent-foreground shadow-glow transition-transform hover:-translate-y-0.5"
          >
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent-foreground/15">
              <Phone className="h-6 w-6" />
            </span>
            <span>
              <div className="text-sm opacity-90">Pozovite odmah</div>
              <div className="font-display text-2xl md:text-3xl">{SITE.phone}</div>
            </span>
          </a>

          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href={SITE.viberHref}
              aria-label={`Pošaljite Viber poruku na broj ${SITE.phone}`}
              className="flex items-center gap-4 rounded-3xl bg-[#665cac] p-6 text-white shadow-card transition-transform hover:-translate-y-0.5 hover:shadow-glow"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15" aria-hidden="true">
                <ViberMark />
              </span>
              <span>
                <div className="text-sm text-white/75">Pišite nam na</div>
                <div className="font-display text-xl">Viber</div>
              </span>
            </a>
            <a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Pošaljite WhatsApp poruku na broj ${SITE.phone}`}
              className="flex items-center gap-4 rounded-3xl bg-[#25d366] p-6 text-[#073b20] shadow-card transition-transform hover:-translate-y-0.5 hover:shadow-glow"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/30" aria-hidden="true">
                <WhatsAppMark />
              </span>
              <span>
                <div className="text-sm text-[#073b20]/70">Pišite nam na</div>
                <div className="font-display text-xl">WhatsApp</div>
              </span>
            </a>
          </div>

          <a
            href={SITE.emailHref}
            className="flex items-center gap-5 rounded-3xl border border-border bg-card p-7 transition-colors hover:bg-secondary"
          >
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent-soft text-accent">
              <Mail className="h-6 w-6" />
            </span>
            <span>
              <div className="text-sm text-muted-foreground">Email</div>
              <div className="font-display text-xl">{SITE.email}</div>
            </span>
          </a>

          <a
            href={SITE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-5 rounded-3xl border border-border bg-card p-7 transition-colors hover:bg-secondary"
          >
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent-soft text-accent">
              <MapPin className="h-6 w-6" />
            </span>
            <span>
              <div className="text-sm text-muted-foreground">Adresa</div>
              <div className="font-display text-xl">{SITE.address}</div>
            </span>
          </a>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-4 rounded-3xl border border-border bg-card p-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent">
                <LogIn className="h-5 w-5" />
              </span>
              <span>
                <div className="text-sm text-muted-foreground">Prijava (check-in)</div>
                <div className="font-display text-xl">od 14:00h</div>
              </span>
            </div>
            <div className="flex items-center gap-4 rounded-3xl border border-border bg-card p-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent">
                <LogOut className="h-5 w-5" />
              </span>
              <span>
                <div className="text-sm text-muted-foreground">Odjava (check-out)</div>
                <div className="font-display text-xl">do 11:00h</div>
              </span>
            </div>
          </div>
        </div>

        <div className="reveal space-y-8">
          <form
            action={SITE.formspreeEndpoint}
            method="POST"
            noValidate
            aria-busy={isSubmitting}
            onSubmit={handleSubmit}
            className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">Rezervacija</div>
                <h2 className="font-display text-3xl">Proverite dostupnost i cenu</h2>
                <p className="mt-2 text-sm text-muted-foreground">Ostavite podatke, a mi vam se javljamo sa informacijama.</p>
              </div>
              <CalendarDays className="mt-1 hidden h-7 w-7 shrink-0 text-accent sm:block" aria-hidden="true" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium">
                Ime i prezime <span className="text-accent" aria-hidden="true">*</span>
                <input name="ime_prezime" type="text" required autoComplete="name" placeholder="Vaše ime i prezime" aria-invalid={invalidFields.includes("ime_prezime") || undefined} onChange={() => clearFieldError("ime_prezime")} className={fieldClass("ime_prezime")} />
              </label>
              <label className="space-y-2 text-sm font-medium">
                Broj telefona <span className="text-accent" aria-hidden="true">*</span>
                <input name="telefon" type="tel" required autoComplete="tel" placeholder="+381 6x xxx xxxx" aria-invalid={invalidFields.includes("telefon") || undefined} onChange={() => clearFieldError("telefon")} className={fieldClass("telefon")} />
              </label>
              <label className="space-y-2 text-sm font-medium">
                Datum dolaska <span className="text-accent" aria-hidden="true">*</span>
                <input name="datum_dolaska" type="date" min={today} required value={arrivalDate} aria-invalid={invalidFields.includes("datum_dolaska") || undefined} onChange={(event) => { setArrivalDate(event.target.value); clearFieldError("datum_dolaska"); }} className={fieldClass("datum_dolaska")} />
              </label>
              <label className="space-y-2 text-sm font-medium">
                Datum odlaska <span className="text-accent" aria-hidden="true">*</span>
                <input name="datum_odlaska" type="date" min={arrivalDate || today} required aria-invalid={invalidFields.includes("datum_odlaska") || undefined} onChange={() => clearFieldError("datum_odlaska")} className={fieldClass("datum_odlaska")} />
              </label>
              <label className="space-y-2 text-sm font-medium sm:col-span-2">
                Broj gostiju <span className="text-accent" aria-hidden="true">*</span>
                <input name="broj_gostiju" type="number" min="1" max="4" required placeholder="1-4" aria-invalid={invalidFields.includes("broj_gostiju") || undefined} onChange={() => clearFieldError("broj_gostiju")} className={fieldClass("broj_gostiju")} />
              </label>
              <label className="space-y-2 text-sm font-medium sm:col-span-2">
                Napomena <span className="font-normal text-muted-foreground">(opciono)</span>
                <textarea name="napomena" rows={4} placeholder="Napišite nam ako imate dodatno pitanje ili posebnu napomenu." className={TEXTAREA_CLASS} />
              </label>
            </div>

            <input type="hidden" name="_subject" value={`Novi upit za Apartman Dragićević - ${SITE.phone}`} />
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <button type="submit" disabled={!isFormEnabled || isSubmitting} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60">
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
              {isSubmitting ? "Šaljem upit..." : "Proveri dostupnost i cenu"}
            </button>
            {!isFormEnabled && <p className="mt-4 text-center text-xs text-muted-foreground">Forma će biti aktivna čim se podesi Formspree endpoint.</p>}
          </form>
        </div>
      </section>

      <section className="container pb-24">
        <div className="reveal relative h-[420px] overflow-hidden rounded-3xl border border-border shadow-soft md:h-[520px]">
          <iframe
            title="Mapa - Pavla Orlovića 11, Bogatić"
            src="https://www.google.com/maps?q=Pavla+Orlovi%C4%87a+11+Bogati%C4%87&output=embed"
            className="absolute inset-0 block h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {popup && (
        <FormStatusPopup
          variant={popup.variant}
          title={popup.title}
          message={popup.message}
          details={popup.details}
          onClose={closePopup}
        />
      )}
    </Layout>
  );
}
