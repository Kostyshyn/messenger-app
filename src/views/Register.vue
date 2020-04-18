<template>
  <div class="main-wrapper">
    <h1>Register</h1>
    <input type="text" v-model="first_name" placeholder="first name" />
    <br />
    <input type="text" v-model="last_name" placeholder="last name" />
    <br />
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
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: ''
    };
  },
  computed: {},
  methods: {
    click() {
      const { first_name, last_name, username, email, password } = this;
      // prettier-ignore
      api.register({
        first_name,
        last_name,
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
