import THBText from 'thai-baht-text'

export default ({ app }, inject) => {
  inject('thaiBathText', (amount) => {
    return THBText(amount)
  })
}
