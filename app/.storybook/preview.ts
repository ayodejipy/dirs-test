import { Preview, setup } from '@storybook/vue3';
import { createPinia } from 'pinia';

import { withThemeByClassName } from '@storybook/addon-styling';

/* TODO: update import to your tailwind styles file */
import '../src/asset/main.css';

// register global pinia instance
setup((app) => {
  app.use(createPinia);
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  decorators: [
    // Adds theme switching support.
    // NOTE: requires setting "darkMode" to "class" in your tailwind config
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;
