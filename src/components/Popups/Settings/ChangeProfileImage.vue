<template>
  <EditPopup @save="save" @close="close">
    <!-- <img :src="cropped" /> -->
    <vue-croppie
      ref="croppieRef"
      :enableZoom="enableZoom"
      :enableOrientation="enableOrientation"
      :enableResize="enabledResize"
      :boundary="boundary"
      :viewport="viewport"
    />
    <Button
      className="select-image"
      ripple
      color="primary"
      @click="selectImage"
    >
      {{ selectButtonLabel }}
    </Button>
    <div class="errors-wrapper">
      <ErrorsList :errors="errors['file']" :showErrors="isError" />
    </div>
    <input
      hidden
      :accept="acceptFilesList"
      ref="fileInput"
      type="file"
      name="file"
      @change="inputFile"
    />
  </EditPopup>
</template>

<script>
// @ is an alias to /src
import EditPopup from '@/components/General/Helpers/EditPopup.vue';
import Button from '@/components/General/Helpers/Button.vue';
import ErrorsList from '@/components/General/Form/ErrorsList';
import { mapGetters } from 'vuex';
import api from '@/services/api';
import truncate from '@/utils/truncate';
import config from '@/config';

export default {
  name: 'ChangeProfileImage',
  components: {
    EditPopup,
    Button,
    ErrorsList
  },
  props: {
    userData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      file: null,
      acceptFiles: ['image/jpeg', 'image/jpg', 'image/png'],
      fileNameMaxLength: 255,
      boundary: {
        width: 258,
        height: 258
      },
      viewport: {
        width: 200,
        height: 200
      },
      enableOrientation: true,
      enabledResize: false,
      cropOptions: {
        // size: { width: 450, height: 450 },
        size: 'original',
        type: 'blob',
        format: 'jpeg'
      },
      errors: {}
    };
  },
  computed: {
    ...mapGetters({
      baseUrl: 'app/baseUrl'
    }),
    acceptFilesList() {
      return this.acceptFiles.join(', ');
    },
    enableZoom() {
      // TODO: enable zoom only if the image is selected
      return true;
    },
    isError() {
      return this.errors.file;
    },
    selectButtonLabel() {
      return this.file ? 'Select new image' : 'Select image';
    }
  },
  methods: {
    selectImage() {
      const { fileInput } = this.$refs;
      this.errors = {};
      if (fileInput) {
        fileInput.click();
      }
    },
    inputFile(e) {
      const file = e.target.files[0];
      if (file) {
        this.file = file;
        const reader = new FileReader();
        reader.onload = e => {
          this.$refs.croppieRef.bind({
            url: e.target.result
          });
        };
        reader.readAsDataURL(file);
      }
    },
    crop() {
      return this.$refs.croppieRef.result(this.cropOptions);
    },
    async save() {
      if (this.file) {
        try {
          const cropped = await this.crop();
          const { name } = this.file;
          const fileName = name ? truncate(name, this.fileNameMaxLength) : '';
          const formData = new FormData();
          formData.append('file', cropped);
          formData.append('original_name', fileName);
          await api.uploadUserImage(formData);
          this.$emit('close');
        } catch (err) {
          this.errors = err.errors;
        }
      }
    },
    close(type) {
      if (type === 'button') {
        this.$emit('close');
      }
    }
  },
  watch: {},
  mounted() {
    const { baseUrl } = this;
    this.$refs.croppieRef.bind({
      url: `${baseUrl}/${config.GLOBAL.DEF_IMG}`
    });
    this.$refs.fileInput.click();
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.select-image {
  width: 100%;
  margin-bottom: 5px;
}
.errors-wrapper {
  min-height: 16px;
  margin-top: 2px;
  margin-bottom: 5px;
  text-align: center;
}
</style>
