/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const TerserPlugin = require('terser-webpack-plugin');

module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ['.'],
  },
  poweredByHeader: false,
  trailingSlash: false,
  basePath: '',
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/shipments',
        destination: '/',
        permanent: true,
      },
    ];
  },

  webpack: (config) => {
    config.optimization = {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true, // Must be set to true if using source-maps in production
          terserOptions: {
            // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
            mangle: false,
            sourceMap: true,
            // compress: false,
            keep_classnames: /AbortSignal/,
            keep_fnames: /AbortSignal/,
            output: {
              beautify: true,
              indent_level: 1,
            },
          },
        }),
      ],
    };

    return config;
  },
});
