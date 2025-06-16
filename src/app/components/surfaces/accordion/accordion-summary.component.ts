import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LucideAngularModule, ChevronDownIcon } from "lucide-angular"; // Import LucideAngularModule and ChevronDownIcon
import { cva } from "class-variance-authority";

@Component({
  selector: "xui-accordion-summary",
  imports: [CommonModule, LucideAngularModule],
  template: `
    <button
      type="button"
      [attr.aria-expanded]="expanded"
      [attr.aria-controls]="id + '-details'"
      [id]="id + '-summary'"
      [class]="summaryClass"
      [disabled]="disabled"
      (click)="click?.()"
      [attr.role]="role"
    >
      <ng-container *ngIf="Heading as headingTag">
        <ng-container [ngSwitch]="headingTag">
          <h1 *ngSwitchCase="'h1'"><ng-content></ng-content></h1>
          <h2 *ngSwitchCase="'h2'"><ng-content></ng-content></h2>
          <h3 *ngSwitchCase="'h3'"><ng-content></ng-content></h3>
          <h4 *ngSwitchCase="'h4'"><ng-content></ng-content></h4>
          <h5 *ngSwitchCase="'h5'"><ng-content></ng-content></h5>
          <h6 *ngSwitchCase="'h6'"><ng-content></ng-content></h6>
          <span *ngSwitchDefault><ng-content></ng-content></span>
        </ng-container>
      </ng-container>
      <span class="ml-2 transition-transform" [class.rotate-180]="expanded">
        <span-lucide
          [name]="expandIcon || 'chevron-down'"
          [size]="18"
        ></span-lucide>
      </span>
    </button>
  `,
  styleUrls: ["./accordion.component.scss"],
})
export class AccordionSummaryComponent {
  @Input() id: string = "accordion";
  @Input() expanded: boolean = false;
  @Input() disabled: boolean = false;
  @Input() expandIcon: any = ChevronDownIcon; // eslint-disable-line @typescript-eslint/no-explicit-any
  @Input() role: string = "button";
  @Input() slots: { heading?: { component?: string } } = {
    heading: { component: "h3" },
  };
  @Input() click?: () => void;
  @Input() classes?: { root: string; details: string; summary: string };

  get Heading(): string {
    return this.slots?.heading?.component || "h3";
  }
  get summaryClass(): string {
    return [
      cva(
        [
          "flex w-full justify-between px-4 py-3 text-left font-semibold",
          this.expanded ? "bg-gray-100" : "",
          this.disabled ? "cursor-default opacity-50" : "cursor-pointer",
          this.classes?.summary,
        ]
          .filter(Boolean)
          .join(" "),
      ),
    ].join(" ");
  }
}
