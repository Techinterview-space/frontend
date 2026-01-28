import { Component } from "@angular/core";

@Component({
  selector: "app-design-system",
  templateUrl: "./design-system.component.html",
  styleUrls: ["./design-system.component.scss"],
  standalone: false,
})
export class DesignSystemComponent {
  codeExample = `function greet(name: string): string {
  return \`Hello, \${name}!\`;
}`;
}
