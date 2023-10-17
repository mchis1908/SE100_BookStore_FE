import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Header from '@/components/header/header.vue'
import { MutationTypes } from "@/store/mutation-types";
import Modal from "@/components/modal/modal.vue";
import LineChart from './line-chart/line-chart.vue'

@Options({
  components: {
    MenuDashBoard,
    Header, 
    Modal,
    LineChart
  },
})
export default class DashBoard extends Vue {
  public list:any={
    customers:null,
    books:null,
    invoices:null,
  }
  public isChartReady: any = false
  public userData :any = null
  public chartData :any = []
  public selectedSort: any = {
    lineChart: 0,
  };

  public chart:any={
    lineChart:{
      data7Days:{},
    },
  }

  public beforeMount(){
    this.getData();
  }

  public async getData(){
    this.userData = this.$store.state.userData
    await this.getDataLineChart();
    await this.getTop10Customer();
    await this.getLast10Invoices();
    console.log(this.list.customers)
    this.isChartReady = true;
  }

  public async getDataLineChart(){
    // let sort7days = await this.$store.dispatch(MutationTypes.GET_LINE_CHART_POSITIVE,
    //   {
    //     "user_id": this.learnerId,
    //     "day": 7,
    //   })
    // await this.lineChartData.push(sort7days.data)

    // let sort30days = await this.$store.dispatch(MutationTypes.GET_LINE_CHART_POSITIVE,
    //   {
    //     "user_id": this.learnerId,
    //     "day": 30,
    //   })
    //   await this.lineChartData.push(sort30days.data)

    // let sort12months = await this.$store.dispatch(MutationTypes.GET_LINE_CHART_POSITIVE_MONTH,
    //   {
    //     "user_id": this.learnerId,
    //   })
    // await this.lineChartData.push(sort12months.data)
    // this.data7Days = this.processDataForCharts(this.lineChartData[0], '7days')
    // this.data30Days = this.processDataForCharts(this.lineChartData[1], '30days')
    // this.data12Months = this.processDataForCharts(this.lineChartData[2], '12months')
    this.chart.lineChart.data7Days = {
      label: ['1', '2', '3', '4', '5', '6', '7'],
      data: [1,2,3,4,5,5,3],
    }
  }

  public async getTop10Customer(){
    const payload = { 
      page: 1,
      limit: 10,
    };
    const res = await this.$store.dispatch(
      MutationTypes.GET_TOP_10_CUSTOMER,
      payload
    );
    if(res.status ===200){
      this.list.customers= res.data.data
    }
  }

  public async getLast10Invoices(){
    const payload = { 
      page: 1,
      limit: 10,
    };
    const res = await this.$store.dispatch(
      MutationTypes.GET_ALL_INVOICES,
      payload
    );
    if(res.status ===200){
      this.list.invoices= res.data.data
    }
  }
  
  public mounted(){
  }
}