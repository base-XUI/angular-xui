import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LucideAngularModule, ChevronDownIcon } from "lucide-angular"; // Import LucideAngularModule and ChevronDownIcon

@Component({
  selector: "xui-accordion-summary",
  imports: [CommonModule, LucideAngularModule],
  template: `
    <ng-container *ngIf="Heading as headingTag">
      <ng-container [ngSwitch]="headingTag">
        <h1 *ngSwitchCase="'h1'" [attr.id]="id + '-heading'">
          <ng-container *ngTemplateOutlet="buttonTpl"></ng-container>
        </h1>
        <h2 *ngSwitchCase="'h2'" [attr.id]="id + '-heading'">
          <ng-container *ngTemplateOutlet="buttonTpl"></ng-container>
        </h2>
        <h3 *ngSwitchCase="'h3'" [attr.id]="id + '-heading'">
          <ng-container *ngTemplateOutlet="buttonTpl"></ng-container>
        </h3>
        <h4 *ngSwitchCase="'h4'" [attr.id]="id + '-heading'">
          <ng-container *ngTemplateOutlet="buttonTpl"></ng-container>
        </h4>
        <h5 *ngSwitchCase="'h5'" [attr.id]="id + '-heading'">
          <ng-container *ngTemplateOutlet="buttonTpl"></ng-container>
        </h5>
        <h6 *ngSwitchCase="'h6'" [attr.id]="id + '-heading'">
          <ng-container *ngTemplateOutlet="buttonTpl"></ng-container>
        </h6>
        <div *ngSwitchDefault [attr.id]="id + '-heading'">
          <ng-container *ngTemplateOutlet="buttonTpl"></ng-container>
        </div>
      </ng-container>

      <ng-template #buttonTpl>
        <button
          type="button"
          [class]="summaryClass"
          [attr.aria-expanded]="expanded"
          [attr.aria-controls]="id + '-details'"
          [id]="id + '-summary'"
          [disabled]="disabled"
          (click)="toggle.emit($event)"
        >
          <span>
            <ng-content></ng-content>
          </span>
          <span class="transition-transform" [class.rotate-180]="expanded">
            <ng-container *ngIf="expandIcon; else defaultIcon">
              {{ expandIcon }}
            </ng-container>

            <ng-template #defaultIcon>
              <span-lucide [name]="defaultIconValue" [size]="18"></span-lucide>
            </ng-template>
          </span>
        </button>
      </ng-template>
    </ng-container>
  `,
  styleUrls: ["./accordion.component.scss"],
})
export class AccordionSummaryComponent {
  @Input() id!: string;
  @Input() expanded!: boolean;
  @Input() disabled!: boolean;
  @Input() expandIcon?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  @Input() slots?: { heading?: { component?: string } };
  @Input() classes?: { root: string; details: string; summary: string };
  @Input() defaultIconValue: any = ChevronDownIcon; // eslint-disable-line @typescript-eslint/no-explicit-any
  @Output() toggle = new EventEmitter<Event>();

  get Heading(): string {
    return this.slots?.heading?.component || "h3";
  }

  get summaryClass(): string {
    return [
      "flex w-full justify-between px-1 py-3 text-left text-sm font-semibold transition-all",
      this.disabled ? "cursor-default opacity-50" : "cursor-pointer",
      this.classes?.summary || "",
    ].join(" ");
  }
}
