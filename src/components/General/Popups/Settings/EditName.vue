<template>
  <EditPopup title="Edit name" @save="save" @close="$emit('close')">
    <Field
      name="Type name"
      placeholder="Name"
      autocomplete="off"
      v-model="name"
      :errors="errors['name']"
    />
  </EditPopup>
</template>

<script>
// @ is an alias to /src
import EditPopup from '@/components/Helpers/EditPopup.vue';
import Field from '@/components/General/Form/Field.vue';

export default {
  name: 'EditName',
  components: {
    EditPopup,
    Field
  },
  props: {},
  data() {
    return {
      name: '',
      errors: {
        name: ['test error']
      }
    };
  },
  computed: {},
  methods: {
    save() {
      console.log('save', this.name);
    }
  },
  watch: {},
  mounted() {},
  created() {}
};
</script>
<style lang="scss" scoped></style>
