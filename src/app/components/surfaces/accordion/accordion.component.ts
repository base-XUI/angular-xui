import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LucideAngularModule } from "lucide-angular";
import { AccordionBaseProps } from "./accordion.types";
import { v4 as uuidv4 } from "uuid";
import { AccordionSummaryComponent } from "./accordion-summary.component";
import { AccordionDetailsComponent } from "./accordion-details.component";

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
  @Input() index: number = 0;
  @Input() defaultExpanded!: boolean;
  @Input() disableGutters!: boolean;
  @Input() expanded!: boolean;
  @Input() square?: boolean = false;
  @Input() classes?: { root: string; details: string; summary: string };
  @Input() changed?: (event: Event, isExpanded: boolean | string) => void;
  @Input() children?: any; //eslint-disable-line @typescript-eslint/no-explicit-any
  @Input() disabled!: boolean;
  @Input() expandIcon?: any; //eslint-disable-line @typescript-eslint/no-explicit-any
  @Input() role: string = "region";
  @Input() slots?: {
    heading?: { component?: string };
  };

  uncontrolledOpen: boolean = this.defaultExpanded;
  get isControlled(): boolean {
    return this.expanded !== undefined;
  }
  ngOnInit(): void {
    // uncontrolledOpen with defaultExpanded if it changes
    this.uncontrolledOpen = this.defaultExpanded;

    console.log("jhgjgjgjggj", this.changed);
  }

  get rootClass(): string {
    return [
      "w-100 bg-warninng",
      !this.disableGutters && this.isOpen ? "my-3" : "my-0",
      this.classes?.root,
    ].join(" ");
  }

  get isOpen(): boolean {
    if (this.isControlled) {
      return this.expanded;
    } else {
      return this.uncontrolledOpen;
    }
  }
  //handel expansion
  handleExpansion(event: Event): void {
    if (this.disabled) return;
    if (this.isControlled) {
      this.changed?.(event as Event, !this.expanded);
    } else {
      this.uncontrolledOpen = !this.uncontrolledOpen;
      this.changed?.(event as Event, this.uncontrolledOpen);
    }
  }
}
