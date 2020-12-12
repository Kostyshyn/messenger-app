import qs from 'qs';

export default {
  data() {
    return {
      page: 1,
      limit: 50,
      sort: {},
      keyword: ''
    };
  },
  computed: {
    query() {
      const { page, limit, sort, keyword } = this;
      return { page, limit, sort, keyword };
    }
  },
  methods: {
    searchItems(val) {
      this.page = 1;
      this.keyword = val;
    },
    sortItems({ key, value }) {
      this.page = 1;
      this.sort = { [key]: value };
    },
    async setQuery(query) {
      if (this._.isEqual(query, this.getQuery())) {
        return;
      }
      const q = qs.stringify(query, {
        arrayFormat: 'brackets',
        encode: true
      });
      await this.$router.push({
        path: `${this.$route.path}?${q}`
      });
    },
    getQuery() {
      const { page, limit, sort, keyword } = qs.parse(this.$route.query);
      return {
        page: page ? parseInt(page) : this.page,
        limit: limit ? parseInt(limit) : this.limit,
        sort: sort || {},
        keyword: keyword || ''
      };
    },
    resetItems(params = {}) {
      const { page, limit, sort, keyword } = params;
      this.page = page || 1;
      this.limit = limit || 50;
      this.sort = sort || { createdAt: 'desc' }; // default sort type
      this.keyword = keyword || '';
    },
    queryWatcher(data, oldData) {
      const { page, limit, sort, keyword } = qs.parse(data);
      const {
        page: oldPage,
        limit: oldLimit,
        sort: oldSort,
        keyword: oldKeyword
      } = qs.parse(oldData);
      if (
        oldData === undefined ||
        (page !== oldPage &&
          limit !== oldLimit &&
          keyword !== oldKeyword &&
          !this._.isEqual(sort, oldSort))
      ) {
        this.page = page ? parseInt(page) : this.page;
        this.limit = limit ? parseInt(limit) : this.limit;
        this.sort = sort || { createdAt: 'desc' }; // default sort type
        this.keyword = keyword || '';
      }
    }
  },
  watch: {
    '$route.query': {
      deep: true,
      immediate: true,
      handler: 'queryWatcher'
    }
  },
  mounted() {}
};
