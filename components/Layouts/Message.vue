<template>
  <div :class="[self ? 'message d-flex mt-2 align-self-end': 'message d-flex mt-2']" v-if="message">
    <!-- <img :src="message.messagable.profilePicture.length ? message.messagble.profilePicture : require('@/assets/images/profile.png')" alt="" :class="[self ? 'order-2 ms-2': 'me-2']" /> -->
    <div :class="[self ? 'message__text bg-light': 'message__text']">
      {{message.message}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    self: {
      type: Boolean,
      required: true
    },
    message: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
