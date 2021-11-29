<template>
  <div
    class="dropdown ms-3"
    role="button"
    @click="show = !show"
    v-click-outside="hide"
  >
    <div id="profile-photo">
      <slot></slot>
      <span class="indicator" v-if="$store.unreadNotification"></span>
    </div>
    <!-- <i class="fas fa-caret-down ms-2"></i> -->
    <ul class="dropdown__items shadow-sm" v-if="show">
      <li class="dropdown__item" v-if="$auth.user.type == 'seller'">
        <NuxtLink to="/sellers/profile">Profile</NuxtLink>
        <!-- <NuxtLink to="/buyers/profile" v-if="$auth.user.type == 'buyer'">Profile</NuxtLink> -->
      </li>
      <li class="dropdown__item">
        <NuxtLink to="/sellers/dashboard" v-if="$auth.user.type == 'seller'"
          >Dashboard</NuxtLink
        >
        <NuxtLink to="/buyers/dashboard" v-if="$auth.user.type == 'buyer'"
          >Dashboard</NuxtLink
        >
      </li>
      <li class="dropdown__item">
        <NuxtLink to="/sellers/chat" v-if="$auth.user.type == 'seller'"
          ><span class="position-relative">
            <span class="d-inline-block">Messages</span>
            <span
              class="indicator-inline"
              v-if="$store.unreadNotification"
            ></span>
          </span>
        </NuxtLink>
        <NuxtLink to="/buyers/chat" v-if="$auth.user.type == 'buyer'">
          <span class="position-relative">
            <span class="d-inline-block">Messages</span>
            <span
              class="indicator-inline"
              v-if="$store.unreadNotification"
            ></span>
          </span>
        </NuxtLink>
      </li>
      <li class="dropdown__item">
        <NuxtLink to="/jobs/create" v-if="$auth.user.type == 'buyer'"
          >Post A Job</NuxtLink
        >
        <NuxtLink to="/packages/create" v-if="$auth.user.type == 'seller'"
          >Create Package</NuxtLink
        >
      </li>

      <li class="dropdown__item" v-if="$auth.user.type == 'seller'">
        <NuxtLink to="/sellers/withdraw">Withdraw</NuxtLink>
      </li>

      <li class="dropdown__item">
        <a
          href="javascript:void(0)"
          @click.prevent="sellerLogout()"
          v-if="$auth.user.type == 'seller'"
          >Logout</a
        >
        <a
          href="javascript:void(0)"
          @click.prevent="buyerLogout()"
          v-if="$auth.user.type == 'buyer'"
          >Logout</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";

export default {
  data() {
    return {
      show: false,
    };
  },
  // do not forget this section
  directives: {
    ClickOutside,
  },

  methods: {
    buyerLogout() {
      this.$auth.logout("local2");
    },
    sellerLogout() {
      this.$auth.logout("local");
    },

    hide() {
      this.show = false;
    },
  },
};
</script>

<style lang='scss' scoped>
.dropdown {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &__items {
    position: absolute;
    top: 100%;
    background: white;
    list-style: none;
    min-width: 150px;
  }
  &__item {
    a {
      line-height: 40px;
      padding: 1rem;
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
    }

    &:not(:last-child) {
      border-bottom: 1px solid #d5d5d5;
    }
  }
}

#profile-photo {
  height: 50px;
  width: 50px;
  position: relative;
}

.indicator {
  height: 10px;
  width: 10px;
  background: #1df3be;
  position: absolute;
  top: 0;
  right: 0px;
  border-radius: 50%;
}

.indicator-inline {
  height: 10px;
  width: 10px;
  background: #1df3be;
  position: absolute;
  top: 0;
  right: -12px;
  border-radius: 50%;
}

.profile-photo img {
  object-fit: contain;
}
</style>
