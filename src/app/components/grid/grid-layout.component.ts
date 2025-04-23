import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-grid-layout",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="containerClasses">
      <div [class]="gridClasses">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class GridLayoutComponent {
  @Input() cols: 1 | 2 | 3 | 4 | 5 | 6 | 12 = 3;
  @Input() gap: "none" | "small" | "medium" | "large" = "medium";
  @Input() padding: "none" | "small" | "medium" | "large" = "medium";
  @Input() responsive: boolean = true;

  get containerClasses(): string {
    const paddingClasses = {
      none: "",
      small: "p-2",
      medium: "p-4",
      large: "p-6",
    };

    return paddingClasses[this.padding];
  }

  get gridClasses(): string {
    const baseClasses = "grid";

    const gapClasses = {
      none: "gap-0",
      small: "gap-2",
      medium: "gap-4",
      large: "gap-6",
    };

    const colClasses = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      12: "grid-cols-12",
    };

    const responsiveClasses = this.responsive
      ? "grid-cols-1 sm:grid-cols-2 md:" + colClasses[this.cols]
      : colClasses[this.cols];

    return `${baseClasses} ${gapClasses[this.gap]} ${responsiveClasses}`;
  }
}
