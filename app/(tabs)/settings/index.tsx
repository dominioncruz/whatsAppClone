import { View, Text, ScrollView, FlatList, useWindowDimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';
import { useAuth } from '@clerk/clerk-expo';
import { defaultStyles } from '@/constants/styles';
import BoxedIcon from '@/components/BoxedIcon';
import { Ionicons } from '@expo/vector-icons';

const settings = () => {
  const devices = [
    {
      name: 'Broadcast Lists',
      icon: 'megaphone',
      backgroundColor: Colors.green,
    },
    {
      name: 'Starred Messages',
      icon: 'star',
      backgroundColor: Colors.yellow,
    },
    {
      name: 'Linked Devices',
      icon: 'laptop-outline',
      backgroundColor: Colors.green,
    },
  ];

  const items = [
    {
      name: 'Account',
      icon: 'key',
      backgroundColor: Colors.primary,
    },
    {
      name: 'Privacy',
      icon: 'lock-closed',
      backgroundColor: '#33A5D1',
    },
    {
      name: 'Chats',
      icon: 'logo-whatsapp',
      backgroundColor: Colors.green,
    },
    {
      name: 'Notifications',
      icon: 'notifications',
      backgroundColor: Colors.red,
    },
    {
      name: 'Storage and Data',
      icon: 'repeat',
      backgroundColor: Colors.green,
    },
  ];

  const support = [
    {
      name: 'Help',
      icon: 'information',
      backgroundColor: Colors.primary,
    },
    {
      name: 'Tell a Friend',
      icon: 'heart',
      backgroundColor: Colors.red,
    },
  ];

  const { signOut } = useAuth();
  const { width } = useWindowDimensions();
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView
      contentInsetAdjustmentBehavior='automatic'
      >
        <View style={defaultStyles.block}>
          <FlatList
            scrollEnabled={false}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />)}
            data={devices}
            renderItem={({ item }) => (
              <View style={defaultStyles.item}>
                <BoxedIcon name={item.icon} backgroundColor={item.backgroundColor} />
                <Text style={{ fontSize: width * 0.035, flex: 1 }}>{item.name}</Text>
                <Ionicons name='chevron-forward' size={width * 0.04} color={Colors.gray} />
              </View>
            )}
          />
        </View>
        <View style={defaultStyles.block}>
          <FlatList
            scrollEnabled={false}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />)}
            data={items}
            renderItem={({ item }) => (
              <View style={defaultStyles.item}>
                <BoxedIcon name={item.icon} backgroundColor={item.backgroundColor} />
                <Text style={{ fontSize: width * 0.035, flex: 1 }}>{item.name}</Text>
                <Ionicons name='chevron-forward' size={width * 0.04} color={Colors.gray} />
              </View>
            )}
          />
        </View>
        <View style={defaultStyles.block}>
          <FlatList
            scrollEnabled={false}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />)}
            data={support}
            renderItem={({ item }) => (
              <View style={defaultStyles.item}>
                <BoxedIcon name={item.icon} backgroundColor={item.backgroundColor} />
                <Text style={{ fontSize: width * 0.035, flex: 1 }}>{item.name}</Text>
                <Ionicons name='chevron-forward' size={width * 0.04} color={Colors.gray} />
              </View>
            )}
          />
        </View>
        <TouchableOpacity onPress={() => signOut()}>
          <Text style={{
            color: Colors.primary,
            fontSize: width * 0.042,
            textAlign: 'center',
            paddingVertical: width * 0.04
          }}>
            Log Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default settings