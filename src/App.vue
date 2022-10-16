<template>
  <component :is="layout">
    <router-view/>
  </component>
</template>


<script>
import MainLayout from '@/layouts/MainLayout.vue'
export default {
  components: { MainLayout },
  computed: {
    layout() {
      return (this.$route.meta.layout || 'main') + '-layout'
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
