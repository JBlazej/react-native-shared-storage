import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { SharedStorageViewProps } from './SharedStorage.types';

const NativeView: React.ComponentType<SharedStorageViewProps> =
  requireNativeViewManager('SharedStorage');

export default function SharedStorageView(props: SharedStorageViewProps) {
  return <NativeView {...props} />;
}
