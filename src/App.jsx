import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  redirect,
} from "react-router-dom";
import "./App.css";

import Home from "./Home";
import About from "./About";
import { ErrorElement as VanError, loader as Vanloader, Vans } from "./Vans";
import Detailedvan, {
  HostVanDetails,
  Photos,
  Pricing,
  ErrorElement as DetailedvanError,
  loader as DetailedvanLoader,
} from "./Detailedvan";
import Layout, { Notfound } from "./Layout";
import Host, {
  Dashboard,
  HostVans,
  Income,
  Review,
  ErrorElement as HostVansError,
  loader as HostVanLoader,
  useAuthLoader as AuthLoader,
} from "./Host";
import VanBooking, {
  ErrorElement as VanBookingError,
  loader as VanBookingvanLoader,
} from "./VanBooking";
import Login, { loader as loginLoader, handleForm } from "./Login";
import SignUp, { handleForm as SignupHandle } from "./SignUp";
import User, {
  actionhandle,
  loader as UserLoader,
  ErrorElement as userError,
} from "./User";

const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route
      path="vans"
      errorElement={<VanError />}
      loader={Vanloader}
      element={<Vans />}
    />
    <Route
      path="vans/:id"
      loader={VanBookingvanLoader}
      errorElement={<VanBookingError />}
      element={<VanBooking />}
    />
    <Route
      path="host"
      loader={async ({ request }) => await AuthLoader(request)}
      element={<Host />}
    >
      <Route
        index
        loader={async ({ request }) => AuthLoader(request)}
        element={<Dashboard />}
      />

      <Route
        path="rating"
        loader={async ({ request }) => await AuthLoader(request)}
        element={<Income />}
      />
      <Route
        path="vans"
        errorElement={<HostVansError />}
        element={<HostVans />}
        loader={async (query) => {
          await AuthLoader(query.request);
          return HostVanLoader(query);
        }}
      />
      <Route
        path="vans/:id"
        loader={async (query) => {
          await AuthLoader(query.request);
          return DetailedvanLoader(query);
        }}
        errorElement={<DetailedvanError />}
        element={<Detailedvan />}
      >
        <Route index element={<HostVanDetails />} />
        <Route
          loader={async ({ request }) => await AuthLoader(request)}
          path="pricing"
          element={<Pricing />}
        />
        <Route
          loader={async ({ request }) => await AuthLoader(request)}
          path="photos"
          element={<Photos />}
        />
      </Route>
    </Route>
    <Route
      path="login"
      loader={(object) => {
        if (localStorage.getItem("isLogged")) {
          return redirect("/user");
        }
        return loginLoader(object);
      }}
      action={handleForm}
      element={<Login />}
    />
    <Route
      path="signup"
      errorElement={<h1>asdf</h1>}
      action={SignupHandle}
      element={<SignUp />}
    />
    <Route
      path="user"
      loader={async ({ request }) => {
        await AuthLoader(request);
        return UserLoader();
      }}
      action={actionhandle}
      errorElement={userError}
      element={<User />}
    />
    <Route path="*" element={<Notfound />} />
  </Route>,
);
const browserRouter = createBrowserRouter(routes);

function App() {
  return (
    <div className=" absolute w-full">
      <RouterProvider router={browserRouter} />
    </div>
  );
}

export default App;
