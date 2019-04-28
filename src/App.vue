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
/* width */
::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.625rem;
  }

// /* Track */
::-webkit-scrollbar-track {
    // background-color: #fff; 
    border-radius: 4px;
    box-shadow: inset 0 0.125rem 0.0625rem 0 rgba(0, 0, 0, 0.05);
}

// // /* Handle */
::-webkit-scrollbar-thumb {
    background-color: #9A8B7B;
    border-radius: 20px;
}

// // /* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background-color: #d8d8d8;
}

::-webkit-scrollbar-corner {
  background: #e6ecee;
}
</style>
