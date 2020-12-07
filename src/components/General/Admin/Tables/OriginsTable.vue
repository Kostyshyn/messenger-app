<template>
  <div class="origins-table-wrapper">
    <Table
      index
      fixedHeader
      :data="origins.data"
      :columns="columns"
      :requestProcessing="requestProcessing"
      className="origins-table"
      @sort="$emit('sortOrigins', $event)"
    >
      <template #header>
        <div class="origins-table-header">
          <div class="search-origins">
            <SearchField placeholder="Search origins" v-model="keyword" />
          </div>
          <div class="origins-table-header-buttons">
            <Button color="primary" ripple @click="createOrigin">
              <Plus />
              Create
            </Button>
          </div>
        </div>
      </template>
      <template #cell="{ col, cell }">
        <template v-if="col.type === 'date'">
          {{ cell[col.key] | moment('D.MM.YY, H:mm') }}
        </template>
        <template v-else>
          {{ cell[col.key] }}
        </template>
      </template>
      <template #name="{ col, cell }">
        <span :class="{ default: cell.isDefault }">
          {{ cell[col.key] }}
        </span>
      </template>
      <template #totalRequests="{ col, cell }">
        {{ getTotalRequests(cell) }}
      </template>
      <template #options="{ cell }">
        <TableOptions :options="options" @action="action($event, cell)" />
      </template>
    </Table>
  </div>
</template>

<script>
// @ is an alias to /src
import Table from '@/components/General/Helpers/Table/Table.vue';
import SearchField from '@/components/General/Form/SearchField.vue';
import TableOptions from '@/components/General/Admin/Tables/TableOptions.vue';
import Button from '@/components/General/Helpers/Button.vue';
import Plus from 'vue-material-design-icons/Plus.vue';
import { mapActions, mapGetters } from 'vuex';
import api from '@/services/api';
import debounce from '@/utils/debounce';

export default {
  name: 'OriginsTable',
  components: {
    Table,
    SearchField,
    TableOptions,
    Button,
    Plus
  },
  props: {
    origins: {
      type: Object,
      default: () => {}
    },
    requestProcessing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      columns: [
        {
          label: 'Name',
          key: 'name',
          sort: true
        },
        {
          label: 'Origin',
          key: 'origin_url',
          sort: true
        },
        {
          label: 'API key',
          key: 'api_key'
        },
        {
          label: 'Total requests',
          key: 'totalRequests'
        },
        {
          label: 'Created at',
          key: 'createdAt',
          sort: true,
          type: 'date'
        },
        {
          label: 'Updated at',
          key: 'updatedAt',
          sort: true,
          type: 'date'
        },
        {
          key: 'options',
          type: 'options'
        }
      ],
      keyword: '',
      delay: 200,
      options: [
        {
          label: 'Edit',
          type: 'editOrigin',
          icon: 'edit'
        },
        {
          label: 'Delete',
          type: 'deleteOrigin',
          icon: 'delete'
        }
      ]
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({
      openPopup: 'popup/openPopup'
    }),
    searchOrigins() {
      this.$emit('searchOrigins', this.keyword);
    },
    action({ type }, origin) {
      if (type && this[type]) {
        this[type](origin);
      }
    },
    createOrigin() {
      this.openPopup({
        type: 'origin',
        callback: () => {
          this.$emit('updateOrigins');
        }
      });
    },
    editOrigin(origin) {
      this.openPopup({
        type: 'origin',
        data: { ...origin },
        callback: () => {
          this.$emit('updateOrigins');
        }
      });
    },
    async deleteOrigin({ _id }) {
      const confirm = window.confirm('Are you sure you want to delete this?');
      if (confirm) {
        try {
          await api.deleteOrigin(_id);
          this.$emit('updateOrigins');
        } catch ({ errors }) {
          if (errors && errors.isDefault) {
            const [message] = errors.isDefault;
            alert(message);
          }
        }
      }
    },
    getTotalRequests({ _id }) {
      const { meta } = this.origins;
      const originMeta = meta.find(o => o._id === _id);
      if (originMeta) {
        return originMeta.total;
      }
      return 0;
    }
  },
  watch: {
    keyword() {
      this.debouncedSearchOrigins();
    }
  },
  created() {
    this.debouncedSearchOrigins = debounce(this.searchOrigins, this.delay);
  }
};
</script>
<style scoped lang="scss">
.origins-table-wrapper {
  .origins-table {
    .origins-table-header {
      display: flex;
      justify-content: space-between;
      .search-origins {
        padding: 15px 15px 0 15px;
        width: 300px;
        box-sizing: border-box;
        @media (max-width: $md) {
          width: 100%;
        }
      }
      .origins-table-header-buttons {
        padding: 14px 15px;
        /deep/ .button {
          padding: 0 15px 0 5px;
        }
      }
    }
    /deep/ .col-type-text {
      .default {
        font-weight: 600;
      }
    }
    /deep/ .options {
      max-width: fit-content;
      .col-type-options {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 5px;
      }
    }
    /deep/ .col-type-date {
      padding: 15px;
      font-size: 16px;
      line-height: 16px;
      box-sizing: border-box;
      .cell-content {
        color: $black-font-color;
        min-width: 100px;
        max-width: 250px;
        @include truncate-text;
      }
    }
  }
}
</style>
