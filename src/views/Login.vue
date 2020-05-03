<template>
  <div class="main-wrapper">
    <div class="login-form">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <Field
          name="username"
          label="Username"
          placeholder="Type username"
          v-model="username"
          :errors="errors['username']"
        />
        <Field
          name="password"
          label="Password"
          type="password"
          placeholder="Type password"
          v-model="password"
          :errors="errors['password']"
        />
        <div class="form-footer">
          <Button color="primary" type="submit" ripple>
            Login
          </Button>
          <router-link to="/register" class="link">Create account</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Field from '@/components/General/Form/Field.vue';
import Button from '@/components/General/Helpers/Button.vue';
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
    async login() {
      const { username, password, redirect } = this;
      if (this.loading) {
        return;
      }
      try {
        this.loading = true;
        await api.login(
          {
            username,
            password
          },
          redirect
        );
        this.loading = false;
        this.errors = {};
      } catch (err) {
        this.loading = false;
        this.errors = err.errors;
      }
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
  .form-footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .link {
      font-size: 16px;
      font-weight: 400;
      color: $primary-font-color;
      text-decoration: none;
      padding: 5px 10px;
    }
  }
}
</style>
