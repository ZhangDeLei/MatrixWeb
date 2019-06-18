import * as echarts from 'echarts'

export default {
  name: 'Index',
  data() {
    return {
      activeName: 'first'
    }
  },
  mounted() {
    this.initEcharts()
  },
  methods: {
    initEcharts() {
      var rate = echarts.init(document.getElementById('use_rate'), '', {height: '80px'})
      var time = echarts.init(document.getElementById('use_time'), '', {height: '80px'})
      var store = echarts.init(document.getElementById('store'), '', {height: '80px'})
      var charts = echarts.init(document.getElementById('big-charts'))
      // 使用率
      charts.setOption({
        title: {
          text: '使用趋势',
        },
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      })
      // 耗材库存
      store.setOption({
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: [10, 20, 50, 8, 100, 60, 90, 55, 33, 44],
            show: false
          }
        ],
        yAxis: [
          {
            type: 'value',
            show: false
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 20, 50, 8, 100, 60, 90, 55, 33, 44]
          }
        ]
      })
      // 仪器使用率
      rate.setOption({
        xAxis: {
          show: false,
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu']
        },
        yAxis: {
          show: false,
          type: 'value'
        },
        series: [{
          lineStyle: {color: '#A0DAE4'},
          data: [10, 20, 40, 8],
          type: 'line',
          areaStyle: {
            color: '#E5F6F8'
          },
          smooth: true
        }]
      })

      // 仪器使用时间
      var data = [["2000-06-05", 116], ["2000-06-06", 129], ["2000-06-07", 135], ["2000-06-08", 86], ["2000-06-09", 73], ["2000-06-10", 85], ["2000-06-11", 73], ["2000-06-12", 68], ["2000-06-13", 92], ["2000-06-14", 130], ["2000-06-15", 245], ["2000-06-16", 139], ["2000-06-17", 115], ["2000-06-18", 111], ["2000-06-19", 309], ["2000-06-20", 206], ["2000-06-21", 137], ["2000-06-22", 128], ["2000-06-23", 85], ["2000-06-24", 94], ["2000-06-25", 71], ["2000-06-26", 106], ["2000-06-27", 84], ["2000-06-28", 93], ["2000-06-29", 85], ["2000-06-30", 73], ["2000-07-01", 83], ["2000-07-02", 125], ["2000-07-03", 107], ["2000-07-04", 82], ["2000-07-05", 44], ["2000-07-06", 72], ["2000-07-07", 106], ["2000-07-08", 107], ["2000-07-09", 66], ["2000-07-10", 91], ["2000-07-11", 92], ["2000-07-12", 113], ["2000-07-13", 107], ["2000-07-14", 131], ["2000-07-15", 111], ["2000-07-16", 64], ["2000-07-17", 69], ["2000-07-18", 88], ["2000-07-19", 77], ["2000-07-20", 83], ["2000-07-21", 111], ["2000-07-22", 57], ["2000-07-23", 55], ["2000-07-24", 60]];

      var dateList = data.map(function (item) {
        return item[0];
      });
      var valueList = data.map(function (item) {
        return item[1];
      });
      time.setOption({
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [{
          data: dateList,
          show: false
        }],
        yAxis: [{
          show: false,
          splitLine: {show: false}
        }],
        grid: [{
          bottom: '60%'
        }],
        series: [{
          lineStyle: {color: '#8960E0'},
          type: 'line',
          showSymbol: false,
          data: valueList,
          areaStyle: {
            color: '#8960E0'
          }
        }]
      })
    },
    handleClick() {
    }
  }
}
