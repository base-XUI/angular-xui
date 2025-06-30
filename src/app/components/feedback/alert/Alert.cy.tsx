import { TestBed } from "@angular/core/testing";
import { AlertComponent } from "./alert.component";
import { AlertTitleComponent } from "./alert-title.component";
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  XCircle,
  X,
} from "lucide-angular";

@Component({
  selector: "test-wrapper",
  standalone: true,
  imports: [CommonModule, AlertComponent, AlertTitleComponent, CheckCircle],
  template: `<xui-alert
    [severity]="severity"
    [variant]="variant"
    [color]="color"
    [icon]="icon"
  >
    <ng-container *ngIf="showTitle">
      <xui-alert-title>{{ titleText }}</xui-alert-title>
    </ng-container>
    {{ content }}
    <ng-template #action *ngIf="showAction">
      <button>Action</button>
    </ng-template>
  </xui-alert>`,
})
class TestComponent {
  severity: "success" | "info" | "warning" | "error" = "success";
  variant: "default" | "filled" | "outlined" = "default";
  color?: "success" | "info" | "warning" | "error";
  icon: boolean = true;
  showTitle: boolean = false;
  titleText: string = "Title";
  content: string = "Alert content";
  showAction: boolean = false;
}

describe("AlertComponent", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent],
    });
  });

  it("should render with default props", () => {
    cy.mount(TestComponent);
    cy.get("xui-alert").should("exist");
    cy.get("xui-alert").should("contain.text", "Alert content");
    cy.get("check-circle").should("exist"); // Default success icon
  });

  it("should render with different severity levels", () => {
    cy.mount(TestComponent, {
      componentProperties: {
        severity: "info",
      },
    });
    cy.get("alert-circle").should("exist"); // Info icon

    cy.mount(TestComponent, {
      componentProperties: {
        severity: "warning",
      },
    });
    cy.get("alert-triangle").should("exist"); // Warning icon

    cy.mount(TestComponent, {
      componentProperties: {
        severity: "error",
      },
    });
    cy.get("x-circle").should("exist"); // Error icon
  });

  it("should render with filled variant", () => {
    cy.mount(TestComponent, {
      componentProperties: {
        variant: "filled",
      },
    });
    cy.get("xui-alert > div").should("have.class", "border-transparent");
  });

  it("should render with outlined variant", () => {
    cy.mount(TestComponent, {
      componentProperties: {
        variant: "outlined",
      },
    });
    cy.get("xui-alert > div").should("have.class", "bg-transparent");
  });

  it("should override color with color prop", () => {
    cy.mount(TestComponent, {
      componentProperties: {
        severity: "success",
        color: "warning",
      },
    });
    // Should have warning icon despite success severity
    cy.get("alert-triangle").should("exist");
  });

  it("should hide icon when icon prop is false", () => {
    cy.mount(TestComponent, {
      componentProperties: {
        icon: false,
      },
    });
    cy.get("check-circle").should("not.exist");
  });

  it("should render with title", () => {
    cy.mount(TestComponent, {
      componentProperties: {
        showTitle: true,
        titleText: "Test Title",
      },
    });
    cy.get("xui-alert-title").should("exist");
    cy.get("xui-alert-title").should("contain.text", "Test Title");
  });
});
