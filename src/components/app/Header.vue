<template>
  <div class="main-block">
    <div class="main-block__title">
      <h1>Объекты Солнечной системы</h1>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MainHeader'
  }
</script>

<style lang="scss">
.main-block {
  width: 100%;
  max-width: 1920px;
  background: url('@/assets/images/solar2.jpg') 0px -340px/cover no-repeat;
  &__title {
    padding: 0px 150px 250px 150px;
    font-size: 36px;
    text-shadow: #cad5e2 1px 1px 0, #cad5e2 2px 2px 0, 
                 #cad5e2 3px 3px 0, #cad5e2 4px 4px 0, 
                 #cad5e2 5px 5px 0;
  }
}

</style>