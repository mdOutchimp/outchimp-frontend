<template>
  <div class="modal d-flex d-lg-none">
    <div class="modal__content">
      <div class="modal__header d-flex">
        <h5 class="text-black">Filter By</h5>
        <span class="fs-6 ms-auto" role="button" @click="close">&#10006;</span>
      </div>

      <div class="modal__body mb-4">
        <div class="row">
          <!-- Rate -->
          <div class="mt-3">
            <h6 class="fw-bold">Rate</h6>
            <div class="d-flex mt-3 justify-content-between align-items-center">
              <input
                type="text"
                placeholder="min"
                v-model="filter.rateMin"
                class="form-control"
              />
              <span class="px-2">to</span>
              <input
                type="text"
                placeholder="max"
                v-model="filter.rateMax"
                class="form-control"
              />
            </div>
          </div>

          <!-- Skills -->
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
  props: ["skills", "filter"],
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
