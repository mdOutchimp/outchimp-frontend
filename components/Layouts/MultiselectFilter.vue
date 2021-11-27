<template>
  <multiselect
    v-model="innerValue"
    tag-placeholder="Search Here"
    label="name"
    track-by="id"
    :options="options"
    :placeholder="placeholder"
    ref="input"
  ></multiselect>
</template>

<script>

export default {
  name: "MultiselectFilter",
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    options: {
      type: [Array, Object],
      default: [],
    },
    value: {
      type: null,
      default: "",
    },
  },
  data: () => ({
    innerValue: "",
  }),
  computed: {
    hasValue() {
      return !!this.innerValue;
    },
    getKeys(value){
      return value.map((val) => val.id);
    }
  },
  watch: {
    innerValue(value) {
      this.$emit("input", value);
    },
    value(val) {
      if (val !== this.innerValue) {
        this.innerValue = val;
      }
    },
  },
  created() {
    if (this.value) {
      this.innerValue = this.value;
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
