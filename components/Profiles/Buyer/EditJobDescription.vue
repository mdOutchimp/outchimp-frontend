<template>
  <div class="modal">
    <div class="modal__content">
      <div class="modal__header">
        <h5 class="text-black">Update Description</h5>
      </div>

      <div class="modal__body">
        <textarea
          type="text"
          class="form-control"
          placeholder="Tell us about you"
          rows="5"
          v-model="value"
        >
        </textarea>
        <!-- <Error :messages="errMsg"></Error> -->
      </div>

      <div class="modal__footer d-flex align-items-center justify-content-end">
        <button type="button" class="btn" @click="close">Cancel</button>
        <button type="button" class="btn btn-outline-primary px-4" >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>
