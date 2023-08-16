import SharedStorageModule from './SharedStorageModule'
import {Data, GetOptions, RemoveOptions, SetOptions} from './types'

export function set<T extends Data>(options: SetOptions<Data>): Promise<T> {
  return SharedStorageModule.set(options)
}

export function get<T extends Data>(options: GetOptions): Promise<T | null> {
  return SharedStorageModule.get(options)
}

export function remove(options: RemoveOptions): Promise<null> {
  return SharedStorageModule.remove(options)
}

export * from './types'