module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://10.10.25.114:8082',
        changeOrigin: true
      }
    }
  }
};
