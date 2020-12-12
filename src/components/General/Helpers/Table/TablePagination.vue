<template>
  <div class="table-pagination-wrapper" :class="[className]">
    <div class="table-pagination-info">
      <span class="table-pagination-info-item">
        Total: {{ pagination.total }}
      </span>
      <span class="table-pagination-info-item">
        Per page: {{ pagination.limit }}
      </span>
    </div>
    <ul class="table-pagination">
      <li class="table-pagination-btn" :class="{ disabled: currentPage === 1 }">
        <Button color="transparent" round ripple @click="setPage(1)">
          <ChevronDoubleLeft />
        </Button>
      </li>
      <li
        class="table-pagination-btn prev"
        :class="{ disabled: !pagination.prevPage }"
      >
        <Button color="transparent" round ripple @click="setPage('prev')">
          <ChevronLeft />
        </Button>
      </li>
      <li class="table-pagination-info-item pages">
        {{ pagination.page }} of {{ pagination.totalPages }}
      </li>
      <li
        class="table-pagination-btn next"
        :class="{ disabled: !pagination.nextPage }"
      >
        <Button color="transparent" round ripple @click="setPage('next')">
          <ChevronRight />
        </Button>
      </li>
      <li
        class="table-pagination-btn"
        :class="{ disabled: currentPage === pagination.totalPages }"
      >
        <Button
          color="transparent"
          round
          ripple
          @click="setPage(pagination.totalPages)"
        >
          <ChevronDoubleRight />
        </Button>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import Button from '@/components/General/Helpers/Button.vue';
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue';
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue';
import ChevronDoubleRight from 'vue-material-design-icons/ChevronDoubleRight.vue';
import ChevronDoubleLeft from 'vue-material-design-icons/ChevronDoubleLeft.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'TablePagination',
  components: {
    Button,
    ChevronRight,
    ChevronLeft,
    ChevronDoubleRight,
    ChevronDoubleLeft
  },
  props: {
    requestProcessing: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: Object,
      default: () => ({
        limit: 10,
        nextPage: false,
        page: 1,
        prevPage: false,
        total: 0,
        totalPages: 1
      })
    },
    className: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentPage: 1
    };
  },
  computed: {
    ...mapGetters({
      device: 'app/device'
    })
  },
  methods: {
    setPage(page) {
      const { pagination, requestProcessing } = this;
      if (requestProcessing) {
        return;
      }
      switch (page) {
        case 'next':
          this.currentPage =
            this.currentPage === pagination.totalPages
              ? 1
              : this.currentPage + 1;
          break;
        case 'prev':
          this.currentPage =
            this.currentPage === 1
              ? pagination.totalPages
              : this.currentPage - 1;
          break;
        default:
          this.currentPage = page;
      }
      this.$emit('pageChange', this.currentPage);
    }
  },
  watch: {
    'pagination.page'(data) {
      this.currentPage = data;
    }
  }
};
</script>
<style scoped lang="scss">
.table-pagination-wrapper {
  box-sizing: border-box;
  height: 48px;
  display: flex;
  padding: 0 15px;
  align-items: center;
  justify-content: flex-end;
  .table-pagination-info {
    display: flex;
    margin-right: 15px;
  }
  .table-pagination-info-item {
    display: inline-block;
    padding: 10px;
    font-size: 13px;
    color: $dark-grey-font-color;
    max-width: 100%;
    @include truncate-text;
    &.pages {
      padding: 10px 5px;
      display: flex;
      align-items: center;
    }
  }
  .table-pagination {
    display: flex;
    .table-pagination-btn {
      padding: 0 2px;
      list-style-type: none;
      /deep/ .button {
        color: $dark-grey-font-color;
      }
      &.active {
        /deep/ .button {
          background-color: $light-grey-color;
        }
      }
      &.disabled {
        /deep/ .button {
          opacity: 0.3;
          pointer-events: none;
        }
      }
    }
  }
  @media (max-width: $sm) {
    justify-content: space-between;
    .table-pagination-info {
      margin: 0;
      display: flex;
      flex-direction: column;
      max-width: 105px;
    }
    .table-pagination-info-item {
      padding: 5px 10px 5px 0;
    }
  }
}
</style>
