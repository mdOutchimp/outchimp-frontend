<template>
  <div class="autocomplete">
    <form @submit.prevent="handleSearch" class="d-flex rounded-3 overflow-auto">
      <input
        type="text"
        :placeholder="placeholder"
        class="form-control form-control-lg outline-none"
        v-model="searchText"
        @keyup="onKeyUp"
        @input="$emit('onChange', searchText)"
      />

      <button
        class="btn btn-primary border-0 w-25 form-control outline-none"
        type="submit"
      >
        <span class="d-none d-sm-block">Search</span>
        <span class="d-sm-none"><i class="fas fa-search fs-4 mt-1"></i></span>
      </button>
    </form>
    <p class="text-grey text-start mt-1 ms-1">{{ inputMessage }}</p>
    <div class="search-output mt-1" v-if="showSuggestion">
      <ul class="list-group text-start" v-if="searchData">
        <li
          v-for="(data, i) in searchData"
          :key="data.id"
          class="list-group-item"
          @click="onSearchDataClick(data)"
          role="button"
          :class="{ active: currentItem == i }"
        >
          {{ data.name }}
        </li>
      </ul>
    </div>
    <!-- <multiselect
      tag-placeholder="Search Here"
      v-model="innerValue"
      :label="label"
      :track-by="trackBy"
      :options="options"
      :placeholder="placeholder"
      :taggable="taggable"
      :multiple="multiple"
      key="id"
    ></multiselect>
    <button
      class="autocomplete__append px-3 px-md-4 px-lg-5"
      @click.prevent="handleSelect"
    >
      <i class="fas fa-search fa-fw d-md-none"></i>
      <span class="d-none d-md-inline-block">Search</span>
    </button> -->
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: "Search...",
    },
    // trackBy: {
    //   type: String,
    //   default: "id"
    // },
    // label: {
    //   type: String,
    //   default: null
    // },
    // taggable: {
    //   type: Boolean,
    //   default: true
    // },
    // multiple: {
    //   type: Boolean,
    //   default: true
    // }
  },
  data() {
    return {
      searchText: "",
      searchData: [],
      showSuggestion: false,
      currentItem: 0,
      inputMessage: "",
    };
  },

  methods: {
    onKeyUp(e) {
      // if input dosen't have valid text
      // hide suggestion and enpty searchData
      if (!this.searchText.trim()) {
        this.showSuggestion = false;
        this.searchData = [];
        return;
      }

      // If input has text
      // show suggestion and filter Data
      this.showSuggestion = true;
      this.searchData = this.options.filter((option) =>
        option.name.toLowerCase().includes(this.searchText.trim().toLowerCase())
      );

      // Contorll Keybord Up - Down Arrow and Enter key
      if (e.key == "ArrowDown") {
        this.currentItem++;
      } else if (e.key == "ArrowUp") {
        this.currentItem--;
      } else if (e.key == "Enter") {
        this.onSearchDataClick(this.searchData[this.currentItem]);
      }

      // Show No Data Message
      if (!this.searchData.length) {
        this.inputMessage = "No Data Found!";
      } else {
        this.inputMessage = "";
      }
    },
    // when Suggestion Item Click
    onSearchDataClick(data) {
      if (data) {
        this.showSuggestion = false;
        this.searchText = data.name;
        this.currentItem = 0;
        this.handleSearch();
      }
    },
    // Handle Search fix
    handleSearch() {
      this.showSuggestion = false;
      const selected = this.searchData[this.currentItem];
      if (selected) {
        this.$emit("search", selected.id);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.autocomplete {
  position: relative;
  z-index: 999;
  .search-output {
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
  }
}
</style>
