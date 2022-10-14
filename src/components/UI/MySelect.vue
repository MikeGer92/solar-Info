<template>
  <div>
    <select 
      class="select"
      v-model="localModelValue"
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
  computed: {
    localModelValue: {
      get() {
        return this.modelValue
      },
    },
    methods: {
      changeOption(event) {
        this.$emit('update:modelValue', event.target.value)
      }
    }

  }
}
</script>

<style lang="scss">
.select {
  border: 1px solid #8e7bea;
  height: 37px;
}

</style>