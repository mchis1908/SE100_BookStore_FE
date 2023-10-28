<template>
    <Doughnut ref="doughnut" height="150" id="doughnut-chart" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Doughnut } from "vue-chartjs";
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend 
} from 'chart.js'

ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend
)

export default {
  components: { Doughnut },
  props: {
    data: Object,
    sortIndex: Number
  },
  watch: {
    sort(newSort, oldSort) {
      this.sortValue = newSort
    }
  },
  data() {
    return {
      chartData: {
        labels: this.data.label,
        datasets: [
          {
            backgroundColor: ['#EEA990', '#F6E0B5', '#B2D7E9', '#718E4C', '#FFB8E4', '#3A6B8B', '#133C3E', '#F2819B', '#FFB8E4', '#252645', '#66545E', '#A39193','#AA6F73'],
            data: this.data.data,
          }
        ]
      },
      chartOptions: {
        responsive: true,
        clip: false,
        plugins: {
            legend: {
                display: false,
            },
        },
      }
    }
  }
}
</script>
