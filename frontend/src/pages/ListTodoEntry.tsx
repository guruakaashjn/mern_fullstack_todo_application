/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetTodoEntryByIdMutation } from "../store/services/todoEntryApi";
import { toast } from "react-toastify";

const ListTodoEntry = () => {
  const { todoEntryId } = useParams();

  const [getTodoEntryByIdState, setGetTodoEntryByIdState] = useState({
    name: "",
    description: "",
    enabled: false,
    createdDate: "",
    updatedDate: "",
  });

  const [
    getTodoEntryById,
    {
      data: getTodoEntryByIdData,
      isSuccess: getTodoEntryByIdIsSuccess,
      isError: getTodoEntryByIdIsError,
      error: getTodoEntryByIdError,
    },
  ] = useGetTodoEntryByIdMutation();

  useEffect(() => {
    if (getTodoEntryByIdIsSuccess) {
      setGetTodoEntryByIdState(
        JSON.parse(JSON.stringify(getTodoEntryByIdData))
      );
    }

    if (getTodoEntryByIdIsError) {
      toast(
        `Error occured while get todo entry by id ${JSON.stringify(
          getTodoEntryByIdError
        )}`
      );
    }
  }, [
    getTodoEntryByIdData,
    getTodoEntryByIdIsSuccess,
    getTodoEntryByIdIsError,
    getTodoEntryByIdError,
  ]);

  useEffect(() => {
    if (todoEntryId !== undefined) {
      getTodoEntryById({ id: todoEntryId });
    }
  }, [todoEntryId]);

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-gray-100 p-4 gap-5">
      <div className="rounded-2xl shadow-lg p-4 w-full max-w-2xl bg-white-100 font-bold">
        {"Todo Entry Details"}
      </div>
      <div className="flex flex-col rounded-2xl shadow-lg p-8 w-full max-w-2xl bg-white gap-5">
        <div>
          <label className="block mb-1 text-left text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={getTodoEntryByIdState.name}
            //   onChange={handleChange}
            className="w-full border border-gray-300 bg-gray-100 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-400"
            disabled
          />
        </div>

        <div>
          <label className="block mb-1 text-left text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={getTodoEntryByIdState.description}
            //   onChange={handleChange}
            className="w-full border border-gray-300 bg-gray-100 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-400"
            disabled
          />
        </div>

        <div>
          <label className="block mb-1 text-left text-sm font-medium text-gray-700">
            Priority
          </label>

          <input
            type="text"
            name="enabled"
            value={getTodoEntryByIdState.enabled ? "True" : "False"}
            //   onChange={handleChange}
            className="w-full border border-gray-300 bg-gray-100 ounded-lg p-2 focus:outline-none focus:ring focus:border-blue-400"
            disabled
          />
        </div>

        <div>
          <label className="block mb-1 text-left text-sm font-medium text-gray-700">
            Created At
          </label>
          <input
            type="text"
            name="description"
            value={new Date(getTodoEntryByIdState.createdDate).toLocaleString(
              "en-IN",
              {
                timeZone: "Asia/Kolkata",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }
            )}
            //   onChange={handleChange}
            className="w-full border border-gray-300 bg-gray-100 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-400"
            disabled
          />
        </div>

        <div>
          <label className="block mb-1 text-left text-sm font-medium text-gray-700">
            Updated At
          </label>
          <input
            type="text"
            name="description"
            value={new Date(getTodoEntryByIdState.updatedDate).toLocaleString(
              "en-IN",
              {
                timeZone: "Asia/Kolkata",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }
            )}
            //   onChange={handleChange}
            className="w-full border border-gray-300 bg-gray-100 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-400"
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default ListTodoEntry;
