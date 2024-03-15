import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

export type BoxedIconProps= {
    name: typeof Ionicons.defaultProps;
    backgroundColor: string;
}

const BoxedIcon = ({name, backgroundColor}: BoxedIconProps) => {
  return (
    <View style={{backgroundColor, padding: 4, borderRadius: 6}}>
      <Ionicons name={name} size={22} color={Colors.white}/>
    </View>
  )
}

export default BoxedIcon