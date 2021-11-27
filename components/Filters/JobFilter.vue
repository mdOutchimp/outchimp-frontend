<template>
  <div class="modal d-flex d-lg-none">
    <div class="modal__content">
      <div class="modal__header d-flex">
        <h5 class="text-black">Filter</h5>
        <span class="fs-6 ms-auto" role="button" @click="close">&#10006;</span>
      </div>

      <div class="modal__body mb-4">
        <div class="row">
          <div class="mt-3 col-6">
            <div>
              <h6 class="fw-bold">Category</h6>
              <div
                class="mt-3"
                v-for="category in categories"
                :key="category.id"
              >
                <Checkbox :value="category.id" v-model="filter.categories">{{
                  category.name
                }}</Checkbox>
              </div>
            </div>

            <div class="mt-3">
              <h6 class="fw-bold">Type</h6>
              <div class="mt-3">
                <Checkbox value="hourly" v-model="filter.types"
                  >Hourly</Checkbox
                >
              </div>
              <div class="mt-3">
                <Checkbox value="fixed" v-model="filter.types">Fixed</Checkbox>
              </div>
            </div>
          </div>

          <div class="mt-3">
            <h6 class="fw-bold">Skills</h6>
            <div class="mb-3" v-if="filter.skills.length">
              <span
                class="badge border border-primary text-primary rounded-pill py-1 me-1 px-2 mt-1"
                v-for="(skill, index) in filter.skills"
                :key="index"
                role="button"
                @click="removeSkill(index)"
                >{{ skill }}
                <span class="ms-2">&#10006;</span>
              </span>
            </div>
            <multiselect-filter
              :options="skills"
              @input="filterSkill"
            ></multiselect-filter>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["categories", "skills", "types", "filter"],
  data() {
    return {};
  },

  methods: {
    close() {
      this.$emit("close");
    },
    removeSkill(index) {
      this.filter.skills.splice(index, 1);
    },
    filterSkill(selectedOption) {
      if (selectedOption) {
        this.filter.skills.push(selectedOption.name);
      }
    },
  },
};
</script>
