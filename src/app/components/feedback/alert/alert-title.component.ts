import { Component, Input, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AlertSeverity, AlertVariant } from "./Alert.types";
import { alertTitleClasses } from "./variants";

@Component({
  selector: "xui-alert-title",
  standalone: true,
  imports: [CommonModule],
  template: `
    <h5 [class]="titleClasses">
      <ng-content></ng-content>
    </h5>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class AlertTitleComponent {
  @Input() severity: AlertSeverity = "success";
  @Input() variant: AlertVariant = "default";
  @Input() color?: AlertSeverity;

  get effectiveSeverity(): AlertSeverity {
    return this.color || this.severity;
  }

  get titleClasses(): string {
    return alertTitleClasses;
  }
}
