<template>
  <div class="main-wrapper">
    <AuthForm
      v-bind="form"
      :fields="fields"
      :additionalPayload="additionalPayload"
      @onSuccess="onSuccess"
      @onError="onError"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import AuthForm from '@/components/General/AuthForm.vue';

export default {
  name: 'ChangePassword',
  components: { AuthForm },
  data() {
    return {
      form: {
        action: 'changePassword',
        className: 'change-password-form',
        title: 'Change password',
        label: 'Send',
        showLoading: true,
        redirect: false
      },
      fields: [
        {
          name: 'password',
          type: 'password',
          label: 'New password',
          placeholder: 'Type password',
          model: '',
          errorKey: 'password'
        },
        {
          name: 'confirm_password',
          type: 'password',
          label: 'Confirm password',
          placeholder: 'Type password',
          model: '',
          errorKey: 'confirm_password'
        }
      ],
      defFormLink: {
        link: '/login',
        linkText: 'Back to login'
      },
      homeFormLink: {
        link: '/',
        linkText: 'Back to home page'
      },
      tokenErrorFormLink: {
        link: '/reset-password',
        linkText: 'Re-send the email'
      }
    };
  },
  computed: {
    ...mapGetters({
      loading: 'app/loading',
      user: 'user/user'
    }),
    defaultRedirect() {
      return this.user ? '/' : '/login';
    },
    generalFormLink() {
      const { defFormLink, homeFormLink } = this;
      return this.user ? homeFormLink : defFormLink;
    },
    token() {
      return this.$route.query.token;
    },
    additionalPayload() {
      const { token } = this;
      return { token };
    }
  },
  methods: {
    onSuccess() {
      alert('Your password has been changed');
      this.$router.push(this.defaultRedirect);
    },
    onError({ status, errors }) {
      const { generalFormLink, tokenErrorFormLink } = this;
      const tokenError = status === 422 && errors.token;
      const formLink = tokenError ? tokenErrorFormLink : generalFormLink;
      this.form = {
        ...this.form,
        ...formLink
      };
    }
  },
  watch: {
    loading: {
      immediate: true,
      handler(data) {
        if (!data) {
          this.form = {
            ...this.form,
            ...this.generalFormLink
          };
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
