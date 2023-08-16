import * as React from 'react';

import { SharedStorageViewProps } from './SharedStorage.types';

export default function SharedStorageView(props: SharedStorageViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
