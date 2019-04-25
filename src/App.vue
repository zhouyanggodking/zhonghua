<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    const skeleton = document.getElementById('skeleton');
    if (skeleton) {
      document.body.removeChild(skeleton);
    }
  }
};
</script>
<style lang="scss">
html, body{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: 'Tahoma', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 16px;
  box-sizing: border-box;
}
</style>
