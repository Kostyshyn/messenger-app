<template>
  <EditPopup @save="save" @close="$emit('close')">
    <!-- <img :src="cropped" /> -->
    <vue-croppie
      ref="croppieRef"
      :enableOrientation="true"
      :enableResize="false"
      :boundary="{ width: 258, height: 258 }"
      :viewport="{ width: 200, height: 200 }"
    >
    </vue-croppie>
    <input
      accept="image/png, image/jpeg"
      ref="fileInput"
      type="file"
      name="file"
      @change="inputFile"
    />
    <button @click="crop">Crop</button>
  </EditPopup>
</template>

<script>
// @ is an alias to /src
import EditPopup from '@/components/General/Helpers/EditPopup.vue';
import api from '@/services/api';
import truncate from '@/utils/truncate';

export default {
  name: 'ChangeProfileImage',
  components: {
    EditPopup
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
      cropped: null,
      acceptFiles: ['image/jpeg', 'image/jpg', 'image/png'],
      fileNameMaxLength: 255,
      errors: {}
    };
  },
  computed: {},
  methods: {
    inputFile(e) {
      this.file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        this.$refs.croppieRef.bind({
          url: e.target.result
        });
      };
      reader.readAsDataURL(this.file);
    },
    crop() {
      const options = {
        type: 'blob',
        size: { width: 450, height: 450 },
        format: 'jpeg'
      };
      this.$refs.croppieRef.result(options, output => {
        this.cropped = output;
      });
    },
    async save() {
      if (this.file && this.cropped) {
        try {
          const { name } = this.file;
          const fileName = name ? truncate(name, this.fileNameMaxLength) : '';
          const formData = new FormData();
          formData.append('file', this.cropped);
          formData.append('original_name', fileName);
          await api.uploadUserImage(formData);
          this.$emit('close');
        } catch (err) {
          this.errors = err.errors;
        }
      }
    }
  },
  watch: {},
  mounted() {
    this.$refs.fileInput.click();
  },
  created() {}
};
</script>
<style lang="scss" scoped></style>