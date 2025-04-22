// ***********************************************************
// This is a support file for component testing
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

import { mount } from '@cypress/angular';
import '@cypress/angular';

// Augment the Cypress namespace to include the mount command
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add('mount', mount);
