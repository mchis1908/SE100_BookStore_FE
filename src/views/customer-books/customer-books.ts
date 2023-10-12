import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Header from '@/components/header/header.vue'
import BookPage from '@/components/book-page/book-page.vue'
@Options({
  components: {
    MenuDashBoard,
    Header,
    BookPage
  },
})
export default class Invoices extends Vue {

}