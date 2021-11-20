import React from 'react'
import Cookies from 'js-cookie'

const Redirect = ()=>{

  const [cookie, setCookie] = React.useState()

  React.useEffect(()=>{

    const _cookie = document.cookie
    console.log({cookie})
    const handleRedirect = ()=>{
        window.location.href = '/home'

      //
      // if(Cookies.get('account') || Cookies.get('account') === 'declined') {
      //   window.location.href = '/home'
      // } else {
      //   window.location.href = '/signup'
      // }
    }

    setTimeout(handleRedirect, 2000)

  })
  //check if user account has been created for this user

  //if not, direct to the account creation page
  //if so, go to the home page


return (<div></div>)
}

export default Redirect;
