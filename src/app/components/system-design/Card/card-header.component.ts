import { Component, Input, HostBinding, TemplateRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CardHeaderProps } from "./card.types";

@Component({
  selector: "xui-card-header",
  template: `<ng-container *ngIf="avatar">
      <ng-container
        data-slot="card-avatar"
        [ngTemplateOutlet]="avatar"
      ></ng-container>
    </ng-container>

    <div class="min-w-0 flex-1">
      <h3
        *ngIf="title"
        data-slot="card-title"
        [class]="
          (titleProps?.className || '') +
          ' font-semibold leading-none text-card-foreground'
        "
      >
        {{ title }}
      </h3>
      <p
        *ngIf="subheader"
        data-slot="card-subheader"
        [class]="
          (subheaderProps?.className || '') +
          ' mt-1 text-sm text-muted-foreground'
        "
      >
        {{ subheader }}
      </p>
    </div>

    <ng-container *ngIf="action">
      <div data-slot="card-action" [class]="actionProps?.className || ''">
        <ng-container [ngTemplateOutlet]="action"></ng-container>
      </div>
    </ng-container>`,
  standalone: true,
  imports: [CommonModule],
})
export class CardHeaderComponent implements CardHeaderProps {
  @Input() title?: string;
  @Input() subheader?: string;
  @Input() avatar?: TemplateRef<unknown>;
  @Input() action?: TemplateRef<unknown>;
  @Input() titleProps?: { className?: string };
  @Input() subheaderProps?: { className?: string };
  @Input() avatarProps?: { className?: string };
  @Input() actionProps?: { className?: string };
  @Input() component = "div";

  @HostBinding("class") className =
    "flex items-start gap-2 px-6 [.border-b]:pb-6";

  @HostBinding("attr.data-slot") dataSlot = "card-header";
}
