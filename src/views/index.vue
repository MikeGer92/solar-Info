<template>
  <div class="home">
    <div class="home__main">
      <div class="home__main_manage">
        <h3 class="home__main_manage-title">Поиск, сортировка, фильтрация</h3>
        <h3 class="home__main_manage-subtitle">Поис по имени</h3>
        <MyInput 
          v-model="searchQuery"
          :style="{'margin-top': '15px', 'max-width': '300px'}"
          placeholder="Поиск по названию(Английский язык)"
        >
        </MyInput>
        <h3 class="home__main_manage-subtitle">Сортировка</h3>
        <button
          class="home__main_manage-button"
          @click="changeDirect"
        >
          Сортировка {{ direct }}
        </button>
        <MySelect
          :defValue="defSortValue"
          v-model="selectedSort"
          :modelValue="selectedSort"
          :options="sortOptions"
          @mousemove="changeSelectSort"
        >
        </MySelect>
        <h3 class="home__main_manage-subtitle">Фильтрация</h3>
        <MySelect
          :defValue="defFiltValue"
          v-model="selectFilter"
          :modelValue="selectFilter"
          :options="filterOptions" 
        >
        </MySelect>
        <MySelect
          :defValue="defFiltType"
          v-model="typeFilter"
          :modelValue="selectType"
          :options="typeOptions"
          :disabledSelect="!selectFilter"
        >
        </MySelect>
        <MyInput 
          placeholder="Введите значение для фильтации"
          :disable="true"
          v-model="filterQuery"
          :style="{'margin-top': '15px', 'max-width': '300px'}"
          :disabledInput="!typeFilter"
        >
        </MyInput>
        <button
          class="home__main_manage-button"
          @click="clearSelect"
        >
          Сброс сотрировки
        </button>
      </div>
      <InfoTable 
        :bodyList="searchObject"
        :bodyListParams="listParams"
        v-focus
      />
    </div>
    <div class="home__paginate">
      <div class="home__paginate_prev" @click="maxPageDown">&lt;</div>
      <div class="home__paginate_page"
        v-if="page>Math.ceil(totalPages/4)+1"
        :class="{'home__paginate_page': true, 'home__paginate_page_active': page === this.startPage }"
        @click="changePage(startPage)"
      >
        {{ startPage }}</div>
      <div class="home__paginate_page_hide" v-if="page>Math.ceil(totalPages/4)+1">...</div>
      <div class="home__paginate_page"
      v-for="pageNum in pages"
      :key="pageNum"
      :class="{'paginate__page': true, 'home__paginate_page_active': page === pageNum}"
      @click="changePage(pageNum)"
    >
      {{ pageNum }}</div>
      <div class="home__paginate_page_hide" v-if="page<Math.ceil(totalPages - totalPages/4)-1">...</div>
      <div class="home__paginate_page"
        v-if="page<Math.ceil(totalPages - totalPages/4)"
        :class="{'paginate__page': true, 'home__paginate_page_active': page === totalPages }"
        @click="changePage(totalPages)"
      >
        {{ totalPages }}</div>
        <div class="home__paginate_next" @click="maxPageUp">></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import InfoTable from '@/components/table/Table.vue'
