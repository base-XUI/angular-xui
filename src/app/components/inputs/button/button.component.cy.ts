import { ButtonComponent } from "./button.component";
import { CommonModule } from "@angular/common";
import { Component, TemplateRef, ViewChild } from "@angular/core";

// Helper component to provide template refs for testing
@Component({
  selector: "test-button-host",
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <ng-template #startIconTpl>
      <span data-testid="start-icon">→</span>
    </ng-template>

    <ng-template #endIconTpl>
      <span data-testid="end-icon">←</span>
    </ng-template>

    <ng-template #customLoaderTpl>
      <span data-testid="custom-loader">Loading...</span>
    </ng-template>

    <app-button
      [variant]="variant"
      [color]="color"
      [size]="size"
      [disabled]="disabled"
      [loading]="loading"
      [loadingPosition]="loadingPosition"
      [fullWidth]="fullWidth"
      [disableElevation]="disableElevation"
      [component]="component"
      [href]="href"
      [target]="target"
      [type]="type"
      [role]="role"
      [startIcon]="startIcon ? startIconTpl : null"
      [endIcon]="endIcon ? endIconTpl : null"
      [customLoadingIndicator]="customLoadingIndicator ? customLoaderTpl : null"
      (clicked)="onClick()"
    >
      {{ content }}
    </app-button>
  `,
})
class TestButtonHostComponent {
  @ViewChild("startIconTpl") startIconTpl!: TemplateRef<unknown>;
  @ViewChild("endIconTpl") endIconTpl!: TemplateRef<unknown>;
  @ViewChild("customLoaderTpl") customLoaderTpl!: TemplateRef<unknown>;

  variant: "text" | "contained" | "outlined" = "contained";
  color:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning" = "primary";
  size: "small" | "medium" | "large" = "medium";
  disabled: boolean = false;
  loading: boolean = false;
  loadingPosition: "start" | "center" | "end" = "center";
  fullWidth: boolean = false;
  disableElevation: boolean = false;
  component: string = "button";
  href?: string;
  target?: string;
  type: "button" | "submit" | "reset" = "button";
  role?: string;
  content: string = "Button Text";
  startIcon: boolean = false;
  endIcon: boolean = false;
  customLoadingIndicator: boolean = false;

  onClick = cy.stub().as("onClickStub");
}

describe("Button Component", () => {
  it("renders default button correctly", () => {
    cy.mount(TestButtonHostComponent, {
      componentProperties: {
        content: "Click me",
      },
    });
    cy.get("button").should("exist").and("contain.text", "Click me");
  });

  it("renders with different variants", () => {
    // Test outlined variant
    cy.mount(TestButtonHostComponent, {
      componentProperties: {
        variant: "outlined",
        content: "Outlined",
      },
    });
    cy.get("button").should("have.class", "border");

    // Test text variant with explicitly setting color to inherit
    // to avoid color settings overriding variant styling
    cy.mount(TestButtonHostComponent, {
      componentProperties: {
        variant: "text",
        color: "inherit",
        content: "Text Button",
      },
    });
    cy.get("button")
      .should("not.have.class", "bg-primary")
      .and("have.class", "bg-transparent");
  });

  it("renders with different colors", () => {
    cy.mount(TestButtonHostComponent, {
      componentProperties: {
        color: "primary",
        content: "Primary",
      },
    });
    cy.get("button").should("exist");

    cy.mount(TestButtonHostComponent, {
      componentProperties: {
        color: "secondary",
        content: "Secondary",
      },
    });
    cy.get("button").should("exist");

    cy.mount(TestButtonHostComponent, {
      componentProperties: {
        color: "error",
        content: "Error",
      },
    });
    cy.get("button").should("exist");
  });

  it("renders with different sizes", () => {
    cy.mount(TestButtonHostComponent, {
      componentProperties: {
        size: "small",
        content: "Small",
      },
    });
    cy.get("button").should("have.class", "h-8").and("have.class", "px-3");

    cy.mount(TestButtonHostComponent, {
      componentProperties: {
        size: "large",
        content: "Large",
      },
    });
    cy.get("button").should("have.class", "h-12").and("have.class", "px-6");
  });

  it("renders as a full width button", () => {
    cy.mount(TestButtonHostComponent, {
      componentProperties: {
        fullWidth: true,
        content: "Full Width",
      },
    });
    cy.get("button").should("have.class", "w-full");
  });

  it("disables the button when disabled prop is true", () => {
    cy.mount(TestButtonHostComponent, {
      componentProperties: {
        disabled: true,
        content: "Disabled",
      },
    });
    cy.get("button").should("be.disabled");
  });

  it("shows loading state", () => {
    cy.mount(TestButtonHostComponent, {
      componentProperties: {
        loading: true,
        content: "Loading",
        loadingPosition: "center",
      },
    });
    // Check for the loading spinner character
    cy.get("button").find(".animate-spin").should("exist");

    // Button should be disabled during loading state
    cy.get("button").should("be.disabled");

    // Button should still be visible
    cy.get("button").should("be.visible");
  });

  it("renders with loading at different positions", () => {
    cy.mount(TestButtonHostComponent, {
      componentProperties: {
        loading: true,
        loadingPosition: "start",
        content: "Start",
      },
    });
    cy.get("button .mr-2").should("exist");

    cy.mount(TestButtonHostComponent, {
      componentProperties: {
        loading: true,
        loadingPosition: "end",
        content: "End",
      },
    });
    cy.get("button .ml-2").should("exist");
  });

  it("renders with custom loading indicator", () => {
    cy.mount(TestButtonHostComponent, {
      componentProperties: {
        loading: true,
        customLoadingIndicator: true,
        content: "Custom Loader",
      },
    });
    cy.get('[data-testid="custom-loader"]').should("exist");
  });

  it("renders with start icon", () => {
    cy.mount(TestButtonHostComponent, {
      componentProperties: {
        startIcon: true,
        content: "With Start Icon",
      },
    });
    cy.get('[data-testid="start-icon"]').should("exist");
    cy.get("button").contains("With Start Icon");
  });

  it("renders with end icon", () => {
    cy.mount(TestButtonHostComponent, {
      componentProperties: {
        endIcon: true,
        content: "With End Icon",
      },
    });
    cy.get('[data-testid="end-icon"]').should("exist");
    cy.get("button").contains("With End Icon");
  });

  it("renders as a custom element type", () => {
    cy.mount(TestButtonHostComponent, {
      componentProperties: {
        component: "a",
        href: "#test",
        content: "Link Button",
      },
    });
    cy.get("a")
      .should("have.attr", "href", "#test")
      .and("contain.text", "Link Button");
  });

  it("emits clicked event when clicked", () => {
    cy.mount(TestButtonHostComponent, {
      componentProperties: {
        content: "Clickable Button",
      },
    });
    cy.get("button").click();
    cy.get("@onClickStub").should("have.been.calledOnce");
  });

  it("does not emit clicked event when disabled", () => {
    cy.mount(TestButtonHostComponent, {
      componentProperties: {
        disabled: true,
        content: "Disabled Button",
      },
    });
    cy.get("button").click({ force: true });
    cy.get("@onClickStub").should("not.have.been.called");
  });

  it("does not emit clicked event when loading", () => {
    cy.mount(TestButtonHostComponent, {
      componentProperties: {
        loading: true,
        content: "Loading Button",
      },
    });
    cy.get("button").click({ force: true });
    cy.get("@onClickStub").should("not.have.been.called");
  });
});
