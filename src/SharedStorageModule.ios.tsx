import {requireNativeModule} from 'expo-modules-core'

import {ContainsOptions, Data, GetOptions, RemoveOptions, SetOptions, StorageOptions} from './types'

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
  contains: (options: ContainsOptions & StorageOptions): Promise<boolean> => {
    return SharedStorageModule.contains(options)
  },
  getAllKeys: (options: StorageOptions): Promise<string[]> => {
    return SharedStorageModule.getAllKeys(options)
  },
}
