<template>
  <div class="origin-popup">
    <div class="origin-popup-fields">
      <Field
        name="name"
        placeholder="Type name"
        autocomplete="off"
        v-model="origin.name"
        :errors="errors['name']"
      />
      <Field
        name="origin"
        placeholder="Type origin"
        autocomplete="off"
        v-model="origin.origin"
        :errors="errors['origin']"
      />
      <Field
        name="api_key"
        readonly
        v-model="origin.api_key"
        :errors="errors['api_key']"
      />
    </div>
    <div class="origin-popup-footer">
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
import Field from '@/components/General/Form/Field.vue';
import Button from '@/components/General/Helpers/Button.vue';
import { mapActions } from 'vuex';

export default {
  name: 'Origin',
  components: {
    Field,
    Button
  },
  props: {},
  data() {
    return {
      title: 'Origin',
      origin: {
        name: '',
        origin: '',
        api_key: ''
      },
      errors: {},
      requestProcessing: false
    };
  },
  computed: {},
  methods: {
    ...mapActions({
      close: 'popup/closePopup'
    })
  },
  watch: {},
  mounted() {},
  created() {
    const { originData } = this.$attrs;
    if (originData) {
      this.origin = { ...originData };
    }
  }
};
</script>
<style lang="scss" scoped>
.origin-popup {
  height: auto;
  display: flex;
  flex-direction: column;
  .origin-popup-fields {
    padding: 15px;
  }
  .origin-popup-footer {
    margin-top: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 15px 5px 15px;
  }
  @media (max-width: $sm) {
    height: calc(100% - 53px);
    .origin-popup-footer {
      padding-bottom: 15px;
    }
  }
}
</style>
