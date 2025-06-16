import { Component } from "@angular/core";
import { TabsComponent } from "../Tabs";
import { TabListComponent } from "../TabList";
import { TabComponent } from "../Tab/Tab.component";
import { TabPanelComponent } from "./TabPanel.component";

@Component({
  selector: "basic-test",
  standalone: true,
  imports: [TabsComponent, TabListComponent, TabComponent, TabPanelComponent],
  template: `
    <xui-tabs [defaultValue]="0">
      <xui-tablist>
        <xui-tab [value]="0">Tab 1</xui-tab>
        <xui-tab [value]="1">Tab 2</xui-tab>
      </xui-tablist>
      <xui-tabpanel [value]="0">Panel Content 1</xui-tabpanel>
      <xui-tabpanel [value]="1">Panel Content 2</xui-tabpanel>
    </xui-tabs>
  `,
})
class BasicTabPanelTestComponent {}

@Component({
  selector: "custom-class-test",
  standalone: true,
  imports: [TabsComponent, TabListComponent, TabComponent, TabPanelComponent],
  template: `
    <xui-tabs [defaultValue]="0">
      <xui-tablist>
        <xui-tab [value]="0">Tab 1</xui-tab>
      </xui-tablist>
      <xui-tabpanel [value]="0" className="custom-class">
        Panel Content
      </xui-tabpanel>
    </xui-tabs>
  `,
})
class CustomClassTabPanelTestComponent {}

describe("TabPanel Component", () => {
  it("renders tab panel correctly", () => {
    cy.mount(BasicTabPanelTestComponent);

    cy.get('[role="tabpanel"]')
      .should("exist")
      .and("contain.text", "Panel Content 1");
  });

  it("shows the correct panel when tab is selected", () => {
    cy.mount(BasicTabPanelTestComponent);

    // Click second tab
    cy.get('[role="tab"]').eq(1).click();

    // Second panel should be visible
    cy.get('[role="tabpanel"]').should("contain.text", "Panel Content 2");
  });

  it("renders with custom className", () => {
    cy.mount(CustomClassTabPanelTestComponent);

    cy.get('[role="tabpanel"]').should("have.class", "custom-class");
  });

  it("properly hides inactive panels", () => {
    cy.mount(BasicTabPanelTestComponent);

    // First panel should be visible, second hidden
    cy.get('[role="tabpanel"]').first().should("be.visible");
    cy.get('[role="tabpanel"]').eq(1).should("not.be.visible");
  });
});
