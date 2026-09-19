import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Contact from "@/pages/Contact";

const FUTURE_ARRIVAL = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
const FUTURE_DEPARTURE = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

function renderContact() {
  return render(
    <MemoryRouter initialEntries={["/kontakt"]}>
      <Contact />
    </MemoryRouter>
  );
}

function fillField(container: HTMLElement, name: string, value: string) {
  const field = container.querySelector(`[name="${name}"]`);
  if (!field) throw new Error(`Polje ${name} nije pronadjeno`);
  fireEvent.change(field, { target: { value } });
  return field as HTMLInputElement | HTMLTextAreaElement;
}

function fillValidForm(container: HTMLElement) {
  fillField(container, "ime_prezime", "Marko Marković");
  fillField(container, "telefon", "+381 65 8103247");
  fillField(container, "datum_dolaska", FUTURE_ARRIVAL);
  fillField(container, "datum_odlaska", FUTURE_DEPARTURE);
  fillField(container, "broj_gostiju", "2");
}

function submitForm(container: HTMLElement) {
  const form = container.querySelector("form");
  if (!form) throw new Error("Forma nije pronadjena");
  fireEvent.submit(form);
  return form;
}

describe("Kontakt forma - popup nakon slanja", () => {
  beforeEach(() => {
    vi.stubGlobal("scrollTo", () => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("prikazuje crveni popup kada obavezna polja nisu popunjena i ne salje zahtev", () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    const { container } = renderContact();

    submitForm(container);

    const popup = screen.getByRole("alert");
    expect(popup).toHaveTextContent("Proverite unete podatke");
    expect(popup).toHaveTextContent("Unesite ime i prezime.");
    expect(popup).toHaveTextContent("Izaberite datum dolaska.");
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("prikazuje zeleni popup kada je upit uspesno poslat i resetuje formu", async () => {
    const fetchSpy = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });
    vi.stubGlobal("fetch", fetchSpy);
    const { container } = renderContact();

    fillValidForm(container);
    const form = submitForm(container);

    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Upit je uspešno poslat!"));

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const [url, options] = fetchSpy.mock.calls[0];
    expect(url).toContain("formspree.io");
    expect(options.method).toBe("POST");
    expect(options.headers).toEqual({ Accept: "application/json" });
    expect(options.body).toBeInstanceOf(FormData);
    expect((form.querySelector('[name="ime_prezime"]') as HTMLInputElement).value).toBe("");
  });

  it("prikazuje crveni popup kada servis vrati gresku", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, json: async () => ({ errors: [{ message: "Forma je istekla." }] }) })
    );
    const { container } = renderContact();

    fillValidForm(container);
    submitForm(container);

    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("Upit nije poslat"));
    expect(screen.getByRole("alert")).toHaveTextContent("Forma je istekla.");
  });

  it("prikazuje crveni popup kada nema internet konekcije", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));
    const { container } = renderContact();

    fillValidForm(container);
    submitForm(container);

    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("Greška u povezivanju"));
  });

  it("zatvara popup na klik na dugme za zatvaranje", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) }));
    const { container } = renderContact();

    fillValidForm(container);
    submitForm(container);

    await waitFor(() => expect(screen.getByRole("status")).toBeInTheDocument());
    fireEvent.click(screen.getByRole("button", { name: "Zatvori obaveštenje" }));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
