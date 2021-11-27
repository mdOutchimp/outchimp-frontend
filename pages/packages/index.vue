<template>
  <div>
    <PageHeader>
      <div
        class="col-lg-6 d-flex flex-column align-items-center align-items-lg-start mb-3 mb-lg-0"
      >
        <h1 class="text-white fw-bold">
          {{ appSettings.websiteSettings.settings.explore_page_title }}
        </h1>
        <h5 class="text-white">
          {{ appSettings.websiteSettings.settings.explore_page_subtitle }}
        </h5>
      </div>
      <div class="col-lg-6 text-center text-lg-end">
        <img src="@/assets/svgs/search.svg" alt />
      </div>
    </PageHeader>

    <section class="section-padding">
      <div class="container">
        <autocomplete
          :options="tags"
          label="name"
          placeholder="Search by tags..."
          @search="handleSearch"
        ></autocomplete>
        <div class="row align-items-center mb-3 mt-4">
          <div class="col-6">
            <select name id class="border-0 bg-transparent outline-none">
              <option value>Newest First</option>
              <option value>Lowest Budget First</option>
              <option value>Highest Budget First</option>
              <option value>Lowest Bids First</option>
              <option value>Highest Bids First</option>
            </select>
          </div>
        </div>

        <div class="row" v-if="laravelData.data && laravelData.data.length > 0">
          <div
            class="col-sm-6 col-md-4 col-lg-3"
            v-for="pkg in laravelData.data"
            :key="pkg.id"
          >
            <PackageCard
              :id="pkg.id"
              :src="
                pkg.mediaUrl.length
                  ? pkg.mediaUrl
                  : require('@/assets/images/placeholder.jpg')
              "
              :title="pkg.name"
              :author="pkg.sellerName"
              :price="pkg.price"
            ></PackageCard>
          </div>
        </div>

        <div class="row text-center" v-else>
          <span class="text-grey">Sorry, No Data Found</span>
        </div>

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
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Autocomplete from "@/components/Autocomplete.vue";
export default {
  components: {
    Autocomplete,
  },
  data() {
    return {
      laravelData: {},
      tags: [],
      searchTags: "",
    };
  },
  computed: {
    ...mapGetters({
      appSettings: ["settings/getSettings"],
    }),

    categoryQuery() {
      if (this.$route.query && this.$route.query.category) {
        return this.$route.query.category;
      }
      return "";
    },

    subCategoryQuery() {
      if (this.$route.query && this.$route.query.subCategory) {
        return this.$route.query.subCategory;
      }
      return "";
    },

    tagQuery() {
      if (this.$route.query && this.$route.query.tags) {
        return this.$route.query.tags;
      }
      return this.searchTags;
    },
  },
  watch: {
    $route(newValue, oldValue) {
      this.searchTags = [];
      this.getResults();
    },
  },
  methods: {
    // Our method to GET results from a Laravel endpoint
    getResults(page = 1) {
      this.$axios
        .$get(
          "/packages?page=" +
            page +
            "&category=" +
            this.categoryQuery +
            "&subCategory=" +
            this.subCategoryQuery +
            "&tags=" +
            this.tagQuery
        )
        .then((response) => {
          this.laravelData = response;
        });
    },

    handleSearch(tags) {
      this.searchTags = tags;
      this.getResults();
    },
  },

  mounted() {
    // Fetch initial results
    this.getResults();
  },

  async fetch() {
    const res = await this.$axios.$get("/tags");
    this.tags = res.data;
  },
};
</script>
<style></style>
