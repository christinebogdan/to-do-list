<template>
  <div
    class="bg-darkslategray-800 bg-opacity-70 rounded-lg flex flex-col sm:flex-row justify-between items-center mb-8 px-2"
  >
    <div class="flex p-3 order-2 sm:order-1">
      <SortAscendingIcon
        :class="[
          ascending ? 'text-yellow-500' : 'text-white',
          'h-5 w-5 mr-5 cursor-pointer ',
        ]"
        @click.stop="sortAscending"
      />
      <SortDescendingIcon
        :class="[
          descending ? 'text-yellow-500' : 'text-white',
          'h-5 w-5 mr-5 cursor-pointer',
        ]"
        @click.stop="sortDescending"
      />
      <EmojiHappyIcon
        :class="[
          completed ? 'text-yellow-500' : 'text-white',
          'h-5 w-5 mr-5 cursor-pointer ',
        ]"
        @click.stop="filterCompleted"
      />
      <EmojiSadIcon
        :class="[
          open ? 'text-yellow-500' : 'text-white',
          'h-5 w-5 sm:mr-5 cursor-pointer ',
        ]"
        @click.stop="filterOpen"
      />
    </div>
    <div class="py-2 w-full sm:w-1/2 flex order-1 sm:order-2 relative">
      <input
        type="text"
        name="search"
        id="search"
        class="rounded-lg h-8 flex-grow px-5"
        v-model.trim="searchInput"
        @input="search"
      />
      <SearchIcon class="h-6 w-6 absolute inset-y-3 right-3 text-black" />
    </div>
  </div>
</template>

<script>
import {
  SortAscendingIcon,
  SortDescendingIcon,
  SearchIcon,
  EmojiHappyIcon,
  EmojiSadIcon,
} from "@heroicons/vue/outline";
import { ref } from "@vue/reactivity";

export default {
  emits: [
    "sortAscending",
    "sortDescending",
    "sortedReset",
    "filterCompleted",
    "filterOpen",
    "filteredReset",
    "search",
  ],
  components: {
    SortAscendingIcon,
    SortDescendingIcon,
    SearchIcon,
    EmojiSadIcon,
    EmojiHappyIcon,
  },
  setup(props, { emit }) {
    const ascending = ref(false);
    const descending = ref(false);
    const completed = ref(false);
    const open = ref(false);
    const searchInput = ref("");

    const sortAscending = () => {
      if (!ascending.value) {
        emit("sortAscending");
        ascending.value = true;
        descending.value = false;
      } else {
        ascending.value = false;
        emit("sortedReset");
      }
    };

    const sortDescending = () => {
      if (!descending.value) {
        emit("sortDescending");
        descending.value = true;
        ascending.value = false;
      } else {
        descending.value = false;
        emit("sortedReset");
      }
    };

    const filterCompleted = () => {
      if (!completed.value) {
        emit("filterCompleted");
        completed.value = true;
        open.value = false;
      } else {
        completed.value = false;
        emit("filteredReset");
      }
    };

    const filterOpen = () => {
      if (!open.value) {
        emit("filterOpen");
        open.value = true;
        completed.value = false;
      } else {
        open.value = false;
        emit("filteredReset");
      }
    };

    const search = () => {
      emit("search", searchInput.value.toLowerCase());
    };

    return {
      ascending,
      descending,
      completed,
      open,
      sortAscending,
      sortDescending,
      filterCompleted,
      filterOpen,
      search,
      searchInput,
    };
  },
};
</script>

<style lang="scss" scoped></style>
