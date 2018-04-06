import {
  each,
} from './util/lang'
import * as components from './components'

const VuePlugin = {
  components,

  install (Vue) {
    each(components, (def, name) => {
      Vue.component(name, def)
    })
  },
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VuePlugin)
}

export default VuePlugin
