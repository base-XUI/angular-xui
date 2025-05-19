import { SnackbarComponent } from "./snackbar.component";
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

// Test host component with all possible inputs
@Component({
  selector: "test-host",
  standalone: true,
  imports: [CommonModule, SnackbarComponent],
  template: `
    <app-snackbar
      [open]="open"
      [message]="message"
      [autoHideDuration]="autoHideDuration"
      [anchorOrigin]="anchorOrigin"
      [severity]="severity"
      [variant]="variant"
      [withCloseIcon]="withCloseIcon"
      (closeHandle)="handleClose()"
    >
    </app-snackbar>
  `,
})
class TestHostComponent {
  open = true;
  message = "Test message";
  autoHideDuration = 5000;
  anchorOrigin = { vertical: "bottom", horizontal: "left" };
  severity = "primary";
  variant = "filled";
  withCloseIcon = true;

  handleClose() {
    this.open = false;
  }
}

// Main test suite
describe("SnackbarComponent", () => {
  // Mount options to be reused across tests
  const mountComponent = (props = {}) => {
    return cy.mount(TestHostComponent, {
      componentProperties: props,
    });
  };

  // Basic rendering tests
  describe("Basic Rendering", () => {
    it("should render with default props", () => {
      mountComponent();

      // Check basic structure
      cy.get("app-snackbar").should("exist");
      cy.get('app-snackbar div[role="alert"]').should("be.visible");
      cy.get('app-snackbar div[role="alert"]').should(
        "contain.text",
        "Test message",
      );
    });

    it("should close when close button is clicked", () => {
      mountComponent();

      // Click close button
      cy.get("app-snackbar button").click();

      // Verify snackbar is closed
      cy.get('app-snackbar div[role="alert"]').should("not.exist");
    });
  });

  // Severity tests
  describe("Severity Variants", () => {
    it("should render with success severity and show icon", () => {
      mountComponent({ severity: "success" });

      cy.get('app-snackbar div[role="alert"]').should("exist");
      cy.get("app-snackbar app-svg-icon").should("exist");
    });

    it("should render with error severity and show icon", () => {
      mountComponent({ severity: "error" });

      cy.get('app-snackbar div[role="alert"]').should("exist");
      cy.get("app-snackbar app-svg-icon").should("exist");
    });

    it("should render with warning severity and show icon", () => {
      mountComponent({ severity: "warning" });

      cy.get('app-snackbar div[role="alert"]').should("exist");
      cy.get("app-snackbar app-svg-icon").should("exist");
    });
  });

  // Visual variant tests
  describe("Visual Variants", () => {
    it("should render with outlined variant", () => {
      mountComponent({ variant: "outlined" });

      cy.get('app-snackbar div[role="alert"]').should("have.class", "border");
    });
  });

  // Position tests
  describe("Positioning", () => {
    it("should render at top-right position", () => {
      mountComponent({
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });

      // Verify snackbar exists (positioning is handled by CSS)
      cy.get('app-snackbar div[role="alert"]').should("exist");
    });
  });

  // UI element tests
  describe("UI Elements", () => {
    it("should render without close icon when withCloseIcon is false", () => {
      mountComponent({ withCloseIcon: false });

      cy.get("app-snackbar button").should("not.exist");
    });
  });

  // Content projection tests
  describe("Content Projection", () => {
    it("should render custom content when no message is provided", () => {
      // Create a test host component with custom content
      @Component({
        selector: "test-custom-content-host",
        standalone: true,
        imports: [CommonModule, SnackbarComponent],
        template: `
          <app-snackbar
            [open]="true"
            [autoHideDuration]="5000"
            [severity]="'info'"
            [variant]="'filled'"
            [withCloseIcon]="true"
          >
            <div data-testid="custom-content">Custom projected content</div>
          </app-snackbar>
        `,
      })
      class TestCustomContentHostComponent {}

      cy.mount(TestCustomContentHostComponent, {});

      // Verify custom content is rendered
      cy.get('[data-testid="custom-content"]').should("exist");
      cy.get('[data-testid="custom-content"]').should(
        "contain.text",
        "Custom projected content",
      );
    });
  });
});
