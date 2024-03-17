import { View, Text, TouchableOpacity, Image } from 'react-native'
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
             <Stack.Screen
                name='[id]'
                options={{
                    title: '',
                    headerTransparent: true,
                    headerBlurEffect: 'light',
                    headerBackTitleVisible: false,
                    headerShadowVisible: false,
                    headerTitle: () => (
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 20,
                            paddingBottom: 4,
                        }}>
                            <Image 
                                source={{uri: "https://i.pravatar.cc/150?u=saundralott@genmy.com"}}
                                style={{width: 40, height: 40, borderRadius: 40}}
                            />
                            <Text style={{fontSize: 16, fontWeight: '500'}}>Miracle Cruz</Text>
                        </View>
                    ),
                    headerRight: () => (
                        <View 
                            style={{
                                flexDirection: 'row',
                                gap: 20,
                                alignItems: 'center',
                                width: 200,
                                justifyContent: 'flex-end'
                            }}
                        >
                            <TouchableOpacity>
                                <Ionicons size={24} name="videocam-outline" color={Colors.primary} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Ionicons size={24} name="call-outline" color={Colors.primary} />
                            </TouchableOpacity>
                        </View>
                    ),
                    headerStyle: {
                        backgroundColor: Colors.background
                    }
                }}
            />
        </Stack>
    )
}

export default Layout