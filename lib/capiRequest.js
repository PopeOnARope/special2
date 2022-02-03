import * as Url from "url";
import axios from 'axios'
//capi request
function sendCapiRequest(type, event, data) {
  var extraData = {
    eventID: generateRandomString(32)
  };
  var capiData = {
    url: window.location.href,
    fbp: getCookie('_fbp'),
    fbc: getCookie('_fbc') || null,
  };
  // var testEventCode = getCookie('test_event_code') || 'TEST57723';
  // if (testEventCode) {
  //   capiData['testEventCode'] = testEventCode;
  // }
  fbq(type, event, data, extraData);

  axios.post('https://capifrog.com/api/special/',       {
    type: type,
    event: event,
    data: data,
    extraData: extraData,
    capiData: capiData,
  })
    .then((data) => {
      console.log('data', data)
    })
    .catch((e) => {
      console.log('error', e)
    })
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}


function generateRandomString(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }

  return result;
}


export default sendCapiRequest
