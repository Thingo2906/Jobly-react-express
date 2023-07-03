const webpack = require("webpack");

module.exports = function override(config, env) {
  // Add fallback for 'buffer' module
  config.resolve.fallback = {
    ...config.resolve.fallback,
    buffer: require.resolve("buffer/"),
  };

  // Add fallback for 'crypto' module
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve("crypto-browserify"),
  };
  // Add fallback for 'util' module
  config.resolve.fallback = {
    ...config.resolve.fallback,
    util: require.resolve("util"),
  };

  config.resolve.fallback = {
    ...config.resolve.fallback,
    stream: require.resolve("stream-browserify"),
  };

  config.resolve.fallback = {
    ...config.resolve.fallback,
    stream: require.resolve("readable-stream"),
  };

  // Return the modified webpack config
  return config;
};
