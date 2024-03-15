import { View, Text, StyleSheet, Image, useWindowDimensions, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import welcomeImage from '@/assets/images/welcome.png';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';


const Page = () => {
    const openLink = () => {
        Linking.openURL('https://google.com')
    }
    const { width, height } = useWindowDimensions();
    const IMAGE = Image.resolveAssetSource(welcomeImage).uri;
    return (
        <View style={[
            styles.container,
            {
                padding: width * 0.045,
                gap: width * 0.2
            }
        ]}>
            <Image
                source={{ uri: IMAGE }}
                style={[
                    styles.image, { width: width, height: height * 0.45 }
                ]}
            />
            <View style={{ gap: width * 0.05 }}>
                <Text style={[styles.headline, { fontSize: width * 0.06 }]}>
                    Welcome to WhatsApp Clone
                </Text>
                <Text style={[
                    styles.description,
                    {
                        fontSize: width * 0.034,
                    }
                ]}>
                    Read our{' '}
                    <Text style={styles.link} onPress={openLink}>
                        Privacy Policy
                    </Text>
                    . {'Tap "Agree & Continue" to accept the '}
                    <Text style={styles.link} onPress={openLink}>
                        Terms of Service
                    </Text>
                </Text>
            </View>
            <Link href={"/otp"} replace asChild>
                <TouchableOpacity style={styles.button}>
                    <Text style={[
                        styles.buttonText,
                        {
                            fontSize: width * 0.04,
                        }
                    ]}>
                        Agree and Continue
                    </Text>
                </TouchableOpacity>
            </Link>
        </View>
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
    },
    headline: {
        fontWeight: 'bold',
    },
    description: {
        textAlign: 'center',
        color: Colors.gray,
    },
    link: {
        color: Colors.primary
    },
    button: {
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: '500',
        color: Colors.primary
    }
})

export default Page