<template>
  <div class="main-wrapper">
    <AuthForm v-bind="form" :fields="fields" :redirect="redirect" />
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
        link: '/register',
        linkText: 'Create an account'
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
      ]
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
<style lang="scss" scoped></style>
