/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl px-4 w-full shadow-lg">
      <button
        type="button"
        className="w-full h-[10vh] bg-black text-white py-2 font-medium text-2xl my-5 rounded-lg hover:bg-blue-600 hover:text-black transition"
        onClick={() => {
          // navigate("/list-cronjobs");
        }}
      >
        ToDo Entries Panel
      </button>
      {/* <p className="font-medium text-2xl my-5">Cronjobs Panel</p> */}
    </div>
  );
}
