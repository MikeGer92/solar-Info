<template>
  <div class="main-block">
    <div class="main-block__title">
      <h1>Solar System Info</h1>
    </div>
  </div>
  <router-view/>
</template>

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
.main-block {
  width: 100%;
  max-width: 1920px;
  background: url('@/assets/images/solar2.jpg') 0px -290px/cover no-repeat;
  &__title {
    padding: 20px 150px 280px 0px;
    font-size: 42px;
    text-shadow: #cad5e2 1px 1px 0, #cad5e2 2px 2px 0, 
                 #cad5e2 3px 3px 0, #cad5e2 4px 4px 0, 
                 #cad5e2 5px 5px 0;
  }
}
</style>
