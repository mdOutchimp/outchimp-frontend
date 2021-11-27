<template>
  <table class="table table-hover table-responsive m-0">
    <thead>
      <tr>
        <th class="px-4 table-dark" colspan="4">Previous withdraws</th>
      </tr>
    </thead>
    <tbody class="bg-white">
      <tr v-for="withdrawRequest in withdrawRequests" :key="withdrawRequest.id">
        <td class="px-4" colspan="2">
          ৳
          <span class="fw-bolder">{{ withdrawRequest.amount }} </span>
        </td>
        <td colspan="1">
          {{ withdrawRequest.createdAt | moment("LL") }}
        </td>
        <td colspan="1" class="text-primary">
          {{ withdrawRequest.status | capitalize }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>