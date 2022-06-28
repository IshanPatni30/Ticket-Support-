// This is created to redirect users that are not
//  logged in to the login page instead of taking
//  them to the
// create new ticket page directly without login
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
    setCheckingStatus(false)
  }, [user])
  return { loggedIn, checkingStatus }

}
