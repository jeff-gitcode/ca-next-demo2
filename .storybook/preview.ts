import type { Preview } from '@storybook/react';
import { getRouter, useRouter } from '@storybook/nextjs/router.mock';
import mockRouter, { useRouter as mockUseRouter } from 'next-router-mock';

import '../src/app/globals.css';

const preview: Preview = {
  // beforeEach: () => {
  //   getRouter().push.mockImplementation(
  //     (...args: Parameters<typeof mockRouter.push>) => mockRouter.push(...args)
  //   );
  //   getRouter().replace.mockImplementation(
  //     (...args: Parameters<typeof mockRouter.replace>) =>
  //       mockRouter.replace(...args)
  //   );
  //   useRouter.mockImplementation(() => mockUseRouter());
  // },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
