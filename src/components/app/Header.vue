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
  // max-width: 1920px;
  background: url('@/assets/images/solar2.jpg') 0px calc(-340px + ((1920px - 100vw) * 0.176471))/cover no-repeat;
  &__title {
    padding: 0 5% 13% 5%;
    font-size: 36px;
    text-shadow: #cad5e2 1px 1px 0, #cad5e2 2px 2px 0, 
                 #cad5e2 3px 3px 0, #cad5e2 4px 4px 0, 
                 #cad5e2 5px 5px 0;
  }
}
@media (min-width: 928px) and (max-width: 1340px) {
  .main-block {
    &__title {
      font-size: 28px;
    }
  }
}
@media (min-width: 861px) and (max-width: 927px) {
  .main-block {
    &__title {
      font-size: 28px;
      padding: 0 5% 4% 5%;
    }
  }
}
@media (min-width: 768px) and (max-width: 860px) {
  .main-block {
    &__title {
      font-size: 26px;
      padding: 0 5% 4% 5%;
    }
  }
}
@media (min-width: 581px) and (max-width: 767px) {
  .main-block {
    &__title {
      font-size: 24px;
      padding: 0 5% 4% 5%;
    }
  }
}
@media (min-width: 461px) and (max-width: 580px) {
  .main-block {
    &__title {
      font-size: 18px;
      padding: 0 5% 4% 5%;
    }
  }
}
@media (min-width: 375px) and (max-width: 460px) {
  .main-block {
    &__title {
      font-size: 16px;
      padding: 0 5% 4% 5%;
    }
  }
}
</style>