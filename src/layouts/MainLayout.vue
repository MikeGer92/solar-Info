<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from '@/components/app/Header.vue'
export default {
  name: 'MainLayout',
  components: { Header }
}
</script>

<style lang="scss">

</style>