const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/todo",
    createProxyMiddleware({
      target: "http://3.37.33.149",
      changeOrigin: true,
    })
  );
};
