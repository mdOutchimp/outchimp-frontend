<template>
  <div class="modal">
    <div class="modal__content">
      <div class="modal__header">
        <h5 class="text-black">Edit Title</h5>
      </div>

      <div class="modal__body">
        <input type="text" class="form-control" placeholder="Job Title eg: Freelance Photographer" v-model="title">
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
      title: this.$auth.user.jobTitle,
      user: this.$auth.user,
      errMsg: [],
    };
  },

  methods: {
    close() {
      this.$emit("close");
    },
    async save() {

      if(this.validate()){
        this.user.jobTitle = this.title;

        try {
          const response = await this.$axios.post("/sellers/profile", this.user);
          this.$emit('close');
          this.$auth.setUser(this.user)
          this.$toast.success('Successfully updated')
        } catch (error) {
          this.$toast.error('Some thing went wrong')
        }
      }
    },

    validate(){
      if(this.title == '' || this.title == null){
        this.errMsg.push('The field is required');
        return false
      }else{
        this.errMsg = []
        return true;
      }
    }
  },
};
</script>

<style lang="scss">

</style>
