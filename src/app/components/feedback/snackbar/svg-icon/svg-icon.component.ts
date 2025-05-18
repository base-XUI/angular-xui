import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
  selector: "xui-svg-icon",
  standalone: true,
  imports: [CommonModule],
  template: `<span
    class="inline-block"
    [ngClass]="className"
    [innerHTML]="svgContent"
  >
  </span>`,
})
export class SvgIconComponent implements OnChanges {
  @Input() svg: string = "";
  @Input() className: string = "";

  svgContent: SafeHtml = "";

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["svg"]) {
      this.svgContent = this.sanitizer.bypassSecurityTrustHtml(this.svg);
    }
  }
}
