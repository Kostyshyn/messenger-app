<template>
  <div class="main-wrapper">
    <AuthForm v-bind="form" :fields="fields" @onSuccess="onSuccess" />
  </div>
</template>

<script>
// @ is an alias to /src
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
        // link: '/login',
        // linkText: 'Back to login',
        showLoading: true
      },
      fields: [
        {
          name: 'current_password',
          type: 'password',
          label: 'Current password',
          placeholder: 'Type password',
          model: '',
          errorKey: 'current_password'
        },
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
