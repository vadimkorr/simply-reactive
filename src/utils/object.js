import isEqual from 'lodash.isequal'

export const depsAreEqual = (deps1, deps2) => {
  return isEqual(deps1, deps2)
}

export const getDepNames = (deps) => {
  return Object.keys(deps || {})
}

export const getUpdatedDeps = (depNames, currentData) => {
  const updatedDeps = {}
  depNames.forEach((depName) => {
    updatedDeps[depName] = currentData[depName]
  })
  return updatedDeps
}
