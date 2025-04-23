import { NavbarComponent } from './navbar.component';
import { CommonModule } from '@angular/common';

describe('NavbarComponent', () => {
  const menuItems = [
    { label: 'Home', href: '/', active: true },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ];

  it('mounts', () => {
    cy.mount(NavbarComponent, {
      componentProperties: {
        brand: 'Test Brand',
        menuItems: [],
      },
      imports: [CommonModule],
    });
    cy.get('nav').should('exist');
    cy.get('span').should('contain', 'Test Brand');
  });

  it('displays brand name correctly', () => {
    cy.mount(NavbarComponent, {
      componentProperties: {
        brand: 'Angular XUI',
      },
      imports: [CommonModule],
    });
    cy.get('span').should('contain', 'Angular XUI');
  });

  it('renders all menu items', () => {
    cy.mount(NavbarComponent, {
      componentProperties: {
        brand: 'Test Brand',
        menuItems: menuItems,
      },
      imports: [CommonModule],
    });

    // Should render all menu items in desktop view
    cy.get('.hidden.md\\:block a').should('have.length', 4);
    cy.get('.hidden.md\\:block a').eq(0).should('contain', 'Home');
    cy.get('.hidden.md\\:block a').eq(1).should('contain', 'About');
    cy.get('.hidden.md\\:block a').eq(2).should('contain', 'Services');
    cy.get('.hidden.md\\:block a').eq(3).should('contain', 'Contact');
  });

  it('applies active class to active menu item', () => {
    cy.mount(NavbarComponent, {
      componentProperties: {
        variant: 'light',
        menuItems: menuItems,
      },
      imports: [CommonModule],
    });

    // Check if active item has the correct class
    cy.get('.hidden.md\\:block a').eq(0).should('have.class', 'bg-blue-100');
  });

  it('toggles mobile menu when button is clicked', () => {
    cy.mount(NavbarComponent, {
      componentProperties: {
        menuItems: menuItems,
      },
      imports: [CommonModule],
    });

    // Mobile menu should be hidden by default - check the class.hidden attribute exists
    cy.get('.md\\:hidden > div').should('have.class', 'hidden');

    // Click on mobile menu button
    cy.get('button').click();

    // Mobile menu should be visible - check the class.block attribute exists
    cy.get('.md\\:hidden > div').should('have.class', 'block');
    cy.get('.md\\:hidden > div').should('not.have.class', 'hidden');

    // Click again to close
    cy.get('button').click();

    // Mobile menu should be hidden again
    cy.get('.md\\:hidden > div').should('have.class', 'hidden');
    cy.get('.md\\:hidden > div').should('not.have.class', 'block');
  });

  it('applies different styles for dark variant', () => {
    cy.mount(NavbarComponent, {
      componentProperties: {
        variant: 'dark',
        menuItems: menuItems,
      },
      imports: [CommonModule],
    });

    cy.get('nav').should('have.class', 'bg-gray-800');

    // Test dark variant active item
    cy.get('.hidden.md\\:block a').eq(0).should('have.class', 'bg-gray-900');
  });
});
