<template>
  <div class="main-wrapper">
    <h1>Register</h1>
    <input type="text" v-model="username" placeholder="username" />
    <br />
    <input type="email" v-model="email" placeholder="email" />
    <br />
    <input type="password" v-model="password" placeholder="password" />
    <br />
    <button @click="click">Register</button>
  </div>
</template>

<script>
// @ is an alias to /src
import api from '@/services/api';

export default {
  name: 'Register',
  components: {},
  data() {
    return {
      username: '',
      email: '',
      password: ''
    };
  },
  computed: {},
  methods: {
    click() {
      const { username, email, password } = this;
      // prettier-ignore
      api.register({
        username,
        email,
        password
      }).catch(err => {
        console.log(err);
      });
    }
  }
};
</script>
