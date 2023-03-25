import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import classNames from "classnames/bind";
import { publicRoutes } from "~/routes";
import DefaultLayout from "~/layout/DefaultLayout";
import { Fragment } from "react";

import styles from "./App.module.scss";

const cx = classNames.bind(styles);

function App() {
  return (
    <Router>
      <div className={cx("App")}>
        <Routes>
          {publicRoutes.map((route, index) => {
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
