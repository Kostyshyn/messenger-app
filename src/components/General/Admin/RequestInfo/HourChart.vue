<template>
  <BarChart :chartData="fullChartData" />
</template>

<script>
// @ is an alias to /src
import BarChart from '@/components/General/Helpers/Charts/BarChart.js';
import chartHelpers from '@/components/General/Admin/RequestInfo/mixins/chartHelpers';
import { range } from '@/utils/math';

export default {
  name: 'HourChart',
  components: {
    BarChart
  },
  mixins: [chartHelpers],
  props: {
    chartData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      label: 'Requests per hour',
      options: {
        backgroundColor: 'rgba(255, 207, 64, 0.5)',
        borderColor: 'rgb(255, 207, 64)',
        borderWidth: 1
      }
    };
  },
  computed: {
    defTimeRange() {
      return [...range(6, 23), ...range(0, 5)];
    },
    labels() {
      return this.defTimeRange.map(n => {
        return this.$moment()
          .hour(n)
          .startOf('hour')
          .format('HH:mm');
      });
    }
  },
  methods: {},
  watch: {},
  created() {}
};
</script>
<style scoped lang="scss"></style>
