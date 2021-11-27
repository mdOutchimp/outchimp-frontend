<template>
  <div class="card rounded-0 border-0 mb-4 shadow-hover package-card" role="button" @click="handleClick">
    <div class="package-card__image">
      <img :src="src" class="rounded-0" alt="..." />
    </div>
    <div class="card-body">
      <p class="mb-0 fw-bold">{{title}}</p>
      <span class="text-grey fw-bold">by {{author}}</span>
      <div class="d-flex mt-2">
        <p class="fw-bold fs-7">From ৳ {{price}}</p>
        <p class="ms-auto" v-if="rating">
          <span>
            <i class="fas fa-star text-primary me-1"></i>
          </span>
          <span class="fw-bold">{{rating}}</span>
          <span>({{reviews}})</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    src: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },

    author: {
      type: String,
      required: true
    },

    price: {
      type: [Number, String],
      required: true
    },

    rating: {
      type: String,
    },

    reviews: {
      type: String,
    },
  },

  methods: {
    handleClick(){
      this.$router.push('/packages/'+this.id);
    }
  }
};
</script>

<style lang='scss'>
  .package-card{
    &__image {
      height: 250px;
      img{
        object-fit: cover;
        height: 100%;
        width: 100%;
      }

    }
  }
</style>
