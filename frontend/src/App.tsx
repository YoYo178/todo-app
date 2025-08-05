import { BrowserRouter, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { AuthProvider } from "./contexts/AuthContext";
import { TaskProvider } from "./contexts/TasksContext";

import { PublicRouteLayout } from "./layouts/PublicRouteLayout";
import { ProtectedRouteLayout } from "./layouts/ProtectedRouteLayout";

import { Dashboard, Landing, Login, Register } from './pages'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TaskProvider>
          <BrowserRouter basename="/todo-app/">
            <Routes>

              <Route element={<PublicRouteLayout />}>
                <Route index element={<Landing />} />

                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
              </Route>

              <Route element={<ProtectedRouteLayout />}>
                <Route path='/dashboard' element={<Dashboard />} />
              </Route>

              <Route path="*" element={<h1>Not found!</h1>} />
            </Routes>
          </BrowserRouter>
        </TaskProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
