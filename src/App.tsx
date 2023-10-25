import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { LoginForm } from "./pages/LoginForm";
import { PrivateRoutes } from "./utils/PrivateRoute";
import { Table } from "./pages/UsersList";
import { Header } from "./components/layouts/Navbar";
import { NotFoundPage } from "./pages/NotFound";
import { Router } from "./types/enums";

function App() {
  return (
    <>
      <Header />
      <div className='max-w-5xl m-auto flex'>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path='*' element={<NotFoundPage />} />
            <Route path={Router.TABLE} element={<Table />} />
            <Route
              path={Router.HOME}
              element={<Navigate to={Router.TABLE} replace />}
            />
          </Route>

          <Route path={Router.SIGNIN} element={<LoginForm />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
