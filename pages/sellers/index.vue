<template>
  <loading-view :loading="isLoading">
    <PageHeader>
      <div
        class="col-lg-6 d-flex flex-column align-items-center align-items-lg-start mb-3 mb-lg-0"
      >
        <h1 class="text-white fw-bold">
          {{ appSettings.websiteSettings.settings.seller_page_title }}
        </h1>
        <h5 class="text-white">
          {{ appSettings.websiteSettings.settings.seller_page_subtitle }}
        </h5>
      </div>
      <div class="col-lg-6 text-center text-lg-end">
        <img src="@/assets/svgs/hiring.svg" alt />
      </div>
    </PageHeader>

    <SearchBar v-model="search" @search="getResults" />
    <!-- Freelancer List -->
    <section class="section-padding">
      <div class="container">
        <div class="mb-3">
          <div class="d-flex">
            <div>
              <span class="me-2">
                <i class="fas fa-list text-primary"></i>
              </span>
              <select name id class="border-0 bg-transparent outline-none">
                <option value>Newest First</option>
                <option value>Lowest Budget First</option>
                <option value>Highest Budget First</option>
                <option value>Lowest Bids First</option>
                <option value>Highest Bids First</option>
              </select>
            </div>
            <div class="ms-auto d-block d-lg-none">
              <a
                @click.prevent="showFilter = true"
                type="button"
                class="text-decoration-none text-black"
              >
                <i class="fas fa-filter fa-fw text-primary"></i>
                <span class="me-2">Filters</span>
                <i class="fas fa-angle-down"></i>
              </a>
            </div>
          </div>
        </div>
        <seller-filter
          :filter="filter"
          :skills="skills"
          v-if="showFilter"
          @close="showFilter = false"
        ></seller-filter>

        <!-- Container -->

        <div class="row">
          <!-- Left side -->
          <div class="col-lg-9">
            <!-- Single Freelancer -->
            <SellerCard
              :id="seller.id"
              :name="seller.name"
              :img="
                seller.profilePicture
                  ? seller.profilePicture
                  : require('@/assets/images/profile.png')
              "
              :jobTitle="seller.jobTitle"
              location="Kustia, Bangladesh"
              :skills="seller.skills"
              :perHour="seller.perHour"
              :rating="Math.floor(seller.averageRating)"
              :reviews="seller.totalReview"
              v-for="seller in laravelData.data"
              :key="seller.id"
            ></SellerCard>

            <pagination
              class="mt-5 d-none d-md-flex"
              :limit="3"
              :data="laravelData"
              @pagination-change-page="getResults"
            ></pagination>
            <pagination
              class="mt-5 d-flex d-md-none"
              :limit="-1"
              :data="laravelData"
              @pagination-change-page="getResults"
            ></pagination>
          </div>
          <!-- Freelance Section End -->

          <!-- Right side -->
          <div class="d-none d-lg-block col-lg-3">
            <div class="card p-3 rounded-0 border-0">
              <h5 class="fw-bold">Filter By:</h5>

              <!-- Rate -->
              <div class="mt-3">
                <h6 class="fw-bold">Rate</h6>
                <div
                  class="d-flex mt-3 justify-content-between align-items-center"
                >
                  <input
                    type="text"
                    placeholder="min"
                    v-model="filter.rateMin"
                    class="form-control"
                  />
                  <span class="px-2">to</span>
                  <input
                    type="text"
                    placeholder="max"
                    v-model="filter.rateMax"
                    class="form-control"
                  />
                </div>
              </div>

              <!-- Skills -->
              <div class="mt-3">
                <h6 class="fw-bold">Skills</h6>
                <div class="mb-3" v-if="filter.skills.length">
                  <span
                    class="badge border border-primary text-primary rounded-pill me-1 mt-1"
                    v-for="(skill, index) in filter.skills"
                    :key="index"
                    role="button"
                    @click="removeSkill(index)"
                    >{{ skill }}
                    <span class="ms-2">&#10006;</span>
                  </span>
                </div>
                <multiselect-filter
                  :options="skills"
                  @input="filterSkill"
                ></multiselect-filter>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Freelancer List End -->
  </loading-view>
</template>
<script>
import { mapGetters } from "vuex";
import SellerFilter from "@/components/Filters/SellerFilter.vue";
export default {
  components: { SellerFilter },
  data() {
    return {
      laravelData: {},
      skills: [],
      search: "",
      showFilter: false,
      filter: {
        rateMin: "",
        rateMax: "",
        skills: [],
      },
    };
  },
  computed: {
    ...mapGetters({
      appSettings: ["settings/getSettings"],
    }),
  },
  watch: {
    filter: {
      deep: true,
      handler() {
        this.getResults();
      },
    },
  },
  methods: {
    removeSkill(index) {
      this.filter.skills.splice(index, 1);
    },
    filterSkill(selectedOption) {
      if (selectedOption) {
        this.filter.skills.push(selectedOption.name);
      }
    },
    // Our method to GET results from a Laravel endpoint
    getResults(page = 1) {
      this.$axios
        .$get(
          "/sellers?page=" +
            page +
            "&name=" +
            this.search +
            "&skills=" +
            this.filter.skills +
            "&rateMin=" +
            this.filter.rateMin +
            "&rateMax=" +
            this.filter.rateMax
        )
        .then((response) => {
          this.laravelData = response;
          // Stop the loading
          this.stopLoading();
        });
    },
  },

  mounted() {
    // Fetch initial results
    this.getResults();
  },
  async fetch() {
    const response = await this.$axios.$get("/skills");
    this.skills = response.data;
  },
};
</script>
<style></style>
