import { View, Text, TouchableOpacity, TouchableHighlight } from 'react-native'
import React from 'react'
import { Link, Stack, useRouter } from 'expo-router'
import Colors from '@/constants/Colors'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

const Layout = () => {
    const router = useRouter();
    return (
        <Stack>
            <Stack.Screen
                name='index'
                options={{
                    title: 'Chats',
                    headerLargeTitle: true,
                    headerTransparent: true,
                    headerBlurEffect: 'regular',
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: Colors.white
                    },
                    headerSearchBarOptions: {
                        placeholder: 'Search'
                    },
                    headerRight: () => (
                        <View style={{ flexDirection: 'row', gap: 25 }}>
                            <TouchableOpacity>
                                <Ionicons name='camera-outline' color={Colors.primary} size={30} />
                            </TouchableOpacity>
                            <Link href='/(tabs)/chats/new' asChild>
                                <TouchableOpacity>
                                    <Ionicons name='add-circle' color={Colors.primary} size={30} />
                                </TouchableOpacity>
                            </Link>
                        </View>
                    ),
                    headerLeft: () => (
                        <TouchableOpacity>
                            <MaterialCommunityIcons name='dots-horizontal-circle-outline' color={Colors.primary} size={30} />
                        </TouchableOpacity>
                    )
                }}
            />
            <Stack.Screen
                name='new'
                options={{
                    title: 'New Chat',
                    headerTransparent: true,
                    headerBlurEffect: 'light',

                    headerShadowVisible: false,
                    headerSearchBarOptions: {
                        placeholder: 'Search'
                    },
                    presentation: 'modal',
                    headerRight: () => (
                        <TouchableOpacity onPress={router.back}>
                            <MaterialCommunityIcons name="close-circle" size={30} color={Colors.gray} />
                        </TouchableOpacity>
                    )
                }}
            />
        </Stack>
    )
}

export default Layout