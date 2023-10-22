import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Header from '@/components/header/header.vue'
import { MutationTypes } from "@/store/mutation-types";
import Loading from "@/components/loading/loading.vue";
@Options({
  components: {
    MenuDashBoard,
    Header,
    Loading
  },
  watch:{
    time: {
      handler(val, oldVal) {
        this.handleGetData(val?.slice(5,7),val?.slice(0,4));
      },
      deep: true,
    },
  }
})
export default class Invoices extends Vue {
  public isLoading: boolean = false;
  public revenue:any=[]
  public time:any=new Date().toISOString().slice(0, 7);
  public titleRevenue:any=['Selling Books', 'Employee Salary', 'Money For Problem & Spend', 'Total']

  public async beforeMount() {
    this.handleGetData(this.time?.slice(5,7),this.time?.slice(0,4))
  }

  public async handleGetData(month:any, year:any){
    this.isLoading = true;
    await this.getDataExpenses(month, year);
    await this.getDataSalary(month, year);
    await this.getDataSellingBook(month, year);
    this.isLoading = false;
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

  public formatDate(dateString: string) {
    const date: any = new Date(dateString);
    const options: any = { year: 'numeric', month: 'short'};

    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  }
}