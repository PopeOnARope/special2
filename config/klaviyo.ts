// if (!process.env.BUILDER_PUBLIC_KEY) {
//   throw new Error('Missing env varialbe BUILDER_PUBLIC_KEY')
// }

export default {
  apiKey: process.env.KLAVIYO_API_KEY,
  list_id: process.env.KLAVIYO_LIST_ID,
}
