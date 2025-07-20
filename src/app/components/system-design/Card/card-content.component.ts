import { Component, Input, HostBinding } from "@angular/core";
import { CardContentProps } from "./card.types";

@Component({
  selector: "xui-card-content",
  template: `<ng-content></ng-content>`,
})
export class CardContentComponent implements CardContentProps {
  @Input() component = "div";

  @HostBinding("class") className = "block px-6";
  @HostBinding("attr.data-slot") dataSlot = "card-content";
}
