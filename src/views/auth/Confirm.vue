<template>
  <div class="main-wrapper">
    <div v-if="requested" class="confirm-form">
      <h1>Your account has been confirmed!</h1>
      <Button color="primary" to="/" ripple>
        Go to home page
      </Button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import Button from '@/components/General/Helpers/Button.vue';
import api from '@/services/api';

export default {
  name: 'Confirm',
  components: { Button },
  data() {
    return {
      requestProcessing: false,
      requested: false,
      redirectStatuses: [404, 422]
    };
  },
  computed: {
    ...mapGetters({
      loading: 'app/loading',
      user: 'user/user'
    }),
    defaultRedirect() {
      return this.user ? '/' : '/login';
    }
  },
  methods: {
    async confirm(token) {
      if (this.requestProcessing) {
        return;
      }
      try {
        this.requestProcessing = true;
        await api.confirm(token);
        this.requestProcessing = false;
        this.requested = true;
      } catch (err) {
        this.requestProcessing = false;
        if (this.redirectStatuses.includes(err.status)) {
          await this.$router.push(this.defaultRedirect);
        }
        this.requested = true;
        console.log(err);
      }
    }
  },
  watch: {
    loading: {
      immediate: true,
      handler(data) {
        const { token } = this.$route.query;
        if (!data) {
          this.confirm(token);
        }
      }
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.confirm-form {
  width: 340px;
  padding: 15px;
  margin: 30px auto;
  text-align: center;
  @media (max-width: $sm) {
    width: auto;
  }
}
</style>
