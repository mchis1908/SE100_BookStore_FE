import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Header from '@/components/header/header.vue'
import { MutationTypes } from "@/store/mutation-types";
import { toast } from "vue3-toastify";
@Options({
  components: {
    MenuDashBoard,
    Header
  },
})
export default class Salary extends Vue {
  public employeeList: any = []
  public requiredWorkingDays: number = 0
  public isShowButtonSave: boolean = false

  beforeMount(): void {
      this.fetchEmployeeList()
  }

  public async fetchEmployeeList() {
    let response = await this.$store.dispatch(MutationTypes.GET_EMPLOYEE)

    if (response.status === 200) {
      this.employeeList = await response.data.data
    }

    console.log("employeeList: ", this.employeeList)
  }

  public handleCalculateSalary() {
    this.employeeList.forEach((employee: any) => {
        employee.monthSalary = employee.workedDays  / this.requiredWorkingDays * employee.user.salary * (employee.user.salaryScale ? employee.user.salaryScale.coefficient : 1)
    })
    this.isShowButtonSave = true
  }

  public async handleSaveChanges() {
    this.employeeList.forEach(async (employee: any) => {
      let response = await this.$store.dispatch(MutationTypes.CREATE_SALARY, {
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        workingDays: employee.workedDays,
        forceWorkingDays: this.requiredWorkingDays,
        total: employee.monthSalary,
        employee: employee._id
      })
    })
    toast.success('Save successfully')
  }
}