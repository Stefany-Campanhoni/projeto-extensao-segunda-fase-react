import { Dashboard } from "@pages/dashboard/Dashboard"
import { MentorForm } from "@pages/mentor/MentorForm"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/mentors/create"
          element={<MentorForm />}
        />

        <Route
          path="/mentors/:id/edit"
          element={<MentorForm />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
