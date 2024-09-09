const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://us-central1-tiktokdownloader-pro.cloudfunctions.net',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Xóa /api khỏi đường dẫn
      },
    })
  );
};
