import { CardComponent } from "./card.component";
import { CommonModule } from "@angular/common";

describe("CardComponent", () => {
  it("mounts", () => {
    cy.mount(CardComponent, {
      imports: [CommonModule],
    });
    cy.get("div").should("exist");
  });

  it("renders card with title and subtitle", () => {
    cy.mount(CardComponent, {
      imports: [CommonModule],
      componentProperties: {
        title: "Test Title",
        subtitle: "Test Subtitle",
      },
    });

    cy.get("div").should("contain.text", "Test Title");
    cy.get("div").should("contain.text", "Test Subtitle");
  });

  it("applies the correct variant styles", () => {
    // Test basic variant
    cy.mount(CardComponent, {
      imports: [CommonModule],
      componentProperties: {
        variant: "basic",
      },
    });
    cy.get("div").should("have.class", "bg-white");

    // Test bordered variant
    cy.mount(CardComponent, {
      imports: [CommonModule],
      componentProperties: {
        variant: "bordered",
      },
    });
    cy.get("div").should("have.class", "border");

    // Test elevated variant
    cy.mount(CardComponent, {
      imports: [CommonModule],
      componentProperties: {
        variant: "elevated",
      },
    });
    cy.get("div").should("have.class", "shadow-lg");
  });

  it("renders image at specified position", () => {
    // Test top image
    cy.mount(CardComponent, {
      imports: [CommonModule],
      componentProperties: {
        imagePosition: "top",
        imageUrl: "https://example.com/image.jpg",
        imageAlt: "Test image",
      },
    });

    cy.get("img").should("have.attr", "src", "https://example.com/image.jpg");
    cy.get("img").should("have.attr", "alt", "Test image");

    // Test with different image position
    cy.mount(CardComponent, {
      imports: [CommonModule],
      componentProperties: {
        imagePosition: "left",
        imageUrl: "https://example.com/image.jpg",
      },
    });

    // Check the containerClasses directly instead of trying to find a div with "flex" text content
    cy.get('[class*="flex"]').should("exist");
  });

  it("renders content correctly", () => {
    // Using HTML string mounting to test content projection
    cy.mount(
      `
      <app-card title="Card Title">
        <p>Test content</p>
      </app-card>
    `,
      {
        imports: [CommonModule, CardComponent],
      },
    );

    cy.get("div").should("contain.text", "Test content");
  });
});
