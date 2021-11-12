import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'


export const useSignup = () => {
  const [signedUp, setSignedUp] = useState(true)
  const [shouldPromptForSignUp, setShouldPromptForSignUp] = useState(true)

  useEffect(() => {
    if (!Cookies.get('signedUp')) {
      setSignedUp(false)
    }
    if (!Cookies.get('shouldPromptForSignUp')) {
      setSignedUp(false)
    }
  }, [])

  const signUp = () => {
    setSignedUp(true)
    Cookies.set('signedUp', 'accepted', { expires: 365 })
  }

  return {
    acceptedCookies,
    onAcceptCookies: acceptCookies,
  }
}
