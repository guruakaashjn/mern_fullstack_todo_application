/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useCreateTodoEntryMutation } from "../store/services/todoEntryApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ToDoEntryForm from "../components/TodoEntryForm";

export default function CreateTodoEntry({ mode }: any) {
  const navigate = useNavigate();

  const [
    createTodoEntry,
    {
      data: createTodoEntryData,
      error: createTodoEntryError,
      isSuccess: createTodoEntryIsSuccess,
      isError: createTodoEntryIsError,
    },
  ] = useCreateTodoEntryMutation();

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
      enabled: false,
      status: "Completed",
    };

    if (mode === "create") {
      createTodoEntry(newFormData);
    }
  };

  useEffect(() => {
    if (createTodoEntryIsSuccess) {
      toast(`Create todo entry successful`);

      navigate("/list-todo-entries");

      return;
    }

    if (createTodoEntryIsError) {
      console.log("Create todo entry error occured");
      toast(
        `Error occured while creating todo entry ${JSON.stringify(
          createTodoEntryError
        )}`
      );
    }
  }, [
    createTodoEntryData,
    createTodoEntryError,
    createTodoEntryIsSuccess,
    createTodoEntryIsError,
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
