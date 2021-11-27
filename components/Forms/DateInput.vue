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
    <!-- <textarea
      class="form-control"
      :id="name"
      :placeholder="placeholder"
      ref="input"
      v-model="innerValue"
      v-bind="ariaInput"
      autocomplete="off"
      :rows="rows"
    >
    </textarea> -->

    <client-only>
      <date-picker
        format="MM/dd/yyyy"
        input-class="form-control bg-white"
        :id="name"
        :placeholder="placeholder"
        ref="input"
        v-model="innerValue"
        v-bind="ariaInput"
        autocomplete="off"
      />
    </client-only>

    <span class="text-danger" v-bind="ariaMsg" v-if="errors[0]">{{
      errors[0]
    }}</span>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
  name: "TextInput",
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
    placeholder: {
      type: String,
      default: "MM/DD/YYYY",
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
