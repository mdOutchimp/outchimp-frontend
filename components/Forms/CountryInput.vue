<template>
  <ValidationProvider
    class=""
    tag="div"
    :vid="vid"
    :rules="rules"
    :name="name || label"
    v-slot="{ errors, required, ariaInput, ariaMsg }"
  >
    <label class="" @click="$refs.input.focus()" :for="name">
      <span>{{ label || name }}</span>
      <span>{{ required ? " *" : "" }}</span>
    </label>
    <country-select
      class="form-select"
      :id="name"
      :type="type"
      :placeholder="placeholder"
      v-model="innerValue"
      :country='innerValue'
      ref="input"
      v-bind="ariaInput"
    />

    <span class="text-danger" v-bind="ariaMsg" v-if="errors[0]">{{
      errors[0]
    }}</span>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
  name: "CountryInput",
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
    type: {
      type: String,
      default: "text",
      validator(value) {
        return [
          "url",
          "text",
          "password",
          "tel",
          "search",
          "number",
          "email",
        ].includes(value);
      },
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
