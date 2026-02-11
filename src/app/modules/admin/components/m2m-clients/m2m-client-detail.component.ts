import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  M2mClientModel,
  M2M_SCOPES,
  M2mTokenResponse,
} from "@models/m2m-client.model";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { M2mClientsService } from "../../services/m2m-clients.service";

@Component({
  selector: "app-m2m-client-detail",
  templateUrl: "./m2m-client-detail.component.html",
  styleUrls: ["./m2m-client-detail.component.scss"],
  standalone: false,
})
export class M2mClientDetailComponent implements OnInit, OnDestroy {
  client: M2mClientModel | null = null;
  isLoading = true;
  isEditing = false;
  editForm: FormGroup;
  availableScopes = M2M_SCOPES;
  newSecret: string | null = null;
  secretCopied = false;
  generatedToken: M2mTokenResponse | null = null;
  tokenCopied = false;
  showTokenModal = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly m2mClientsService: M2mClientsService,
    private readonly alertService: AlertService,
  ) {
    this.editForm = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(200)]],
      description: ["", Validators.maxLength(1000)],
      rateLimitPerMinute: [null],
      rateLimitPerDay: [null],
    });
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.params["id"];
    this.loadClient(id);
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnDestroy(): void {
    // Required for untilDestroyed
  }

  loadClient(id: number): void {
    this.isLoading = true;
    this.m2mClientsService
      .getById(id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (client) => {
          this.client = client;
          this.editForm.patchValue(client);
          this.isLoading = false;
        },
        error: () => {
          this.alertService.error("Failed to load client");
          this.router.navigate(["/admin/m2m-clients"]);
        },
      });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (this.isEditing && this.client) {
      this.editForm.patchValue(this.client);
    }
  }

  saveChanges(): void {
    if (this.editForm.invalid || !this.client) {
      return;
    }

    this.m2mClientsService
      .update(this.client.id, this.editForm.value)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (updated) => {
          this.client = updated;
          this.isEditing = false;
          this.alertService.success("Client updated");
        },
        error: (err) =>
          this.alertService.error(err.error?.message || "Update failed"),
      });
  }

  toggleScope(scope: string): void {
    if (!this.client) {
      return;
    }

    const currentScopes = [...this.client.scopes];
    const index = currentScopes.indexOf(scope);

    if (index > -1) {
      currentScopes.splice(index, 1);
    } else {
      currentScopes.push(scope);
    }

    this.m2mClientsService
      .updateScopes(this.client.id, currentScopes)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (updated) => {
          this.client = updated;
          this.alertService.success("Scopes updated");
        },
        error: (err) =>
          this.alertService.error(
            err.error?.message || "Failed to update scopes",
          ),
      });
  }

  regenerateSecret(): void {
    if (!this.client) {
      return;
    }

    if (
      !confirm(
        "Regenerate client secret? The old secret will stop working immediately.",
      )
    ) {
      return;
    }

    this.m2mClientsService
      .regenerateSecret(this.client.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (response) => {
          this.newSecret = response.clientSecret;
          this.alertService.success("Secret regenerated");
        },
        error: (err) =>
          this.alertService.error(
            err.error?.message || "Failed to regenerate secret",
          ),
      });
  }

  copySecret(): void {
    if (this.newSecret) {
      navigator.clipboard.writeText(this.newSecret);
      this.secretCopied = true;
      setTimeout(() => (this.secretCopied = false), 2000);
    }
  }

  dismissSecret(): void {
    this.newSecret = null;
  }

  generateToken(): void {
    if (!this.client) {
      return;
    }

    this.m2mClientsService
      .generateToken(this.client.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (response) => {
          this.generatedToken = response;
          this.showTokenModal = true;
        },
        error: (err) =>
          this.alertService.error(
            err.error?.message || "Failed to generate token",
          ),
      });
  }

  copyToken(): void {
    if (this.generatedToken) {
      navigator.clipboard.writeText(this.generatedToken.accessToken);
      this.tokenCopied = true;
      setTimeout(() => (this.tokenCopied = false), 2000);
    }
  }

  closeTokenModal(): void {
    this.showTokenModal = false;
    this.generatedToken = null;
    this.tokenCopied = false;
  }

  toggleStatus(): void {
    if (!this.client) {
      return;
    }

    const action = this.client.isActive
      ? this.m2mClientsService.deactivate(this.client.id)
      : this.m2mClientsService.activate(this.client.id);

    action.pipe(untilDestroyed(this)).subscribe({
      next: () => {
        this.client!.isActive = !this.client!.isActive;
        this.alertService.success(
          `Client ${this.client!.isActive ? "activated" : "deactivated"}`,
        );
      },
      error: (err) =>
        this.alertService.error(err.error?.message || "Action failed"),
    });
  }

  deleteClient(): void {
    if (!this.client) {
      return;
    }

    if (!confirm(`Delete "${this.client.name}"? This cannot be undone.`)) {
      return;
    }

    this.m2mClientsService
      .delete(this.client.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.alertService.success("Client deleted");
          this.router.navigate(["/admin/m2m-clients"]);
        },
        error: (err) =>
          this.alertService.error(err.error?.message || "Delete failed"),
      });
  }
}
