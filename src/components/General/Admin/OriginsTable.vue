<template>
  <div class="origins-table-wrapper">
    <Table
      index
      fixedHeader
      :data="origins.data"
      :columns="columns"
      className="origins-table"
      width="fit-content"
      @sort="$emit('sortOrigins', $event)"
    >
      <template #header>
        <div class="search-origins">
          <SearchField placeholder="Search origins" v-model="keyword" />
        </div>
      </template>
      <template #options>
        <TableOptions />
      </template>
    </Table>
  </div>
</template>

<script>
// @ is an alias to /src
import Table from '@/components/General/Helpers/Table/Table.vue';
import SearchField from '@/components/General/Form/SearchField.vue';
import TableOptions from '@/components/General/Admin/TableOptions.vue';
import { mapGetters } from 'vuex';
import debounce from '@/utils/debounce';

export default {
  name: 'OriginsTable',
  components: {
    Table,
    SearchField,
    TableOptions
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
          label: 'API password',
          key: 'api_password',
          sort: true
        },
        {
          label: 'Last used',
          key: 'last_used',
          sort: true
        },
        {
          key: 'options',
          type: 'options'
        }
      ],
      keyword: '',
      delay: 200
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    searchOrigins() {
      this.$emit('searchOrigins', this.keyword);
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
    .search-origins {
      padding: 15px 15px 0 15px;
      width: 300px;
      box-sizing: border-box;
      @media (max-width: $md) {
        width: 100%;
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
  }
}
</style>
