/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useLogoutMutation } from "../store/services/authApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { setUser } from "../store/features/authSlice";
import { FaHome, FaPowerOff } from "react-icons/fa";

export default function NavigationBar() {
  const currentUser = useAppSelector((state: any) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [
    logout,
    {
      data: logoutData,
      isSuccess: isLogoutSuccess,
      isError: isLogoutError,
      error: logoutError,
    },
  ] = useLogoutMutation();

  const callLogoutFunction = () => {
    logout({ email: currentUser.response.email });
  };

  useEffect(() => {
    if (isLogoutSuccess) {
      toast("Logout Successful");

      dispatch(setUser({ type: "auth/logout", payload: { data: {} } }));
      navigate("/");

      return;
    }

    if (isLogoutError) {
      console.log("Logout error occured", logoutError);
      toast(`Logout Error ${JSON.stringify(logoutError)}`);
    }
  }, [isLogoutSuccess, isLogoutError, logoutData, logoutError]);

  return (
    <div className="flex flex-row items-center justify-between rounded-2xl px-4 w-full shadow-lg mb-10">
      {/* <div className="flex flex-row items-center justify-between"> */}

      <div className="flex flex-row w-[40vw] height-[10] justify-start items-center ">
        <div>
          <button type="button" className="mx-10">
            <FaHome
              onClick={() => {
                navigate("/");
              }}
              className="my-5 items-center justify-center"
              size={30}
            />
          </button>
        </div>

        <div className="">
          <p
            // type="button"
            className="text-black font-bold text-xl my-5 rounded-lg "
          >
            My Portal
          </p>
        </div>
      </div>

      <div className="flex flex-row w-[40vw] height-[10] justify-end items-center">
        <div className="">
          <p
            // type="button"
            className="text-black font-medium text-md my-5 rounded-lg"
            onClick={() => {
              navigate("/list-cronjobs");
            }}
          >
            {`Logged In as `}
            <span className="font-bold">{`${currentUser.response.email}`}</span>
          </p>
        </div>
        <div className="">
          <button
            type="button"
            className="m-10 font-medium text-2xl my-5 rounded-lg hover:text-black transition"
          >
            <FaPowerOff
              size={25}
              onClick={() => {
                callLogoutFunction();
              }}
            />
          </button>
        </div>
      </div>

      {/* </div> */}
    </div>
  );
}
