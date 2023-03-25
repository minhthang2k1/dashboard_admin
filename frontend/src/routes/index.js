import LoginLayout from "~/layout/LoginLayout";
import RegisterLayout from "~/layout/RegisterLayout";

import Home from "~/components/Home";
import Login from "~/components/Login";
import Register from "~/components/Register";
import Table from "~/components/Table";
import Profile from "~/components/Profile";

import config from "~/config";

export const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.login, component: Login, layout: LoginLayout },
  { path: config.routes.register, component: Register, layout: RegisterLayout },
  { path: config.routes.table, component: Table },
  { path: config.routes.profile, component: Profile },
];
