<template>
    <Bar v-if="sortIndex === 0"  width="750" ref="bar" id="bar-chart" :options="chartOptions" :data="chartData" />
    <Bar v-if="sortIndex === 1"  width="3000" height="270" ref="bar" id="bar-chart" :options="chartOptions" :data="chartData" />
    <Bar v-if="sortIndex === 2"  width="750" ref="bar" id="bar-chart" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  components: { Bar },
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
            data: this.data.data
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
