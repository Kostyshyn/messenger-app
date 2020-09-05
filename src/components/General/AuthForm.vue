<template>
  <div class="auth-form" :class="className">
    <h1>{{ title }}</h1>
    <form @submit.prevent="submit">
      <Field
        v-for="(field, i) in fields"
        :name="field.name"
        :label="field.label"
        :placeholder="field.placeholder"
        v-model="field.model"
        :type="field.type"
        :errors="errors[field.errorKey]"
        :key="i"
      />
      <div class="form-footer">
        <Button color="primary" type="submit" ripple>
          {{ label }}
        </Button>
        <router-link v-if="link" :to="link" class="link">
          {{ linkText }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import Field from '@/components/General/Form/Field.vue';
import Button from '@/components/General/Helpers/Button.vue';
import api from '@/services/api';

export default {
  name: 'AuthForm',
  components: {
    Field,
    Button
  },
  props: {
    action: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'Submit'
    },
    link: {
      type: String,
      default: ''
    },
    linkText: {
      type: String,
      default: ''
    },
    redirect: {
      type: String,
      default: ''
    },
    fields: {
      type: Array,
      required: true
    },
    additionalPayload: {
      type: Object,
      default: () => {}
    },
    className: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      defaultRedirect: '/',
      loading: false,
      errors: {}
    };
  },
  computed: {
    payload() {
      const result = {};
      this.fields.forEach(field => (result[field.name] = field.model));
      return result;
    }
  },
  methods: {
    async submit() {
      const {
        action,
        payload,
        redirect,
        defaultRedirect,
        additionalPayload
      } = this;
      if (this.loading || !api[action]) {
        return;
      }
      try {
        this.loading = true;
        await api[action]({
          ...payload,
          ...additionalPayload
        });
        if (redirect) {
          await this.$router.push(redirect);
        } else {
          await this.$router.push(defaultRedirect);
        }
        this.loading = false;
        this.errors = {};
      } catch (err) {
        this.loading = false;
        this.errors = err.errors;
      }
    }
  },
  watch: {}
};
</script>
<style lang="scss" scoped></style>
