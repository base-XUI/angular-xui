import { Component, Input } from "@angular/core";
import { cva } from "class-variance-authority";
import { CommonModule } from "@angular/common";
import { LucideAngularModule } from "lucide-angular"; // Uncomment if you need icons
import { AccordionSummaryComponent } from "./accordion-summary.component";
import { AccordionDetailsComponent } from "./accordion-details.component";
@Component({
  selector: "app-accordion",
  imports: [
    CommonModule,
    AccordionSummaryComponent,
    AccordionDetailsComponent,
    LucideAngularModule,
  ],
  templateUrl: "./accordion.component.html",
  styleUrl: "./accordion.component.scss",
})
export class AccordionComponent {
  @Input() id: string = `accordion-${Math.random().toString(36).substr(2, 9)}`;
  @Input() component?: string;
  @Input() defaultExpanded: boolean = false;
  @Input() disableGutters: boolean = false;
  @Input() expanded?: boolean | string;
  @Input() square: boolean = false;
  @Input() classes?: { root: string; details: string; summary: string };
  @Input() onChange?: (event: Event, expanded: boolean | string) => void;
  @Input() children?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  @Input() Heading: string = "h3";
  @Input() disabled: boolean = false;
  @Input() expandIcon?: string; // Icon name as string
  @Input() slots?: {
    heading?: { component?: string };
  };

  isExpanded: boolean = this.defaultExpanded;

  get isControlled(): boolean {
    return this.expanded !== undefined;
  }

  get isOpen(): boolean {
    if (this.isControlled) {
      if (typeof this.expanded === "boolean") {
        return this.expanded;
      } else if (typeof this.expanded === "string") {
        return this.expanded === this.id;
      } else {
        return false;
      }
    } else {
      return this.isExpanded;
    }
  }

  handleExpansion(event: Event): void {
    if (this.disabled) return;
    if (this.isControlled) {
      if (typeof this.expanded === "string") {
        this.onChange?.(event as any, this.expanded === this.id ? false : true); // eslint-disable-line @typescript-eslint/no-explicit-any
      } else {
        this.onChange?.(event as any, !this.expanded); // eslint-disable-line @typescript-eslint/no-explicit-any
      }
    } else {
      this.isExpanded = !this.isExpanded;
      this.onChange?.(event as any, this.isExpanded); // eslint-disable-line @typescript-eslint/no-explicit-any
    }
  }

  get rootClass(): string {
    return [
      cva(
        [
          "w-100",
          !this.disableGutters && this.isOpen ? "my-3" : "my-0",
          this.classes?.root,
        ]
          .filter(Boolean)
          .join(" "),
      ),
    ]
      .filter(Boolean)
      .join(" ");
  }
}
