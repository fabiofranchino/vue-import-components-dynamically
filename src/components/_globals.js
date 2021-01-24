// Globally register all base components for convenience, because they
// will be used very frequently. Components are registered using the
// PascalCased version of their file name.

import Vue from 'vue'

const requireComponent = require.context(
  './dynComps',
  false, // Do not look in subdirectories
  /[\w-]+\.vue$/
)

const list = []

// For each matching file name...
requireComponent.keys().forEach((fileName) => {
  // Get the component config
  const componentConfig = requireComponent(fileName)
  // Get the PascalCase version of the component name
  const componentName = fileName
    // Remove the "./_" from the beginning
    .replace(/^\.\//, '')
    // Remove the file extension from the end
    .replace(/\.\w+$/, '')
    // Split up kebabs
    .split('-')
    // Upper case
    .map((kebab) => kebab.charAt(0).toUpperCase() + kebab.slice(1))
    // Concatenated
    .join('')

  list.push({
    id: componentName.toLowerCase(),
    label: componentName.charAt(0).toUpperCase() + componentName.slice(1)
  })

  Vue.component(componentName, componentConfig.default || componentConfig)
})

export default list
