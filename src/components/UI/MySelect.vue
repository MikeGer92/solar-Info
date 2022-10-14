<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <select 
      class="select"
      v-model="modelValue"
      @change="changeOption"
    >
      <option disabled value="">Выберите из списка</option>
      <option 
        v-for="option in options" 
        :key="option.value" 
        :value="option.value"
      >
        {{ option.name }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'MySelect',
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeOption(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style lang="scss">
.select {
  margin-top: 17px;
  width: 332px;
  border: 1px solid #8e7bea;
  height: 37px;
  padding: 10px 15px; 
}

</style>