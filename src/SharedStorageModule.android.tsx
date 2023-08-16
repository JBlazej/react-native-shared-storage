import {Data, GetOptions, RemoveOptions, SetOptions} from './types'

export default {
  get<T extends Data>(options: GetOptions): Promise<T | null> {
    return this.get(options)
  },
  remove(options: RemoveOptions): Promise<null> {
    return this.remove(options)
  },
  set<T extends Data>(options: SetOptions<T>): Promise<T> {
    return this.set(options)
  },
}
