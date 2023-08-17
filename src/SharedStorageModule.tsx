const isDev =
  // @ts-ignore
  typeof __DEV__ !== 'undefined' ? __DEV__ : typeof process !== 'undefined' && process.env.NODE_ENV !== 'production'

export default {
  get() {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.warn('[sharedStorage] SharedStorage.get() is not implemented on this platform.')
    }
  },
  remove() {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.warn('[sharedStorage] SharedStorage.remove() is not implemented on this platform.')
    }
  },
  set() {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.warn('[sharedStorage] SharedStorage.set() is not implemented on this platform.')
    }
  },
  contains() {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.warn('[sharedStorage] SharedStorage.contains() is not implemented on this platform.')
    }
  },
  getAllKeys() {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.warn('[sharedStorage] SharedStorage.getAllKeys() is not implemented on this platform.')
    }
  },
} as any
