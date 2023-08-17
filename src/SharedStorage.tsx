import SharedStorageModule from './SharedStorageModule'
import {Data, StorageOptions} from './types'

export class SharedStorage {
  private storageKey: string

  constructor(options: StorageOptions) {
    this.storageKey = options.storageKey
  }

  async set<T extends Data>(key: string, data: T): Promise<T> {
    const result = await SharedStorageModule.set({
      key,
      data,
      storageKey: this.storageKey,
    })
    return result as T
  }

  async get<T extends Data>(key: string): Promise<T | null> {
    const result = await SharedStorageModule.get({
      key,
      storageKey: this.storageKey,
    })
    return result as T | null
  }

  async remove(key: string): Promise<null> {
    await SharedStorageModule.remove({
      key,
      storageKey: this.storageKey,
    })
    return null
  }

  async contains(key: string): Promise<boolean> {
    const result = await SharedStorageModule.contains({
      key,
      storageKey: this.storageKey,
    })

    return result as boolean
  }

  async getAllKeys(): Promise<string[]> {
    const result = await SharedStorageModule.getAllKeys({
      storageKey: this.storageKey,
    })

    return result as string[]
  }

  changeStorageKey(newStorageKey: string): void {
    if (this.storageKey === newStorageKey) {
      console.warn('SharedStorage: changeStorageKey() called with the same storageKey')
      return
    }

    this.storageKey = newStorageKey
  }
}
