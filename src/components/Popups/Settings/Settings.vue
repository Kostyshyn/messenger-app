<template>
  <div class="user-settings">
    <UserLabel :user="user" className="settings-user-label" big />
    <IconList :list="accountMenu" heading="Account" @action="accountAction" />
    <IconList :list="settingsMenu" heading="Settings" @action="action" />
    <transition name="fade" mode="out-in">
      <component
        v-if="editPopupOpen"
        v-bind="{ userData: user }"
        :is="activePopup"
        @close="close"
      />
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import UserLabel from '@/components/General/User/UserLabel.vue';
import IconList from '@/components/General/List/IconList.vue';
import ChangeProfileImage from '@/components/Popups/Settings/ChangeProfileImage.vue';
import EditName from '@/components/Popups/Settings/EditName.vue';
import EditUsername from '@/components/Popups/Settings/EditUsername.vue';
import { mapGetters, mapActions } from 'vuex';

const POPUPS = {
  ChangeProfileImage,
  EditName,
  EditUsername
};

export default {
  name: 'Settings',
  components: {
    UserLabel,
    IconList,
    ChangeProfileImage,
    EditName,
    EditUsername
  },
  props: {},
  data() {
    return {
      // popup title
      title: 'Settings',
      activePopup: null,
      editPopupOpen: false,
      accountMenu: [
        {
          label: 'Change profile image',
          icon: 'add_a_photo',
          action: 'ChangeProfileImage'
        },
        {
          label: 'Edit name',
          icon: 'person',
          action: 'EditName'
        },
        {
          label: 'Edit username',
          icon: 'email',
          action: 'EditUsername'
        },
        {
          label: 'Change e-mail',
          icon: 'mail_outline',
          action: ''
        },
        {
          label: 'Change password',
          icon: 'key',
          action: ''
        }
      ],
      settingsMenu: [
        {
          label: 'Privacy settings',
          icon: 'lock',
          action: ''
        },
        {
          label: 'Notifications',
          icon: 'notifications',
          action: ''
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      token: 'user/token',
      baseUrl: 'app/baseUrl'
    })
  },
  methods: {
    // popup 'back' button action
    // backAction() {
    //   console.log('back action');
    // },
    ...mapActions({
      close: 'app/closePopup'
    }),
    accountAction(action) {
      if (POPUPS[action]) {
        this.activePopup = POPUPS[action];
        this.$nextTick(() => {
          this.editPopupOpen = true;
        });
      }
    },
    action(method) {
      console.log(method);
    },
    close() {
      this.editPopupOpen = false;
    }
  },
  watch: {},
  mounted() {},
  created() {}
};
</script>
<style lang="scss" scoped>
.user-settings {
  min-height: 400px;
  max-height: 500px;
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: 15px;
  /deep/ .settings-user-label {
    padding: 10px 15px;
  }
  @media (max-width: $sm) {
    min-height: 100%;
    max-height: 100%;
  }
}
</style>
