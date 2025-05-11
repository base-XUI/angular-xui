import {
  Component,
  Input,
  ChangeDetectionStrategy,
  TemplateRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { LinkBaseProps } from "./link.types";
import { LinkVariants } from "./variants";

@Component({
  selector: "app-link",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./link.component.html",
  styleUrls: [],
})
export class LinkComponent implements LinkBaseProps {
  @Input() color:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning" = "primary";
  @Input() className?: string;
  @Input() variant:
    | "inherit"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "body3"
    | "caption" = "inherit";
  @Input() component: string = "a";
  @Input() href?: string;
  @Input() target?: string;
  @Input() rel?: "noopener" | "noreferrer" | undefined;
  @Input() role?: string;
  @Input() underline: "none" | "hover" | "always" = "hover";
  @Input() children?: string | TemplateRef<unknown>;
  //get class of link
  get linkClasses(): string {
    return LinkVariants({
      variant: this.variant,
      color: this.color,
      underline: this.underline,
    });
  }
}
