import {
  Component,
  Input,
  Output,
  EventEmitter,
  ContentChild,
  TemplateRef,
  ViewEncapsulation,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  XCircle,
  X,
  LucideAngularModule,
} from "lucide-angular";
import { AlertProps, AlertSeverity, AlertVariant } from "./Alert.types";
import {
  alertVariants,
  alertIconVariants,
  alertActionVariants,
} from "./variants";

@Component({
  selector: "xui-alert",
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: "./alert.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class AlertComponent implements AlertProps {
  @Input() severity: AlertSeverity = "success";
  @Input() variant: AlertVariant = "default";
  @Input() color?: AlertSeverity;
  @Input() icon: TemplateRef<unknown> | boolean = true;
  @Input() action?: TemplateRef<unknown>;
  @Input() iconMapping?: { [key in AlertSeverity]?: TemplateRef<unknown> };
  @Output() closeHandle = new EventEmitter<void>();

  readonly CheckCircle = CheckCircle;
  readonly AlertCircle = AlertCircle;
  readonly AlertTriangle = AlertTriangle;
  readonly XCircle = XCircle;
  readonly X = X;

  @ContentChild(TemplateRef) customIcon?: TemplateRef<unknown>;

  // Add a getter to get the icon template for the current severity if provided
  get severityIconTemplate(): TemplateRef<unknown> | null {
    if (this.iconMapping && this.effectiveSeverity in this.iconMapping) {
      return this.iconMapping[this.effectiveSeverity]!;
    }
    return null;
  }

  get effectiveSeverity(): AlertSeverity {
    return this.color || this.severity;
  }

  get showIcon(): boolean {
    return this.icon !== false;
  }

  get alertClasses(): string {
    return alertVariants({
      variant: this.variant,
      severity: this.effectiveSeverity,
    });
  }

  get iconClasses(): string {
    return alertIconVariants({
      variant: this.variant,
      severity: this.effectiveSeverity,
    });
  }

  get actionClasses(): string {
    return alertActionVariants({
      variant: this.variant,
      severity: this.effectiveSeverity,
    });
  }

  handleClose(): void {
    this.closeHandle.emit();
  }
}
