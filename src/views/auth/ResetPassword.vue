<template>
  <div class="main-wrapper">
    <AuthForm v-bind="form" :fields="fields" @onSuccess="onSuccess">
      <template #form-info>
        Enter the email address associated with your account and we will send
        you a link to reset your password.
      </template>
    </AuthForm>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import AuthForm from '@/components/General/AuthForm.vue';

export default {
  name: 'ResetPassword',
  components: { AuthForm },
  data() {
    return {
      form: {
        action: 'resetPassword',
        className: 'reset-password-form',
        title: 'Reset password',
        label: 'Send',
        showLoading: true,
        redirect: false
      },
      fields: [],
      defFormLink: {
        link: '/login',
        linkText: 'Back to login'
      },
      homeFormLink: {
        link: '/',
        linkText: 'Back to home page'
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
    }
  },
  methods: {
    onSuccess({ success }) {
      try {
        // TODO: show alert with text "Check the email address connected to your account for a password reset email"
        alert(
          'Check the email address connected to your account for a password reset email'
        );
        if (success) {
          this.$router.push(this.defaultRedirect);
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  watch: {
    loading: {
      immediate: true,
      handler(data) {
        if (!data) {
          const { user, form, generalFormLink } = this;
          this.form = {
            ...form,
            ...generalFormLink
          };
          this.fields = [
            {
              name: 'email',
              type: 'email',
              label: 'Email',
              placeholder: 'Type email',
              model: user ? user.email : '',
              errorKey: 'email'
            }
          ];
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
