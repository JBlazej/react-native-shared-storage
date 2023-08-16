import SharedStorageModule from './SharedStorageModule'
import {Data, GetOptions, RemoveOptions, SetOptions, StorageOptions} from './types'

export class SharedStorage {
  private storageKey: string

  constructor(options: StorageOptions) {
    this.storageKey = options.storageKey
  }

  async set<T extends Data>(options: SetOptions<T>): Promise<T> {
    const result = await SharedStorageModule.set({
      ...options,
      storageKey: this.storageKey,
    })
    return result as T
  }

  async get<T extends Data>(options: GetOptions): Promise<T | null> {
    const result = await SharedStorageModule.get({
      ...options,
      storageKey: this.storageKey,
    })
    return result as T | null
  }

  async remove(options: RemoveOptions): Promise<null> {
    await SharedStorageModule.remove({
      ...options,
      storageKey: this.storageKey,
    })
    return null
  }

  changeStorageKey(newStorageKey: string): void {
    if (this.storageKey === newStorageKey) {
      console.warn('SharedStorage: changeStorageKey() called with the same storageKey')
      return
    }

    this.storageKey = newStorageKey
  }
}

export * from './types'
