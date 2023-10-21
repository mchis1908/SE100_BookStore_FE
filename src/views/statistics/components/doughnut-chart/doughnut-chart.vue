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
            // backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
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
