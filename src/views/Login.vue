<template>
  <div class="home">
    <h1>Login</h1>
    <input type="text" v-model="username" placeholder="username" />
    <br />
    <input type="password" v-model="password" placeholder="password" />
    <button @click="click">Login</button>
  </div>
</template>

<script>
// @ is an alias to /src
import api from '@/services/api';

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      username: '',
      password: ''
    };
  },
  computed: {
    redirect() {
      return this.$route.query.redirect;
    }
  },
  methods: {
    click() {
      const { username, password, redirect } = this;
      // prettier-ignore
      api.login({
        username,
        password
      }, redirect).catch(err => {
        console.log(err);
      });
    }
  }
};
</script>
