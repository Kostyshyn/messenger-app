<template>
  <div class="auth-form" :class="className">
    <h1>{{ title }}</h1>
    <div class="form-info-text">
      <slot name="form-info" />
    </div>
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
      <div class="form-footer" :class="action">
        <Button color="primary" type="submit" ripple>
          <transition name="fade" mode="out-in" appear>
            <Loader
              v-if="showLoading && loading"
              className="button-loader"
              loading
            />
            <span v-else>{{ label }}</span>
          </transition>
        </Button>
        <router-link v-if="link" :to="link" class="link">
          {{ linkText }}
        </router-link>
      </div>
      <div class="form-bottom" :class="action">
        <slot name="form-bottom" />
      </div>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import Field from '@/components/General/Form/Field.vue';
import Button from '@/components/General/Helpers/Button.vue';
import Loader from '@/components/General/Helpers/Loader.vue';
import api from '@/services/api';

export default {
  name: 'AuthForm',
  components: {
    Field,
    Button,
    Loader
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
      type: [String, Boolean],
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
    },
    showLoading: {
      type: Boolean,
      default: false
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
        const res = await api[action]({
          ...payload,
          ...additionalPayload
        });
        if (redirect) {
          await this.$router.push(redirect);
        } else if (typeof redirect !== 'boolean' && redirect !== false) {
          await this.$router.push(defaultRedirect);
        } else {
          this.$emit('onSuccess', res);
        }
        this.loading = false;
        this.errors = {};
      } catch (err) {
        this.loading = false;
        this.errors = err.errors;
        this.$emit('onError', err);
      }
    }
  },
  watch: {}
};
</script>
<style lang="scss" scoped></style>