import MyInput from '@/components/UI/MyInput.vue'
import MySelect from '@/components/UI/MySelect.vue'
export default {
  name: 'HomePage',
  components: { InfoTable, MyInput, MySelect },
  data() {
    return {
      objects: [],
      page: 1,
      listParams: {
        limit: 10,
        startPos: 0,
        disabled: 1,
      },
      selectedSort: '',
      selectFilter: '',
      selectedFilter: false,
      typeFilter: '',
      addFilter: '',
			sortOptions: [
				{value: 'englishName', name: 'По имени'},
				{value: 'meanRadius', name: 'По количеству'},
				{value: 'semimajorAxis', name: 'По расстоянию'}
      ],
      filterOptions: [
				{value: 'meanRadius', name: 'По количеству'},
				{value: 'semimajorAxis', name: 'По расстоянию'}
      ],
      typeOptions: [
				{value: 'inc', name: 'Содержит'},
				{value: 'eq', name: 'Равно'},
				{value: 'gt', name: 'Больше чем'},
				{value: 'lt', name: 'Меньше чем'}
      ],
      sortDirection: true,
      direct: 'от А до Я',
      searchQuery: '',
      defSortValue: 'Выберите значение для сортировки',
      defFiltValue: 'Выберите значение для фильтрации',
      defFiltType: 'Выберите тип фильтрации',
      filterQuery: '',
      startPage: 1
    }
  },
	watch: { 
    selectedSort(newValue) {
			this.getBodies.sort((obj1, obj2) => {
        if (newValue === 'englishName') {
          if (this.sortDirection) {
            return obj1[newValue].localeCompare(obj2[newValue])
          } else {
            return obj2[newValue].localeCompare(obj1[newValue])
          }
        } else {
          if (this.sortDirection) {
            return obj1[newValue] - obj2[newValue]
          } else {
            return obj2[newValue] - obj1[newValue]
          }
				}
			})
    },
    addFilter(newFil) {
      if (newFil === 'isPlanet') {
        this.objects = this.getBodies.filter(body => body[newFil])
      } else {
        this.objects = this.getBodies.filter(body => body[newFil] === false)
      }
    }
	},
  computed: {
    ...mapGetters(['BODIES']),
    getBodies() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.objects =  this.BODIES
    },
    totalPages() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
     return  this.totalPages = Math.ceil(this.searchObject.length / this.listParams.limit)
    },
    pages() {
      let numShown = Math.ceil((this.totalPages / 2)+1);   // This sets the number of page tabs
      numShown = Math.min(numShown, this.totalPages);
      let first = this.page - Math.floor(numShown / 2);
      first = Math.max(first, 1);
      first = Math.min(first, this.totalPages - numShown + 1);
      return [...Array(numShown)].map((k,i) => i + first);
    },
    searchObject() {
      if (this.searchQuery) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.objects = this.getBodies.filter(obj => obj.englishName.toLowerCase().includes(this.searchQuery.toLowerCase()))
      } else {
        if (this.filterQuery) {
          this.getFiltered(this.selectFilter, this.typeFilter)
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        } else {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.objects = this.getBodies
          
        }
      }
      return this.objects
    },
  },
  beforeMount() {
    this.GET_BODIES()
  },
  mounted() {
  },
  methods: {
    ...mapActions(['GET_BODIES']),
    changePage(num) {
      this.page = num
      this.listParams.startPos = this.listParams.limit * (num-1)
    },
    maxPageUp() {
      if (this.page < this.totalPages ) {
        this.page += 1
        this.listParams.startPos += this.listParams.limit
      } else {
        this.page= this.totalPages
      }
    },
    maxPageDown() {
      if (this.page > 1) {
        this.page -= 1
        this.listParams.startPos -= this.listParams.limit
      } else {
        this.page = 1
      }
    },
    changeSelectSort() {
      this.selectedSort = ''
    },
    clearSelect() {
      this.selectFilter = ''
      this.typeFilter = ''
      this.filterQuery = null
      this.searchObject
    },
    changeDirect() {
      this.sortDirection = !this.sortDirection
      // eslint-disable-next-line no-constant-condition
      if (!this.sortDirection) {
        this.direct = 'от Я до А'
      } else {
        this.direct = 'от А до Я'
      }
      this.selectedSort = ''
    },
    getFiltered(val, typeVal) {
      if (typeVal === 'gt') {
        this.objects = this.getBodies.filter(body => body[val] > this.filterQuery)
      } else {
        if (typeVal === 'lt') {
          this.objects = this.getBodies.filter(body => body[val] < this.filterQuery)
        } else {
          if (typeVal === 'eq') {
            this.objects = this.getBodies.filter(body => body[val] == String(this.filterQuery))
          } else {
            this.objects = this.getBodies.filter(body => String(body[val]).toLowerCase().includes(this.filterQuery.toLowerCase()))
          }
        }
      }
    },
    validate() {
      if (!this.selectFilter || !this.typeFilter) {
        alert('Выберите параметры фильтрации')
        this.filterQuery = null
        this.clearSelect()
      }
    }
  },
}
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__main {
    display: flex;
    width: 90%;
    justify-content: space-around;
    &_manage {
      width: 100%;
      max-width: 450px;
      display: flex;
      flex-direction: column;
      align-items: center;
      &-title {
        font-size: 28px;
        padding: 10px 0 0 0;
      }
      &-subtitle {
        margin-top: 30px;
      }
      &-button {
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
    }
  }
  &__paginate {
    margin: 10px 0 10px 33%;
    display: flex;
    flex-direction: row;
    font-size: 18px;
    flex-wrap: wrap;
    &_page {
      display: flex;
      margin: 0 5px;
      width: 30px;
      height: 30px;
      justify-content: center;
      align-items: center;
      border: 1px solid black;
      padding: 5px;
      &_active {
        border: 2px solid #8e7bea;
        color: #8e7bea;
      }
      &_hide {
        align-self: flex-end;
        margin: 0 5px;
      }
    }
    &_prev, &_next {
      align-self: center;
      font-size: 24px;
      margin: 0 10px;
    }
  }
}
</style>
