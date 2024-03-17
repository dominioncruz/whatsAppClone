import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'
import { Tabs, useSegments } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Colors from '@/constants/Colors'
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

const Layout = () => {
    const {width} = useWindowDimensions();
    const segments = useSegments();
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Tabs screenOptions={{ 
                tabBarActiveTintColor: Colors.primary,
                tabBarStyle: {
                    backgroundColor: Colors.background,

                },
                tabBarInactiveBackgroundColor: Colors.background,
                tabBarActiveBackgroundColor: Colors.background,
                headerStyle: {
                    backgroundColor: Colors.background
                },
                headerShadowVisible: false
            }}>
                <Tabs.Screen
                    name='updates'
                    options={{
                        title: 'Updates',
                        tabBarIcon: ({ color }) => <MaterialIcons size={width * 0.08} name="update" color={color} />,
                    }}
                />
                <Tabs.Screen
                    name='calls'
                    options={{
                        headerShown: false,
                        title: 'Calls',
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons size={width * 0.08} name="phone-outline" color={color} />,
                    }}
                />
                <Tabs.Screen
                    name='communities'
                    options={{
                        
                        title: 'Communities',
                        tabBarIcon: ({ color }) => <MaterialIcons size={width * 0.08} name="people" color={color} />,
                    }}
                />
                <Tabs.Screen
                    name='chats'
                    options={{
                        headerShown: false,
                        title: 'Chats',
                        tabBarIcon: ({ color }) => <Ionicons size={width * 0.08} name="chatbubbles" color={color} />,
                        tabBarStyle: {
                            display: segments[2] === '[id]' ? 'none' : 'flex'
                        }
                    }}
                />
                <Tabs.Screen
                    name='settings'
                    options={{
                        headerShown: false,
                        title: 'Settings',
                        tabBarIcon: ({ color }) => <Ionicons size={width * 0.08} name="cog" color={color} />,
                    }}
                />
            </Tabs>
        </GestureHandlerRootView>

    )
}

export default Layout