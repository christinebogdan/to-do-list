<template>
  <div class="bg-mountain-background py-5 md:py-20 min-h-screen bg-cover">
    <div
      class="w-11/12 xs:w-4/5 md:w-10/12 lg:w-3/4 xl:w-2/3 2xl:w-1/2 px-5 py-5 m-auto backdrop-filter bg-white bg-opacity-50 rounded-2xl backdrop-blur md:px-12 md:py-14"
    >
      <h1 class="text-4xl mb-5">My To-Do List</h1>
      <new-to-do-input></new-to-do-input>
      <to-do-list></to-do-list>
    </div>
  </div>
</template>

<script>
import ToDoList from "./components/ToDoList.vue";
import NewToDoInput from "./components/NewToDoInput.vue";

export default {
  name: "App",
  components: {
    ToDoList,
    NewToDoInput,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
