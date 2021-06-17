import Lodash from 'lodash'
export default ({ app }, inject) => {
  inject('_', Lodash)
}
