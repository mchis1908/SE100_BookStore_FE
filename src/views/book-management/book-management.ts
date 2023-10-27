import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Header from '@/components/header/header.vue'
import ModalAddBooks from "./components/modal-add-books/modal-add-books.vue";
import ModalDetailsBook from "./components/modal-details-book/modal-details-book.vue";
import ModalAddCategory from "./components/modal-add-category/modal-add-category.vue";
import { MutationTypes } from "@/store/mutation-types";
import { fixedCurrency } from "@/utils/utils";

@Options({
  components: {
    MenuDashBoard,
    Header,
    ModalAddBooks,
    ModalDetailsBook,
    ModalAddCategory
  },
  methods: {
    fixedCurrency
  },
  watch: {
    searchQuery: {
      handler: function (val: any, oldVal: any) {
          this.fetchBooks()
      }, deep: true
    },
    searchQueryCategory: {
      handler: function (val: any, oldVal: any) {
          this.handleSearchCategory()
      }, 
      deep: true
    },
    currentPage: {
      handler: function (val: any, oldVal: any) {
          this.fetchBooks()
      },
      deep: true
    }, 
    currentPageCategories: {
      handler: function (val: any, oldVal: any) {
          this.handleSearchCategory()
      },
      deep: true
    }
  }
})
export default class UserManagement extends Vue {
  public allBooks: any = []
  public allCategories: any = []
  public bookItem: any = {}
  public searchQuery: string = ''
  public searchQueryCategory: string = ''
  public totalPages: number = 1
  public currentPage: number = 1
  public totalPageCategories: number = 1
  public currentPageCategories: number = 1

  async beforeMount() {
    await this.fetchBooks()
    await this.fetchCategories()
  }

  public handleAddNewBook() {
    (this.$refs['add-new-books-component'] as any).openModal()
  }

  public async fetchBooks() {
     let res = await this.$store.dispatch(MutationTypes.GET_ALL_BOOKS, {
      search_q: this.searchQuery,
      page: this.currentPage
    })

     this.allBooks = res.data.data
     this.totalPages = res.data.totalPages
  }

  public async fetchCategories() {
    let res = await this.$store.dispatch(MutationTypes.GET_ALL_CATEGORIES, {
      search_q: this.searchQueryCategory
    })

    this.totalPageCategories = res.data.totalPages
    this.allCategories = res.data.data
  }

  public handleClickBookRow(index: any) {
    (this.$refs['details-book-component'] as any).openModal()
    this.bookItem = this.allBooks[index]
  }

  public async handleSearchCategory() {
    let res = await this.$store.dispatch(MutationTypes.GET_ALL_CATEGORIES, {
      search_q: this.searchQueryCategory,
      page: this.currentPageCategories
    })

    this.allCategories = res.data.data
  }

  public handleAddNewCategory() {
    (this.$refs['modal-add-category-component'] as any).openModal()
  }
}