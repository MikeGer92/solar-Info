<template>
  <input 
    :value="modelValue"
    @input="updateInput" 
    type="text" 
    class="input"
    :disabled="disabledInput"
  />
</template>

<script>
export default {
  name: 'MyInput',
  props: {
    modelValue: [String, Number],
  disabledInput: {
      type: Boolean,
      default: false
    }

  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }

}
</script>

<style lang="scss">
.input {
	width: 100%;
	padding: 8px 14px;
	border: 2px solid #8e7bea;
  border-radius: 10px;
  color: #8e7bea;
  font-size: 16px;
  &:focus {
    border: 2px solid #8e7bea;
  }
}
</style>