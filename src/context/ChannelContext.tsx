/*
 * Copyright 2020-2023 Bloomreach
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { ChannelConfig } from '@/lib/channel';

interface ChannelContextProps {
  channelConfig: ChannelConfig;
}

export const ChannelContext = React.createContext({});
export const ChannelContextConsumer = ChannelContext.Consumer;

export function ChannelContextProvider({
  channelConfig,
  children,
}: React.PropsWithChildren<ChannelContextProps>): React.ReactElement {
  const {
    googleMapsApiKey,
  } = channelConfig;
  return (
    <ChannelContext.Provider
      value={{
        googleMapsApiKey,
      }}
    >
      {children}
    </ChannelContext.Provider>
  );
}
