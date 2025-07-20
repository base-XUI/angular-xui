import {
  Component,
  Input,
  HostBinding,
  Output,
  EventEmitter,
} from "@angular/core";
import { CardActionAreaProps } from "./card.types";

@Component({
  selector: "xui-card-action-area",
  template: `<ng-content></ng-content>`,
  standalone: true,
})
export class CardActionAreaComponent implements CardActionAreaProps {
  @Input() disabled = false;
  @Input() component = "button";
  @Output() clicked = new EventEmitter<void>();

  @HostBinding("class") get classes() {
    const base =
      "relative block w-full space-y-6 text-left transition-colors duration-200 ease-in-out focus-visible:outline-none";

    const disabledClasses = this.disabled
      ? "pointer-events-none opacity-50 cursor-not-allowed"
      : "";
    const hoverClasses = !this.disabled ? "hover:bg-gray-100" : "";

    const buttonClasses =
      this.component === "button"
        ? "border-0 bg-transparent cursor-pointer font-inherit text-inherit"
        : "";

    return `${base} ${hoverClasses} ${disabledClasses} ${buttonClasses}`;
  }

  @HostBinding("attr.data-slot") dataSlot = "card-action-area";
  @HostBinding("attr.disabled") get isDisabled() {
    return this.component === "button" && this.disabled ? true : null;
  }
  @HostBinding("attr.aria-disabled") get ariaDisabled() {
    return this.disabled ? "true" : null;
  }

  onClick() {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}
