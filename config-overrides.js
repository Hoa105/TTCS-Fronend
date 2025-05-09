module.exports = function override(config, env) {
  if (env === "development") {
    config.devServer = {
      ...config.devServer,
      allowedHosts: "all", // Cho phép tất cả các host
    };
  }
  return config;
};
