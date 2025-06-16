import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { ArrowDown, LucideAngularModule } from "lucide-angular";

import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom(LucideAngularModule.pick({ ArrowDown })),
    provideRouter(routes),
  ],
};
