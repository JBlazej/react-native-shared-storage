import {Button, View} from 'react-native'

import {SharedStorage} from '@footshop/react-native-shared-storage'

const storage = new SharedStorage({storageKey: 'group.com.example.app'})

export default function App() {
  const set = async () => {
    try {
      const data = await storage.set('key', 'data to store')
      console.log('Data stored:', data)
    } catch (error) {
      console.error('Error storing data:', error)
    }
  }

  const get = async () => {
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
  }

  const remove = async () => {
    try {
      await storage.remove('key')
      console.log('Data removed successfully.')
    } catch (error) {
      console.error('Error removing data:', error)
    }
  }

  const contains = async () => {
    try {
      const result = await storage.contains('key')
      console.log('Has key', result)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const getAllKeys = async () => {
    try {
      const keys = await storage.getAllKeys()
      console.log('Keys:', keys)
    } catch (error) {
      console.error('Error getAllKeys:', error)
    }
  }

  return (
    <View style={{flex: 1}}>
      <Button title="Set" onPress={set} />
      <Button title="Get" onPress={get} />
      <Button title="Remove" onPress={remove} />
      <Button title="Contains" onPress={contains} />
      <Button title="Get all keys" onPress={getAllKeys} />
    </View>
  )
}
