export const createTargetWatcher = () => {
  let target = null

  return {
    targetWatcher(watcherName, fn) {
      target = {
        watcherName,
        fn,
      }
      target.fn()
      target = null
    },
    getTarget() {
      return target
    },
  }
}
