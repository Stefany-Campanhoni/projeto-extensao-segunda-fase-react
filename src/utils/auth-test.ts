/**
 * Utility functions to test authentication token handling
 * These functions can be used in the browser console to debug token issues
 */

export function checkAuthToken(): void {
  const token = localStorage.getItem("auth_token")
  const user = localStorage.getItem("auth_user")

  console.log("=== Authentication Debug Info ===")
  console.log("Token in localStorage:", token ? "Present" : "Missing")
  console.log("User in localStorage:", user ? "Present" : "Missing")

  if (user) {
    try {
      const userData = JSON.parse(user)
      console.log("User data:", userData)
      console.log("Token in user object:", userData.token ? "Present" : "Missing")
      console.log("Token matches localStorage:", userData.token === token)
    } catch (error) {
      console.error("Error parsing user data:", error)
    }
  }
}

export function testAuthenticatedRequest(): void {
  const token = localStorage.getItem("auth_token")
  if (!token) {
    console.error("No authentication token found")
    return
  }

  fetch("http://localhost:8080/mentors", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log("Response status:", response.status)
      console.log("Response headers:", response.headers)
      return response.json()
    })
    .then((data) => {
      console.log("Response data:", data)
    })
    .catch((error) => {
      console.error("Request failed:", error)
    })
}

// Make functions available in browser console
if (typeof window !== "undefined") {
  ;(window as any).checkAuthToken = checkAuthToken
  ;(window as any).testAuthenticatedRequest = testAuthenticatedRequest
}
