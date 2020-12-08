<template>
  <div class="table-pagination-wrapper" :class="[className]">
    <div class="table-pagination-info">
      <span class="table-pagination-info-item">
        Per page: {{ pagination.limit }}
      </span>
      <span class="table-pagination-info-item">
        Total: {{ pagination.total }}
      </span>
    </div>
    <ul class="table-pagination">
      <li
        class="table-pagination-btn prev"
        :class="{ disabled: !pagination.prevPage }"
      >
        <Button color="transparent" round ripple @click="setPage('prev')">
          <ChevronLeft />
        </Button>
      </li>
      <li class="table-pagination-btn" :class="{ active: currentPage === 1 }">
        <Button color="transparent" round ripple @click="setPage(1)">
          1
        </Button>
      </li>
      <li v-if="showPrevDelimiter" class="table-pagination-btn del disabled">
        <DotsHorizontal />
      </li>
      <li
        v-for="page in pages"
        :key="page"
        class="table-pagination-btn"
        :class="{ active: currentPage === page }"
      >
        <Button color="transparent" round ripple @click="setPage(page)">
          {{ page }}
        </Button>
      </li>
      <li v-if="showNextDelimiter" class="table-pagination-btn del disabled">
        <DotsHorizontal />
      </li>
      <li
        class="table-pagination-btn"
        :class="{ active: currentPage === pagination.totalPages }"
      >
        <Button
          color="transparent"
          round
          ripple
          @click="setPage(pagination.totalPages)"
        >
          {{ pagination.totalPages }}
        </Button>
      </li>
      <li
        class="table-pagination-btn next"
        :class="{ disabled: !pagination.nextPage }"
      >
        <Button color="transparent" round ripple @click="setPage('next')">
          <ChevronRight />
        </Button>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import Button from '@/components/General/Helpers/Button.vue';
import DotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue';
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue';
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue';
import { mapGetters } from 'vuex';
import { range } from '@/utils/math';

export default {
  name: 'TablePagination',
  components: {
    Button,
    DotsHorizontal,
    ChevronRight,
    ChevronLeft
  },
  props: {
    requestProcessing: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: Object,
      default: () => ({
        // limit: 10,
        // nextPage: false,
        // page: 1,
        // prevPage: false,
        // total: 0,
        // totalPages: 0
        limit: 10,
        nextPage: true,
        page: 2,
        prevPage: true,
        total: 115,
        totalPages: 7
      })
    },
    className: {
      type: String,
      default: ''
    },
    pagesThreshold: {
      type: Number,
      default: 5
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
    }),
    pages() {
      const { pagination, pagesThreshold, currentPage } = this;
      if (currentPage < pagesThreshold) {
        return range(2, pagesThreshold);
      } else if (currentPage > pagination.totalPages - pagesThreshold) {
        return range(
          pagination.totalPages - pagesThreshold,
          pagination.totalPages - 1
        );
      } else {
        const visibleThreshold = Math.floor((pagesThreshold - 1) / 2);
        return range(
          currentPage - visibleThreshold,
          currentPage + visibleThreshold
        );
      }
    },
    showPrevDelimiter() {
      const { pagesThreshold, currentPage } = this;
      return currentPage + 1 > pagesThreshold;
    },
    showNextDelimiter() {
      const { pagination, pagesThreshold, currentPage } = this;
      return pagination.totalPages - currentPage > pagesThreshold - 1;
    }
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
    .table-pagination-info-item {
      display: inline-block;
      padding: 10px;
      font-size: 14px;
      color: $dark-grey-font-color;
      max-width: 100%;
      @include truncate-text;
    }
  }
  .table-pagination {
    display: flex;
    .table-pagination-btn {
      padding: 0 2px;
      list-style-type: none;
      /deep/ .button,
      &.del {
        color: $dark-grey-font-color;
      }
      &.del {
        display: flex;
        align-items: center;
        height: 36px;
        padding: 0;
        /deep/ .material-design-icon {
          display: flex;
        }
      }
      &.disabled {
        &.del,
        /deep/ .button {
          opacity: 0.3;
          pointer-events: none;
        }
      }
      &.active {
        /deep/ .button {
          background-color: $light-grey-color;
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
      .table-pagination-info-item {
        padding: 5px 10px 5px 0;
      }
    }
  }
}
</style>
