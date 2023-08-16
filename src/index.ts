import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to SharedStorage.web.ts
// and on native platforms to SharedStorage.ts
import SharedStorageModule from './SharedStorageModule';
import SharedStorageView from './SharedStorageView';
import { ChangeEventPayload, SharedStorageViewProps } from './SharedStorage.types';

// Get the native constant value.
export const PI = SharedStorageModule.PI;

export function hello(): string {
  return SharedStorageModule.hello();
}

export async function setValueAsync(value: string) {
  return await SharedStorageModule.setValueAsync(value);
}

const emitter = new EventEmitter(SharedStorageModule ?? NativeModulesProxy.SharedStorage);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { SharedStorageView, SharedStorageViewProps, ChangeEventPayload };
