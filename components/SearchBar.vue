<template >
    <!-- Searchbox Section -->
    <section class="container pt-5">
        <div class="search-box search-box--fluid">
            <span class="search-box__prepend">
                <i class="fas fa-search"></i>
            </span>
            <input type="text" placeholder="Search keywords" v-model="innerValue" />
            <button class="search-box__append px-5" @click.prevent="$emit('search')">
                <i class="fas fa-search fa-fw"></i> Search
            </button>
        </div>
    </section>
    <!-- Searchbox Section End -->
</template>
<script>
export default {
    props: {
        // must be included in props
        value: {
            type: null,
            default: null,
        }
    },
    data: () => ({
        innerValue: "",
    }),
    watch: {
        // Handles internal model changes.
        innerValue(newVal) {
            this.$emit("input", newVal);
        },
        // Handles external model changes.
        value(newVal) {
            this.innerValue = newVal;
        },
    },
    created() {
        if (this.value) {
            this.innerValue = this.value;
        }
    },
};
</script>
<style lang="">
</style>
