import {
  useLoaderData,
  Form,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
  Link,
} from "react-router-dom";
import { signUp, signIn } from "./firebase";

function Login() {
  const formStatus = useNavigation().state;
  const loadData = useLoaderData();
  const message = loadData.message;
  const url = loadData?.url || "";
  const error = useActionData();

  return (
    <div className="mt-16">
      <Form replace method="post" className="w-7/12 mx-auto ">
        <h1 className="font-bold translate-x-[-3px] text-[35px] w-fit mx-auto mb-4">
          Sign in to your account
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
        {message && (
          <h1
            className="text-red-600 
        font-semibold  "
          >
            **You must Login To Continue
          </h1>
        )}
        <h1 className="mt-8">
          Not a member{" "}
          <Link to={`/signup?redirect=${url}`} className="text-sky-700">
            {" "}
            Register{" "}
          </Link>
        </h1>
      </Form>
    </div>
  );
}

async function handleForm({ request }) {
  const data = await request.formData();
  const url = new URL(request.url);
  const email = data.get("email");

  const password = data.get("password");
  try {
    const user = await signIn(email, password);

    localStorage.setItem("isLogged", true);
    localStorage.setItem("email", email);

    return redirect(url.searchParams.get("redirect") || "/host");
  } catch (err) {
    return err.code.replace("auth/", "");
  }
}

async function loader({ request }) {
  const url = new URL(request.url);
  return {
    message: url.searchParams.get("message"),
    url: url.searchParams.get("redirect"),
  };
}

export default Login;
export { handleForm, loader };
