function getProductId(handle){
  // workaround since builder is not currently returning useable shopify product id's
  const ids = {
    eye_d: '7125193130140',
    'eye_d-regular': '7125193130140',
    'seven-cat_eye': '6977358364828',
    'seven-round': '6914290450588'
  }
  return ids[handle.toLowerCase()] || ''
}
export default getProductId
