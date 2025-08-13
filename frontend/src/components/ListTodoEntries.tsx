/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { useEffect, useState } from "react";
import {
  useDeleteTodoEntryMutation,
  useEnableDisableTodoEntryMutation,
  useGetAllTodoEntriesMutation,
} from "../store/services/todoEntryApi";
import { toast } from "react-toastify";
import { FaEdit, FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { AiOutlineSelect } from "react-icons/ai";

export default function ListTodoEntriesComponent() {
  const isAuthenticated = useAppSelector(
    (state: any) => state.auth.isAuthenticated
  );

  const navigate = useNavigate();
  const [getTodoEntriesState, setGetTodoEntriesState] = useState([]);

  const [
    getTodoEntries,
    {
      data: getTodoEntriesData,
      isSuccess: getTodoEntriesIsSuccess,
      isError: getTodoEntriesIsError,
      error: getTodoEntriesError,
    },
  ] = useGetAllTodoEntriesMutation();

  const [
    deleteTodoEntry,
    {
      data: deleteTodoEntryData,
      isSuccess: deleteTodoEntryIsSuccess,
      isError: deleteTodoEntryIsError,
      error: deleteTodoEntryError,
    },
  ] = useDeleteTodoEntryMutation();

  const [
    enableDisableTodoEntry,
    {
      data: enableDisableTodoEntryData,
      isSuccess: enableDisableTodoEntryIsSuccess,
      isError: enableDisableTodoEntryIsError,
      error: enableDisableTodoEntryError,
    },
  ] = useEnableDisableTodoEntryMutation();

  useEffect(() => {
    if (getTodoEntriesIsSuccess) {
      setGetTodoEntriesState(getTodoEntriesData);
      return;
    }

    if (getTodoEntriesIsError) {
      console.log("Get todo entries error occured");
      toast(`Error occured while login ${JSON.stringify(getTodoEntriesError)}`);
    }
  }, [
    getTodoEntriesData,
    getTodoEntriesError,
    getTodoEntriesIsSuccess,
    getTodoEntriesIsError,
  ]);

  useEffect(() => {
    if (deleteTodoEntryIsSuccess) {
      toast(`Delete todo entry by id`);

      getTodoEntries({});

      return;
    }

    if (deleteTodoEntryIsError) {
      console.log("Delete todo entry by id error occured");
      toast(
        `Error occured while delete todo entry by id ${JSON.stringify(
          deleteTodoEntryError
        )}`
      );
    }
  }, [
    deleteTodoEntryData,
    deleteTodoEntryError,
    deleteTodoEntryIsSuccess,
    deleteTodoEntryIsError,
  ]);

  useEffect(() => {
    if (enableDisableTodoEntryIsSuccess) {
      toast(`Enable/Disable toggle clicked`);

      getTodoEntries({});

      return;
    }

    if (enableDisableTodoEntryIsError) {
      console.log("Enable/Disable toggle error occured");
      toast(
        `Error occured while enable/disable toggle ${JSON.stringify(
          enableDisableTodoEntryError
        )}`
      );
    }
  }, [
    enableDisableTodoEntryData,
    enableDisableTodoEntryError,
    enableDisableTodoEntryIsSuccess,
    enableDisableTodoEntryIsError,
  ]);

  useEffect(() => {
    try {
      if (isAuthenticated) {
        getTodoEntries({});
      }
    } catch (err) {
      console.log("ERROR", err);
    }
  }, []);

  const handleDeleteFunction = (todoEntryId: any) => {
    deleteTodoEntry(todoEntryId);
  };

  const handleEditFunction = (todoEntryId: any) => {
    navigate(`/edit-todo-entry/${todoEntryId}`);
  };

  const handleGetMoreInfoFunction = (todoEntryId: any) => {
    console.log("clicked");
    navigate(`/list-todo-entry/${todoEntryId}`);
  };

  const handleEnableToggleFunction = (todoEntryId: any) => {
    enableDisableTodoEntry({
      id: todoEntryId,
      body: {
        enabled: true,
      },
    });
  };

  const handleDisableToggleFunction = (todoEntryId: any) => {
    enableDisableTodoEntry({
      id: todoEntryId,
      body: {
        enabled: false,
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-green-100 px-4 w-full shadow-lg">
      <p className="font-medium text-2xl my-5">Todo Entries List</p>

      <div
        key={0}
        className="flex flex-row items-center justify-between w-full font-medium py-5 border-b-1 border-blue-500"
      >
        <div className="flex flex-1 justify-start">Name</div>
        <div className="flex flex-1 justify-start">Description</div>
        <div className="flex flex-1 justify-center">Priority</div>
        <div className="flex flex-1 justify-center">More Info</div>
        <div className="flex flex-1 justify-center">Edit / Delete</div>
      </div>
      {getTodoEntriesState.map((value: any, index: any) => (
        <div
          key={index}
          className="flex flex-row items-center justify-between w-full py-5"
        >
          <div className="flex flex-1 justify-start font-medium">
            {value.name}
          </div>
          <div className="flex flex-1 justify-start font-medium">
            {value.description}
          </div>
          <div className="flex flex-1 justify-center font-medium">
            {value.enabled ? (
              <button type="button">
                <FaToggleOn
                  size={30}
                  onClick={() => handleDisableToggleFunction(value._id)}
                />
              </button>
            ) : (
              <button type="button">
                <FaToggleOff
                  size={30}
                  onClick={() => handleEnableToggleFunction(value._id)}
                />
              </button>
            )}
          </div>

          <div className="flex flex-1 justify-center">
            <button type="button">
              <AiOutlineSelect
                size={25}
                strokeWidth={50}
                color={"blue"}
                onClick={() => {
                  handleGetMoreInfoFunction(value._id);
                }}
              />
            </button>
          </div>
          <div className="flex flex-1 justify-center gap-[10%]">
            <button type="button">
              <FaEdit size={25} onClick={() => handleEditFunction(value._id)} />
            </button>
            <button className="button">
              <FaTrash
                size={25}
                color="red"
                onClick={() => handleDeleteFunction(value._id)}
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
