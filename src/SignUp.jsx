import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { signUp } from "./firebase";

function SignUp() {
  const formStatus = useNavigation().state;

  const error = useActionData();

  return (
    <div className="mt-16">
      <Form replace method="post" className="w-7/12 mx-auto ">
        <h1 className="font-bold translate-x-[-3px] text-[35px] w-fit mx-auto mb-4">
          Create an account
        </h1>

        {error && (
          <h1
            className="font-semibold text-red-600
            w-fit mx-auto capitalize  text-[20px]  mb-4"
          >
            {error}
          </h1>
        )}
        <div className="rounded-md   bg-white  flex flex-col border-[1px]  items-center">
          <input
            name="email"
            placeholder="Email adress"
            className="mx-2  h-[45px] outline-none  w-11/12 "
          ></input>
          <hr className="w-full " />
          <input
            name="password"
            placeholder="Password"
            className="mx-2    outline-none h-[45px]  w-11/12 "
          ></input>
        </div>
        <button
          disabled={formStatus === "submitting"}
          type="submit"
          className={`${
            formStatus === "idle" ? "bg-orange-400" : "bg-orange-300"
          }
        w-full p-2 mt-8 rounded-md mb-4  text-[20px] text-white`}
        >
          {formStatus === "idle" ? "Log in" : "Logging in"}
        </button>
      </Form>
    </div>
  );
}

async function handleForm({ request }) {
  const data = await request.formData();
  const url = new URL(request.url);
  const email = data.get("email");
  console.log(url.searchParams.get("redirect"), "this is path");
  const password = data.get("password");
  try {
    const user = await signUp(email, password);
    console.log("user");
    localStorage.setItem("isLogged", true);
    localStorage.setItem("email", email);
    return redirect(url.searchParams.get("redirect") || "/host");
  } catch (err) {
    console.log(err.code);

    return err.code.replace("auth/", "");
  }
}
export default SignUp;
export { handleForm };
