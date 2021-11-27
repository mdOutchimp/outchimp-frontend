<template>
  <div>
    <loader-tabs v-if="loading"></loader-tabs>
    <slot v-else />
  </div>
</template>

<script>
import LoaderTabs from "@/components/Layouts/LoaderTabs";

export default {
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    LoaderTabs,
  },
};
</script>
