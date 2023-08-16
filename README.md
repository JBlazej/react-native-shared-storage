### ℹ️ WIP
# React Native Shared Storage
The Shared Storage module offers a convenient way to seamlessly interact with shared storage in your Expo application. With this module, you gain access to methods designed for data management, including setting, getting, and removing data from shared storage. This facilitates a hassle-free experience for handling shared storage interactions.
## Platform-Specific Storage Mechanisms
Behind the scenes, the Shared Storage module employs platform-specific storage mechanisms to ensure optimal performance and compatibility.

* **iOS:** On iOS, the module utilizes App Groups to enable shared storage between your main app and app extensions, such as widgets. App Groups allow for seamless communication and data sharing between various components of your iOS application suite.

* **Android:** On the Android platform, the module harnesses SharedPreferences to manage shared storage. SharedPreferences provide a streamlined approach to store and retrieve data across different parts of your Android app, offering efficient storage and retrieval operations.

## Installation
```sh
yarn add @footshop/react-native-shared-storage
```
### Expo
You'll need to rebuild your dev client. SharedStorage will not work in Expo Go.
```sh
npx expo prebuild --clean
npx expo run:ios
```
Import the module in your code:
```typescript
import { set, get, remove } from '@footshop/react-native-shared-storage'
 ```

## Methods
### `set<T>(options: SetOptions<Data>): Promise<T>`
This method allows you to store data in shared storage. It takes an object with the following properties:

* **suiteName** (string, required): The name of the shared storage suite.
* **key** (string, required): The key under which the data will be stored.
* **data** (object | string | number, required): The data to be stored.
It returns a Promise that resolves with the stored data.

#### Example usage:
```typescript
const options = {
  suiteName: 'group.com.example.app',  
  key: 'key',
  data: 'data to store'
};

try {
  const data = await set(options);
  console.log('Data stored:', data);
} catch (error) {
  console.error('Error storing data:', error);
}
```

### `get<T>(options: GetOptions): Promise<T | null>`
This method allows you to retrieve data from shared storage. It takes an object with the following properties:

* **suiteName** (string, required): The name of the shared storage suite.
* **key** (string, required): The key of the data to retrieve.
It returns a Promise that resolves with the retrieved data or null if the data is not found.

#### Example usage:

```typescript
const options = {
   suiteName: 'group.com.example.app', 
   key: 'key'
};

try {
  const data = await get(options);
  if (data !== null) {
    console.log('Retrieved data:', data);
  } else {
    console.log('Data not found.');
  }
} catch (error) {
  console.error('Error retrieving data:', error);
}
```

### `remove(options: RemoveOptions): Promise<null>`
This method allows you to remove data from shared storage. It takes an object with the following properties:

* **suiteName** (string, required): The name of the shared storage suite.
* **key** (string, required): The key of the data to remove.
It returns a Promise that resolves when the data is successfully removed.

#### Example usage:
```typescript
const options = {
  suiteName: 'group.com.example.app',
  key: 'key'
};

try {
  await remove(options);
  console.log('Data removed successfully.');
} catch (error) {
  console.error('Error removing data:', error);
}
```

## Conclusion
The Shared Storage Expo Module simplifies the process of storing, retrieving, and removing data from shared storage in your Expo project. Use the provided methods to manage data in shared storage with ease.

Please make sure to adapt this documentation according to your module's actual behavior and any additional details you might want to include.