import {requireNativeModule} from 'expo-modules-core'

import {Data, GetOptions, RemoveOptions, SetOptions} from './types'

const SharedStorageModule = requireNativeModule('SharedStorage')

export default {
  get<T extends Data>(options: GetOptions): Promise<T | null> {
    return SharedStorageModule.get(options)
  },
  remove(options: RemoveOptions): Promise<null> {
    return SharedStorageModule.remove(options)
  },
  set<T extends Data>(options: SetOptions<T>): Promise<T> {
    return SharedStorageModule.set(options)
  },
}
