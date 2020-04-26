<template>
  <EditPopup title="Edit username" @save="save" @close="$emit('close')">
    <Field
      name="username"
      placeholder="Type username"
      autocomplete="off"
      v-model="user.username"
      :errors="errors['username']"
    />
  </EditPopup>
</template>

<script>
// @ is an alias to /src
import EditPopup from '@/components/Helpers/EditPopup.vue';
import Field from '@/components/General/Form/Field.vue';
import api from '@/services/api';

export default {
  name: 'EditUsername',
  components: {
    EditPopup,
    Field
  },
  props: {
    userData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      user: {
        username: '',
        ...this.userData
      },
      errors: {}
    };
  },
  computed: {},
  methods: {
    async save() {
      try {
        const { first_name, last_name, username } = this.user;
        await api.updateUser({
          first_name,
          last_name,
          username
        });
        this.$emit('close');
      } catch (err) {
        this.errors = err.errors;
      }
    }
  },
  watch: {},
  mounted() {},
  created() {}
};
</script>
<style lang="scss" scoped></style>
