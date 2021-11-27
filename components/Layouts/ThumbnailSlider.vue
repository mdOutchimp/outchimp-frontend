<template>
    <div class="">
        <!-- Main slider -->
        <splide :options="primaryOptions" ref="primary">
            <splide-slide>
                <img src="@/assets/images/Project-single/project-single-1.jpg" class="w-100" alt />
            </splide-slide>

            <splide-slide>
                <img src="@/assets/images/Project-single/project-single-2.jpg" class="w-100" alt />
            </splide-slide>

            <splide-slide>
                <img src="@/assets/images/Project-single/project-single-3.jpg" class="w-100" alt />
            </splide-slide>

            <splide-slide>
                <img src="@/assets/images/Project-single/project-single-4.jpg" class="w-100" alt />
            </splide-slide>

            <splide-slide>
                <img src="@/assets/images/Project-single/project-single-1.jpg" class="w-100" alt />
            </splide-slide>

            <splide-slide>
                <img src="@/assets/images/Project-single/project-single-3.jpg" class="w-100" alt />
            </splide-slide>
        </splide>

        <div class="mt-3">
            <!-- Thumbnail slider -->
            <splide :options="secondaryOptions" ref="secondary">
                <splide-slide>
                    <img
                        src="@/assets/images/Project-single/project-single-1.jpg"
                        class="w-100"
                        alt
                    />
                </splide-slide>

                <splide-slide>
                    <img
                        src="@/assets/images/Project-single/project-single-2.jpg"
                        class="w-100"
                        alt
                    />
                </splide-slide>

                <splide-slide>
                    <img
                        src="@/assets/images/Project-single/project-single-3.jpg"
                        class="w-100"
                        alt
                    />
                </splide-slide>

                <splide-slide>
                    <img
                        src="@/assets/images/Project-single/project-single-4.jpg"
                        class="w-100"
                        alt
                    />
                </splide-slide>

                <splide-slide>
                    <img
                        src="@/assets/images/Project-single/project-single-1.jpg"
                        class="w-100"
                        alt
                    />
                </splide-slide>

                <splide-slide>
                    <img
                        src="@/assets/images/Project-single/project-single-3.jpg"
                        class="w-100"
                        alt
                    />
                </splide-slide>
            </splide>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            primaryOptions: {
                type: "fade",
                heightRatio: 0.5,
                pagination: false,
                arrows: false,
                cover: true,
            },
            secondaryOptions: {
                fixedWidth: 200,
                height: 100,
                gap: 10,
                cover: true,
                isNavigation: true,
                pagination: false,
                focus: "center",
                breakpoints: {
                    600: {
                        fixedWidth: 66,
                        height: 40,
                    },
                },
            },
        };
    },

    mounted() {
        // Set the sync target.
        this.$refs.primary.sync(this.$refs.secondary.splide);
    },
};
</script>

<style lang="scss" scoped>
</style>
