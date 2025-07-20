import { Component, Input, HostBinding } from "@angular/core";
import { CardProps, CardVariant } from "./card.types";
import { cardVariants } from "./variants";

@Component({
  selector: "xui-card",
  template: `<ng-content></ng-content>`,
  standalone: true,
})
export class CardComponent implements CardProps {
  @Input() variant: CardVariant = "filled";
  @Input() square = false;
  @Input() component = "div";

  @HostBinding("class") get classes() {
    const base = cardVariants(this.variant);
    return this.square
      ? base
      : `${base} rounded-xl [&>:first-child]:rounded-t-xl [&>:last-child]:rounded-b-xl`;
  }

  @HostBinding("attr.data-slot") dataSlot = "card";
}
