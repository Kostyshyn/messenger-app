<template>
  <div class="main-wrapper">
    <div class="login-form">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <Field
          name="username"
          placeholder="Username"
          v-model="username"
          :errors="errors['username']"
        />
        <Field
          name="password"
          type="password"
          placeholder="Password"
          v-model="password"
          :errors="errors['password']"
        />
        <Button color="primary" type="submit" ripple>
          Login
        </Button>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Field from '@/components/General/Form/Field.vue';
import Button from '@/components/Helpers/Button.vue';
import api from '@/services/api';

export default {
  name: 'Login',
  components: {
    Field,
    Button
  },
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      errors: {}
    };
  },
  computed: {
    redirect() {
      return this.$route.query.redirect;
    }
  },
  methods: {
    login() {
      const { username, password, redirect } = this;
      if (this.loading) {
        return;
      }
      this.loading = true;
      // prettier-ignore
      api.login({
        username,
        password
      }, redirect).then(() => {
        this.loading = false;
        this.errors = {};
      }).catch(err => {
        this.loading = false;
        this.errors = err.errors
      });
    }
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
.login-form {
  width: 340px;
  padding: 15px;
  margin: 30px auto;
}
</style>
