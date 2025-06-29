import { Component, Input } from "@angular/core";
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
      [class]="detailsClass"
    >
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ["./accordion.component.scss"],
})
export class AccordionDetailsComponent {
  @Input() id?: string;
  @Input() role: string = "region";
  @Input() expanded!: boolean;
  @Input() classes?: { root?: string; details?: string; summary?: string };

  get detailsClass(): string {
    return [
      "px-1 py-2",
      this.expanded ? "accordion" : "accordion-up",
      this.classes?.details,
    ].join(" ");
  }
}
