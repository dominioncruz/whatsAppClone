import { View, Text, SafeAreaView, ScrollView, FlatList } from 'react-native'
import React from 'react'
import chats from '@/assets/data/chats.json'
import ChatRow from '@/components/ChatRow'
import { defaultStyles } from '@/constants/styles'
import Colors from '@/constants/Colors'
const Page = () => {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ paddingBottom: 20, backgroundColor: Colors.white }}>
      <FlatList
        data={chats}
        scrollEnabled={false}
        renderItem={({item}) => <ChatRow {...item}/>}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => (
          <View style={defaultStyles.separator} />
        )}
      />
    </ScrollView>

  )
}

export default Page