import { LinkComponent } from "./link.component";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "test-link-host",
  standalone: true,
  imports: [CommonModule, LinkComponent],
  template: `
    <app-link
      [className]="className"
      [variant]="variant"
      [color]="color"
      [underline]="underline"
      [component]="component"
      [href]="href"
      [target]="target"
      [role]="role"
    >
      {{ content }}
    </app-link>
  `,
})
class TestLinkHostComponent {
  variant:
    | "inherit"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption" = "inherit";
  underline: "none" | "hover" | "always" = "hover";
  color:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning" = "primary";
  href: string = "#";
  target: string = "_self";
  role?: string;
  content: string = "Link";
  className: string = "link-class";
  component: string = "a"; // Default to anchor tag
}

describe("Link Component", () => {
  it("renders default link correctly", () => {
    cy.mount(TestLinkHostComponent, {
      componentProperties: {
        content: "Default Link",
      },
    });
    cy.get("a")
      .should("exist")
      .and("have.attr", "href", "#")
      .and("contain.text", "Default Link");
  });

  it("renders as a custom component", () => {
    cy.mount(TestLinkHostComponent, {
      componentProperties: {
        component: "button",
        role: "button",
        content: "Link",
      },
    });
    cy.get("a")
      .should("exist")
      .and("not.have.attr", "href", "#")
      .and("have.attr", "role", "button")
      .and("contain.text", "Link");
  });
});
