import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Header from '@/components/header/header.vue'
import ModalAddBooks from "./components/modal-add-books/modal-add-books.vue";
@Options({
  components: {
    MenuDashBoard,
    Header,
    ModalAddBooks
  },
})
export default class UserManagement extends Vue {
  public handleAddNewBook() {
    (this.$refs['add-new-books-component'] as any).openModal()
  }
}