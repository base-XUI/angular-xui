import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  beforeEach(() => {
    cy.mount(ButtonComponent, {
      imports: [CommonModule],
    });
  });

  it('should create', () => {
    cy.get('button').should('exist');
  });

  it('should render button with secondary variant', () => {
    cy.mount(ButtonComponent, {
      imports: [CommonModule],
      componentProperties: {
        variant: 'secondary',
      },
    });

    cy.get('button').should('have.class', 'bg-gray-600');
    cy.get('button').should('have.class', 'text-white');
    cy.get('button').should('have.class', 'hover:bg-gray-700');
  });

  it('should render button with primary variant', () => {
    cy.mount(ButtonComponent, {
      imports: [CommonModule],
      componentProperties: {
        variant: 'primary',
      },
    });

    cy.get('button').should('have.class', 'bg-blue-600');
    cy.get('button').should('have.class', 'text-white');
    cy.get('button').should('have.class', 'hover:bg-blue-700');
  });

  it('should emit click event when clicked', () => {
    const clickSpy = cy.spy().as('clickSpy');

    cy.mount(ButtonComponent, {
      imports: [CommonModule],
      componentProperties: {
        clicked: {
          emit: clickSpy,
        } as any,
      },
    });

    cy.get('button').click();
    cy.get('@clickSpy').should('have.been.called');
  });
});
