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
        sort,
        keyword
      };
    },
    populateQuery() {
      const query = this.getQuery();
      this.setQuery(query).then(() => {
        this.page = query.page;
        this.limit = query.limit;
        this.sort = query.sort;
        this.keyword = query.keyword;
      });
    }
  },
  mounted() {
    this.populateQuery();
  }
};
