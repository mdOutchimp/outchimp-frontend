<template>
  <div class="modal">
    <div class="modal__content">
      <div class="modal__header">
        <h5 class="text-black">Enter Balance</h5>
      </div>

      <div class="modal__body">
        <div class="input-group">
          <span class="input-group-text">৳</span>
          <input
            type="number"
            class="form-control"
            placeholder="Enter withdraw amount"
            v-model="amount"
          />
        </div>
        <Error
          v-if="validationErrors.amount"
          :messages="validationErrors.amount"
        ></Error>
      </div>

      <div class="modal__footer d-flex align-items-center justify-content-end">
        <button type="button" class="btn" @click="close">Cancel</button>
        <button
          type="button"
          class="btn btn-outline-primary px-4"
          @click="save"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "WithdrawBalanceComponent",
  props: {},
  data() {
    return {
      amount: null,
    };
  },

  computed: {
    ...mapGetters(["validation/validationErrors"]),
  },

  methods: {
    close() {
      this.$emit("close");
    },
    async save() {
      try {
        const response = await this.$axios.post("/withdraws", {
          seller_id: this.$auth.user.id,
          amount: this.amount,
        });
        this.$emit("close");
        this.$toast.success("Withdraw request successfully submitted!");
      } catch (error) {
        console.log(error);
        this.$toast.error("Something went wrong");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  &__content {
    max-width: 800px;
    width: 100%;
    background: white;
  }
}
</style>
