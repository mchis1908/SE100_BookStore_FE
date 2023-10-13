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
  public isChartReady: any = false
  public showModalSort: any = {
    lineChart: false,
    barChart: false,
    doughnutChart: false,
  }
  public userData :any = null
  public chartData :any = []
  public sortList: any = {
    lineChart:[],
    barChart:[],
    doughnutChart:[],
  }
  public selectedSort: any = {
    lineChart: 0,
    barChart: 0,
    doughnutChart: 0,
  };
  public chart:any={
    lineChart:{
      data7Days:{},
      data30Days:{},
      data12Months:{}
    },
    barChart:{
      data7Days:{},
      data30Days:{},
      data12Months:{}
    },
    doughnutChart:{
      data7Days:{},
      data30Days:{},
      data12Months:{}
    },
  }

  public beforeMount(){
    this.userData = this.$store.state.userData
    this.getData();
    this.handleFilter('', '');
  }

  public async getData(){
    this.sortList = {
      lineChart:[
        "Last 7 days",
        "Last 30 days",
        "Last 12 months"
      ],
      barChart:[
        "Last 7 days",
        "Last 30 days",
        "Last 12 months"
      ],
      doughnutChart:[
        "Last 7 days",
        "Last 30 days",
        "Last 12 months"
      ],
    }
    await this.getDataLineChart();
    // await this.getDataBarChart();
    // await this.getDataDoughnutChart();
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
    this.chart.lineChart.data30Days = {
      label: ['1', '2', '3', '4', '5', '6', '7'],
      data: [1,2,3,4,5,5,3],
    }
    this.chart.lineChart.data12Months = {
      label: ['1', '2', '3', '4', '5', '6', '7'],
      data: [1,2,3,4,5,5,3],
    }
    console.log(this.chart.lineChart);
    console.log(this.chart?.lineChart?.data7Days)
  }
  
  public unmounted() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  public mounted(){
    document.addEventListener('click', this.handleClickOutside);
  }

  public handleClickOutside = (event: any) => {
    if (this.showModalSort.lineChart && !event.target.closest('.filter')) {
      this.showModalSort.lineChart = false;
    }else if (this.showModalSort.barChart && !event.target.closest('.filter')) {
      this.showModalSort.barChart = false;
    }else if (this.showModalSort.doughnutChart && !event.target.closest('.filter')) {
      this.showModalSort.doughnutChart = false;
    }
  };

  public async handleFilter(item:any, index:any){
    if(item==='lineChart') this.selectedSort.lineChart=index;
    else if(item==='barChart') this.selectedSort.barChart=index;
    else if(item==='doughnutChart') this.selectedSort.doughnutChart=index;
  }
}