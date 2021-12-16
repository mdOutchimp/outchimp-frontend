<template>
    <div class="row">
        <div class="col-md-10">
            <div class="d-flex flex-column flex-md-row">
                <div class="me-3">
                    <img
                        :src="bid.seller.profilePicture || require('@/assets/images/profile.png')"
                        class="rounded-circle d-block"
                        style="max-width: 80px"
                    />
                </div>
                <div class="mt-2 mt-md-0 d-flex flex-column justify-content-between">
                    <h5 class="d-inline-block job-card__title fw-bold mb-0">
                        <NuxtLink
                            class="text-decoration-none"
                            :to="`/sellers/${bid.seller.id}`"
                        >
                            {{ `${bid.seller.name}` }}
                        </NuxtLink>

                        <span class="badge bg-primary rounded-pill mx-2">{{
                  bid.status | capitalize
                }}</span>
                    </h5>
                    <p class="mt-2 mt-md-0">
                        {{ bid.description | truncate(100) }}
                    </p>
                </div>
            </div>
        </div>
        <div class="col-md-2 d-flex flex-column justify-content-between align-items-start align-items-md-end mt-2 mt-md-0">
            <div class="d-flex">
                <span class="fw-bold fs-7">${{ bid.amount }}</span>
                <small
                    class="ms-1"
                    v-if="bid.job.type == 'hourly'"
                >/Hr</small>
            </div>

            <NuxtLink
                :to="`/bids/${bid.id}`"
                class="btn btn-outline-primary text-decoration-none rounded-pill py-1 px-3 mt-2 mt-md-0"
            >
                View
            </NuxtLink>
        </div>
    </div>
</template>

<script>
  export default {
    props: {
      bid: {
        type: Object,
        required: true
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>
