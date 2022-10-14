<template>
  <div class="home">
    <div class="home__main">
      <div class="home__main_manage">
        <h3 class="home__main_manage-title"></h3>
        <!-- <MySelect
				v-model="selectedSort"
				:options="sortOptions"
				:style="{'margin-right': '15px'}"
			>
			</MySelect> -->
			<MyInput 
				v-model="searchQuery"
				:style="{'margin-right': '15px', 'max-width': '300px'}"
				placeholder="Поиск по названию"
			>
			</MyInput>
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
        v-if="page>8"
        :class="{'home__paginate_page': true, 'home__paginate_page_active': page === this.startPage }"
        @click="changePage(startPage)"
      >
        {{ startPage }}</div>
      <div class="home__paginate_page_hide" v-if="page>9">...</div>
      <div class="home__paginate_page"
      v-for="pageNum in pages"
      :key="pageNum"
      :class="{'paginate__page': true, 'home__paginate_page_active': page === pageNum}"
      @click="changePage(pageNum)"
    >
      {{ pageNum }}</div>
      <div class="home__paginate_page_hide" v-if="page<16">...</div>
      <div class="home__paginate_page"
        v-if="page<17"
        :class="{'paginate__page': true, 'home__paginate_page_active': page === totalPages }"
        @click="changePage(totalPages)"
      >
        {{ totalPages }}</div>
        <div class="home__paginate_next" @click="maxPageUp">></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from 'vuex'
import InfoTable from '@/components/Table.vue'
import MyInput from '@/components/UI/MyInput.vue'
// import MySelect from '@/components/UI/MySelect.vue'
// import  axios  from 'axios'
export default {
  name: 'HomePage',
  components: { InfoTable, MyInput },
  data() {
    return {
      objects: [],
      page: 1,
      listParams: {
        limit: 10,
        startPos: 0,
      },
      selectedSort: '',
			sortOptions: [
				{value: 'id', name: 'По номеру'},
				{value: 'title', name: 'По названию'},
				{value: 'body', name: 'По описанию'},
				{value: 'date', name: 'По дате'}
			],
			searchQuery: '',

      // totalPages: 24,
      startPage: 1
    }
  },
  watch: {

  },
  computed: {
    ...mapGetters(['BODIES']),
    getBodies() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.objects = this.BODIES
    },
    // eslint-disable-next-line vue/return-in-computed-property
    totalPages() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
     return  this.totalPages = Math.ceil(this.getBodies.length / this.listParams.limit)
    },
    pages() {
      let numShown = 15;   // This sets the number of page tabs
      numShown = Math.min(numShown, this.totalPages);
      let first = this.page - Math.floor(numShown / 2);
      first = Math.max(first, 1);
      first = Math.min(first, this.totalPages - numShown + 1);
      return [...Array(numShown)].map((k,i) => i + first);
    },
    searchObject() {
			return this.getBodies.filter(obj => obj.englishName.toLowerCase().includes(this.searchQuery.toLowerCase()))
		}
  },
  mounted() {
    this.GET_BODIES()
  },
  methods: {
    ...mapActions(['GET_BODIES']),
    changePage(num) {
      this.page = num
      this.listParams.startPos = this.listParams.limit * (num-1)
      console.log(num)
      console.log(this.listParams.limit)
      console.log(this.listParams.startPos)
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
      max-width: 400px;
      display: flex;
      flex-direction: column;
    }
  }
  &__paginate {
    margin: 20px 0;
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
