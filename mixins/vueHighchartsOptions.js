export default {
  computed: {
    vueHighchartsOptions() {
      return {
        chart: {
          type: 'spline',
          backgroundColor: 'transparent'
        },
        title: {
          text: ''
        },
        xAxis: {
          labels: {
            style: {
              fontSize: '12px'
            }
          },
          title: {
            text: '年度(年)'
          },
          type: 'datetime',
          categories: this.getAllYears,
          lineWidth: 2
        },
        yAxis: {
          title: {
            text: '人口数(人)'
          },
          labels: {
            formatter: function() {
              return this.value.toLocaleString()
            }
          },
          lineWidth: 2
        },
        responsive: {
          rules: [
            {
              condition: {
                maxheight: 400
              },
              chartOptions: {
                legend: {
                  layout: 'vertical',
                  align: 'right',
                  verticalAlign: 'top'
                }
              }
            }
          ]
        },
        tooltip: {
          crosshairs: true,
          shared: true,
          useHTML: true,
          formatter() {
            return this.points.map(point => {
              return `
                <i style="
                  background-color:${point.color};
                  border-radius:50%;
                  display: inline-block;
                  height:6px;
                  margin-right:4px;
                  width:6px;"
                ></i>${
                  point.series.name
                }: <b>${point.y.toLocaleString()}</b><br>`
            })
          }
        },
        credits: {
          enabled: false
        },
        series: []
      }
    }
  }
}
