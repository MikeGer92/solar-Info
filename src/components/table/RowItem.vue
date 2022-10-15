<template>
  <tr>
    <td>{{ String(body.discoveryDate) }}</td>
    <td>{{ body.englishName }}</td>
    <td>{{ body.meanRadius }}</td>
    <td>{{ body.semimajorAxis }}</td>
  </tr>
</template>

<script>
export default {
  name: 'RowItem',
  props: {
    body: {
      type: Object,
      default: () => {}
    }
  }
  }
</script>

<style lang="scss">

</style>