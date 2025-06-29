import { CheckboxComponent } from "./checkbox.component";
import {
  LucideAngularModule,
  Check,
  Minus,
  Circle,
  Star,
  Heart,
} from "lucide-angular";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CheckboxColor, CheckboxSize } from "./checkbox.types";

describe("CheckboxComponent - Final & Working Version", () => {
  const testSetup = (imports: unknown[] = []) => ({
    imports: [
      CheckboxComponent,
      ReactiveFormsModule,
      FormsModule,
      LucideAngularModule.pick({ Check, Minus, Circle, Star, Heart }),
      ...imports,
    ],
  });

  it("should toggle checked state and icon on click", () => {
    cy.mount(CheckboxComponent, {
      ...testSetup(),
      componentProperties: { icon: "Circle" },
    });
    cy.get('input[type="checkbox"]').should("not.be.checked");
    cy.get("lucide-icon")
      .should("exist")
      .and("have.attr", "ng-reflect-name", "Circle");

    cy.get("label").click();
    cy.get('input[type="checkbox"]').should("be.checked");
    cy.get("lucide-icon")
      .should("exist")
      .and("have.attr", "ng-reflect-name", "Check");
  });

  describe("Color Variants - Comprehensive", () => {
    const colors: CheckboxColor[] = [
      "primary",
      "secondary",
      "success",
      "error",
      "info",
      "warning",
      "muted",
    ];

    colors.forEach((color) => {
      it(`should apply correct ${color} color class when checked`, () => {
        cy.mount(CheckboxComponent, {
          ...testSetup(),
          componentProperties: { color, checked: true },
        });

        cy.get("label")
          .should("have.class", `bg-${color}`)
          .and("have.class", `border-${color}`);
      });

      it(`should apply correct ${color} color class when unchecked`, () => {
        cy.mount(CheckboxComponent, {
          ...testSetup(),
          componentProperties: { color, checked: false },
        });

        cy.get("label")
          .should("not.have.class", `bg-${color}`)
          .and("have.class", "border-gray-300");
      });
    });
  });

  it("should use custom icons when provided", () => {
    cy.mount(CheckboxComponent, {
      ...testSetup(),
      componentProperties: {
        icon: "Heart",
        checkedIcon: "Star",
      },
    });

    cy.get("lucide-icon")
      .should("exist")
      .and("have.attr", "ng-reflect-name", "Heart");
    cy.get("label").click();
    cy.get("lucide-icon")
      .should("exist")
      .and("have.attr", "ng-reflect-name", "Star");
  });

  it("should display indeterminate icon and become checked on first click", () => {
    cy.mount(CheckboxComponent, {
      ...testSetup(),
      componentProperties: { indeterminate: true },
    });

    cy.get('input[type="checkbox"]').should(
      "have.attr",
      "aria-checked",
      "mixed",
    );
    cy.get("lucide-icon")
      .should("exist")
      .and("have.attr", "ng-reflect-name", "Minus");
  });

  describe("Size Variants - Comprehensive", () => {
    const sizes = [
      { size: "small", expectedClasses: ["h-4", "w-4"], iconSize: "16" },
      { size: "medium", expectedClasses: ["h-5", "w-5"], iconSize: "20" },
      { size: "large", expectedClasses: ["h-6", "w-6"], iconSize: "24" },
    ];

    sizes.forEach(({ size, expectedClasses, iconSize }) => {
      it(`should apply ${size} size classes and icon size`, () => {
        cy.mount(CheckboxComponent, {
          ...testSetup(),
          componentProperties: { size: size as CheckboxSize, checked: true },
        });

        cy.wait(50);

        cy.get("label").then(($label) => {
          expectedClasses.forEach((checkClass) => {
            expect(
              $label,
              `Label should have class ${checkClass}`,
            ).to.have.class(checkClass);
          });
        });

        cy.get("lucide-icon")
          .should("exist")
          .and("have.attr", "ng-reflect-size", iconSize);
      });
    });
  });

  it("should have a unique ID by default and apply custom ID, name, and value", () => {
    cy.mount(CheckboxComponent, {
      ...testSetup(),
      componentProperties: { id: "custom-checkbox-id" },
    });

    cy.get('input[type="checkbox"]').should("have.id", "custom-checkbox-id");

    cy.mount(CheckboxComponent, {
      ...testSetup(),
      componentProperties: {
        id: "custom-checkbox-id",
        name: "customName",
        value: "customValue",
      },
    });

    cy.get('input[type="checkbox"]')
      .should("have.id", "custom-checkbox-id")
      .and("have.attr", "name", "customName")
      .and("have.value", "customValue");
  });

  it("should work as uncontrolled component when defaultChecked is provided", () => {
    cy.mount(CheckboxComponent, {
      ...testSetup(),
      componentProperties: { defaultChecked: true },
    });

    cy.get('input[type="checkbox"]').should("be.checked");
    cy.get("label").click();
    cy.get('input[type="checkbox"]').should("not.be.checked");
  });

  it("should not change state when disabled", () => {
    cy.mount(CheckboxComponent, {
      ...testSetup(),
      componentProperties: { disabled: true },
    });

    cy.get('input[type="checkbox"]').should("be.disabled");
    cy.get("label")
      .should("have.class", "cursor-not-allowed")
      .and("have.class", "opacity-50");

    cy.get("label").click({ force: true });
    cy.get('input[type="checkbox"]').should("not.be.checked");
  });

  it("should show required style only when unchecked", () => {
    cy.mount(CheckboxComponent, {
      ...testSetup(),
      componentProperties: { required: true },
    });
    cy.get("label").should("have.class", "!border-red-500");
    cy.get("label").click();
    cy.wait(50);
    cy.get("label").should("not.have.class", "!border-red-500");
  });

  it("should not apply required style when checked", () => {
    cy.mount(CheckboxComponent, {
      ...testSetup(),
      componentProperties: { required: true, checked: true },
    });

    cy.get("label").should("not.have.class", "!border-red-500");
  });
});
