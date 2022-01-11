'use strict'
const bizSdk = require('facebook-nodejs-business-sdk')
const Content = bizSdk.Content
const CustomData = bizSdk.CustomData
const DeliveryCategory = bizSdk.DeliveryCategory
const EventRequest = bizSdk.EventRequest
const UserData = bizSdk.UserData
const ServerEvent = bizSdk.ServerEvent

const access_token = process.env.FB_ACCESS_TOKEN
const pixel_id = process.env.NEXT_PUBLIC_FB_PIXEL_ID
const api = bizSdk.FacebookAdsApi.init(access_token)



const fbEventsHandler = (req, res) => {
  let current_timestamp = Math.floor(new Date() / 1000)

  console.log({BODY: req.body})
  const {eventName, event_source_url, products, value, currency} = req.body

  const userData = new UserData()
    // .setEmails([email])
    // .setPhones([phone])
    // It is recommended to send Client IP and User Agent for Conversions API Events.
    .setClientIpAddress(req.connection.remoteAddress)
    .setClientUserAgent(req.headers['user-agent'])
    .setFbp('fb.1.1558571054389.1098115397')
    .setFbc('fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890')

  const content = new Content()
    .setId('product123')
    .setQuantity(1)
    .setDeliveryCategory(DeliveryCategory.HOME_DELIVERY)

  const customData = new CustomData()
    .setContents([content])
    .setCurrency('usd')
    .setValue(123.45)

  const serverEvent = new ServerEvent()
    .setEventName('Viewcontent')
    .setEventTime(current_timestamp)
    .setUserData(userData)
    .setCustomData(customData)
    .setEventSourceUrl('http://localhost:3000/product/seven-cat_eye')
    .setActionSource('website')
  const eventsData = [serverEvent]
  // console.log({eventsData})
  const eventRequest = new EventRequest(access_token, pixel_id).setEvents(
    eventsData
  )

  eventRequest.execute().then(
    (response) => {
      console.log({ response })
      console.log({res})
      res.status(200).json(response )
    },
    (err) => {
      console.error('Error: ', err)
    }
  )
}

export default fbEventsHandler
