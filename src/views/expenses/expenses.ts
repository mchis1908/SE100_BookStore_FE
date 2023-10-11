import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Header from '@/components/header/header.vue'
@Options({
  components: {
    MenuDashBoard,
    Header
  },
})
export default class Expenses extends Vue {
  public color:any=[ 'background: #EA5A92', 'background: #19C5A6', 'background: #5097F8', 'background: #FD8238', 'background: #D289E2', 'background: #80BEE4']
}