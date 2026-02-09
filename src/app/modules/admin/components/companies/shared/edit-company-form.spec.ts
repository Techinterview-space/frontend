import { EditCompanyForm } from "./edit-company-form";
import { Company } from "@models/companies.model";

describe("EditCompanyForm", () => {
  describe("creation mode (null company)", () => {
    it("should create form with empty values", () => {
      const form = new EditCompanyForm(null);
      expect(form).toBeTruthy();
      expect(form.value.name).toBeNull();
      expect(form.value.slug).toBeNull();
    });

    it("should have slug as optional", () => {
      const form = new EditCompanyForm(null);
      form.patchValue({
        name: "Test Company",
        description: "Description",
      });
      expect(form.get("slug")!.valid).toBeTruthy();
    });

    it("should be valid without slug", () => {
      const form = new EditCompanyForm(null);
      form.patchValue({
        name: "Test Company",
        description: "Description",
      });
      expect(form.get("name")!.valid).toBeTruthy();
      expect(form.get("description")!.valid).toBeTruthy();
      expect(form.get("slug")!.valid).toBeTruthy();
    });

    it("should include slug in editRequestOrNull when provided", () => {
      const form = new EditCompanyForm(null);
      form.patchValue({
        name: "Test Company",
        description: "Description",
        slug: "my-custom-slug",
      });

      const result = form.editRequestOrNull();

      expect(result).toBeTruthy();
      expect(result!.slug).toBe("my-custom-slug");
    });

    it("should return slug as undefined in editRequestOrNull when not provided", () => {
      const form = new EditCompanyForm(null);
      form.patchValue({
        name: "Test Company",
        description: "Description",
      });

      const result = form.editRequestOrNull();

      expect(result).toBeTruthy();
      expect(result!.slug).toBeUndefined();
    });

    it("should trim slug value", () => {
      const form = new EditCompanyForm(null);
      form.patchValue({
        name: "Test Company",
        description: "Description",
        slug: "  my-slug  ",
      });

      const result = form.editRequestOrNull();

      expect(result).toBeTruthy();
      expect(result!.slug).toBe("my-slug");
    });
  });

  describe("edit mode (existing company)", () => {
    const mockCompany: Company = {
      id: "123",
      name: "Existing Company",
      description: "Existing description",
      links: ["https://example.com"],
      logoUrl: "https://example.com/logo.png",
      slug: "existing-slug",
      rating: 4.5,
      reviewsCount: 10,
      viewsCount: 100,
    } as Company;

    it("should create form with company values", () => {
      const form = new EditCompanyForm(mockCompany);
      expect(form.value.name).toBe("Existing Company");
      expect(form.value.slug).toBe("existing-slug");
    });

    it("should have slug as required", () => {
      const form = new EditCompanyForm(mockCompany);
      form.patchValue({ slug: "" });
      expect(form.get("slug")!.valid).toBeFalsy();
    });

    it("should include slug in editRequestOrNull", () => {
      const form = new EditCompanyForm(mockCompany);

      const result = form.editRequestOrNull();

      expect(result).toBeTruthy();
      expect(result!.slug).toBe("existing-slug");
    });

    it("should return null when form is invalid", () => {
      const form = new EditCompanyForm(mockCompany);
      form.patchValue({ name: "" });

      const result = form.editRequestOrNull();

      expect(result).toBeNull();
    });
  });
});
