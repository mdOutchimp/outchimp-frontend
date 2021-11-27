<template>
  <div>
    <div class="star-rating">
      <label
        class="star-rating__star"
        v-for="rating in ratings"
        :key="rating"
        :class="{
          'is-selected': currentValue >= rating && currentValue != null,
          'is-disabled': disabled
        }"
        v-on:click="setRatings(rating)"
        v-on:mouseover="star_over(rating)"
        v-on:mouseout="star_out"
      >
        <input
          class="star-rating star-rating__checkbox"
          type="radio"
          :value="rating"
          :name="name"
          v-model="currentValue"
          :disabled="disabled"
        />★
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      temp_value: null,
      currentValue: this.value,
      ratings: [1, 2, 3, 4, 5]
    };
  },

  props: {
    name: String,
    value: null,
    id: String,
    disabled: Boolean,
    required: Boolean
  },
  methods: {
    star_over(index) {
      if (!this.disabled) {
        this.temp_value = this.currentValue;
        return (this.currentValue = index);
      }
    },

    star_out() {
      if (!this.disabled) {
        return (this.currentValue = this.temp_value);
      }
    },

    setRatings(value) {
      if (!this.disabled) {
        this.temp_value = value;
        this.currentValue = value;
        this.$emit("setRating", this.currentValue);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
%visually-hidden {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
}

.star-rating {
  &__star {
    display: inline-block;
    padding: 3px;
    vertical-align: middle;
    line-height: 1;
    font-size: 2em;
    color: #ababab;
    transition: color 0.2s ease-out;

    &:hover {
      cursor: pointer;
    }

    &.is-selected {
      color: var(--bs-primary);
    }

    &.is-disabled:hover {
      cursor: default;
    }
  }

  &__checkbox {
    @extend %visually-hidden;
  }
}
</style>
