<template>
  <div class="main-wrapper">
    <AuthForm v-bind="form" :fields="fields" :redirect="redirect">
      <template #form-info>
        Sign in to your account.
        <br />
        <router-link :to="registerLink" class="register-link">
          {{ registerLinkText }}
        </router-link>
      </template>
    </AuthForm>
  </div>
</template>

<script>
// @ is an alias to /src
import AuthForm from '@/components/General/AuthForm.vue';

export default {
  name: 'Login',
  components: { AuthForm },
  data() {
    return {
      form: {
        action: 'login',
        title: 'Login',
        label: 'Login',
        link: '/reset-password',
        linkText: 'Forgot Password?'
      },
      fields: [
        {
          name: 'username',
          type: 'text',
          label: 'Username',
          placeholder: 'Type username',
          model: '',
          errorKey: 'username'
        },
        {
          name: 'password',
          type: 'password',
          label: 'Password',
          placeholder: 'Type password',
          model: '',
          errorKey: 'password'
        }
      ],
      registerLink: '/register',
      registerLinkText: "Don't have an account? Sign up"
    };
  },
  computed: {
    redirect() {
      return this.$route.query.redirect;
    }
  },
  methods: {},
  watch: {}
};
</script>
<style lang="scss" scoped>
.register-link {
  font-size: 16px;
  font-weight: 400;
  color: $primary-font-color;
  text-decoration: none;
}
</style>
