import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { M2mClientModel } from "@models/m2m-client.model";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { M2mClientsService } from "../../services/m2m-clients.service";

@Component({
  selector: "app-m2m-clients-list",
  templateUrl: "./m2m-clients-list.component.html",
  styleUrls: ["./m2m-clients-list.component.scss"],
  standalone: false,
})
export class M2mClientsListComponent implements OnInit, OnDestroy {
  clients: M2mClientModel[] = [];
  isLoading = true;

  constructor(
    private readonly m2mClientsService: M2mClientsService,
    private readonly alertService: AlertService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  ngOnDestroy(): void {}

  loadClients(): void {
    this.isLoading = true;
    this.m2mClientsService
      .getAll()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (clients) => {
          this.clients = clients;
          this.isLoading = false;
        },
        error: () => {
          this.alertService.error("Failed to load M2M clients");
          this.isLoading = false;
        },
      });
  }

  createClient(): void {
    this.router.navigate(["/admin/m2m-clients/new"]);
  }

  viewClient(client: M2mClientModel): void {
    this.router.navigate(["/admin/m2m-clients", client.id]);
  }

  toggleStatus(client: M2mClientModel): void {
    const action = client.isActive
      ? this.m2mClientsService.deactivate(client.id)
      : this.m2mClientsService.activate(client.id);

    action.pipe(untilDestroyed(this)).subscribe({
      next: () => {
        client.isActive = !client.isActive;
        this.alertService.success(
          `Client ${client.isActive ? "activated" : "deactivated"}`,
        );
      },
      error: (err) =>
        this.alertService.error(err.error?.message || "Action failed"),
    });
  }

  deleteClient(client: M2mClientModel): void {
    if (
      !confirm(
        `Delete M2M client "${client.name}"? This action cannot be undone.`,
      )
    ) {
      return;
    }

    this.m2mClientsService
      .delete(client.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.clients = this.clients.filter((c) => c.id !== client.id);
          this.alertService.success("Client deleted");
        },
        error: (err) =>
          this.alertService.error(err.error?.message || "Delete failed"),
      });
  }
}
