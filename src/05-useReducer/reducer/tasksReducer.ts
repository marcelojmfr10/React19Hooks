import * as z from "zod";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskState {
  todos: Todo[];
  length: number;
  completed: number;
  pending: number;
}

export type TaskAction =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: number }
  | { type: "DELETE_TODO"; payload: number };

const TodoSchema = z.object({
  id: z.number(),
  text: z.string(),
  completed: z.boolean(),
});

const TaskStateSchema = z.object({
  todos: z.array(TodoSchema),
  length: z.number(),
  completed: z.number(),
  pending: z.number(),
});

export const getTasksInitialState = (): TaskState => {
  const localStorageState = localStorage.getItem("tasks-state");
  if (!localStorageState) {
    return {
      todos: [],
      pending: 0,
      completed: 0,
      length: 0,
    };
  }

  // validar mediante Zod
  const result = TaskStateSchema.safeParse(JSON.parse(localStorageState));
  if (result.error) {
    console.log(result.error);
    return {
      todos: [],
      pending: 0,
      completed: 0,
      length: 0,
    };
  }

  //! el objeto pudo haber sido manipulado
  return result.data;
};

export const taskReducer = (
  state: TaskState,
  action: TaskAction,
): TaskState => {
  // siempre tiene que devolver un estado nuevo

  switch (action.type) {
    case "ADD_TODO": {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };

      //! no se debe hacer
      // state.todos.push(newTodo);
      return {
        ...state,
        length: state.todos.length + 1,
        pending: state.pending + 1,
        todos: [...state.todos, newTodo],
      };
    }
    case "DELETE_TODO": {
      const currentTodos = state.todos.filter(
        (todo) => todo.id !== action.payload,
      );

      return {
        ...state,
        todos: currentTodos,
        length: currentTodos.length,
        pending: currentTodos.filter((todo) => !todo.completed).length,
        completed: currentTodos.filter((todo) => todo.completed).length,
      };
    }

    case "TOGGLE_TODO": {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      });

      return {
        ...state,
        pending: updatedTodos.filter((todo) => !todo.completed).length,
        completed: updatedTodos.filter((todo) => todo.completed).length,
        todos: updatedTodos,
      };
    }

    default:
      return state;
  }

  return state;
};
