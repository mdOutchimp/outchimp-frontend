<template>
	<div class="container wrapper">
		<div class="row justify-content-center">
			<div class="col-lg-8 col-md-10">
				<div class="card rounded-0 border-0">
					<div class="card-title text-center border-bottom">
						<h4 class="fw-bold text-uppercase py-3 mb-0">Place An Order</h4>
					</div>
					<div class="card-body mt-3">
						<form
							class=""
							@submit.prevent="save"
						>
							<!-- Amount -->
							<div class="mb-3">
								<label
									for="title"
									class="form-label"
								>Amount</label>
								<input
									type="text"
									v-model="order.amount"
									class="form-control"
									id="title"
									readonly
								/>

								<Error
									v-if="validationErrors.amount"
									:messages="validationErrors.amount"
								></Error>
							</div>

							<!-- Description -->
							<div class="mb-3">
								<label
									for="description"
									class="form-label"
								>Description</label>
								<textarea
									class="form-control"
									v-model="order.description"
									rows="5"
								></textarea>
								<Error
									v-if="validationErrors.description"
									:messages="validationErrors.description"
								></Error>
							</div>

							<!-- Terms & Conditions -->
							<div class="mb-3">
								<label
									for="description"
									class="form-label"
								>
									Terms & Conditions</label>
								<textarea
									class="form-control"
									v-model="order.terms_and_conditions"
									rows="5"
								></textarea>
								<Error
									v-if="validationErrors.terms_and_conditions"
									:messages="validationErrors.terms_and_conditions"
								></Error>
							</div>

							<div class="d-flex justify-content-between mt-4">
								<button class="text-primary border-0 rounded-0 bg-transparent px-5 fw-bold">
									Cancel
								</button>
								<button
									type="submit"
									class="btn btn-primary px-5"
								>Save</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  middleware: ["buyer"],
  data() {
    return {
      order: {
        buyer_id: this.$auth.user.id,
        seller_id: null,
        type: this.$route.query ? this.$route.query.type : null,
        id: this.$route.query ? this.$route.query.id : null,
        budget: null,
        description: null,
        terms_and_conditions: null,
        amount: null
      }
    };
  },

  methods: {
    async save() {
      try {
        await this.$axios.$post("/orders", this.order);
        this.$router.push("/buyers/dashboard/orders");
      } catch (error) {
        console.log(error);
      }
    }
  },

  async fetch() {
    if (this.$route.query.type == "package") {
      const pkgResponse = await this.$axios.$get(
        "/packages/" + this.$route.query.id
      );
      this.order.amount = pkgResponse.data.price;
      this.order.seller_id = pkgResponse.data.sellerId;
    }
    if (this.$route.query.type == "job") {
      const bidResponse = await this.$axios.$get(
        `/bids/${this.$route.query.id}`
      );
      this.order.amount = bidResponse.data.amount;
      this.order.description = bidResponse.data.description;
      this.order.seller_id = bidResponse.data.seller.id;
    }
  }
};
</script>

<style lang="scss" scoped></style>
