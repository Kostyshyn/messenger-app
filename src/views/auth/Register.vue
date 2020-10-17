<template>
  <div class="main-wrapper">
    <AuthForm v-bind="form" :fields="fields">
      <template #form-info>
        Create your account.
      </template>
    </AuthForm>
  </div>
</template>

<script>
// @ is an alias to /src
import AuthForm from '@/components/General/AuthForm.vue';

export default {
  name: 'Register',
  components: { AuthForm },
  data() {
    return {
      form: {
        action: 'register',
        className: 'register-form',
        title: 'Register',
        label: 'Register',
        link: '/login',
        linkText: 'Sign in if you already have an account',
        showLoading: true
      },
      fields: [
        {
          name: 'first_name',
          type: 'text',
          label: 'First name',
          placeholder: 'Type first name',
          model: '',
          errorKey: 'first_name'
        },
        {
          name: 'last_name',
          type: 'text',
          label: 'Last name',
          placeholder: 'Type last name',
          model: '',
          errorKey: 'last_name'
        },
        {
          name: 'username',
          type: 'text',
          label: 'Username',
          placeholder: 'Type username',
          model: '',
          errorKey: 'username'
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email',
          placeholder: 'Type email',
          model: '',
          errorKey: 'email'
        },
        {
          name: 'password',
          type: 'password',
          label: 'Password',
          placeholder: 'Type password',
          model: '',
          errorKey: 'password'
        }
      ]
    };
  },
  computed: {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.register-form {
  margin: 0 auto;
}
</style>
