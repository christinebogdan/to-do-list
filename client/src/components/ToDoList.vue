<template>
  <div>
    <filter-bar
      @sort-ascending="sorted = 'asc'"
      @sort-descending="sorted = 'des'"
      @sorted-reset="sorted = 'none'"
      @filter-completed="filtered = 'completed'"
      @filter-open="filtered = 'open'"
      @filtered-reset="filtered = 'none'"
      @search="search"
    />
    <ul>
      <to-do-item
        v-for="item in store.getToDos(sorted, filtered, searchInput)"
        :key="item._id"
        :description="item.description"
        :id="item._id"
        :completed="item.completed"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import ToDoItem from "./ToDoItem.vue";
import FilterBar from "./FilterBar.vue";
import { onMounted, ref } from "vue";
import { useStore } from "../store/store";

const store = useStore();
const sorted = ref("none");
const filtered = ref("none");
const searchInput = ref("");

const search = (value: string) => {
  searchInput.value = value;
};

onMounted(() => {
  store.getData();
});
</script>
