<template>
  <li
    class="chat-list__item d-flex align-items-center p-3 border-bottom"
    :class="{ 'bg-light': activeId === user.id }"
    role="button"
    @click="$emit('user-selected', user)"
  >
    <div class="chat-list__image me-2">
      <img
        :src="
          user.profilePicture.length
            ? user.profilePicture
            : require('@/assets/images/profile.png')
        "
        alt=""
      />
    </div>
    <div class="d-flex w-100">
      <p class="fw-bold flex-grow-1">{{ user.name }}</p>
      <span
        class="badge bg-primary rounded-circle font-monospace"
        v-if="unreadMessage"
        >{{ unreadMessage }}</span
      >
      <!-- <small class="text-grey">This is you message</small> -->
    </div>
    <!-- <small class="text-grey align-self-end ms-auto"> 1 min </small> -->
  </li>
</template>

<script>
export default {
  name: "chatItem",
  props: ["user", "activeId"],
  computed: {
    unreadMessage() {
      if (this.$auth.user.type === "buyer") {
        return this.user.pivot && this.user.pivot.sellerUnreadMessages;
      }
      return this.user.pivot && this.user.pivot.buyerUnreadMessages;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
