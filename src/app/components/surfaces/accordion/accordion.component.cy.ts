import { AccordionComponent } from "./accordion.component";
import { AccordionSummaryComponent } from "./accordion-summary.component";
import { AccordionDetailsComponent } from "./accordion-details.component";
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LucideAngularModule } from "lucide-angular";

describe("Accordion component", () => {
  // Test uncontrolled accordion functionality
  it("renders children and toggles details (uncontrolled)", () => {
    cy.mount(AccordionComponent, {
      componentProperties: {
        id: "a1",
        index: 1,
      },
      imports: [
        CommonModule,
        LucideAngularModule,
        AccordionSummaryComponent,
        AccordionDetailsComponent,
      ],
    });

    cy.get("button").contains("Accordion 1").click();
    cy.contains("this is content of accordion 1").should("be.visible");
    cy.get("button").contains("Accordion 1").click();
    cy.contains("this is content of accordion 1").should("not.be.visible");
  });
  // Test defaultExpanded prop
  it("respects defaultExpanded prop", () => {
    cy.mount(AccordionComponent, {
      componentProperties: {
        id: "a2",
        index: 2,
        defaultExpanded: true,
      },
      imports: [
        CommonModule,
        LucideAngularModule,
        AccordionSummaryComponent,
        AccordionDetailsComponent,
      ],
    });

    cy.contains("this is content of accordion 2").should("be.visible");
  });
  // Test disabled prop
  it("does not open details when disabled", () => {
    cy.mount(AccordionComponent, {
      componentProperties: {
        id: "a3",
        index: 3,
        disabled: true,
      },
      imports: [
        CommonModule,
        LucideAngularModule,
        AccordionSummaryComponent,
        AccordionDetailsComponent,
      ],
    });

    cy.get("button").contains("Accordion 3").click({ force: true });
    cy.contains("this is content of accordion 3").should("not.be.visible");
  });
  // Test disableGutters and square props
  it("applies disableGutters and square styles", () => {
    cy.mount(AccordionComponent, {
      componentProperties: {
        id: "a4",
        disableGutters: true,
        square: true,
      },
      imports: [
        CommonModule,
        LucideAngularModule,
        AccordionSummaryComponent,
        AccordionDetailsComponent,
      ],
    });
    cy.get("div").should("have.class", "my-0");
    cy.get("div").should("have.class", "rounded-none");
    cy.get("div").should("have.class", "shadow");
  });

  // Test custom expandIcon
  it("renders custom expandIcon", () => {
    @Component({
      selector: "custom-icon-accordion",
      template: `
        <app-accordion
          id="a5"
          [index]="5"
          [expandIcon]="customIcon"
        ></app-accordion>
        <ng-template #customIcon>
          <span data-tested="custom-icon">+</span>
        </ng-template>
      `,
      imports: [AccordionComponent],
    })
    class CustomIconAccordionComponent {}

    cy.mount(CustomIconAccordionComponent, {
      imports: [
        CommonModule,
        LucideAngularModule,
        AccordionComponent,
        AccordionSummaryComponent,
        AccordionDetailsComponent,
      ],
    });

    cy.get('[data-tested="custom-icon"]').should("exist");
  });
  // Test slots prop for heading
  it("renders custom heading using slots prop", () => {
    cy.mount(AccordionComponent, {
      componentProperties: {
        id: "a6",
        index: 6,
        slots: { heading: { component: "h2" } },
      },
      imports: [
        CommonModule,
        LucideAngularModule,
        AccordionSummaryComponent,
        AccordionDetailsComponent,
      ],
    });

    cy.get("h2").contains("Accordion 6").should("exist");
  });
  // Test custom classes
  it("applies custom classes correctly", () => {
    cy.mount(AccordionComponent, {
      componentProperties: {
        id: "a7",
        index: 7,
        classes: {
          root: "custom-root-class",
          summary: {
            btn: "custom-button-class",
            expandIcon: "custom-icon-class",
            content: "custom-content-class",
          },
          details: "custom-details-class",
        },
      },
      imports: [
        CommonModule,
        LucideAngularModule,
        AccordionSummaryComponent,
        AccordionDetailsComponent,
      ],
    });
    cy.get("div").should("have.class", "custom-root-class");
    cy.get("button").should("have.class", "custom-button-class");
  });
  // Test controlled accordion behavior
  it("respects expanded prop (controlled)", () => {
    @Component({
      selector: "controlled-accordion",
      template: `
        <app-accordion
          id="panel1"
          [index]="1"
          [expanded]="isExpanded === 'panel1'"
          (changed)="handleChange('panel1', $event)"
        ></app-accordion>
        <app-accordion
          id="panel2"
          [index]="2"
          [expanded]="isExpanded === 'panel2'"
          (changed)="handleChange('panel2', $event)"
        ></app-accordion>
      `,
      imports: [AccordionComponent],
    })
    class ControlledAccordionComponent {
      isExpanded: string | false = false;

      handleChange(panel: string, event: { event: Event; expanded: boolean }) {
        this.isExpanded = event.expanded ? panel : false;
      }
    }

    cy.mount(ControlledAccordionComponent, {
      imports: [
        CommonModule,
        LucideAngularModule,
        AccordionComponent,
        AccordionSummaryComponent,
        AccordionDetailsComponent,
      ],
    });

    cy.get("button").contains("Accordion 1").click();
    cy.contains("this is content of accordion 1").should("be.visible");
    cy.contains("this is content of accordion 2").should("not.be.visible");

    cy.get("button").contains("Accordion 2").click();
    cy.contains("this is content of accordion 2").should("be.visible");
    cy.contains("this is content of accordion 1").should("not.be.visible");
  });
  // Test expand icon rotation
  it("rotates expand icon when expanded", () => {
    cy.mount(AccordionComponent, {
      componentProperties: {
        id: "a8",
        index: 8,
      },
      imports: [
        CommonModule,
        LucideAngularModule,
        AccordionSummaryComponent,
        AccordionDetailsComponent,
      ],
    });

    // Check initial state (not rotated)
    cy.get("span").should("not.have.class", "rotate-180");
    // Click to expand
    cy.get("button").click();
    // Check rotated state
    cy.get("span").should("have.class", "rotate-180");
  });
});
