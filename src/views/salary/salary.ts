import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Header from '@/components/header/header.vue'
import Loading from "@/components/loading/loading.vue";
import { MutationTypes } from "@/store/mutation-types";
import { toast } from "vue3-toastify";
@Options({
  components: {
    MenuDashBoard,
    Header,
    Loading
  },
  watch: {
    selectedMonth: {
      handler: async function (val: any, oldVal: any) {
          await this.fetchSalaryList()
          if (this.salaryList.length === 0) {
            let payload: any = {
              month: this.selectedMonth.split('-')[1],
              year: this.selectedMonth.split('-')[0],
              forceWorkingDays: 0,
              employees: []
            }
        
            await this.employeeList.forEach((employee: any) => {
              payload.employees.push({
                employee: employee._id,
                workingDays: 0,
                total: 0
              })
            })

            let response = await this.$store.dispatch(MutationTypes.CREATE_INIT_SALARY, payload)
            if (response.status === 200) {
              await this.fetchSalaryList()
            }
          }
      }, deep: true
    }
  }
})
export default class Salary extends Vue {
  public salaryList: any = []
  public requiredWorkingDays: number = 0
  public isShowButtonSave: boolean = false
  public selectedMonth: any = `${new Date().getFullYear()}-${new Date().getMonth() + 1}`
  public employeeList: any = []

  beforeMount(): void {
      this.fetchSalaryList()
      this.fetchEmployeeList()
  }

  public async fetchSalaryList() {
    let response = await this.$store.dispatch(MutationTypes.GET_SALARY, {
      month: this.selectedMonth.split('-')[1], 
      year: this.selectedMonth.split('-')[0]
    })

    if (response.status === 200) {
      this.salaryList = await response.data.data.salary
      this.requiredWorkingDays = await this.salaryList.length === 0 ? 0 : response.data.data.salary[0].forceWorkingDays
    }
  }

  public handleCalculateSalary() {
    this.salaryList.forEach((employee: any) => {
        employee.total = employee.workingDays  / this.requiredWorkingDays * employee.employee.user.salary * (employee.employee.user.salaryScale ? employee.employee.user.salaryScale.coefficient : 1)
    })
    this.isShowButtonSave = true
  }

  public async fetchEmployeeList() {
    let response = await this.$store.dispatch(MutationTypes.GET_EMPLOYEE,  {
      isDeleted: false
    })

    if (response.status === 200) {
      this.employeeList = await response.data.data
    }
  }

  public async handleSaveChanges() {
    let payload: any = {
      month: this.selectedMonth.split('-')[1],
      year: this.selectedMonth.split('-')[0],
      forceWorkingDays: this.requiredWorkingDays,
      employees: []
    }

    await this.salaryList.forEach((employee: any, index: number) => {
      payload.employees.push({
        employee: this.employeeList[index]._id,
        workingDays: employee.workingDays,
        total: employee.total
      })
    })

    let response = await this.$store.dispatch(MutationTypes.CREATE_SALARY, payload) 
    
    if (response.status === 200) {
      toast.success("Save successfully!")
    }
  }
}