<template>
  <div>
    <h1>Request: {{ request.url }}</h1>
    <ul>
      <li>
        Original url <b>{{ request.originalUrl }}</b>
      </li>
      <li>
        IP address <b>{{ request.ip }}</b>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex';
import api from '@/services/api';

export default {
  name: 'RequestInfo',
  components: {},
  data() {
    return {
      request: {},
      requestProcessing: false
    };
  },
  computed: {
    ...mapGetters({
      loggedIn: 'user/loggedIn'
    })
  },
  methods: {
    ...mapActions({}),
    async getRequest(id) {
      if (this.requestProcessing) {
        return;
      }
      try {
        this.requestProcessing = true;
        const { requestLog } = await api.getRequest(id);
        this.request = requestLog;
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
