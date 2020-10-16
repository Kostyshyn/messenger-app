<template>
  <div class="main-wrapper">
    <AuthForm v-bind="form" :fields="fields" />
  </div>
</template>

<script>
// @ is an alias to /src
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
        link: '/login',
        linkText: 'Back',
        showLoading: true,
        redirect: false
      },
      fields: [
        {
          name: 'email',
          type: 'email',
          label: 'Email',
          placeholder: 'Type email',
          model: '',
          errorKey: 'email'
        }
      ]
    };
  },
  computed: {},
  methods: {}
};
</script>
<style lang="scss" scoped></style>
