import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Header from '@/components/header/header.vue'
import { MutationTypes } from "@/store/mutation-types";
@Options({
  components: {
    MenuDashBoard,
    Header
  },
})
export default class Invoices extends Vue {
  public revenue:any=[]

  public titleRevenue:any=['Selling Books', 'Employee Salary', 'Money For Problem & Spend', 'Total']

  public async beforeMount() {
    let thisMonth = new Date().toISOString().slice(0, 10);
    await this.getDataExpenses(thisMonth?.slice(5,7), thisMonth?.slice(0,4));
    await this.getDataSalary(thisMonth?.slice(5,7), thisMonth?.slice(0,4));
    await this.getDataSellingBook(thisMonth?.slice(5,7), thisMonth?.slice(0,4));
    console.log(this.revenue);
  }

  public async getDataSellingBook(month:any, year:any){
    let payload = { 
      month: month,
      year: year,
    };
    let res = await this.$store.dispatch(
      MutationTypes.GET_REVENUE_SELLING_BOOKS,
      payload
    );
    if(res.status ===200){
      this.revenue[0]= res.data.data
    }
  }

  public async getDataSalary(month:any, year:any){
    let payload = { 
      month: month,
      year: year,
    };
    let res = await this.$store.dispatch(
      MutationTypes.GET_SALARY,
      payload
    );
    if(res.status ===200){
      this.revenue[1]= res.data.data
    }
  }

  public async getDataExpenses(month:any, year:any){
    let payload = { 
      month: month,
      year: year,
    };
    let res = await this.$store.dispatch(
      MutationTypes.GET_REVENUE_EXPENSES,
      payload
    );
    if(res.status ===200){
      this.revenue[2]= res.data.data
    }
  }
}