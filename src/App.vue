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


</style>
