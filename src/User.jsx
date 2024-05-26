import React, { Suspense, useEffect, useRef, useState } from "react";
console.log(window.innerWidth);
import img from "./assets/user.png";
import {
  Form,
  redirect,
  Await,
  defer,
  useLoaderData,
  useNavigation,
  useAsyncError,
  useRouteError,
} from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, hostVansFetch } from "./firebase";

import { BarLoader } from "react-spinners";

function User() {
  const [total, setTotal] = useState(0);
  const cartDataPromise = useLoaderData().promise;
  const formStatus = useNavigation().state;
  const email = localStorage.getItem("email");
  console.log(formStatus);
  useEffect(() => {
    setTimeout(() => {
      const k = localStorage.getItem("ammount");
      console.log(k, "in");
      setTotal(k);
    }, 1500);
  }, []);
  const CartData = (vanData) => {
    console.log("mani");
    const cart = vanData.docs;

    let a = 0;

    const Content = cart.map((ele) => {
      const doc = ele.data();
      a += Number(doc.price);
      console.log(doc, "cart");

      return (
        <div
          key={ele.id}
          className="mt-2 flex p-4 
            font-bold text-[22px] capitalize justify-between flex-wrap rounded-lg bg-slate-100 w-12/12"
        >
          <h1>{doc.name}</h1>
          <div className="hidden sm:flex flex-row gap-3">
            <h1>{doc.date}</h1>
            <h1>{doc.time}</h1>
          </div>
          <h1>
            &#8377;<span>{doc.price}</span>
          </h1>
        </div>
      );
    });
    localStorage.setItem("ammount", a);

    return Content;
  };
  return (
    <div className="mt-20 mb-24">
      <Form className=" w-6/12 mx-auto" method="post" replace>
        <div
          className="w-6/12 mx-auto flex flex-col
        items-center gap-4"
        >
          <img src={img} className="  w-10" alt="logo"></img>
          <p> {email}</p>
          <button
            disabled={formStatus === "submitting"}
            type="submit"
            className={`${
              formStatus === "idle" ? "bg-orange-600" : "bg-orange-300"
            }
        w-full p-2  rounded-full text-[20px] text-white`}
          >
            {formStatus === "idle" ? "Log Out" : "Logging Out"}
          </button>
        </div>
      </Form>

      <div className="w-full pb-6 pt-2 min-h-[150px] px-6 mt-6 rounded-md bg-orange-300">
        <div
          className="  justify-between font-semibold
          text-[24px] flex flex-wrap items-center"
        >
          <h1 className="">Rental Cart</h1>
          <h1>
            Total : &#8377; <span>{total}</span>
          </h1>
        </div>
        <div className="mt-10 ">
          <Suspense
            fallback={
              <BarLoader
                className="w-fit mx-auto"
                width={window.innerWidth - 300}
                color="#FF5F1F"
              />
            }
          >
            <Await
              errorElement={<AsyncErrorElement />}
              resolve={cartDataPromise}
            >
              {CartData}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

async function actionhandle() {
  const out = await signOut(auth);
  localStorage.removeItem("isLogged");
  localStorage.removeItem("email");
  return redirect("/login");
}

async function loader() {
  const customPromise = new Promise((resolve, reject) => {
    setTimeout(async () => {
      const mail = localStorage.getItem("email");
      let data;
      try {
        data = await hostVansFetch(mail);
        if (data.docs.length === 0) reject("....No Vehicles were Rented");
      } catch (err) {
        reject(err.code);
      }
      return resolve(data);
    }, 100);
  });

  return defer({ promise: customPromise });
}

function AsyncErrorElement() {
  const err = useAsyncError();
  console.log(err);
  return (
    <div>
      <h1 className="text-[15px] font-semibold">{err}</h1>
    </div>
  );
}
function ErrorElement() {
  const err = useRouteError();
  return (
    <div>
      <h1 className="text-[15px] font-semibold">as</h1>
    </div>
  );
}
export default User;
export { actionhandle, loader, ErrorElement };
