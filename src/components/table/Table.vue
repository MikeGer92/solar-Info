<template>
  <div class="table_wrapper">
    <table class="main-table">
      <caption>
        <h3>Информация об объектах Солнечной системы</h3>
      </caption>
      <tr>
        <th
          v-for="col in columns"
          :key="col"
        >
          {{ col }}
        </th>
      </tr>
      <RowItem 
        v-for="item in bodyList.slice(bodyListParams.startPos, bodyListParams.startPos + bodyListParams.limit)" :key="item.name"
        :body="item"
      />
    </table>
  </div>
</template>

<script>
import RowItem from './RowItem.vue';
export default {
  name: "InfoTable",
  props: {
    bodyList: {
        type: Array,
        default: () => []
    },
    bodyListParams: {
      type: Object,
      default: () => {}
    }
  },
  components: { RowItem },
  data() {
    return {
      columns: ['Дата (открытия)', 'Имя объекта', 'Кол-во (радиус), км', 'Расстояние (до планеты), км'],
      start: 0,
      limit: 10
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss">
.table_wrapper {
  display: flex;
  justify-content: center;
}
.main-table {
  width: 900px;
  max-width: 100%;
  background: #f5ffff;
  border-collapse: collapse;
  text-align: left;
  & caption {
    font-size: 24px;
    padding: 10px 5px;
  }
  & th {
    border-top: 1px solid #777777;	
    border-bottom: 1px solid #777777; 
    box-shadow: inset 0 1px 0 #999999, inset 0 -1px 0 #999999;
    background: linear-gradient(#9595b6, #5a567f);
    color: white;
    padding: 10px 15px;
    position: relative;
    &:first-child {
      border-left: 1px solid #777777;	
      border-bottom:  1px solid #777777;
      box-shadow: inset 1px 1px 0 #999999, inset 0 -1px 0 #999999;
    }
    &:last-child {
      border-right: 1px solid #777777;
      border-bottom:  1px solid #777777;
      box-shadow: inset -1px 1px 0 #999999, inset 0 -1px 0 #999999;
    }
  }
  & tr {
    height: 35px;
    &:nth-child(odd) {
      background: #ebf3f9;
    }
  }
  & td {
    border: 1px solid #e3eef7;
    padding: 0px 15px;
    position: relative; 
    font-size: 18px;
    height: 40px;
  }
}
@media (min-width: 461px) and (max-width: 900px) {
  .main-table {
    width: 98%;
    & caption {
      font-size: 18px;
      text-align: center;
    }
    & th {
      padding: 5px;
      font-size: 12px;
      text-align: center;
    }
    & td {
      font-size: 12px;
    }
  }
}
@media (min-width: 375px) and (max-width: 460px) {
  .main-table {
    width: 98%;
    & caption {
      font-size: 18px;
      text-align: center;
    }
    & th {
      padding: 5px;
      font-size: 12px;
      text-align: center;
    }
    & td {
      font-size: 12px;
    }
  }
}
</style>