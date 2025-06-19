import { SnackbarComponent } from "./snackbar.component";
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { provideAnimations } from "@angular/platform-browser/animations";

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

  withCloseIcon = true;

  handleClose() {
    this.open = false;
  }
}

describe("SnackbarComponent", () => {
  const mountComponent = (props = {}) => {
    return cy.mount(TestHostComponent, {
      componentProperties: props,
      providers: [provideAnimations()],
    });
  };

  describe("Basic Rendering", () => {
    it("should render with default props", () => {
      mountComponent();

      cy.get("app-snackbar").should("exist");

      cy.get("app-snackbar")
        .find('div[role="alert"]', { timeout: 5000 })
        .should("be.visible");
      cy.get('app-snackbar div[role="alert"]').should(
        "contain.text",
        "Test message",
      );
    });
  });

  describe("Positioning", () => {
    it("should render at top-right position", () => {
      mountComponent({
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });

      cy.get("app-snackbar")
        .find('div[role="alert"]', { timeout: 5000 })
        .should("be.visible");
    });
  });

  describe("UI Elements", () => {
    it("should render without close icon when withCloseIcon is false", () => {
      mountComponent({ withCloseIcon: false });

      cy.get("app-snackbar button").should("not.exist");
    });
  });

  describe("Content Projection", () => {
    it("should render custom content when no message is provided", () => {
      @Component({
        selector: "test-custom-content-host",
        standalone: true,
        imports: [CommonModule, SnackbarComponent],
        template: `
          <app-snackbar
            [open]="true"
            [autoHideDuration]="5000"
            [withCloseIcon]="true"
          >
            <div data-testid="custom-content">Custom projected content</div>
          </app-snackbar>
        `,
      })
      class TestCustomContentHostComponent {}

      cy.mount(TestCustomContentHostComponent, {
        providers: [provideAnimations()],
      });

      cy.get("app-snackbar")
        .find('[data-testid="custom-content"]', { timeout: 5000 })
        .should("be.visible");
      cy.get('[data-testid="custom-content"]').should(
        "contain.text",
        "Custom projected content",
      );
    });
  });
});
