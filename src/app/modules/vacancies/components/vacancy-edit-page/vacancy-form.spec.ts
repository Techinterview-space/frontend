import { Vacancy, VacancyStatus } from "@models/vacancy.model";
import { VacancyForm } from "./vacancy-form";

describe("VacancyForm", () => {
  it("returns null and marks controls touched when invalid", () => {
    const form = new VacancyForm(null);

    expect(form.requestOrNull()).toBeNull();
    expect(form.get("title")!.touched).toBeTrue();
    expect(form.get("companyId")!.touched).toBeTrue();
  });

  it("defaults a new form to Draft status", () => {
    const form = new VacancyForm(null);

    expect(form.get("status")!.value).toBe(VacancyStatus.Draft);
  });

  it("trims the title and converts a blank hrContact to null", () => {
    const form = new VacancyForm(null);
    form.patchValue({
      title: "  Senior Engineer  ",
      companyId: "company-1",
      hrContact: "   ",
      description: "desc",
      status: VacancyStatus.Public,
    });

    const request = form.requestOrNull();

    expect(request).not.toBeNull();
    expect(request!.title).toBe("Senior Engineer");
    expect(request!.hrContact).toBeNull();
    expect(request!.companyId).toBe("company-1");
    expect(request!.status).toBe(VacancyStatus.Public);
  });

  it("keeps a trimmed hrContact and a null description when provided", () => {
    const form = new VacancyForm(null);
    form.patchValue({
      title: "Title",
      companyId: "c1",
      hrContact: "  hr@example.com  ",
      description: null,
      status: VacancyStatus.Draft,
    });

    const request = form.requestOrNull();

    expect(request!.hrContact).toBe("hr@example.com");
    expect(request!.description).toBeNull();
  });

  it("pre-fills from an existing vacancy", () => {
    const vacancy = {
      id: "v1",
      title: "Existing",
      hrContact: "x",
      description: "d",
      status: VacancyStatus.Closed,
      companyId: "c1",
    } as Vacancy;

    const form = new VacancyForm(vacancy);

    expect(form.value.title).toBe("Existing");
    expect(form.value.companyId).toBe("c1");
    expect(form.value.status).toBe(VacancyStatus.Closed);
  });

  it("is valid with a free-text company name and no linked company", () => {
    const form = new VacancyForm(null);
    form.patchValue({
      title: "Title",
      companyId: null,
      companyName: "NDA",
      status: VacancyStatus.Draft,
    });

    const request = form.requestOrNull();

    expect(request).not.toBeNull();
    expect(request!.companyId).toBeNull();
    expect(request!.companyName).toBe("NDA");
    expect(request!.hideAttachedCompany).toBeFalse();
  });

  it("is invalid when neither a company nor a name is provided", () => {
    const form = new VacancyForm(null);
    form.patchValue({
      title: "Title",
      companyId: null,
      companyName: "",
      status: VacancyStatus.Draft,
    });

    expect(form.requestOrNull()).toBeNull();
    expect(form.errors?.["companyRequired"]).toBeTrue();
  });

  it("is invalid when hiding the company without a linked company", () => {
    const form = new VacancyForm(null);
    form.patchValue({
      title: "Title",
      companyId: null,
      companyName: "NDA",
      hideAttachedCompany: true,
      status: VacancyStatus.Draft,
    });

    expect(form.requestOrNull()).toBeNull();
    expect(form.errors?.["hideWithoutCompany"]).toBeTrue();
  });

  it("carries the hideAttachedCompany flag into the request", () => {
    const form = new VacancyForm(null);
    form.patchValue({
      title: "Title",
      companyId: "c1",
      companyName: "NDA",
      hideAttachedCompany: true,
      status: VacancyStatus.Public,
    });

    const request = form.requestOrNull();

    expect(request).not.toBeNull();
    expect(request!.companyId).toBe("c1");
    expect(request!.companyName).toBe("NDA");
    expect(request!.hideAttachedCompany).toBeTrue();
  });
});
