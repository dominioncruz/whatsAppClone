import { View, StyleSheet, Image, Text, useWindowDimensions, SafeAreaView } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'

import LOGO from '@/assets/images/whatsAppLogo.png'
import META from '@/assets/images/metaLogo.png'
import { FontAwesome6 } from '@expo/vector-icons'

const Splash = () => {
  const whatsAppLogo = Image.resolveAssetSource(LOGO).uri;
  const metaLogo = Image.resolveAssetSource(META).uri;
  const { width, height } = useWindowDimensions();
  return (
    <SafeAreaView style={styles.container}>
      <FontAwesome6 name="whatsapp" size={width * 0.2} color={Colors.green} style={{marginBottom: width * 0.2}}/>
      <View style={{position: 'absolute', bottom: width * 0.14, gap: 5}}>
        <Text style={{color: Colors.black, fontSize: width * 0.033, textAlign: 'center'}}>
            From
        </Text>
        <Text style={{fontSize:width * 0.05, color:Colors.green, fontWeight:'600'}}>
            <FontAwesome6 name="meta" size={width * 0.05} color={Colors.green} style={{marginBottom: width * 0.2}}/>
            {' '}Cruz
        </Text>
        
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white
  },
  image: {
    resizeMode: 'contain'
  }
})

export default Splash