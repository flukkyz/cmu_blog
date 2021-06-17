export default ({ app }, inject) => {
  inject('base64ToBlob', (base64) => {
    let byteString
    if (base64.split(',')[0].includes('base64')) { byteString = atob(base64.split(',')[1]) } else { byteString = unescape(base64.split(',')[1]) }

    const mimeString = base64.split(',')[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }

    return new Blob([ia], { type: mimeString })
  })
}
