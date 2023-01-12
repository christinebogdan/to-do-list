import { defineStore } from "pinia";

export const useStore = defineStore("todoStore", {
  // arrow function recommended for full type inference
  state: () => {
    return {
      toDos: [],
    };
  },
  getters: {
    getToDos: (state) => {
      return (sorted, filtered, search) => {
        let toDos = [...state.toDos];
        if (search) {
          toDos = toDos.filter((item) =>
            item.description.toLowerCase().includes(search),
          );
        }
        if (sorted !== "none") {
          if (sorted === "asc") {
            toDos.sort((a, b) => {
              return a.description < b.description
                ? -1
                : a.description > b.description
                ? 1
                : 0;
            });
          } else if (sorted === "des") {
            toDos.sort((a, b) => {
              return a.description < b.description
                ? 1
                : a.description > b.description
                ? -1
                : 0;
            });
          }
        }
        if (filtered !== "none") {
          if (filtered === "completed") {
            toDos = toDos.filter((item) => item.completed === true);
          } else if (filtered === "open") {
            toDos = toDos.filter((item) => item.completed === false);
          }
        }
        return toDos;
      };
    },
  },
  actions: {
    async getData() {
      try {
        const response = await fetch("/api/todos");
        const data = await response.json();
        this.toDos = data;
      } catch (e) {
        console.log(e);
      }
    },

    async postToDo(todo) {
      try {
        const response = await fetch("api/todo/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(todo),
        });
        const newTodo = await response.json();
        if (newTodo) this.toDos.push(newTodo);
      } catch (e) {
        console.log(e);
      }
    },

    async updateToDo(todo) {
      try {
        const response = await fetch("api/todo/update", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(todo),
        });

        const data = await response.json();
        if (data) {
          const toDo = this.toDos.find((item) => item._id === todo.id);
          const index = this.toDos.indexOf(toDo);
          this.toDos[index] = data;
        }
      } catch (e) {
        console.log(e);
      }
    },

    async deleteToDo(todo) {
      try {
        const response = await fetch("/api/todo/delete", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(todo),
        });
        const data = await response.json();
        if (data.deletedCount === 1) {
          // why did this work with item.id === todo.id?
          const toDo = this.toDos.find((item) => item._id === todo.id);
          const index = this.toDos.indexOf(toDo);
          this.toDos.splice(index, 1);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
});
