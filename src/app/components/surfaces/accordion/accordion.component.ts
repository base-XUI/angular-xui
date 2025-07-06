import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  TemplateRef,
  Output,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { LucideAngularModule } from "lucide-angular";
import { AccordionBaseProps } from "./accordion.types";
import { v4 as uuidv4 } from "uuid";
import { AccordionSummaryComponent } from "./accordion-summary.component";
import { AccordionDetailsComponent } from "./accordion-details.component";
import { accordionVariants } from "./variants";

@Component({
  selector: "app-accordion",
  imports: [
    CommonModule,
    LucideAngularModule,
    AccordionSummaryComponent,
    AccordionDetailsComponent,
  ],
  templateUrl: "./accordion.component.html",
  styleUrl: "./accordion.component.scss",
})
export class AccordionComponent implements AccordionBaseProps, OnInit {
  @Input() id: string = uuidv4(); //generate id
  @Input() component?: string = "div";
  @Input() index: number = 1;
  @Input() defaultExpanded!: boolean;
  @Input() disableGutters!: boolean;
  @Input() expanded!: boolean;
  @Input() square?: boolean = false;
  @Input() disabled!: boolean;
  @Input() expandIcon!: TemplateRef<unknown>;
  @Input() role: string = "region";
  @Input() slots?: {
    heading?: { component?: string };
  };
  @Input() classes?: {
    root?: string;
    summary?: { btn?: string; expandIcon?: string; content?: string };
    details?: string;
  };
  @Output() changed = new EventEmitter<{ event: Event; expanded: boolean }>();
  // Default uncontrolled state
  uncontrolledOpen: boolean = this.defaultExpanded;
  get isControlled(): boolean {
    return this.expanded !== undefined;
  }
  ngOnInit(): void {
    // uncontrolledOpen with defaultExpanded if it changes
    this.uncontrolledOpen = this.defaultExpanded;
  }

  get rootClass(): string {
    return [
      "max-w-xs mx-auto",
      !this.disableGutters && this.isOpen ? "my-3" : "my-0",
      this.square && "rounded-none shadow",
      this.classes?.root,
      accordionVariants({
        square: this.square,
        disableGutters: this.disableGutters,
        disabled: this.disabled,
      }),
    ].join(" ");
  }

  get isOpen(): boolean {
    if (this.isControlled) {
      return this.expanded;
    } else {
      return this.uncontrolledOpen;
    }
  }
  //handle expansion
  handleExpansion(event: Event): void {
    if (this.disabled) return;
    if (this.isControlled) {
      // For controlled mode, emit the opposite of current expanded state
      this.changed.emit({ event, expanded: !this.expanded });
    } else {
      // For uncontrolled mode, update internal state and emit
      this.uncontrolledOpen = !this.uncontrolledOpen;
      this.changed.emit({ event, expanded: this.uncontrolledOpen });
    }
  }
}
