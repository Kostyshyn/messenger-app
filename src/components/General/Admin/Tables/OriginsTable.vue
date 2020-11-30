<template>
  <div class="origins-table-wrapper">
    <Table
      index
      fixedHeader
      :data="origins.data"
      :columns="columns"
      className="origins-table"
      @sort="$emit('sortOrigins', $event)"
    >
      <template #header>
        <div class="origins-table-header">
          <div class="search-origins">
            <SearchField placeholder="Search origins" v-model="keyword" />
          </div>
          <div class="origins-table-header-buttons">
            <Button
              color="primary"
              ripple
              @click="openPopup({ type: 'origin' })"
            >
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
          key: 'origin',
          sort: true
        },
        {
          label: 'API key',
          key: 'api_key',
          sort: true
        },
        {
          label: 'Last used',
          key: 'last_used',
          sort: true
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
          type: 'edit',
          icon: 'edit'
        },
        {
          label: 'Delete',
          type: 'delete',
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
      if (type === 'edit') {
        this.openPopup({
          type: 'origin',
          data: { originData: origin }
        });
      }
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
