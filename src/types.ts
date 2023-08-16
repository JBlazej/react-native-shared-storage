export type Data = object | string | number

export type Options = {
  suiteName: string
  key: string
}

export type SetOptions<T extends Data> = {
  data: T
} & Options

export type GetOptions = Options

export type RemoveOptions = Options
