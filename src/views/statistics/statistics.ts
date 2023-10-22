import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Header from '@/components/header/header.vue'
import LineChart from './components/line-chart/line-chart.vue'
import BarChart from './components/bar-chart/bar-chart.vue'
import DoughnutChart from './components/doughnut-chart/doughnut-chart.vue'
import { MutationTypes } from "@/store/mutation-types";
@Options({
  components: {
    MenuDashBoard,
    Header,
    DoughnutChart,
    LineChart,
    BarChart
  },
})
export default class Statistics extends Vue {
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

  public dataChart:any={
    lineChart:[],
    barChart:[],
    doughnutChart:[],
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
    await this.getDataDoughnutChart();
    this.isChartReady = true;
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

  public async getDataLineChart(){
    let sort7days = await this.$store.dispatch(MutationTypes.GET_DATA_SOLD_BOOKS,
    {
      "lastNDays": 7,
    })
    await this.dataChart.lineChart.push(sort7days.data.data)

    let sort30days = await this.$store.dispatch(MutationTypes.GET_DATA_SOLD_BOOKS,
    {
      "lastNDays": 30,
    })
    await this.dataChart.lineChart.push(sort30days.data.data)

    let sort12months = await this.$store.dispatch(MutationTypes.GET_DATA_SOLD_BOOKS,
    {
      "lastNMonths": 12,
    })
    await this.dataChart.lineChart.push(sort12months.data.data)
    this.chart.lineChart.data7Days = this.processDataForLineCharts(this.dataChart.lineChart[0], '7days')
    this.chart.lineChart.data30Days = this.processDataForLineCharts(this.dataChart.lineChart[1], '30days')
    this.chart.lineChart.data12Months = this.processDataForLineCharts(this.dataChart.lineChart[2], '12months')
  }

  public async getDataDoughnutChart(){
    let sort7days = await this.$store.dispatch(MutationTypes.GET_DATA_SOLD_BOOKS,
    {
      "lastNDays": 7,
      "byCategory": true,
    })
    await this.dataChart.doughnutChart.push(sort7days.data.data)

    let sort30days = await this.$store.dispatch(MutationTypes.GET_DATA_SOLD_BOOKS,
    {
      "lastNDays": 30,
      "byCategory": true,
    })
    await this.dataChart.doughnutChart.push(sort30days.data.data)

    let sort12months = await this.$store.dispatch(MutationTypes.GET_DATA_SOLD_BOOKS,
    {
      "lastNMonths": 12,
      "byCategory": true,
    })
    await this.dataChart.doughnutChart.push(sort12months.data.data)
    this.chart.doughnutChart.data7Days = this.processDataForDoughnutCharts(this.dataChart.doughnutChart[0], '7days')
    this.chart.doughnutChart.data30Days = this.processDataForDoughnutCharts(this.dataChart.doughnutChart[1], '30days')
    this.chart.doughnutChart.data12Months = this.processDataForDoughnutCharts(this.dataChart.doughnutChart[2], '12months')
    console.log('a',this.chart.doughnutChart)
  }

  public async getDataBarChart(){
    let sort7days = await this.$store.dispatch(MutationTypes.GET_DATA_REVENUE,
    {
      "lastNDays": 7,
    })
    await this.dataChart.barChart.push(sort7days.data.data)

    let sort30days = await this.$store.dispatch(MutationTypes.GET_DATA_REVENUE,
    {
      "lastNDays": 30,
    })
    await this.dataChart.barChart.push(sort30days.data.data)

    let sort12months = await this.$store.dispatch(MutationTypes.GET_DATA_REVENUE,
    {
      "lastNMonths": 12,
    })
    await this.dataChart.barChart.push(sort12months.data.data)
    this.chart.barChart.data7Days = this.processDataForLineCharts(this.dataChart.barChart[0], '7days')
    this.chart.barChart.data30Days = this.processDataForLineCharts(this.dataChart.barChart[1], '30days')
    this.chart.barChart.data12Months = this.processDataForLineCharts(this.dataChart.barChart[2], '12months')
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

  public processDataForDoughnutCharts(rawData: any[], duration: string) {
    let data:any=[];
    let labels:any=[];
    rawData.map((item,index) => {
      data.push(item?.value);
      labels.push(item?.category);
    });
    return {
      label: labels,
      data: data,
    };
  }

  public async handleFilter(item:any, index:any){
    if(item==='lineChart') this.selectedSort.lineChart=index;
    else if(item==='barChart') this.selectedSort.barChart=index;
    else if(item==='doughnutChart') this.selectedSort.doughnutChart=index;
  }
}