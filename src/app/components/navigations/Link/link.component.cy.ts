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
  // Test with text decoration class
  it("renders with different text decorations", () => {
    // Test always underline
    cy.mount(TestLinkHostComponent, {
      componentProperties: {
        underline: "always",
      },
    });
    cy.get("a").should("have.class", "underline");
    // Test hover underline

    cy.mount(TestLinkHostComponent, {
      componentProperties: {
        underline: "hover",
      },
    });
    cy.get("a").should("have.class", "hover:underline");
    // Test non underline

    cy.mount(TestLinkHostComponent, {
      componentProperties: {
        underline: "none",
      },
    });
    cy.get("a").should("have.class", "no-underline");
  });
  // Test color of link
  it("renders with different colors", () => {
    cy.mount(TestLinkHostComponent, {
      componentProperties: {
        color: "inherit",
      },
    });
    cy.get("a").should("exist");

    //primary color
    cy.mount(TestLinkHostComponent, {
      componentProperties: {
        color: "primary",
      },
    });
    cy.get("a").should("exist");

    //secondary color
    cy.mount(TestLinkHostComponent, {
      componentProperties: {
        color: "secondary",
      },
    });
    cy.get("a").should("exist");
    //warning color
    cy.mount(TestLinkHostComponent, {
      componentProperties: {
        color: "warning",
      },
    });
    cy.get("a").should("exist");
  });
  //test render as custom component
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
