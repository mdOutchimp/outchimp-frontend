<template>
  <ValidationProvider
    class=""
    tag="div"
    :vid="vid"
    :rules="rules"
    :name="name || label"
    v-slot="{ errors, required, ariaInput, ariaMsg }"
  >
    <label class="" @click="$refs.input.focus()" :for="name" v-if="label">
      <span>{{ label || name }}</span>
      <span>{{ required ? " *" : "" }}</span>
    </label>
    <multiselect
      v-model="innerValue"
      tag-placeholder="Search Here"
      label="name"
      track-by="id"
      :options="options"
      :multiple="true"
      :taggable="true"
      :id="name"
      :placeholder="placeholder"
      ref="input"
      v-bind="ariaInput"
      autocomplete="off"
    ></multiselect>

    <span class="text-danger" v-bind="ariaMsg" v-if="errors[0]">{{
      errors[0]
    }}</span>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
  name: "MultiselectInput",
  components: {
    ValidationProvider,
  },
  props: {
    vid: {
      type: String,
      default: undefined,
    },
    name: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    rules: {
      type: [Object, String],
      default: "",
    },
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
