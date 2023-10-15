<template>
    <Line v-if="sortIndex === 0" width="770" height="280" ref="line" id="my-chart-id" :options="chartOptions" :data="chartData" />
    <Line v-if="sortIndex === 1" width="3000" height="280" ref="line" id="my-chart-id" :options="chartOptions" :data="chartData" />
    <Line v-if="sortIndex === 2" width="1200" height="280" ref="line" id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  PointElement,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  Filler
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  PointElement,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  Filler
);

export default {
  name: "LineChart",
  components: { Line },
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
      sortValue: this.sort,
      chartData: {
        labels: this.data.label,
        datasets: [
          {
            label: "Level",
            data: this.data.data,
            pointBorderColor: "white",
            borderColor: "#56E8CD",
            pointRadius: 4,
            pointBackgroundColor: "#56E8CD",
            pointBorderWidth: 2,
            pointRadius: 6,
            borderWidth: 4,
            fill: true,
            backgroundColor: (ctx) => {
              const canvas = ctx.chart.ctx;
              const gradient = canvas.createLinearGradient(0, 0, 0, 350);

              gradient.addColorStop(.02, '#56E8CD');
              gradient.addColorStop(1, 'white');

              return gradient;
            },
          },
        ],
      },
      chartOptions: {
        responsive: true,
        clip: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            callbacks: { 
              title: (data) => { 
                if(data[0].parsed.y > 0) { 
                  return data[0].parsed.y
                } else return "0"
              } ,
              label: (data) => { 
                return null
              },
            },
            yAlign: (ctx) => {
              return ctx.tooltipItems[0]?.parsed.y <= 4 ? 'bottom' : 'top'
            },
            padding: {
              top: 10,
              bottom: 0,
              left: 20,
              right: 20
            },
            titleAlign: "center",
            titleFont: {
              weight: "500",
              size: 14,
              family: "Poppins"

            },
            cornerRadius: 10,
            backgroundColor: '#75D473',
            caretPadding: 15,
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max:5,
            ticks: {
              stepSize: 1,
              font: {
                family: "Poppins",
                size: 14
              }
            },
            padding: {
              top: 5
            },
          },
          x: {
            ticks: {
              font: {
                family: "Poppins",
                size: 14
              }
            },
            grid: {
              display: false
            }
          }
        },
      },
    };
  },
};
</script>
