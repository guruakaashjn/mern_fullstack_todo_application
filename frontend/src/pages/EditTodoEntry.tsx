/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetTodoEntryByIdMutation,
  useUpdateTodoEntryMutation,
} from "../store/services/todoEntryApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ToDoEntryForm from "../components/TodoEntryForm";

export default function EditTodoEntry({ mode }: any) {
  const navigate = useNavigate();
  const { todoEntryId } = useParams();

  const [
    updateTodoEntry,
    {
      data: updateTodoEntryData,
      error: updateTodoEntryError,
      isSuccess: updateTodoEntryIsSuccess,
      isError: updateTodoEntryIsError,
    },
  ] = useUpdateTodoEntryMutation();

  const [
    getTodoEntryById,
    {
      data: getTodoEntryByIdData,
      error: getTodoEntryByIdError,
      isSuccess: getTodoEntryByIdIsSuccess,
      isError: getTodoEntryByIdIsError,
    },
  ] = useGetTodoEntryByIdMutation();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleReset = () => {
    setFormData({
      name: "",
      description: "",
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Process form data here

    const newFormData = {
      name: formData.name,
      description: formData.description,
    };

    if (mode === "edit") {
      updateTodoEntry({ body: newFormData, id: todoEntryId });
    }
  };

  useEffect(() => {
    if (updateTodoEntryIsSuccess) {
      toast(`Update todo entry successful`);

      navigate("/list-todo-entries");
      return;
    }

    if (updateTodoEntryIsError) {
      console.log("Update todo entry error occured");
      toast(
        `Error occured while updating todo entry ${JSON.stringify(
          updateTodoEntryError
        )}`
      );
    }
  }, [
    updateTodoEntryData,
    updateTodoEntryError,
    updateTodoEntryIsSuccess,
    updateTodoEntryIsError,
  ]);

  useEffect(() => {
    if (mode != "edit") {
      return;
    }

    getTodoEntryById({ id: todoEntryId });
  }, []);

  useEffect(() => {
    if (getTodoEntryByIdIsSuccess) {
      setFormData(getTodoEntryByIdData);
    }

    if (getTodoEntryByIdIsError) {
      console.log("get todo entry by id error occured");
      toast(
        `Error occured while getting todo entry by id ${JSON.stringify(
          getTodoEntryByIdError
        )}`
      );
    }
  }, [
    getTodoEntryByIdData,
    getTodoEntryByIdError,
    getTodoEntryByIdIsSuccess,
    getTodoEntryByIdIsError,
  ]);

  return (
    <ToDoEntryForm
      mode={mode}
      formData={formData}
      setFormData={setFormData}
      handleReset={handleReset}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    ></ToDoEntryForm>
  );
}
