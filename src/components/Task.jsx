import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addTask, clearTask, deleteTask, fetchTask } from "../store/store";

const Main = () => {
  const [input, setInput] = useState("");
  const state = useSelector((state) => state.taskReducer.task);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(addTask(input));
    return setInput("");
  };
  const handleDelete = (index) => {
    return dispatch(deleteTask(index));
  };

  const handleFetch = () => {
    return dispatch(fetchTask());
  };

  const handleClear = () => {
    return dispatch(clearTask());
  };

  return (
    <section className="w-full bg-gradient-to-r from-gray-800 to-gray-400 h-screen flex justify-center items-center ">
      <div className="h-auto w-auto p-4  bg-stone-300 rounded-2xl m-2 xl:p-10">
        <h1 className="text-4xl font-bold mb-7">To-do List:</h1>
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Write  ...."
          className=" text-center rounded-2xl text-gray-900  placeholder:text-gray-700 bg-white py-2  lg:p-2"
          value={input}
        />
        <button
          className="bg-black text-white px-4 py-2  m-2 rounded-2xl xl:px-8 xl:mx-4 cursor-pointer"
          onClick={handleSubmit}
        >
          Add
        </button>
        <button
          onClick={handleFetch}
          className="bg-black text-white px-4 py-2  m-2 rounded-2xl xl:px-8 xl:mx-4 cursor-pointer"
        >
          fetch
        </button>
        <button
          onClick={handleClear}
          className="bg-black text-white px-4 py-2  m-2 rounded-2xl xl:px-8 xl:mx-4 cursor-pointer"
        >
          clear
        </button>
        <div>
          <ul>
            {state.map((value, index) => {
              return (
                <div
                  key={index}
                  className="w-full bg-stone-500 my-3 rounded-2xl p-2 text-2xl flex justify-between  lg:my-2 lg:px-3 hover:bg-stone-200 "
                >
                  <li>
                    {index}: {value}{" "}
                  </li>
                  <button onClick={() => handleDelete(index)}>
                    <MdDeleteForever className="text-red-700 cursor-pointer" />
                  </button>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};
export default Main;
