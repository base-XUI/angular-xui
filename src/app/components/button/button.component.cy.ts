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
