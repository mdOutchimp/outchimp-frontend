<template>
  <div>
    <!-- Header Section -->
    <header class="header">
      <Menu/>
    </header>
    <!-- End Header Section -->
    <Nuxt />
  </div>
</template>


<script>
import Menu from "@/components/Layouts/Menu";

export default {
  name: 'auth',
  components: {
    Menu,
  }
}
</script>

<style>

</style>

