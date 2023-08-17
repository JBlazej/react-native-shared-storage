import SharedStorageModule from './SharedStorageModule'
import {StorageOptions, Storage} from './types'

export class SharedStorage<TStorage extends Storage = Storage> {
  private storageKey: string

  constructor(options: StorageOptions) {
    this.storageKey = options.storageKey
  }

  async set<Key extends keyof TStorage>(key: Key, data: TStorage[Key]): Promise<TStorage[Key]> {
    const result = await SharedStorageModule.set({
      key,
      data,
      storageKey: this.storageKey,
    })

    return result as TStorage[Key]
  }

  async get<Key extends keyof TStorage>(key: Key): Promise<TStorage[Key] | null> {
    const result = await SharedStorageModule.get({
      key,
      storageKey: this.storageKey,
    })

    return result as TStorage[Key] | null
  }

  async remove<Key extends keyof TStorage>(key: Key): Promise<null> {
    await SharedStorageModule.remove({
      key,
      storageKey: this.storageKey,
    })

    return null
  }

  async contains<Key extends keyof TStorage>(key: Key): Promise<boolean> {
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
