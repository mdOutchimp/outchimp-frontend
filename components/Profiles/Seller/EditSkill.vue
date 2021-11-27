<template>
  <ValidationObserver v-slot="{ passes }">
    <form @submit.prevent="passes(save)" autocomplete="off">
      <div class="modal">
        <div class="modal__content">
          <div class="modal__header">
            <h5 class="text-black">Update Skills</h5>
          </div>

          <div class="modal__body">
            <div class="mb-3" id="skill-modal">
              <MultiselectInput
                rules="required"
                label="Skills"
                name="Skills"
                v-model="skills"
                :options="options"
              />
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
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from "vee-validate/dist/vee-validate.full.esm";

export default {
  name: "editSkill",
  props: {},
  components: {
    ValidationObserver,
  },
  data() {
    return {
      skills: [],
      options: [],
      user: null,
    };
  },

  async fetch() {
    try {
      const response = await this.$axios.get("/skills");
      this.options = response.data.data;
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    close() {
      this.$emit("close");
    },
    async save() {
      this.user.skills = this.skills;
      try {
        const response = await this.$axios.post("/sellers/profile", this.user);
        this.$emit("close");
        this.$auth.setUser(this.user);
        this.$toast.success("Successfully updated");
      } catch (error) {
        this.$toast.error("Some thing went wrong");
      }
    },
  },

  created() {
    this.skills = this.$auth.user.skills;
    this.user = this.$auth.user;
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

  &__body {
    height: auto;
  }
}
</style>

