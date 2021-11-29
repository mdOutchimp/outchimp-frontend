<template>
  <loading-view :loading="isLoading">
    <div>
      <!-- Hero section -->
      <section class="hero">
        <div class="hero__text text-center container" style="max-width: 850px">
          <h1 class="display-4">
            {{ appSettings.websiteSettings.settings.hero_title }}
          </h1>
          <p class="text-white d-none d-md-block mb-3">
            {{ appSettings.websiteSettings.settings.hero_subtitle }}
          </p>
          <autocomplete
            :taggable="false"
            :multiple="false"
            :options="tags"
            label="name"
            placeholder="Search here..."
            @search="handleSearch"
            @onChange="onSearch"
          ></autocomplete>
        </div>
      </section>
      <!-- Hero section end -->

      <!-- Category Section -->
      <section class="section-padding">
        <div class="container">
          <div class="section-header mb-5">
            <div class="section-header__title text-center">
              <p class="h2 fw-bold">Browse Top Categories</p>
              <span class="section-header__line"></span>
            </div>
          </div>
          <div class="category" v-if="categories">
            <div
              class="category-card p-4"
              v-for="category in categories"
              :key="category.id"
            >
              <NuxtLink
                :to="`categories/${category.id}`"
                class="text-decoration-none"
              >
                <div class="category-card__header text-center">
                  <img
                    :src="
                      category.mediaUrl.trim()
                        ? category.mediaUrl
                        : require('@/assets/images/placeholder.jpg')
                    "
                    style="height: 50px"
                    alt=""
                  />
                </div>
                <div class="h5 fw-bold mt-3 text-center text-black">
                  {{ category.name }}
                </div>
                <div class="category-card__content text-center">
                  <p class="text-justify text-black">
                    {{ category.description }}
                  </p>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
      <!-- End Category Section -->

      <!-- Choose Us -->
      <section class="section-padding bg-white">
        <div class="container">
          <div class="section-header mb-5">
            <div class="text-center">
              <p class="h2 fw-bold">Why Choose Us</p>
              <span class="section-header__line"></span>
            </div>
          </div>

          <div class="feature">
            <div
              class="feature-card"
              v-for="wcu_highlight in appSettings.websiteSettings.settings
                .wcu_highlights"
              :key="wcu_highlight.index"
            >
              <div class="feature-card__header">
                <i class="fas fa-tasks fs-4 text-primary fa-fw"></i>
                <p class="ms-1">
                  {{ wcu_highlight.title }}
                </p>
              </div>
              <div class="feature-card__body mt-2">
                <p>
                  {{ wcu_highlight.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- End Choose Us -->

      <!-- Latest works -->
      <client-only>
        <section class="section-padding">
          <div class="container">
            <div class="section-header mb-5">
              <div class="section-header__title text-center">
                <p class="h2 fw-bold">Latest From Our Works</p>
                <span class="section-header__line"></span>
              </div>
            </div>
            <splide :options="options">
              <splide-slide>
                <div class="card border-0">
                  <div class="card-header p-0">
                    <img src="@/assets/images/latest-1.png" alt class="w-100" />
                  </div>
                  <div class="card-body">
                    <div class="d-flex align-items-center">
                      <img
                        src="@/assets/images/user-1.jpg"
                        alt
                        class="rounded-circle"
                        style="height: 50px"
                      />
                      <div class="ms-2">
                        <p class="mb-0 fw-bold">Photography</p>
                        <span class="text-muted">by John Doe</span>
                      </div>
                    </div>
                  </div>
                </div>
              </splide-slide>
              <splide-slide>
                <div class="card border-0">
                  <div class="card-header p-0">
                    <img src="@/assets/images/latest-2.png" alt class="w-100" />
                  </div>
                  <div class="card-body">
                    <div class="d-flex align-items-center">
                      <img
                        src="@/assets/images/user-1.jpg"
                        alt
                        class="rounded-circle"
                        style="height: 50px"
                      />
                      <div class="ms-2">
                        <p class="mb-0 fw-bold">Photography</p>
                        <span class="text-muted">by John Doe</span>
                      </div>
                    </div>
                  </div>
                </div>
              </splide-slide>

              <splide-slide>
                <div class="card border-0">
                  <div class="card-header p-0">
                    <img src="@/assets/images/latest-4.png" alt class="w-100" />
                  </div>
                  <div class="card-body">
                    <div class="d-flex align-items-center">
                      <img
                        src="@/assets/images/user-1.jpg"
                        alt
                        class="rounded-circle"
                        style="height: 50px"
                      />
                      <div class="ms-2">
                        <p class="mb-0 fw-bold">Photography</p>
                        <span class="text-muted">by John Doe</span>
                      </div>
                    </div>
                  </div>
                </div>
              </splide-slide>

              <splide-slide>
                <div class="card border-0">
                  <div class="card-header p-0">
                    <img src="@/assets/images/latest-3.png" alt class="w-100" />
                  </div>
                  <div class="card-body">
                    <div class="d-flex align-items-center">
                      <img
                        src="@/assets/images/user-1.jpg"
                        alt
                        class="rounded-circle"
                        style="height: 50px"
                      />
                      <div class="ms-2">
                        <p class="mb-0 fw-bold">Photography</p>
                        <span class="text-muted">by John Doe</span>
                      </div>
                    </div>
                  </div>
                </div>
              </splide-slide>

              <splide-slide>
                <div class="card border-0">
                  <div class="card-header p-0">
                    <img src="@/assets/images/latest-4.png" alt class="w-100" />
                  </div>
                  <div class="card-body">
                    <div class="d-flex align-items-center">
                      <img
                        src="@/assets/images/user-1.jpg"
                        alt
                        class="rounded-circle"
                        style="height: 50px"
                      />
                      <div class="ms-2">
                        <p class="mb-0 fw-bold">Photography</p>
                        <span class="text-muted">by John Doe</span>
                      </div>
                    </div>
                  </div>
                </div>
              </splide-slide>

              <splide-slide>
                <div class="card border-0">
                  <div class="card-header p-0">
                    <img src="@/assets/images/latest-1.png" alt class="w-100" />
                  </div>
                  <div class="card-body">
                    <div class="d-flex align-items-center">
                      <img
                        src="@/assets/images/user-1.jpg"
                        alt
                        class="rounded-circle"
                        style="height: 50px"
                      />
                      <div class="ms-2">
                        <p class="mb-0 fw-bold">Photography</p>
                        <span class="text-muted">by John Doe</span>
                      </div>
                    </div>
                  </div>
                </div>
              </splide-slide>
            </splide>
          </div>
        </section>
      </client-only>
      <!-- End Latest Works -->

      <!--What great about us  -->
      <section class="section-padding bg-white">
        <div class="section-header mb-5">
          <div class="text-center">
            <p class="h2 fw-bold">What's Great About Us</p>
            <span class="section-header__line"></span>
          </div>
        </div>
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-6 mb-5 mb-lg-0">
              <h2 class="fw-bold mb-5">
                {{ appSettings.websiteSettings.settings.about_section_title }}
              </h2>
              <div
                class="row mt-3"
                v-for="about_section_highlight in appSettings.websiteSettings
                  .settings.about_section_highlights"
                :key="about_section_highlight.index"
              >
                <div class="mb-2">
                  <i class="fas fa-check-circle fs-3 text-primary fa-fw"></i>
                  <span class="h4">{{ about_section_highlight.title }}</span>
                </div>
                <p>
                  {{ about_section_highlight.description }}
                </p>
              </div>
            </div>
            <div class="col-md-6">
              <img src="@/assets/svgs/setting-on-table.svg" alt class="w-100" />
            </div>
          </div>
        </div>
      </section>
      <!-- End great about us -->

      <!-- Statistics -->
      <section
        class="statistics section-padding"
        style="
          background-image: linear-gradient(
              rgba('#1D4354', 0.9),
              rgba('#1D4354', 0.9)
            ),
            url('@/assets/images/bg-statistics.jpg');
        "
      >
        <div class="container">
          <div class="row g-5">
            <div
              class="col-12 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-start align-items-center"
            >
              <img
                src="@/assets/svgs/statistics-employers.svg"
                alt
                class="me-3"
              />
              <div class="text-white">
                <h2 class="fw-bold mb-0">2600</h2>
                <span class="fs-4">Employers</span>
              </div>
            </div>

            <div
              class="col-12 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-start align-items-center"
            >
              <img
                src="@/assets/svgs/statistics-freelancers.svg"
                alt
                class="me-3"
              />
              <div class="text-white">
                <h2 class="fw-bold mb-0">3800</h2>
                <span class="fs-4">Freelancers</span>
              </div>
            </div>

            <div
              class="col-12 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-start align-items-center"
            >
              <img
                src="@/assets/svgs/statistics-transactions.svg"
                alt
                class="me-3"
              />
              <div class="text-white">
                <h2 class="fw-bold mb-0">$250m</h2>
                <span class="fs-4">Transactions</span>
              </div>
            </div>

            <div
              class="col-12 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-start align-items-center"
            >
              <img
                src="@/assets/svgs/statistics-satisfaction.svg"
                alt
                class="me-3"
              />
              <div class="text-white">
                <h2 class="fw-bold mb-0">99%</h2>
                <span class="fs-4">Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- End Statistics -->

      <!-- Testimonial -->
      <client-only>
        <section class="section-padding">
          <div class="container">
            <div class="section-header mb-5">
              <div class="text-center">
                <p class="h2 fw-bold">What Our Client Says</p>
                <span class="section-header__line"></span>
              </div>
            </div>
            <splide :options="testimonial">
              <!-- Slide 1 -->
              <splide-slide>
                <div class="card testimonial-card">
                  <div class="card-body d-flex align-items-center">
                    <div class="testimonial-card__image">
                      <img
                        src="@/assets/images/users/user-8.png"
                        alt="user-8"
                      />
                    </div>
                    <div class="testimonial-card__content">
                      <p class="fst-italic text-justify">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Animi illum fugit corrupti tenetur inventore.
                        Consequuntur sapiente laboriosam eveniet facere iusto?
                      </p>
                      <div class="rating mt-2">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                      </div>
                      <div class="mt-2">
                        <p class="fw-bold">John Doe</p>
                        <span class="fs-6">General Manager</span>
                      </div>
                    </div>
                  </div>
                </div>
              </splide-slide>

              <!-- Slide 2 -->
              <splide-slide>
                <div class="card testimonial-card">
                  <div class="card-body d-flex align-items-center">
                    <div class="testimonial-card__image">
                      <img
                        src="@/assets/images/users/user-1.png"
                        alt="user-8"
                      />
                    </div>
                    <div class="testimonial-card__content">
                      <p class="fst-italic text-justify">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Animi illum fugit corrupti tenetur inventore.
                        Consequuntur sapiente laboriosam eveniet facere iusto?
                      </p>
                      <div class="rating mt-2">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                      </div>
                      <div class="mt-2">
                        <p class="fw-bold">Jonas Will</p>
                        <span class="fs-6">Managing Director</span>
                      </div>
                    </div>
                  </div>
                </div>
              </splide-slide>

              <!-- Slide 3 -->
              <splide-slide>
                <div class="card testimonial-card">
                  <div class="card-body d-flex align-items-center">
                    <div class="testimonial-card__image">
                      <img
                        src="@/assets/images/users/user-2.png"
                        alt="user-8"
                      />
                    </div>
                    <div class="testimonial-card__content">
                      <p class="fst-italic text-justify">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Animi illum fugit corrupti tenetur inventore.
                        Consequuntur sapiente laboriosam eveniet facere iusto?
                      </p>
                      <div class="rating mt-2">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                      </div>
                      <div class="mt-2">
                        <p class="fw-bold">Willam Somerset</p>
                        <span class="fs-6">Product Designer</span>
                      </div>
                    </div>
                  </div>
                </div>
              </splide-slide>

              <!-- Slide 4 -->
              <splide-slide>
                <div class="card testimonial-card">
                  <div class="card-body d-flex align-items-center">
                    <div class="testimonial-card__image">
                      <img
                        src="@/assets/images/users/user-3.png"
                        alt="user-8"
                      />
                    </div>
                    <div class="testimonial-card__content">
                      <p class="fst-italic text-justify">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Animi illum fugit corrupti tenetur inventore.
                        Consequuntur sapiente laboriosam eveniet facere iusto?
                      </p>
                      <div class="rating mt-2">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                      </div>
                      <div class="mt-2">
                        <p class="fw-bold">Sandra Dawson</p>
                        <span class="fs-6">Co Executive</span>
                      </div>
                    </div>
                  </div>
                </div>
              </splide-slide>

              <!-- Slide 5 -->
              <splide-slide>
                <div class="card testimonial-card">
                  <div class="card-body d-flex align-items-center">
                    <div class="testimonial-card__image">
                      <img
                        src="@/assets/images/users/user-4.png"
                        alt="user-8"
                      />
                    </div>
                    <div class="testimonial-card__content">
                      <p class="fst-italic text-justify">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Animi illum fugit corrupti tenetur inventore.
                        Consequuntur sapiente laboriosam eveniet facere iusto?
                      </p>
                      <div class="rating mt-2">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                      </div>
                      <div class="mt-2">
                        <p class="fw-bold">Hope Watson</p>
                        <span class="fs-6">Project Leader</span>
                      </div>
                    </div>
                  </div>
                </div>
              </splide-slide>

              <!-- Slide 6 -->
              <splide-slide>
                <div class="card testimonial-card">
                  <div class="card-body d-flex align-items-center">
                    <div class="testimonial-card__image">
                      <img
                        src="@/assets/images/users/user-5.png"
                        alt="user-8"
                      />
                    </div>
                    <div class="testimonial-card__content">
                      <p class="fst-italic text-justify">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Animi illum fugit corrupti tenetur inventore.
                        Consequuntur sapiente laboriosam eveniet facere iusto?
                      </p>
                      <div class="rating mt-2">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                      </div>
                      <div class="mt-2">
                        <p class="fw-bold">Ricardo Schmidt</p>
                        <span class="fs-6">Digital Marketer</span>
                      </div>
                    </div>
                  </div>
                </div>
              </splide-slide>
            </splide>
          </div>
        </section>
      </client-only>
      <!-- End Testimonial -->
    </div>
  </loading-view>
</template>

<script>
import { mapGetters } from "vuex";
import Autocomplete from "@/components/Autocomplete.vue";
export default {
  name: "Home",
  components: {
    Autocomplete,
  },
  computed: {
    ...mapGetters({
      appSettings: ["settings/getSettings"],
    }),
  },
  data() {
    return {
      options: {
        rewind: true,
        perPage: 4,
        gap: "1rem",
        pagination: false,
        perMove: 1,
        type: "loop",
        autoplay: false,
        interval: 2000,
        breakpoints: {
          992: {
            perPage: 3,
          },

          768: {
            perPage: 2,
          },

          576: {
            perPage: 1,
          },
        },
      },

      testimonial: {
        type: "loop",
        perPage: 2,
        arrows: false,
        gap: "2rem",
        pagination: true,
        autoplay: false,
        interval: 3000,
        breakpoints: {
          992: {
            perPage: 1,
          },
        },
      },

      tags: [],
      searchTags: "",
      category: "photography",
      categories: null,
      searchedTag: "",
    };
  },
  methods: {
    handleSearch(tags) {
      // console.log(tags);
      this.$router.push({
        path: "/packages",
        query: { tags: tags },
      });
    },

    async onSearch(text) {
      //  Get Tags
      const res = await this.$axios.$get(
        `/tags?search=${text.toLowerCase()}&limit=10`
      );
      console.log(res);
      this.tags = res;
    },
  },

  async created() {
    // Fetch Categories
    const resCategories = await this.$axios.$get("/categories");
    this.categories = resCategories.data;

    this.stopLoading();
  },
};
</script>
