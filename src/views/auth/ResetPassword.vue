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
        linkText: 'Back to login',
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
  methods: {
    onSuccess(res) {
      // TODO: show alert with text "Check the email address connected to your account for a password reset email"
      console.log(res);
    }
  }
};
</script>
<style lang="scss" scoped></style>
