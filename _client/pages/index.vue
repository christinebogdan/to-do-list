<template>
  <div
    class="w-11/12 xs:w-4/5 md:w-10/12 lg:w-3/4 xl:w-2/3 2xl:w-1/2 px-5 py-5 m-auto backdrop-filter bg-white bg-opacity-50 rounded-2xl backdrop-blur md:px-12 md:py-14"
  >
    <h1 class="text-4xl mb-5">My To-Do List</h1>
    <new-to-do-input />
    <to-do-list />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});
</script>
