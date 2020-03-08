<template>
  <div class="contact-list">
    <h1>Contacts</h1>
    <button>Add new</button>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from 'vuex';

export default {
  name: 'ContactList',
  components: {},
  props: {
    contacts: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    ...mapActions({
      close: 'app/closePopup'
    })
  },
  watch: {},
  mounted() {},
  created() {
    console.log(this.contacts);
  }
};
</script>
<style lang="scss" scoped>
.contact-list {
  height: 500px;
  padding: 15px;
}
</style>
