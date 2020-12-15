<template>
  <div class="request-info-wrapper">
    <h1>Request: {{ request.url }}</h1>
    <ul>
      <li>
        Original url <b>{{ request.originalUrl }}</b>
      </li>
      <li>
        IP address <b>{{ request.ip }}</b>
      </li>
    </ul>
    <BarChart :chartData="dayChartData" />
    <BarChart :chartData="hourChartData" />
    <RequestOriginsTable :origins="requestOrigins" />
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex';
import api from '@/services/api';
import RequestOriginsTable from '@/components/General/Admin/Panels/RequestInfo/RequestOriginsTable.vue';
import BarChart from '@/components/General/Admin/Panels/Charts/BarChart.js';
import { range } from '@/utils/math';

export default {
  name: 'RequestInfo',
  components: {
    RequestOriginsTable,
    BarChart
  },
  data() {
    return {
      request: {},
      meta: {},
      requestProcessing: false
    };
  },
  computed: {
    ...mapGetters({
      loggedIn: 'user/loggedIn'
    }),
    requestOrigins() {
      const { perOrigin } = this.meta;
      if (perOrigin) {
        return perOrigin.map(stat => {
          return {
            ...stat,
            origin: stat._id.origin.name,
            isDefault: stat._id.origin.isDefault
          };
        });
      }
      return [];
    },
    dayChartData() {
      const { perDay } = this.meta;
      const defDayNums = range(0, 6);
      const labels = defDayNums.map(n => {
        return this.$moment()
          .day(n)
          .format('dddd');
      });
      const data = [];
      if (perDay) {
        const dayNums = perDay.map(s => s._id);
        const requests = perDay.map(s => s.total);
        for (const i of defDayNums) {
          const index = dayNums.indexOf(i);
          if (index !== -1) {
            data.push(requests[index]);
          } else {
            data.push(0);
          }
        }
      }
      return {
        labels,
        datasets: [
          {
            label: 'Requests per day',
            backgroundColor: 'rgba(99, 225, 118, 0.5)',
            borderColor: 'rgb(99, 225, 118)',
            borderWidth: 1,
            data
          }
        ]
      };
    },
    hourChartData() {
      const { perHour } = this.meta;
      // const defHourNums = range(0, 23);
      const defHourNums = [...range(6, 23), ...range(0, 5)];
      const labels = defHourNums.map(n => {
        return this.$moment()
          .hour(n)
          .startOf('hour')
          .format('HH:mm');
      });
      const data = [];
      if (perHour) {
        const dayNums = perHour.map(s => s._id);
        const requests = perHour.map(s => s.total);
        for (const i of defHourNums) {
          const index = dayNums.indexOf(i);
          if (index !== -1) {
            data.push(requests[index]);
          } else {
            data.push(0);
          }
        }
      }
      return {
        labels,
        datasets: [
          {
            label: 'Requests per hour',
            backgroundColor: 'rgba(255, 207, 64, 0.5)',
            borderColor: 'rgb(255, 207, 64)',
            borderWidth: 1,
            data
          }
        ]
      };
    }
  },
  methods: {
    ...mapActions({}),
    async getRequest(id) {
      if (this.requestProcessing) {
        return;
      }
      try {
        this.requestProcessing = true;
        const { requestLog, meta } = await api.getRequest(id);
        this.request = requestLog;
        this.meta = meta;
      } catch (err) {
        console.log(err);
      } finally {
        this.requestProcessing = false;
      }
    }
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler: 'getRequest'
    }
  },
  created() {}
};
</script>
<style scoped lang="scss"></style>
