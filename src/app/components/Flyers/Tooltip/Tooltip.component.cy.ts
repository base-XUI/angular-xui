import { TooltipComponent } from "./Tooltip.component";
import { NgClass, NgStyle } from "@angular/common";
import { Component, Input } from "@angular/core";
import { TooltipColor, TooltipPlacement } from "./Tooltip.types";
import { tooltipVariantsConfig } from "./variants";

@Component({
  selector: "test-tooltip-host",
  standalone: true,
  imports: [NgClass, NgStyle, TooltipComponent],
  template: `
       
    <xui-tooltip
      [title]="title"
      [arrow]="arrow"
      [disabled]="disabled"
      [interactive]="interactive"
      [placement]="placement"
      [color]="color"
      [followCursor]="followCursor"
      [disableFocusListener]="disableFocusListener"
      [disableHoverListener]="disableHoverListener"
      [disableTouchListener]="disableTouchListener"
      [enterDelay]="enterDelay"
      [enterNextDelay]="enterNextDelay"
      [leaveDelay]="leaveDelay"
      [enterTouchDelay]="enterTouchDelay"
      [leaveTouchDelay]="leaveTouchDelay"
      [id]="id"
      (onOpen)="onOpen()"
      (onClose)="onClose()"
    >
           
      <button
        data-cy="tooltip-trigger"
        style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; background: white; cursor: pointer;"
      >
                {{ triggerContent }}      
      </button>
         
    </xui-tooltip>
     
  `,
})
class TestTooltipHostComponent {
  @Input() title: string | undefined = "Tooltip text";
  @Input() arrow = true;
  @Input() disabled = false;
  @Input() interactive = true;
  @Input() placement: TooltipPlacement = "top";
  @Input() color: TooltipColor = "primary";
  @Input() followCursor = false;
  @Input() disableFocusListener = false;
  @Input() disableHoverListener = false;
  @Input() disableTouchListener = false;
  @Input() enterDelay = 0;
  @Input() enterNextDelay = 0;
  @Input() leaveDelay = 0;
  @Input() enterTouchDelay = 700;
  @Input() leaveTouchDelay = 1500;
  @Input() id?: string;
  @Input() triggerContent = "Hover me";

  onOpen = cy.stub().as("onOpenStub");
  onClose = cy.stub().as("onCloseStub");
}

const tooltipSelector = '[role="tooltip"]';
const triggerSelector = '[data-cy="tooltip-trigger"]';

// Helper function to assert tooltip existence and visibility
const tooltipShouldBeVisible = (text: string) => {
  cy.get(tooltipSelector)
    .should("exist")
    .and("be.visible")
    .and("contain.text", text);
};

// Helper function to assert tooltip non-existence
const tooltipShouldNotExist = () => {
  cy.get(tooltipSelector).should("not.exist");
};

const mountTestTooltipHostComponent = (
  props: Partial<TestTooltipHostComponent> = {},
) => {
  return cy.mount(TestTooltipHostComponent, {
    componentProperties: props,
  });
};

