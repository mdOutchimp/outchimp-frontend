<template>
  <div class="modal">
    <div class="modal__content">
      <div class="modal__header">
        <h5 class="text-black">Update About</h5>
      </div>

      <div class="modal__body">
        <textarea
          type="text"
          class="form-control"
          placeholder="Tell us about you"
          rows="5"
          v-model="value"
        >
        </textarea
        >
        <Error :messages="errMsg"></Error>
      </div>

      <div
        class="modal__footer d-flex align-items-center justify-content-end"
      >
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
      value: this.$auth.user.about,
      user: this.$auth.user,
      errMsg: [],
    };
  },

  methods: {
    close() {
      this.$emit("close");
    },
    async save() {
      if (this.validate()) {
        this.user.about = this.value;

        try {
          const response = await this.$axios.post(
            "/sellers/profile",
            this.user
          );
          this.$emit("close");
          this.$auth.setUser(this.user);
          this.$toast.success("Successfully updated");
        } catch (error) {
          this.$toast.error("Some thing went wrong");
        }
      }
    },

    validate() {
      if (this.value == "" || this.value == null) {
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
.modal {
  &__content {
    max-width: 800px;
    width: 100%;
    background: white;
  }
}
</style>
