<template>
  <div class="user-settings">
    <UserLabel :user="user" className="settings-user-label" big />
    <p class="list-header">Account</p>
    <IconList :list="accountMenu" @action="action" />
    <p class="list-header">Settings</p>
    <IconList :list="settingsMenu" @action="action" />
    <transition name="fade" mode="out-in">
      <component v-if="editPopupOpen" :is="activePopup" @close="close" />
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import UserLabel from '@/components/General/User/UserLabel.vue';
import IconList from '@/components/General/List/IconList.vue';
import EditName from '@/components/General/Popups/Settings/EditName.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Settings',
  components: {
    UserLabel,
    IconList,
    EditName
  },
  props: {},
  data() {
    return {
      // popup title
      title: 'Settings',
      activePopup: EditName,
      editPopupOpen: false,
      accountMenu: [
        {
          label: 'Change profile image',
          icon: 'add_a_photo',
          action: ''
        },
        {
          label: 'Edit name',
          icon: 'person',
          action: ''
        },
        {
          label: 'Edit username',
          icon: 'email',
          action: ''
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
    action(method) {
      this.editPopupOpen = true;
      if (method && this[method]) {
        this[method]();
      }
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
}
</style>
