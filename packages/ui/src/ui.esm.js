import * as components from './components'

const VuePlugin = {
  components,
  install (Vue) {
    for (const [
      // eslint-disable-next-line
      className,
      component,
    ] of Object.entries(components)) {
      Vue.component(component.name, component)
    }
  },
}

export default VuePlugin
