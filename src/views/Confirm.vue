<template>
  <div class="main-wrapper">
    <div class="auth-form">
      <h1>Your account has been confirmed!</h1>
      <Button color="primary" ripple>
        Go to home page
      </Button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Button from '@/components/General/Helpers/Button.vue';
// import api from '@/services/api';

export default {
  name: 'Confirm',
  components: { Button },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  watch: {},
  mounted() {
    const { token } = this.$route.query;
    console.log(token);
  }
};
</script>
<style lang="scss" scoped></style>
