import type { Preview } from "@storybook/angular";
import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          "Introduction",
          "Installation",
          "Contribution",
          "VersioningStrategy",
        ],
      },
    },
  },
};

setCompodocJson(docJson);

export default preview;
