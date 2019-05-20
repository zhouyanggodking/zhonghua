module.exports = {
  devServer: {
    proxy: {
      '/': {
        ws: false,
        target: 'http://10.17.16.91:8080',
        // target: 'http://10.17.17.151:8080',
        changeOrigin: true
      }
    }
  }
};
