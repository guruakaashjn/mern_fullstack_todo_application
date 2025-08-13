import { useNavigate } from "react-router-dom";
import ListTodoEntriesComponent from "../components/ListTodoENtries";

const ListTodoEntries = () => {
  const navigate = useNavigate();

  const callCreateTodoEntryFunction = () => {
    navigate("/create-todo-entry");
  };

  return (
    <div className="flex flex-col items-center justify-between rounded-2xl bg-gray-100 p-4 min-h-[90vh]">
      <div className="w-full">
        <ListTodoEntriesComponent />
        <button
          type="button"
          className="w-full bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-600 hover:text-black transition my-5"
          onClick={() => callCreateTodoEntryFunction()}
        >
          Create Todo Entry
        </button>
      </div>
    </div>
  );
};

export default ListTodoEntries;
