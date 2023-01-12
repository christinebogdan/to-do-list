<template>
  <li
    class="py-2 text-xl sm:px-4 transition-shadow ease-[cubic-bezier(.31,.9,.17,.81)] delay-100 duration-200 text-black"
    :class="{ italic: completed }"
  >
    <div v-if="!editing" class="flex justify-between items-center">
      <div @change="toggleDone" class="flex items-baseline">
        <input
          type="checkbox"
          :id="id"
          class="mr-5 accent-yellow-500 cursor-pointer"
          :checked="completed"
        />
        <label
          :for="id"
          :class="[
            completed ? 'text-darkslategray-800 opacity-60' : null,
            'block text-left text-lg md:text-xl text-white',
          ]"
          >{{ description }}</label
        >
      </div>
      <div class="flex ml-6" v-if="!editing">
        <PencilIcon
          class="h-4 w-4 sm:h-6 sm:w-5 hover:text-white mr-5 cursor-pointer"
          @click="editToDo"
        />
        <TrashIcon
          class="h-4 w-4 sm:h-6 sm:w-5 hover:text-red-700 cursor-pointer"
          @click="deleteToDo"
        />
      </div>
    </div>
    <div
      v-else
      class="flex justify-between"
      @keyup.enter="saveEdit"
      @keyup.esc="cancelEdit"
    >
      <div>
        <input type="checkbox" :id="id" class="mr-5" :checked="completed" />
        <input
          type="text"
          class="px-5 mb-5 md:mr-8 md:mb-0 border rounded-md"
          v-model="editValue"
          ref="editInputField"
        />
      </div>
      <div class="flex">
        <CheckIcon
          class="h-6 w-6 hover:text-white mr-5 cursor-pointer"
          @click.stop="saveEdit"
        />
        <XMarkIcon
          class="h-6 w-5 hover:text-red-700 cursor-pointer"
          @click="cancelEdit"
        />
      </div>
    </div>
  </li>
</template>

<script setup>
import { toRefs, ref, nextTick } from "vue";
import {
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import { useStore } from "../store/store";

const props = defineProps({
  id: String,
  description: String,
  completed: Boolean,
});

const editing = ref(false);
const editInputField = ref();
const store = useStore();
const { id, description, completed } = toRefs(props);
const editValue = ref(props.description);

const editToDo = () => {
  editing.value = true;
  nextTick(() => {
    editInputField.value.focus();
  });
};

const cancelEdit = () => {
  editing.value = false;
};

const deleteToDo = () => {
  const todo = {
    id: props.id,
    description: props.description,
    completed: completed.value,
  };
  store.deleteToDo(todo);
};

const toggleDone = () => {
  const todo = {
    id: props.id,
    description: editValue.value,
    completed: !completed.value,
  };
  store.updateToDo(todo);
};

const saveEdit = () => {
  const todo = {
    id: props.id,
    description: editValue.value,
    completed: completed.value,
  };
  store.updateToDo(todo);
  editing.value = false;
};
</script>
