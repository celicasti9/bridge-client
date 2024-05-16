import "./App.css";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import DashboardPage from "./pages/DashboardPage";
import CategoriesPage from "./pages/CategoriesPage";
import IncomePage from "./pages/IncomePage";
import ExpensesPage from "./pages/ExpensesPage";
import MyProfile from "./pages/MyProfile";
import DeleteExpense from "./pages/DeleteExpense";
import ExpenseList from "./pages/ExpenseList";
import EditExpense from "./pages/EditExpense";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import SettingsPage from "./pages/SettingsPage";
import ResetPassword from "./pages/ResetPassword";

function App() {

  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to="/login" />;
  };

  const NotLoggedIn = () => {
    return !getToken() ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <div className="App">
    
      <Navbar />

      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/*" element={<ErrorPage />} />

        <Route element={<LoggedIn />}>

        <Route path="/dashboard" element={<DashboardPage /> } />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/list" element={<ExpenseList />} />
        <Route path="/income" element={<IncomePage />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/update/:expenseId" element={<EditExpense />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route exact path="/expenses/delete" element={<DeleteExpense />} /> 



        </Route>

        <Route element={<NotLoggedIn />}>

          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:userId" element={<ResetPassword />} />

        </Route>

      </Routes>

    </div>
  );
}

export default App;
