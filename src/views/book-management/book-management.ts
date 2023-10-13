import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Header from '@/components/header/header.vue'
import ModalAddBooks from "./components/modal-add-books/modal-add-books.vue";
import ModalDetailsBook from "./components/modal-details-book/modal-details-book.vue";
import { MutationTypes } from "@/store/mutation-types";

@Options({
  components: {
    MenuDashBoard,
    Header,
    ModalAddBooks,
    ModalDetailsBook
  },
})
export default class UserManagement extends Vue {
  public allBooks: any = []
  public bookItem: any = {}

  async beforeMount() {
    await this.fetchBooks()
    console.log("ac", this.allBooks)
  }

  public handleAddNewBook() {
    (this.$refs['add-new-books-component'] as any).openModal()
  }

  public async fetchBooks() {
     let res = await this.$store.dispatch(MutationTypes.GET_ALL_BOOKS)

     this.allBooks = res.data.data
  }

  public handleClickBookRow(index: any) {
    (this.$refs['details-book-component'] as any).openModal()
    this.bookItem = this.allBooks[index]
  }
}