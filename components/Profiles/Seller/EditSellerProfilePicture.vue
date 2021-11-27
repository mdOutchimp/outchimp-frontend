<template>
  <div class="modal">
    <div class="modal__content">
      <div class="modal__header">
        <h5 class="text-black">Edit Profile Picture</h5>
      </div>

      <div class="modal__body">
        <div class="form-group">
          <label class="preview border p-2 mt-3" for="file">
            <input
              type="file"
              accept="image/*"
              @change="previewImage"
              class="preview__input"
              id="file"
            />
            <div class="preview__placeholder" v-if="!preview" role="button">
              <i class="fas fa-camera preview__icon"></i>
              <p class="mt-3">Click to upload</p>
            </div>
            <div v-if="preview" class="preview__container" role="button">
              <img :src="preview" class="preview__image" />
            </div>
          </label>
          <Error :messages="errMsg"></Error>
        </div>
      </div>

      <div class="modal__footer d-flex align-items-center justify-content-end">
        <button type="button" class="btn" @click="close">Cancel</button>
        <button
          type="button"
          class="btn btn-outline-primary px-4"
          @click="save"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      user: this.$auth.user,
      errMsg: [],
      preview: null,
      image: null,
    };
  },

  methods: {
    close() {
      this.$emit("close");
    },

    // Preview the image
    previewImage: function (event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },

    // Upload the image to the server
    async save() {
      if (this.validate()) {

        // Send the file as from data
        const formData = new FormData();
        formData.append("profilePicture", this.image, this.image.name);

        try {
          const response = await this.$axios.post(
            "/sellers/profile-picture",
            formData
          );
          await this.$auth.fetchUser()
          this.$toast.success("Successfully updated");
          this.$emit("close");
        } catch (error) {
          this.$toast.error("Some thing went wrong");
        }
      }
    },

    validate() {
      if (this.image == "" || this.image == null) {
        this.errMsg.push("The field is required");
        return false;
      } else {
        this.errMsg = [];
        return true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.preview {
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;

  &__input {
    visibility: hidden;
    height: 0;
    width: 0;
  }

  &__container {
    height: 300px;
    width: 100%;

    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }

  &__placeholder {
    height: 300px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  &__icon {
    font-size: 3rem;
  }
}
</style>
