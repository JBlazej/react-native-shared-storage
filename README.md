# React Native Shared Storage
The Shared Storage module offers a convenient way to seamlessly interact with shared storage in your Expo application. With this module, you gain access to methods designed for data management, including setting, getting, and removing data from shared storage. This facilitates a hassle-free experience for handling shared storage interactions.
## Platform-Specific Storage Mechanisms
Behind the scenes, the Shared Storage module employs platform-specific storage mechanisms to ensure optimal performance and compatibility.

* **iOS:** On iOS, the module utilizes App Groups to enable shared storage between your main app and app extensions, such as widgets. App Groups allow for seamless communication and data sharing between various components of your iOS application suite.

* **Android:** On the Android platform, the module harnesses SharedPreferences to manage shared storage. SharedPreferences provide a streamlined approach to store and retrieve data across different parts of your Android app, offering efficient storage and retrieval operations.

## Installation
### ⚠️️ NOT PUBLISHED YET ⚠️️
```sh
yarn add @footshop/react-native-shared-storage
```
### Expo
You'll need to rebuild your dev client. SharedStorage will not work in Expo Go.
```sh
npx expo prebuild --clean
npx expo run:ios
npx expo run:android
```
### Usage
Import the module in your code:
```typescript
import { SharedStorage } from '@footshop/react-native-shared-storage'
 ```

Create instance of storage with storage key:
```typescript
const storage = new SharedStorage({ storageKey: "group.com.example.app"})
 ```

You can type storage with generics and enhance type safety:
```typescript
type Storage = {
  a: string
  b: {
    a: string
    b: number
  }
}

const storage = new SharedStorage<Storage>({ storageKey: "group.com.example.app"})
 ```

You can change the storage key with new key by provided method:
```typescript
storage.setStorageKey("group.com.example2.app")
 ```

Or have multiple instances of storage with different keys:
```typescript
const storageOne = new SharedStorage({ storageKey: "group.com.example.app"})
const storageTwo = new SharedStorage({ storageKey: "group.com.example2.app"})
 ```

## Methods
### `set<K extends keyof S>(key: K, data: S[K]): Promise<S[K]>`
This method allows you to store data in shared storage.

* **key** (string, required): The key under which the data will be stored.
* **data** (object | string | number, required): The data to be stored.
It returns a Promise that resolves with the stored data.

#### Example usage:
```typescript
try {
  const data = await storage.set('key', 'data to store')
  console.log('Data stored:', data)
} catch (error) {
  console.error('Error storing data:', error)
}
```

### `get<K extends keyof S>(key: K): Promise<S[K] | null>`
This method allows you to retrieve data from shared storage.

* **key** (string, required): The key of the data to retrieve.
It returns a Promise that resolves with the retrieved data or null if the data is not found.

#### Example usage:

```typescript
try {
  const data = await storage.get('key')
  if (data !== null) {
    console.log('Retrieved data:', data)
  } else {
    console.log('Data not found.')
  }
} catch (error) {
  console.error('Error retrieving data:', error)
}
```

### `remove<K extends keyof S>(key: K): Promise<null>`
This method allows you to remove data from shared storage.

* **key** (string, required): The key of the data to remove.
It returns a Promise that resolves when the data is successfully removed.

#### Example usage:
```typescript
try {
  await storage.remove("key")
  console.log('Data removed successfully.')
} catch (error) {
  console.error('Error removing data:', error)
}
```

### `contains<K extends keyof S>(key: K): Promise<boolean>`
This method allows you to checked if key does exist in shared storage.

* **key** (string, required): The key of the data to check.

#### Example usage:
```typescript
try {
  const isExists = await storage.contains("key")
  console.log('Is key in shared storage', isExists)
} catch (error) {
  console.error('Error contains:', error)
}
```

### `getAllKeys(): Promise<string[]>`
This method allows you to get all keys from storage.

#### Example usage:
```typescript
try {
  const keys = await storage.getAllKeys()
  console.log('All keys', keys)
} catch (error) {
  console.error('Error getAllKeys:', error)
}
```

## Conclusion
The Shared Storage Expo Module simplifies the process of storing, retrieving, and removing data from shared storage in your Expo project. Use the provided methods to manage data in shared storage with ease.