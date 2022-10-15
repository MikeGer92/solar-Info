<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <select 
      class="select"
      v-model="modelValue"
      @change="changeOption"
      :disabled="disabledSelect"
    >
      <option disabled value="">{{ defValue }}</option>
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
    },
    defValue: {
      type: String,
      default: ''
    },
    disabledSelect: {
      type: Boolean,
      default: false
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
  margin-top: 15px;
  width: 332px;
  border: 2px solid #8e7bea;
  border-radius: 10px;
  height: 37px;
  padding: 5px 15px; 
  color: #8e7bea;
  font-size: 16px;
}

</style>