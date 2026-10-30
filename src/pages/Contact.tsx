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
import { useLocation } from "react-router-dom";
import { CONTACT_GUEST_LIMIT } from "@/lib/contactForm";

type PopupState = {
  variant: FormStatusVariant;
  title: string;
  message: string;
  details?: string[];
};

const FIELD_CLASS = "flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-base sm:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const FIELD_ERROR_CLASS = "border-red-400 bg-red-50 focus-visible:ring-red-400";
const TEXTAREA_CLASS = "w-full resize-y rounded-xl border border-input bg-background px-3 py-2 text-base sm:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function ViberMark() {
  return <img src="/brand/viber-logo.svg" alt="Viber" className="h-7 w-7 object-contain" />;
}

function WhatsAppMark() {
  return <img src="/brand/whatsapp-logo.svg" alt="WhatsApp" className="h-7 w-7 object-contain" />;
}

export default function Contact() {
  const isEnglish = useLocation().pathname.startsWith("/en");
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
        title: isEnglish ? "The form is not active yet" : "Forma još nije aktivna",
        message: isEnglish
          ? `Online inquiries are not available right now. Call us at ${SITE.phone} or message us on Viber/WhatsApp.`
          : `Online upit trenutno nije u funkciji. Pozovite nas na ${SITE.phone} ili nam pišite na Viber/WhatsApp.`,
      });
      return;
    }

    const form = event.currentTarget;
    const problems = validateContactForm(readContactFormValues(form), today);

    if (problems.length > 0) {
      setInvalidFields(problems.map((problem) => problem.field));
      setPopup({
        variant: "error",
        title: isEnglish ? "Please check your details" : "Proverite unete podatke",
        message:
          isEnglish
            ? problems.length === 1 ? "One field is missing or invalid:" : "The following details are missing or invalid:"
            : problems.length === 1 ? "Jedno polje nedostaje ili nije ispravno:" : "Nedostaju ili nisu ispravni sledeći podaci:",
        details: problems.map((problem) => isEnglish
          ? ({
              ime_prezime: "Enter your first and last name.",
              telefon: "Enter a valid phone number.",
              datum_dolaska: problem.message.includes("prošlosti") ? "Arrival date cannot be in the past." : "Select an arrival date.",
              datum_odlaska: problem.message.includes("posle") ? "Departure date must be after the arrival date." : "Select a departure date.",
              broj_gostiju: `The apartment accommodates ${CONTACT_GUEST_LIMIT.min} to ${CONTACT_GUEST_LIMIT.max} guests.`,
              napomena: "",
            }[problem.field])
          : problem.message),
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
          title: isEnglish ? "Your inquiry was not sent" : "Upit nije poslat",
          message:
            serverErrors.length > 0
              ? isEnglish ? "The service reported the following errors:" : "Servis je prijavio sledeće greške:"
              : isEnglish ? `There was a problem sending your inquiry. Please try again or call ${SITE.phone}.` : `Došlo je do greške pri slanju. Pokušajte ponovo ili nas pozovite na ${SITE.phone}.`,
          details: serverErrors,
        });
        return;
      }

      form.reset();
      setArrivalDate("");
      setPopup({
        variant: "success",
        title: isEnglish ? "Your inquiry was sent!" : "Upit je uspešno poslat!",
        message: isEnglish
          ? `Thank you for getting in touch. We will check availability and reply with the price. For a quicker response, call ${SITE.phone}.`
          : `Hvala na poverenju. Proveravamo dostupnost i javljamo vam se sa cenom. Za brži odgovor pozovite ${SITE.phone}.`,
      });
    } catch {
      setPopup({
        variant: "error",
        title: isEnglish ? "Connection error" : "Greška u povezivanju",
        message: isEnglish
          ? `Please check your internet connection and try again, or call us at ${SITE.phone}.`
          : `Proverite internet konekciju i pokušajte ponovo ili nas pozovite na ${SITE.phone}.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <Seo
        title={isEnglish ? "Contact and bookings | Apartman Dragićević Bogatić" : pageSeo.contact.title}
        description={isEnglish ? "Contact Apartman Dragićević in Bogatić to make a booking, check availability, get directions or call us directly." : pageSeo.contact.description}
        path={isEnglish ? "/en/contact/" : pageSeo.contact.path}
        htmlLang={isEnglish ? "en" : "sr"}
        schema={baseSchemas}
      />
      <section className="container pb-12 pt-36">
        <SectionHeading
          as="h1"
          eyebrow={isEnglish ? "Contact" : "Rezervacija"}
          title={isEnglish ? <>A quick inquiry about your <em className="italic text-accent">stay</em></> : <>Brz upit za vaš <em className="italic text-accent">boravak</em></>}
          subtitle={isEnglish ? "Send us your arrival details or contact us directly on Viber or WhatsApp. We will get back to you as soon as possible." : "Pošaljite nam detalje dolaska ili se javite direktno preko Vibera i WhatsAppa. Odgovaramo u najkraćem roku."}
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
            <span className="min-w-0">
              <div className="text-sm opacity-90">{isEnglish ? "Call now" : "Pozovite odmah"}</div>
              <div className="font-display text-2xl md:text-3xl">{SITE.phone}</div>
            </span>
          </a>

          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href={SITE.viberHref}
              aria-label={isEnglish ? `Send a Viber message to ${SITE.phone}` : `Pošaljite Viber poruku na broj ${SITE.phone}`}
              className="flex items-center gap-4 rounded-3xl bg-[#665cac] p-6 text-white shadow-card transition-transform hover:-translate-y-0.5 hover:shadow-glow"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15" aria-hidden="true">
                <ViberMark />
              </span>
              <span>
                <div className="text-sm text-white/75">{isEnglish ? "Message us on" : "Pišite nam na"}</div>
                <div className="font-display text-xl">Viber</div>
              </span>
            </a>
            <a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={isEnglish ? `Send a WhatsApp message to ${SITE.phone}` : `Pošaljite WhatsApp poruku na broj ${SITE.phone}`}
              className="flex items-center gap-4 rounded-3xl bg-[#25d366] p-6 text-[#073b20] shadow-card transition-transform hover:-translate-y-0.5 hover:shadow-glow"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/30" aria-hidden="true">
                <WhatsAppMark />
              </span>
              <span>
                <div className="text-sm text-[#073b20]/70">{isEnglish ? "Message us on" : "Pišite nam na"}</div>
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
            <span className="min-w-0">
              <div className="text-sm text-muted-foreground">Email</div>
              <div className="whitespace-nowrap font-display text-sm sm:text-xl">{SITE.email}</div>
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
            <span className="min-w-0">
              <div className="text-sm text-muted-foreground">{isEnglish ? "Address" : "Adresa"}</div>
              <div className="font-display text-xl">{SITE.address}</div>
            </span>
          </a>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-4 rounded-3xl border border-border bg-card p-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent">
                <LogIn className="h-5 w-5" />
              </span>
              <span>
                <div className="text-sm text-muted-foreground">{isEnglish ? "Check-in" : "Prijava (check-in)"}</div>
                <div className="font-display text-xl">{isEnglish ? "from 14:00" : "od 14:00h"}</div>
              </span>
            </div>
            <div className="flex items-center gap-4 rounded-3xl border border-border bg-card p-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent">
                <LogOut className="h-5 w-5" />
              </span>
              <span>
                <div className="text-sm text-muted-foreground">{isEnglish ? "Check-out" : "Odjava (check-out)"}</div>
                <div className="font-display text-xl">{isEnglish ? "by 11:00" : "do 11:00h"}</div>
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
                <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">{isEnglish ? "Booking" : "Rezervacija"}</div>
                <h2 className="font-display text-3xl">{isEnglish ? "Check availability and rates" : "Proverite dostupnost i cenu"}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{isEnglish ? "Leave your details and we will get back to you." : "Ostavite podatke, a mi vam se javljamo sa informacijama."}</p>
              </div>
              <CalendarDays className="mt-1 hidden h-7 w-7 shrink-0 text-accent sm:block" aria-hidden="true" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium">
                {isEnglish ? "Full name" : "Ime i prezime"} <span className="text-accent" aria-hidden="true">*</span>
                <input name="ime_prezime" type="text" required autoComplete="name" placeholder={isEnglish ? "Your full name" : "Vaše ime i prezime"} aria-invalid={invalidFields.includes("ime_prezime") || undefined} onChange={() => clearFieldError("ime_prezime")} className={fieldClass("ime_prezime")} />
              </label>
              <label className="space-y-2 text-sm font-medium">
                {isEnglish ? "Phone number" : "Broj telefona"} <span className="text-accent" aria-hidden="true">*</span>
                <input name="telefon" type="tel" required autoComplete="tel" placeholder="+381 6x xxx xxxx" aria-invalid={invalidFields.includes("telefon") || undefined} onChange={() => clearFieldError("telefon")} className={fieldClass("telefon")} />
              </label>
              <label className="space-y-2 text-sm font-medium">
                {isEnglish ? "Arrival date" : "Datum dolaska"} <span className="text-accent" aria-hidden="true">*</span>
                <input name="datum_dolaska" type="date" min={today} required value={arrivalDate} aria-invalid={invalidFields.includes("datum_dolaska") || undefined} onChange={(event) => { setArrivalDate(event.target.value); clearFieldError("datum_dolaska"); }} className={fieldClass("datum_dolaska")} />
              </label>
              <label className="space-y-2 text-sm font-medium">
                {isEnglish ? "Departure date" : "Datum odlaska"} <span className="text-accent" aria-hidden="true">*</span>
                <input name="datum_odlaska" type="date" min={arrivalDate || today} required aria-invalid={invalidFields.includes("datum_odlaska") || undefined} onChange={() => clearFieldError("datum_odlaska")} className={fieldClass("datum_odlaska")} />
              </label>
              <label className="space-y-2 text-sm font-medium sm:col-span-2">
                {isEnglish ? "Number of guests" : "Broj gostiju"} <span className="text-accent" aria-hidden="true">*</span>
                <input name="broj_gostiju" type="number" min="1" max="4" required placeholder="1-4" aria-invalid={invalidFields.includes("broj_gostiju") || undefined} onChange={() => clearFieldError("broj_gostiju")} className={fieldClass("broj_gostiju")} />
              </label>
              <label className="space-y-2 text-sm font-medium sm:col-span-2">
                {isEnglish ? "Message" : "Napomena"} <span className="font-normal text-muted-foreground">({isEnglish ? "optional" : "opciono"})</span>
                <textarea name="napomena" rows={4} placeholder={isEnglish ? "Let us know if you have a question or special request." : "Napišite nam ako imate dodatno pitanje ili posebnu napomenu."} className={TEXTAREA_CLASS} />
              </label>
            </div>

            <input type="hidden" name="_subject" value={`Novi upit za Apartman Dragićević - ${SITE.phone}`} />
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <button type="submit" disabled={!isFormEnabled || isSubmitting} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60">
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
              {isSubmitting ? (isEnglish ? "Sending inquiry..." : "Šaljem upit...") : (isEnglish ? "Check availability and rates" : "Proveri dostupnost i cenu")}
            </button>
            {!isFormEnabled && <p className="mt-4 text-center text-xs text-muted-foreground">{isEnglish ? "The form will be available once the Formspree endpoint is configured." : "Forma će biti aktivna čim se podesi Formspree endpoint."}</p>}
          </form>
        </div>
      </section>

      <section className="container pb-24">
        <div className="reveal relative h-[420px] overflow-hidden rounded-3xl border border-border shadow-soft md:h-[520px]">
          <iframe
            title={isEnglish ? "Map - Pavla Orlovića 11, Bogatić" : "Mapa - Pavla Orlovića 11, Bogatić"}
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
