import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Dashbord } from "@pages/dashboard/Dashbord"
import { MentorForm } from "@pages/mentor/MentorForm"
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
          element={<Dashbord />}
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
