import { Component, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {
  M2mClientCreateResponse,
  M2M_SCOPES,
} from "@models/m2m-client.model";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { M2mClientsService } from "../../services/m2m-clients.service";

@Component({
  selector: "app-m2m-client-create",
  templateUrl: "./m2m-client-create.component.html",
  styleUrls: ["./m2m-client-create.component.scss"],
  standalone: false,
})
export class M2mClientCreateComponent implements OnDestroy {
  form: FormGroup;
  availableScopes = M2M_SCOPES;
  isLoading = false;
  createdClient: M2mClientCreateResponse | null = null;
  secretCopied = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly m2mClientsService: M2mClientsService,
    private readonly alertService: AlertService,
    private readonly router: Router
  ) {
    this.form = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(200)]],
      description: ["", Validators.maxLength(1000)],
      scopes: [[], Validators.required],
      rateLimitPerMinute: [null, [Validators.min(1), Validators.max(10000)]],
      rateLimitPerDay: [null, [Validators.min(1), Validators.max(1000000)]],
    });
  }

  ngOnDestroy(): void {}

  onScopeToggle(scope: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    const currentScopes = this.form.get("scopes")!.value as string[];

    if (checked) {
      this.form.get("scopes")!.setValue([...currentScopes, scope]);
    } else {
      this.form.get("scopes")!.setValue(currentScopes.filter((s) => s !== scope));
    }
  }

  isScopeSelected(scope: string): boolean {
    return (this.form.get("scopes")!.value as string[]).includes(scope);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.m2mClientsService
      .create(this.form.value)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.createdClient = response;
          this.alertService.success("M2M client created successfully");
        },
        error: (err) => {
          this.isLoading = false;
          this.alertService.error(err.error?.message || "Failed to create client");
        },
      });
  }

  copySecret(): void {
    if (this.createdClient) {
      navigator.clipboard.writeText(this.createdClient.clientSecret);
      this.secretCopied = true;
      setTimeout(() => (this.secretCopied = false), 2000);
    }
  }

  goToList(): void {
    this.router.navigate(["/admin/m2m-clients"]);
  }

  goToClient(): void {
    if (this.createdClient) {
      this.router.navigate(["/admin/m2m-clients", this.createdClient.id]);
    }
  }
}
