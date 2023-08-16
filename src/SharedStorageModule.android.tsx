import {Data, GetOptions, RemoveOptions, SetOptions, StorageOptions} from './types'

export default {
  get<T extends Data>(options: GetOptions & StorageOptions): Promise<T | null> {
    return this.get(options)
  },
  remove(options: RemoveOptions & StorageOptions): Promise<null> {
    return this.remove(options)
  },
  set<T extends Data>(options: SetOptions<T> & StorageOptions): Promise<T> {
    return this.set(options)
  },
}
