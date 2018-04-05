import { each } from 'vuikit/src/util/lang'
import * as components from './components'

const VuePlugin = {
  components,

  install (Vue) {
    each(components, (def, name) => {
      Vue.component(name, def)
    })
  }
}

export default VuePlugin

