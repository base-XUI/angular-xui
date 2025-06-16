import { Component, Input } from "@angular/core";
import { cva } from "class-variance-authority";
@Component({
  selector: "xui-accordion-details",
  standalone: true,
  imports: [],
  template: `
    <div
      [attr.role]="role"
      [attr.aria-labelledby]="id + '-summary'"
      [id]="id + '-details'"
      [attr.aria-expanded]="expanded"
    >
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ["./accordion.component.scss"],
})
export class AccordionDetailsComponent {
  @Input() id: string = "accordion";
  @Input() role: string = "region";
  @Input() expanded: boolean = false;
  @Input() classes?: { root: string; details: string; summary: string };
  get detailsClass(): string {
    return [
      cva(
        [
          "px-4 py-3",
          this.expanded ? "accordion" : "accordion-up",
          this.classes?.details,
        ]
          .filter(Boolean)
          .join(" "),
      ),
    ].join(" ");
  }
}
