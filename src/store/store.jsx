/* eslint-disable no-undef */
/* eslint-disable react-refresh/only-export-components */
import { configureStore, createSlice } from "@reduxjs/toolkit";
// import { applyMiddleware, createStore } from "redux";
// import { thunk } from "redux-thunk";
// const Add = "task/add";
// const Delete = "task/delete";
// const FetchData = "task/fetch";
const initialState = {
  task: [],
};

// const taskReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case Add:
//       return {
//         ...state, //keeping all the old state
//         task: [...state.task, action.payload], //and updating it without doing any changes to old state
//       };
//     case Delete:
//       // eslint-disable-next-line no-case-declarations
//       const update = state.task.filter((value, index) => {
//         return index !== action.payload;
//       });
//       return {
//         ...state,
//         task: update,
//       };
//     case fetchData:
//       return {
//         ...state,
//         task: [...state.task, ...action.payload],
//       };

//     default:
//       return state;
//   }
// };

// !  redux way
// export const store = createStore(taskReducer, applyMiddleware(thunk))

// store.dispatch(AddTask("kaushal"));
// store.dispatch(AddTask("raut"));

// console.log(store.getState());
// store.dispatch(DeleteTask(1));

// console.log(store.getState());
// console.log("delete");

// export function AddTask(data) {
//   return {
//     type: Add,
//     payload: data,
//   };
// }
// export function DeleteTask(data) {
//   return {
//     type: Delete,
//     payload: data,
//   };
// }

//thunk middleware action
// export const FetchTask = () => {
//   return async (dispatch) => {
//     try {
//       const res = await fetch(
//         "https://jsonplaceholder.typicode.com/todos?_limit=3"
//       );
//       const data = await res.json();
//       console.log(data);

//       dispatch({
//         type: fetchData,
//         payload: data.map((value) => {
//           console.log(value.title);

//           return value.title;
//         }),
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

//! rtk way
const taskReducer = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask(state, action) {
      // state.task = [...state.task, action.payload];   first way of adding task
      state.task.push(action.payload); //second way of adding task in rtk
    },
    deleteTask(state, action) {
      state.task = state.task.filter(
        (current, index) => index !== action.payload
      );
    },
    clearTask(state) {
      state.task = [];
    },
    addFetch(state, action) {
      state.task.push(...action.payload);
    },
  },
});
export const store = configureStore({
  reducer: {
    taskReducer: taskReducer.reducer, //if both object and key name is same then you can write only taskReducer also
  },
});

export const { addTask, deleteTask, clearTask, addFetch } = taskReducer.actions; // we get action object by default so we dont need to create action manaully

export function fetchTask() {
  return async (dispatch) => {
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=3"
      );
      const data = await res.json();
      // console.log(data);

      dispatch(addFetch(data.map((value) => value.title)));
    } catch (error) {
      console.log(error);
    }
  };
}
