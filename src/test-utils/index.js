export const createGetDepsOf = (reactive) => (watchName) => {
  const dependencies = reactive._internal._getSubscribers()
  return Object.keys(dependencies[watchName]?.deps || {})
}
