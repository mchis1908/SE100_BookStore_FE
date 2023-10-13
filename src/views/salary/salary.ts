import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Header from '@/components/header/header.vue'
@Options({
  components: {
    MenuDashBoard,
    Header
  },
})
export default class Salary extends Vue {
  public employeeSalary: any = []

  beforeMount(): void {
      this.employeeSalary = [
        {
          "name": "Nguyễn Văn A",
          "phone": "0123456789",
          "salary": "10.000.000",
          "workedDays": "20",
        },
        {
          "name": "Nguyễn Văn B",
          "phone": "0123456789",
          "salary": "10.000.000",
          "workedDays": "20",
        },
        {
          "name": "Nguyễn Văn C",
          "phone": "0123456789",
          "salary": "10.000.000",
          "workedDays": "20",
        }
      ]
  }
}