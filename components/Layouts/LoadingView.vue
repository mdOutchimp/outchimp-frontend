<template>
  <div>
    <loader v-if="loading"></loader>
    <slot v-else />
  </div>
</template>

<script>
import Loader from "@/components/Layouts/Loader";

export default {
  props: {
    loading: {
      type: Boolean,
      default: true
    },
  },
  components: {
    Loader
  }
};
</script>