describe("TooltipComponent (Non-Faulty Tests)", () => {
  // Original failing test: "shows tooltip on focus"
  // This test was failing because the tooltip element was not found after focus.
  // It has been commented out/removed as requested.

  // Original failing test: "does not show tooltip on hover when disableHoverListener is true"
  // This test also had a problem where the tooltip element was not found on focus.
  // It has been commented out/removed as requested.

  // Original failing test: "has correct accessibility attributes"
  // This test was failing because aria-describedby was not found.
  // It has been commented out/removed as requested.

  it("should show tooltip on hover and hide on mouse leave", () => {
    mountTestTooltipHostComponent({
      title: "Hover Test Tooltip",
      enterDelay: 0,
      leaveDelay: 0,
    });
    tooltipShouldNotExist(); // Initial state: no tooltip

    cy.get(triggerSelector).trigger("mouseenter"); // Action: hover
    tooltipShouldBeVisible("Hover Test Tooltip"); // Assertion: tooltip visible

    cy.get(triggerSelector).trigger("mouseleave"); // Action: mouse leave
    tooltipShouldNotExist(); // Assertion: tooltip hidden
  });

  it("should handle touch interactions", () => {
    mountTestTooltipHostComponent({
      title: "Touch tooltip",
      enterTouchDelay: 100,
      leaveTouchDelay: 200,
    });
    cy.get(triggerSelector).trigger("touchstart");
    cy.wait(150); // Wait for enterTouchDelay
    tooltipShouldBeVisible("Touch tooltip");

    cy.get(triggerSelector).trigger("touchend");
    cy.wait(250); // Wait for leaveTouchDelay
    tooltipShouldNotExist();
  });

  it("should emit events when opening and closing", () => {
    mountTestTooltipHostComponent({ title: "Event tooltip", enterDelay: 0 });
    cy.get(triggerSelector).trigger("mouseenter");
    tooltipShouldBeVisible("Event tooltip");
    cy.get("@onOpenStub").should("have.been.calledOnce"); // Ensure it's called exactly once

    cy.get(triggerSelector).trigger("mouseleave");
    tooltipShouldNotExist();
    cy.get("@onCloseStub").should("have.been.calledOnce"); // Ensure it's called exactly once
  });

  it("should not show tooltip when disabled", () => {
    mountTestTooltipHostComponent({
      title: "Disabled tooltip",
      disabled: true,
      enterDelay: 0,
    });
    cy.get(triggerSelector).trigger("mouseenter");
    cy.wait(100); // Give time for any potential display (should not)
    tooltipShouldNotExist();

    cy.get(triggerSelector).focus();
    cy.wait(100); // Give time for any potential display (should not)
    tooltipShouldNotExist();
  });

  it("should not show tooltip on focus when disableFocusListener is true (but show on hover)", () => {
    mountTestTooltipHostComponent({
      title: "No focus tooltip",
      disableFocusListener: true,
      enterDelay: 0,
    });
    cy.get(triggerSelector).focus();
    cy.wait(100); // Verify it does NOT show on focus
    tooltipShouldNotExist();

    cy.get(triggerSelector).trigger("mouseenter"); // Now test hover
    tooltipShouldBeVisible("No focus tooltip");
  });

  it("should not show tooltip on touch when disableTouchListener is true", () => {
    mountTestTooltipHostComponent({
      title: "No touch tooltip",
      disableTouchListener: true,
    });
    cy.get(triggerSelector).trigger("touchstart");
    cy.wait(800); // Wait for the touch delay to pass
    tooltipShouldNotExist();
  });

  it("should respect enterDelay", () => {
    mountTestTooltipHostComponent({
      title: "Delayed tooltip",
      enterDelay: 300,
    });
    cy.get(triggerSelector).trigger("mouseenter");
    cy.wait(100); // Before delay
    tooltipShouldNotExist();
    cy.wait(250); // total 350ms wait (after delay)
    tooltipShouldBeVisible("Delayed tooltip");
  });

  it("should respect leaveDelay", () => {
    mountTestTooltipHostComponent({
      title: "Leave delayed tooltip",
      enterDelay: 0,
      leaveDelay: 300,
    });
    cy.get(triggerSelector).trigger("mouseenter");
    tooltipShouldBeVisible("Leave delayed tooltip");
    cy.get(triggerSelector).trigger("mouseleave");
    cy.wait(100);
    tooltipShouldBeVisible("Leave delayed tooltip"); // Should still be visible
    cy.wait(250); // total 350ms wait
    tooltipShouldNotExist();
  });

  it("should use enterNextDelay for quick successive hovers", () => {
    mountTestTooltipHostComponent({
      title: "Quick tooltip",
      enterDelay: 300,
      enterNextDelay: 50,
    });
    cy.get(triggerSelector).trigger("mouseenter");
    cy.wait(350);
    tooltipShouldBeVisible("Quick tooltip");
    cy.get(triggerSelector).trigger("mouseleave");
    tooltipShouldNotExist();
    cy.get(triggerSelector).trigger("mouseenter");
    cy.wait(100); // enterNextDelay is 50, so 100ms is more than enough
    tooltipShouldBeVisible("Quick tooltip");
  });

  it("should show arrow when arrow is true", () => {
    mountTestTooltipHostComponent({
      title: "Arrow tooltip",
      arrow: true,
      enterDelay: 0,
    });
    cy.get(triggerSelector).trigger("mouseenter");
    tooltipShouldBeVisible("Arrow tooltip");
    cy.get(tooltipSelector).should("have.attr", "data-arrow", "true");
  });

  it("should not show arrow when arrow is false", () => {
    mountTestTooltipHostComponent({
      title: "No arrow tooltip",
      arrow: false,
      enterDelay: 0,
    });
    cy.get(triggerSelector).trigger("mouseenter");
    tooltipShouldBeVisible("No arrow tooltip");
    cy.get(tooltipSelector).should("not.have.attr", "data-arrow");
  });

  // Test all color variants
  (Object.keys(tooltipVariantsConfig.variants.color) as TooltipColor[]).forEach(
    (color) => {
      it(`should render with ${color} color variant`, () => {
        mountTestTooltipHostComponent({
          title: `${color} tooltip`,
          color,
          enterDelay: 0,
        });
        cy.get(triggerSelector).trigger("mouseenter");
        cy.get(tooltipSelector)
          .should("be.visible")
          .and("contain.text", `${color} tooltip`)
          .and("have.attr", "data-color", color);
      });
    },
  );

  // Test all placement variants
  (
    Object.keys(tooltipVariantsConfig.variants.placement) as TooltipPlacement[]
  ).forEach((placement) => {
    it(`should render with ${placement} placement`, () => {
      mountTestTooltipHostComponent({
        title: `${placement} tooltip`,
        placement,
        enterDelay: 0,
      });
      cy.get(triggerSelector).trigger("mouseenter");
      cy.get(tooltipSelector)
        .should("be.visible")
        .and("contain.text", `${placement} tooltip`)
        .and("have.attr", "data-placement", placement);
    });
  });

  it("should allow interaction when interactive is true", () => {
    mountTestTooltipHostComponent({
      title: "Interactive tooltip",
      interactive: true,
      leaveDelay: 200,
      enterDelay: 0,
    });
    cy.get(triggerSelector).trigger("mouseenter");
    tooltipShouldBeVisible("Interactive tooltip");
    cy.get(tooltipSelector).trigger("mouseenter"); // Move mouse to tooltip
    cy.wait(100); // Give time for interaction to prevent close
    tooltipShouldBeVisible("Interactive tooltip"); // Should remain visible
  });

  it("should follow cursor when followCursor is true", () => {
    mountTestTooltipHostComponent({
      title: "Following tooltip",
      followCursor: true,
      arrow: false,
      enterDelay: 0,
    });
    cy.get(triggerSelector).trigger("mouseenter");
    tooltipShouldBeVisible("Following tooltip");
    cy.get(triggerSelector).trigger("mousemove", {
      clientX: 200,
      clientY: 150,
    });
    cy.wait(50); // Small wait for position update
    cy.get(tooltipSelector).should("have.css", "position", "fixed");
  });

  it("should handle empty title gracefully (no tooltip displayed)", () => {
    mountTestTooltipHostComponent({
      title: "",
      enterDelay: 0,
    });
    cy.get(triggerSelector).trigger("mouseenter");
    cy.wait(100);
    tooltipShouldNotExist();
  });

  it("should handle undefined title gracefully (no tooltip displayed)", () => {
    mountTestTooltipHostComponent({
      title: undefined,
      enterDelay: 0,
    });
    cy.get(triggerSelector).trigger("mouseenter");
    cy.wait(100);
    tooltipShouldNotExist();
  });

  it("should generate unique IDs when none provided", () => {
    mountTestTooltipHostComponent({
      title: "Auto ID tooltip",
      enterDelay: 0,
    });
    cy.get(triggerSelector).trigger("mouseenter");
    cy.get(tooltipSelector)
      .should("have.attr", "id")
      .and("match", /^tooltip-[a-z0-9]+$/);
  });

  it("should use custom ID when provided", () => {
    mountTestTooltipHostComponent({
      title: "Custom ID tooltip",
      id: "my-custom-tooltip",
      enterDelay: 0,
    });
    cy.get(triggerSelector).trigger("mouseenter");
    cy.get(tooltipSelector).should("have.attr", "id", "my-custom-tooltip");
  });

  it("should handle rapid hover/unhover cycles", () => {
    mountTestTooltipHostComponent({
      title: "Rapid test",
      enterDelay: 50,
      leaveDelay: 50,
    });
    for (let i = 0; i < 5; i++) {
      cy.get(triggerSelector).trigger("mouseenter");
      cy.wait(25);
      cy.get(triggerSelector).trigger("mouseleave");
      cy.wait(25);
    }
    cy.wait(150); // Ensure enough time for leaveDelay to expire
    tooltipShouldNotExist();
  });
});
