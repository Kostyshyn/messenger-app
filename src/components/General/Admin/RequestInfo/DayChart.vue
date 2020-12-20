<template>
  <BarChart :chartData="fullChartData" />
</template>

<script>
// @ is an alias to /src
import BarChart from '@/components/General/Helpers/Charts/BarChart.js';
import chartHelpers from '@/components/General/Admin/RequestInfo/mixins/chartHelpers';
import { range } from '@/utils/math';

export default {
  name: 'DayChart',
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
      label: 'Requests per day',
      options: {
        backgroundColor: 'rgba(99, 225, 118, 0.5)',
        borderColor: 'rgb(99, 225, 118)',
        borderWidth: 1
      }
    };
  },
  computed: {
    defTimeRange() {
      return range(0, 6);
    },
    labels() {
      return this.defTimeRange.map(n => {
        return this.$moment()
          .day(n)
          .format('dddd');
      });
    }
  },
  methods: {},
  watch: {},
  created() {}
};
</script>
<style scoped lang="scss"></style>
