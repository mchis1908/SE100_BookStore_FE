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
    this.isChartReady = true;
  }

  public async getDataLineChart(){
    let sort7days = await this.$store.dispatch(MutationTypes.GET_DATA_SOLD_BOOKS,
    {
      "lastNDays": 7,
    })
    await this.chartData.push(sort7days.data.data)
    this.chart.lineChart.data7Days = this.processDataForLineCharts(this.chartData[0], '7days')
  }

  public processDataForLineCharts(rawData: any[], duration: string) {
    const currentDate = new Date();
    const monthScores: { [key: string]: number } = {};

    if (Array.isArray(rawData)) {
      rawData.forEach((item) => {
        const date = new Date(item.time);
  
        if (duration === '12months') {
          const yearMonth = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit' });
          monthScores[yearMonth] = (monthScores[yearMonth] || 0) + item.value;
        } else {
          const dayMonth = date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
          const label = `${dayMonth}`;
          monthScores[label] = (monthScores[label] || 0) + item.value;
        }
      });
    } else {
      console.error('rawData is not an array.');
    }

    const labels: string[] = [];
    let currentDateCopy = new Date(currentDate);

    if (duration === '12months') {
      for (let i = 0; i < 12; i++) {
        const yearMonth = currentDateCopy.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit' });
        labels.unshift(yearMonth);
        currentDateCopy.setMonth(currentDateCopy.getMonth() - 1);
      }
    } else {
      for (let i = 0; i < parseInt(duration); i++) {
        const dayMonth = currentDateCopy.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
        labels.unshift(dayMonth);
        currentDateCopy.setDate(currentDateCopy.getDate() - 1);
      }
    }

    const data = labels.map((label) => monthScores[label] || 0);
    return {
      label: labels,
      data: data,
    };
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