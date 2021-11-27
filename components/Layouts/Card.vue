<template>
  <div class="card rounded-0 border-0 mb-4 shadow-sm">
    <img :src="img" class="card-img-top rounded-0" alt="..." />
    <div class="card-body">
      <p class="mb-0 fw-bold">{{title}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
/* .card-image {
  height: 200px;
} */

.card-img-top {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
</style>
