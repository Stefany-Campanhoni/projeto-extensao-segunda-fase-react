import { router } from "@routes/routes"
import { AuthProvider } from "@security/contexts/AuthContext"
import { RouterProvider } from "react-router-dom"

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
