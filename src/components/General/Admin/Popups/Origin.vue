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
        placeholder="Type origin URL"
        autocomplete="off"
        v-model="origin.origin_url"
        :errors="errors['origin_url']"
      />
      <Field
        v-if="isEdit"
        name="api_key"
        readonly
        v-model="origin.api_key"
        :errors="errors['api_key']"
      />
    </div>
    <div class="origin-popup-footer">
      <Button className="close" color="primary" ripple @click="save">
        Save
      </Button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Field from '@/components/General/Form/Field.vue';
import Button from '@/components/General/Helpers/Button.vue';
import { mapActions } from 'vuex';
import api from '@/services/api';

export default {
  name: 'Origin',
  components: {
    Field,
    Button
  },
  props: {
    popupData: {
      type: Object,
      default: () => {}
    },
    callback: {
      type: Function
    }
  },
  data() {
    return {
      title: 'Origin',
      origin: {
        name: '',
        origin_url: '',
        api_key: ''
      },
      errors: {},
      requestProcessing: false
    };
  },
  computed: {
    isEdit() {
      return !!Object.keys(this.popupData).length;
    }
  },
  methods: {
    ...mapActions({
      close: 'popup/closePopup'
    }),
    async save() {
      try {
        const { name, origin_url } = this.origin;
        await api.createOrigin({
          name,
          origin_url
        });
        this.callback();
        this.$emit('close');
      } catch (err) {
        this.errors = err.errors;
      }
    }
  },
  watch: {},
  mounted() {},
  created() {
    const { isEdit, popupData } = this;
    if (isEdit) {
      this.origin = { ...popupData };
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
    justify-content: center;
    padding: 0 15px 15px 15px;
  }
  @media (max-width: $sm) {
    height: calc(100% - 53px);
    .origin-popup-footer {
      padding-bottom: 15px;
    }
  }
}
</style>
