import React, { useContext, useEffect } from "react";
import { Outlet, Route, createRoutesFromElements,useNavigate,useLocation } from "react-router-dom";
import Registration from "../Pages/Registration";
import SignIn from "../Pages/SignIn";
import Dashboard from "../Components/Dashboard";
import { ContextApi } from "../Components/ContextProvider";
import { getLocalStorage } from "../LocalStorage";
import AuthComponent from "../Components/AuthComponent";
import Home from "../Pages/Home";
import UsersPages from "../Pages/UsersPages";

const Root = () => {
    const location=useLocation();
    console.log(location.pathname,'this is path');
  const context = useContext(ContextApi);
  const { setUser } = context;
  const navigate = useNavigate();

  const CheckAuth = async (token) => {
    const response = await fetch("http://localhost:3000/is-auth", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setUser({ ...data });
    console.log(data);

    if (data.status === 200) return navigate("/");
    else if (data.status === 400) return navigate("/registration");
    else if (location.pathname==="/registration") return navigate("/registration")
  };
  useEffect(() => {
    const token = getLocalStorage("app-auth");
    CheckAuth(token);
  }, []);
    return <Outlet />;
};


const AppRoutes = () => {
  return createRoutesFromElements(
    <Route element={<Root />}>
      <Route path="/login" element={<SignIn />} />
      <Route path="/registration" element={<Registration />} />
      <Route element={<AuthComponent />}>
        <Route element={<Outlet />}>
          <Route path='/' element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path="users" element={<UsersPages />}/>
          </Route>
        </Route>
      </Route>
    </Route>
  );
};

export default AppRoutes;
