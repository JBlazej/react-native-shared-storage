import {requireNativeModule} from 'expo-modules-core'

import {Data, GetOptions, RemoveOptions, SetOptions, StorageOptions} from './types'

const SharedStorageModule = requireNativeModule('SharedStorage')

export default {
  get<T extends Data>(options: GetOptions & StorageOptions): Promise<T | null> {
    return SharedStorageModule.get(options)
  },
  remove(options: RemoveOptions & StorageOptions): Promise<null> {
    return SharedStorageModule.remove(options)
  },
  set<T extends Data>(options: SetOptions<T> & StorageOptions): Promise<T> {
    return SharedStorageModule.set(options)
  },
}
