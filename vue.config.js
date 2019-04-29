module.exports = {
  devServer: {
    proxy: {
      '/': {
        target: 'http://10.17.16.91:8080',
        changeOrigin: true
      }
    }
  }
};
