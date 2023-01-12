<template>
  <form
    @submit.prevent="addToDo"
    class="flex flex-col sm:flex-row m-auto mb-12 border-t border-black pt-12"
  >
    <input
      type="text"
      id="newToDo"
      v-model="inputField"
      class="px-5 py-3 mb-5 sm:mr-8 sm:mb-0 border-0 rounded-md flex-grow"
      placeholder="New To-Do"
    />
    <input
      type="submit"
      value="Add"
      :class="[
        inputField
          ? ' bg-yellow-500 bg-opacity-90 cursor-pointer font-medium'
          : 'bg-darkslategray-800 bg-opacity-40',
        'rounded-lg px-7 py-3 text-white',
      ]"
    />
  </form>
</template>

<script setup>
import { ref } from "vue";
// import uniqueid from "lodash.uniqueid";
import { useStore } from "../store/store";

const inputField = ref("");
const store = useStore();

const addToDo = () => {
  if (inputField.value) {
    // const id = uniqueid();
    store.postToDo({
      // id: parseInt(id),
      description: inputField.value,
      completed: false,
    });

    inputField.value = "";
  }
};
</script>

<style lang="scss" scoped></style>
