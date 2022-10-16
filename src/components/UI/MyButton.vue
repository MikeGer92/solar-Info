<template>
  <div>
    <button
      class="home__main_manage-button"
      @click="anyFunc"
    >
      {{ title }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'MyButton',
  props: {
    title: {
      type: [String, Number],
      default: ''
    }
  },
  methods: {
    anyFunc() {
      this.$emit('anyFunc')
      }
  }
}
</script>

<style lang="scss">
button {
  margin-top: 15px;
  width: 332px;
  height: 37px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #8e7bea;
  border: 2px solid #8e7bea;
  font-size: 20px;
  color: #FFF;
  border-radius: 10px;
  padding: 10px;
  border-radius: 10px;
  transition: all 0.2s;
  box-shadow: 0 0 40px 40px #8e7bea inset, 0 0 0 0 #8e7bea;
  cursor:pointer;
  &:hover {
    background: #FFF;
    color: #8e7bea;
    box-shadow: 0 0 10px 0 #8e7bea inset, 0 0 10px 4px #8e7bea;
  }
  &:active{
    transform: scaleX(0.9) translateY(4px);
  }
}

</style>