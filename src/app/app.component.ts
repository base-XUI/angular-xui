import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { LucideAngularModule } from "lucide-angular";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, LucideAngularModule],
  templateUrl: "./app.component.html",
})
export class AppComponent {
  title = "angular-xui";
}
