<template>
  <EditPopup title="Edit name" @save="save" @close="$emit('close')">
    <Field
      name="first_name"
      label="First name"
      placeholder="Type first name"
      autocomplete="off"
      v-model="user.first_name"
      :errors="errors['first_name']"
    />
    <Field
      name="last_name"
      label="Last name"
      placeholder="Type last name"
      autocomplete="off"
      v-model="user.last_name"
      :errors="errors['last_name']"
    />
  </EditPopup>
</template>

<script>
// @ is an alias to /src
import EditPopup from '@/components/Helpers/EditPopup.vue';
import Field from '@/components/General/Form/Field.vue';
import api from '@/services/api';

export default {
  name: 'EditName',
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
        first_name: '',
        last_name: '',
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
