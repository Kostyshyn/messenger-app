<template>
  <div class="main-wrapper">
    <h1>Login</h1>
    <input type="text" v-model="username" placeholder="username" />
    <span v-if="errors['username']">{{ errors['username'][0] }}</span>
    <br />
    <input type="password" v-model="password" placeholder="password" />
    <span v-if="errors['password']">{{ errors['password'][0] }}</span>
    <br />
    <Button color="primary" :loading="loading" ripple @click="login">
      Login
    </Button>
  </div>
</template>

<script>
// @ is an alias to /src
import Button from '@/components/General/Button.vue';
import api from '@/services/api';

export default {
  name: 'Login',
  components: {
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
  }
};
</script>
