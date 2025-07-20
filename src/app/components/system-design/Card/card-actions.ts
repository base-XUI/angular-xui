import { Component, Input, HostBinding } from "@angular/core";
import { CardActionsProps } from "./card.types";

@Component({
  selector: "xui-card-actions",
  template: `<ng-content></ng-content>`,
  standalone: true,
})
export class CardActionsComponent implements CardActionsProps {
  @Input() disableSpacing = false;
  @Input() alignment: "start" | "end" | "center" | "space-between" = "start";
  @Input() spacing: "compact" | "normal" | "comfortable" = "normal";
  @Input() component = "div";

  @HostBinding("class") get classes() {
    const spacingClasses = {
      compact: "gap-1",
      normal: "gap-2",
      comfortable: "gap-4",
    };

    const alignmentClasses = {
      start: "justify-start",
      end: "justify-end",
      center: "justify-center",
      "space-between": "justify-between",
    };

    return `flex items-center px-6 ${
      !this.disableSpacing ? spacingClasses[this.spacing] : ""
    } ${alignmentClasses[this.alignment]}`;
  }

  @HostBinding("attr.data-slot") dataSlot = "card-actions";
}
