import type { Preview } from "@storybook/angular";
import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
import { moduleMetadata } from '@storybook/angular';
import { ButtonComponent } from '../src/app/components/button/button.component';

const preview: Preview = {
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent],
    }),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

setCompodocJson(docJson);

export default preview;
