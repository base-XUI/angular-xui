import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TabsComponent } from "./Tabs.component";
import { TabComponent } from "../Tab/Tab.component";
import { TabListComponent } from "../TabList/TabList.component";
import { TabPanelComponent } from "../TabPanel/TabPanel.component";
import { CommonModule } from "@angular/common";

describe("Tabs Component", () => {
  let component: TestTabsComponent;
  let fixture: ComponentFixture<TestTabsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Change declarations to imports for standalone components
      imports: [
        CommonModule,
        TabsComponent,
        TabComponent,
        TabListComponent,
        TabPanelComponent,
        TestTabsComponent, // Add the test component to imports instead of declarations
      ],
      // No need for declarations array since all components are standalone
    });

    fixture = TestBed.createComponent(TestTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("renders basic tabs correctly", () => {
    // Your test code
    cy.get("xui-tabs").should("exist");
    cy.get("xui-tablist").should("exist");
    cy.get("xui-tab").should("have.length", 3);
    cy.get("xui-tabpanel").should("exist");
  });

  // Rest of your tests...
});

// Make sure the test component is also standalone
import { Component } from "@angular/core";

@Component({
  selector: "test-tabs",
  template: `
    <xui-tabs [defaultValue]="0">
      <xui-tablist>
        <xui-tab [value]="0">Tab 1</xui-tab>
        <xui-tab [value]="1">Tab 2</xui-tab>
        <xui-tab [value]="2">Tab 3</xui-tab>
      </xui-tablist>
      <xui-tabpanel [value]="0">Content 1</xui-tabpanel>
      <xui-tabpanel [value]="1">Content 2</xui-tabpanel>
      <xui-tabpanel [value]="2">Content 3</xui-tabpanel>
    </xui-tabs>
  `,
  standalone: true,
  imports: [TabsComponent, TabListComponent, TabComponent, TabPanelComponent],
})
class TestTabsComponent {}
