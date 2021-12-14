<template>
  <form @submit.prevent="save" autocomplete="off">
    <div class="modal">
      <div class="modal__content">
        <div class="modal__header">
          <h5 class="text-black">Edit Device</h5>
        </div>

        <div class="modal__body">
          <div class="mb-3">
            <input-tag v-model="tags"></input-tag>
            <span class="text-muted fs-7">To add device put "," after typing each device name.</span>
            <Error :messages="errMsg"></Error>
          </div>
        </div>

        <div
          class="modal__footer d-flex align-items-center justify-content-end"
        >
          <button type="button" class="btn" @click="close">Cancel</button>
          <button type="submit" class="btn btn-outline-primary px-4">
            Save
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      tags: [],
      errMsg: [],
      user: this.$auth.user,
    };
  },

  methods: {
    close() {
      this.$emit("close");
    },
    async save() {
      if (this.validate()) {
        this.user.devices = this.tags;

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
      if (this.tags.length == 0) {
        this.errMsg.push("The field is required");
        return false;
      } else {
        this.errMsg = [];
        return true;
      }
    },
  },
  created () {
    this.tags = this.$auth.user.devices;
  },
};
</script>

<style lang="scss">
.vue-input-tag-wrapper .input-tag {
  background-color: var(--bs-primary);
  color: white;
  border: none;
}
</style>
