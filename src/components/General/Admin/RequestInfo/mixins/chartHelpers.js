export default {
  computed: {
    fullChartData() {
      const { generateChartData, labels, label, options } = this;
      const data = generateChartData();
      return {
        labels,
        datasets: [
          {
            label,
            data,
            ...options
          }
        ]
      };
    }
  },
  methods: {
    generateChartData() {
      const { chartData, defTimeRange } = this;
      const data = [];
      const timeRange = chartData.map(s => s._id);
      const requests = chartData.map(s => s.total);
      for (const i of defTimeRange) {
        const index = timeRange.indexOf(i);
        if (index !== -1) {
          data.push(requests[index]);
        } else {
          data.push(0);
        }
      }
      return data;
    }
  }
};
