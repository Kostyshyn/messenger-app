<template>
  <Chip flat v-bind="methodStyle" />
</template>

<script>
import Chip from '@/components/General/Helpers/Chip.vue';

export default {
  name: 'MethodChip',
  components: {
    Chip
  },
  props: {
    method: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      methodsHash: {
        GET: {
          label: 'GET',
          color: 'success'
        },
        POST: {
          label: 'POST',
          color: 'warning'
        },
        PUT: {
          label: 'PUT',
          color: 'primary'
        },
        DELETE: {
          label: 'DELETE',
          color: 'error'
        }
      }
    };
  },
  computed: {
    methodStyle() {
      const { method, methodsHash } = this;
      if (methodsHash[method]) {
        return methodsHash[method];
      }
      return {};
    }
  },
  methods: {},
  created() {}
};
</script>
<style lang="scss" scoped></style>
