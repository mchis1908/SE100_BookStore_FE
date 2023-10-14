import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Header from '@/components/header/header.vue'
@Options({
  components: {
    MenuDashBoard,
    Header
  },
})
export default class Invoices extends Vue {
  public revenue:any=[
    { title: 'Book Sales', cost: 100000},
    { title: 'Employee Salary', cost: 100000},
    { title: 'Money For Problem & Spend', cost: 100000},
    { title: 'Revenue Total', cost: 100000},
  ]
}