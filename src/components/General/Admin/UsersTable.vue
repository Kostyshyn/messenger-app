<template>
  <div class="users-table-wrapper">
    <Table
      index
      fixedHeader
      :data="users.data"
      :columns="columns"
      className="users-table"
      width="fit-content"
      @sort="$emit('sortUsers', $event)"
    >
      <template #header>
        <div class="search-users">
          <SearchField placeholder="Search users" v-model="keyword" />
        </div>
      </template>
      <template #profile_image="{ cell }">
        <UserImage :border="cell.online" :image="image(cell)" />
      </template>
      <template #role="{ cell }">
        <Chip v-bind="role(cell)" />
      </template>
      <template #last_seen="{ col, cell }">
        {{ cell[col.key] | moment('H:mm, D.MM.YY') }}
      </template>
      <template #options>
        <Button color="transparent" round ripple @click="toggleOptions">
          <DotsVertical />
        </Button>
      </template>
    </Table>
  </div>
</template>

<script>
// @ is an alias to /src
import Table from '@/components/General/Helpers/Table/Table.vue';
import SearchField from '@/components/General/Form/SearchField.vue';
import UserImage from '@/components/General/User/UserImage.vue';
import Chip from '@/components/General/Helpers/Chip.vue';
import Button from '@/components/General/Helpers/Button.vue';
import DotsVertical from 'vue-material-design-icons/DotsVertical.vue';
import { mapGetters } from 'vuex';
import debounce from '@/utils/debounce';
import imagePath from '@/utils/imagePath';
import config from '@/config';

export default {
  name: 'UsersTable',
  components: {
    Table,
    SearchField,
    UserImage,
    Chip,
    Button,
    DotsVertical
  },
  props: {
    users: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      columns: [
        {
          key: 'profile_image',
          type: 'image'
        },
        {
          label: 'First name',
          key: 'first_name',
          sort: true
        },
        {
          label: 'Last name',
          key: 'last_name',
          sort: true
        },
        {
          label: 'Username',
          key: 'username',
          sort: true
        },
        {
          label: 'Role',
          key: 'role',
          type: 'role',
          sort: true
        },
        {
          label: 'Email',
          key: 'email',
          sort: true
        },
        {
          label: 'Last seen',
          key: 'last_seen',
          sort: true
        },
        {
          key: 'options',
          type: 'options'
        }
      ],
      keyword: '',
      delay: 200,
      imageSizeSuffix: config.IMAGES.USER_LIST_IMAGE_SIZE,
      userRolesHash: {
        '0': {
          label: 'User'
        },
        '1': {
          label: 'Admin',
          color: 'success'
        }
      }
    };
  },
  computed: {
    ...mapGetters({
      settings: 'app/settings',
      baseUrl: 'app/baseUrl',
      token: 'user/token'
    })
  },
  methods: {
    image(user) {
      const { baseUrl, token, settings } = this;
      if (user.profile_image) {
        const image = imagePath(
          user.profile_image.path,
          this.imageSizeSuffix,
          `?token=${token}`
        );
        return `${baseUrl}/${image}`;
      }
      return `${baseUrl}/${settings.DEF_PROFILE_IMG}`;
    },
    role({ role }) {
      const { userRolesHash } = this;
      if (userRolesHash[role]) {
        return userRolesHash[role];
      }
      return {};
    },
    toggleOptions() {},
    searchUsers() {
      this.$emit('searchUsers', this.keyword);
    }
  },
  watch: {
    keyword() {
      this.debouncedSearchUsers();
    }
  },
  created() {
    this.debouncedSearchUsers = debounce(this.searchUsers, this.delay);
  }
};
</script>
<style scoped lang="scss">
.users-table-wrapper {
  .users-table {
    .search-users {
      padding: 15px 15px 0 15px;
      width: 300px;
      box-sizing: border-box;
      @media (max-width: $md) {
        width: 100%;
      }
    }
    /deep/ .profile_image {
      max-width: fit-content;
      .col-type-image {
        display: flex;
        align-items: center;
        justify-content: center;
        .user-image {
          img {
            width: 36px;
            height: 36px;
          }
        }
      }
    }
    /deep/ .role {
      .col-type-role {
        .cell-content {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
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
        .button {
          color: $dark-grey-font-color;
        }
      }
    }
  }
}
</style>
