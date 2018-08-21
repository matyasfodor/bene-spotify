import React from 'react';
import { FlatList, Text } from 'react-native';
import Item from './Item';
import Separator from './Separator';

export default ({items, onEndReached}) => (
  <FlatList
    data={items}
    renderItem={(info) => (
      <Item item={info.item}/>
    )}
    keyExtractor={item => item.id}
    ItemSeparatorComponent={() => <Separator />}
    ListEmptyComponent={() => <Text>No songs.</Text>}
    onEndReached={onEndReached}
  />
);