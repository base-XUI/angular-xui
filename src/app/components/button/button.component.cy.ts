import { ButtonComponent } from "./button.component";
import { CommonModule } from "@angular/common";
import { EventEmitter } from "@angular/core";

describe("ButtonComponent", () => {
  it("mounts", () => {
    // Using string-based mounting for content projection
    cy.mount(`<app-button>Click Me</app-button>`, {
      imports: [CommonModule, ButtonComponent],
    });
    cy.get("button").should("be.visible");
    cy.get("button").should("contain.text", "Click Me");
  });

  it("applies correct class variants", () => {
    cy.mount(ButtonComponent, {
      componentProperties: {
        variant: "primary",
        size: "medium",
      },
      imports: [CommonModule],
    });
    // Primary button should have the primary color class
    cy.get("button").should("have.class", "bg-blue-600");

    // Update variant to secondary
    cy.mount(ButtonComponent, {
      componentProperties: {
        variant: "secondary",
        size: "medium",
      },
      imports: [CommonModule],
    });
    // Secondary button should have the secondary color class
    cy.get("button").should("have.class", "bg-gray-600");
  });

  it("emits click events", () => {
    const onClickSpy = cy.spy().as("onClickSpy");
    // Create a proper EventEmitter with the spy
    const clickedEmitter = new EventEmitter<void>();
    // Replace the emit method with our spy
    clickedEmitter.emit = onClickSpy;

    cy.mount(ButtonComponent, {
      componentProperties: {
        variant: "primary",
        size: "medium",
        clicked: clickedEmitter,
      },
      imports: [CommonModule],
    });
    cy.get("button").click();
    cy.get("@onClickSpy").should("have.been.called");
  });

  it("supports different sizes", () => {
    // Test small size
    cy.mount(ButtonComponent, {
      componentProperties: {
        variant: "primary",
        size: "small",
      },
      imports: [CommonModule],
    });
    cy.get("button").should("have.class", "text-sm");

    // Test large size
    cy.mount(ButtonComponent, {
      componentProperties: {
        variant: "primary",
        size: "large",
      },
      imports: [CommonModule],
    });
    cy.get("button").should("have.class", "text-lg");
  });

  it("renders icons correctly", () => {
    // Using string-based mounting for icon testing
    cy.mount(
      `<app-button iconLeft="←" iconRight="→">Button with icons</app-button>`,
      {
        imports: [CommonModule, ButtonComponent],
      },
    );

    cy.get(".icon-left").should("contain", "←");
    cy.get(".icon-right").should("contain", "→");
  });

  it("can be disabled", () => {
    cy.mount(ButtonComponent, {
      componentProperties: {
        variant: "primary",
        size: "medium",
        disabled: true,
      },
      imports: [CommonModule],
    });

    cy.get("button").should("be.disabled");
  });
});
