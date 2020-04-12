<template>
  <div class="contact-list">
    <SearchField v-model="keyword" />
    <div class="contact-footer">
      <Button className="close" color="transparent" ripple>
        Add
      </Button>
      <Button className="close" color="transparent" ripple @click="close">
        Close
      </Button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchField from '@/components/Helpers/SearchField.vue';
import Button from '@/components/Helpers/Button.vue';
import { mapActions } from 'vuex';

export default {
  name: 'ContactList',
  components: {
    SearchField,
    Button
  },
  props: {
    contacts: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      title: 'Contacts',
      keyword: ''
    };
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
  height: 400px;
  padding: 0px 15px 5px 15px;
  display: flex;
  flex-direction: column;
  .contact-footer {
    margin-top: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
