import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-webpack5-compiler-swc'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  webpackFinal: async (config, { configType }) => {
    const streamBrowserify = (await import('stream-browserify')).default ?? require.resolve('stream-browserify');
    return {
      ...config,
      resolve: {
        ...config.resolve,
        fallback: {
          ...config.resolve.fallback,
          stream: streamBrowserify//(await import('stream-browserify')).default ?? 'stream-browserify'//require.resolve('stream-browserify')
        },
        alias: {
          ...config.resolve.alias
          // 'react/jsx-runtime': require.resolve('react/jsx-runtime'),
        }
      },
      devtool: 'inline-source-map',
      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
          {
            test: /\.(woff|woff2|eot|ttf|otf|svg|png|gif|ico)$/,
            type: 'asset/resource'
          },
          {
            test: /\.xml$/,
            type: 'asset/source'
          }
        ]
      }
    };
  }
};
export default config;
