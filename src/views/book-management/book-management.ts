import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Header from '@/components/header/header.vue'
import ModalAddBooks from "./components/modal-add-books/modal-add-books.vue";
import ModalDetailsBook from "./components/modal-details-book/modal-details-book.vue";
import ModalAddCategory from "./components/modal-add-category/modal-add-category.vue";
import { MutationTypes } from "@/store/mutation-types";

@Options({
  components: {
    MenuDashBoard,
    Header,
    ModalAddBooks,
    ModalDetailsBook,
    ModalAddCategory
  },
  watch: {
    searchQuery: {
      handler: function (val: any, oldVal: any) {
          this.fetchBooks()
      }
    },
    searchQueryCategory: {
      handler: function (val: any, oldVal: any) {
          this.handleSearchCategory()
      }
    }
  }
})
export default class UserManagement extends Vue {
  public allBooks: any = []
  public allCategories: any = []
  public bookItem: any = {}
  public searchQuery: string = ''
  public searchQueryCategory: string = ''

  async beforeMount() {
    await this.fetchBooks()
    await this.fetchCategories()
  }

  public handleAddNewBook() {
    (this.$refs['add-new-books-component'] as any).openModal()
  }

  public async fetchBooks() {
     let res = await this.$store.dispatch(MutationTypes.GET_ALL_BOOKS, {
      search_q: this.searchQuery
    })

     this.allBooks = res.data.data
  }

  public async fetchCategories() {
    let res = await this.$store.dispatch(MutationTypes.GET_ALL_CATEGORIES, {
      search_q: this.searchQueryCategory
    })

    this.allCategories = res.data.data
  }

  public handleClickBookRow(index: any) {
    (this.$refs['details-book-component'] as any).openModal()
    this.bookItem = this.allBooks[index]
  }

  public async handleSearchBook() {
    let res = await this.$store.dispatch(MutationTypes.GET_ALL_BOOKS, {
      search_q: this.searchQuery
    })

    this.allBooks = res.data.data
  }

  public async handleSearchCategory() {
    let res = await this.$store.dispatch(MutationTypes.GET_ALL_CATEGORIES, {
      search_q: this.searchQueryCategory
    })

    this.allCategories = res.data.data
  }

  public handleAddNewCategory() {
    (this.$refs['modal-add-category-component'] as any).openModal()
  }
}