export type Data = object | string | number

export type Options = {
  key: string
}

export type SetOptions<T extends Data> = {
  data: T
} & Options

export type GetOptions = Options

export type RemoveOptions = Options

export type ContainsOptions = Options

export type StorageOptions = {
  storageKey: string
}
