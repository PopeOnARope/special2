//1. Add these 3 functions
import axios from 'axios'

async function sendCapiRequest(type, event, data) {
  const extraData = {
    eventID: generateRandomString(32),
  }
  const capiData = {
    url: window.location.href,
    fbp: getCookie('_fbp'),
    fbc: getCookie('_fbc') || null,
  }
  // fbq(type, event, data, extraData)
  //please send another post ajax request if you cannot use jquery
  try {
    let res = await axios.post(
      'https://crm.adtribe.com/capi/special/',
      {
        type,
        event,
        data,
        extraData,
        capiData,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
    let data = res.data
    return data
  } catch (error) {
    console.log(error)
    return error.response
  }
}
function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}
function generateRandomString(length) {
  var result = ''
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export default sendCapiRequest
