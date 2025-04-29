import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ChangeDetectionStrategy,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { buttonVariants } from "./variants";
import { ButtonBaseProps } from "./button.types";

@Component({
  selector: "app-button",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./button.component.html",
  styleUrls: [],
})
export class ButtonComponent implements ButtonBaseProps {
  @Input() variant: "text" | "contained" | "outlined" = "contained";
  @Input() color:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning" = "primary";
  @Input() size: "small" | "medium" | "large" = "medium";
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() loadingPosition: "start" | "center" | "end" = "center";
  @Input() fullWidth: boolean = false;
  @Input() disableElevation: boolean = false;
  @Input() component: string = "button";
  @Input() type: "button" | "submit" | "reset" = "button";
  @Input() href?: string;
  @Input() target?: string;
  @Input() role?: string;
  @Input() startIcon?: TemplateRef<unknown>;
  @Input() endIcon?: TemplateRef<unknown>;
  @Input() customLoadingIndicator?: TemplateRef<unknown>;
  @Output() clicked = new EventEmitter<void>();

  get isDisabled(): boolean {
    return this.disabled || this.loading;
  }

  get buttonClasses(): string {
    return buttonVariants({
      variant: this.variant,
      color: this.color,
      size: this.size,
      fullWidth: this.fullWidth,
      disableElevation: this.disableElevation,
    });
  }

  handleClick() {
    if (!this.isDisabled) {
      this.clicked.emit();
    }
  }
}
