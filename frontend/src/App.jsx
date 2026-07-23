import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Inventory from "./pages/Inventory";
import Billing from "./pages/Billing";
import Employees from "./pages/Employees";
import Reports from "./pages/Reports";
import RoleProtectedRoute from "./routes/RoleProtectedRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route 
path="/register" 
element={<Register />} 
/>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Layout>
                <Products />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <Layout>
                <Inventory />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/billing"
          element={
            <ProtectedRoute>
              <Layout>
                <Billing />
              </Layout>
            </ProtectedRoute>
          }
        />

<Route
    path="/employees"
    element={
        <ProtectedRoute>

            <RoleProtectedRoute>

                <Layout>

                    <Employees />

                </Layout>

            </RoleProtectedRoute>

        </ProtectedRoute>
    }
/>

     <Route
    path="/reports"
    element={
        <ProtectedRoute>

            <RoleProtectedRoute>

                <Layout>

                    <Reports />

                </Layout>

            </RoleProtectedRoute>

        </ProtectedRoute>
    }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;