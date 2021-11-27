<template>
    <p v-if="errMsg.length">
            <b class="text-danger">Please correct the following error(s):</b>
            <ul class="ps-3">
              <li class="text-danger" v-for="(error, index) in errMsg" :key="index">{{ error }}</li>
            </ul>
          </p>
</template>

<script>
export default {
  props: ["errMsg"],
};
</script>

<style lang="scss" scoped>
</style>
