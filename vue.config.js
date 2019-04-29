module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://49.4.79.11:8666',
        changeOrigin: true
      }
    }
  }
};
