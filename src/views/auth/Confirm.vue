<template>
  <div class="main-wrapper">
    <div v-if="requested" class="confirm-form">
      <h1>Your account has been confirmed!</h1>
      <Button color="primary" to="/" ripple>
        Go to home page
      </Button>
    </div>
    <div v-if="expiredToken" class="confirm-form">
      <h1>{{ expiredTokenMsg }}</h1>
      <Button v-if="user" color="primary" ripple @click="resendConfirm">
        Re-send the confirmation email
      </Button>
      <Button v-else color="primary" to="/login" ripple>
        Go to login page
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
      expiredToken: false,
      expiredTokenMsg: 'Expired token',
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
      } catch ({ status, errors }) {
        this.requestProcessing = false;
        if (errors && errors.token) {
          this.expiredToken = true;
          this.expiredTokenMsg = errors.token[0];
        } else if (this.redirectStatuses.includes(status)) {
          await this.$router.push(this.defaultRedirect);
        }
        console.log(errors);
      }
    },
    async resendConfirm() {
      if (this.requestProcessing) {
        return;
      }
      try {
        this.requestProcessing = true;
        const { success } = await api.resendConfirm();
        this.requestProcessing = false;
        // TODO: show alert
        alert(
          'Check the email address connected to your account for a confirmation email'
        );
        if (success) {
          await this.$router.push(this.defaultRedirect);
        }
      } catch ({ status, errors }) {
        this.requestProcessing = false;
        if (this.redirectStatuses.includes(status)) {
          await this.$router.push(this.defaultRedirect);
        }
        console.log(errors);
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
