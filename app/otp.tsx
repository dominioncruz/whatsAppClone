import { View, Text, KeyboardAvoidingView, Platform, Linking, StyleSheet, useWindowDimensions, TouchableOpacity, ActivityIndicator, TouchableWithoutFeedback, Keyboard, Alert, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo'

const Page = () => {
    const { signUp, setActive } = useSignUp();
    const { signIn } = useSignIn();
    const [loading, setLoading] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: ''
    })
    const router = useRouter();
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0
    const { width, height } = useWindowDimensions();
    const { bottom } = useSafeAreaInsets();
    const openLink = () => {
        Linking.openURL('https://google.com')
    }

    const sendOTP = async () => {
        setLoading(true);
        try {
            console.log(data)
            await signUp!.create( {
                emailAddress: data.emailAddress,
                password: data.password
            } )
            signUp!.prepareEmailAddressVerification({ strategy: "email_code" });
            router.push(`/verify/${data.emailAddress}`)
        } catch (e:any) {
            console.log(JSON.stringify(e, null, 2));
            if (isClerkAPIResponseError(e)) {
                if (e.errors[0].code === 'form_identifier_exists') {
                    console.log('user already exists')
                    await trySignIn();
                } else {
                    Alert.alert('Error', e.errors[0].message);
                }
            }
        } finally {
            setLoading(false)
        }
    }

    const trySignIn = async () => {
        const { supportedFirstFactors } = await signIn!.create({ 
            identifier: data.emailAddress, 
        });
        const firstPhoneFactor: any = supportedFirstFactors.find(factor => {
            return factor.strategy === "email_code"
        });
        const { emailAddressId } = firstPhoneFactor;

        await signIn!.prepareFirstFactor({
          strategy: 'email_code',
          emailAddressId,
        });

        router.push(`/verify/${data.emailAddress}?signIn=true&password=${data.password}`);
        setLoading(false);
    }

    const UpdateData = (datatype: any, data: string) => {
        setData(prevData => ({
            ...prevData,
            [datatype]: data
        }));
    };

    return (
        <KeyboardAvoidingView 
            style={{ flex: 1 }} 
            keyboardVerticalOffset={keyboardVerticalOffset}
            behavior='padding'
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={[
                    styles.container,
                    {
                        padding: width * 0.04,
                        gap: width * 0.05
                    }
                ]}>
                    {
                        loading && (
                            <View style={[
                                StyleSheet.absoluteFill,
                                styles.loading,
                                {
                                    gap: width * 0.025
                                }
                            ]}>
                                <ActivityIndicator size='large' color={Colors.primary} />
                                <Text style={{ fontSize: width * 0.04 }}>Sending code...</Text>
                            </View>
                        )
                    }
                    <Text style={[
                        styles.description,
                        {
                            fontSize: width * 0.034
                        }
                    ]}>
                        WhatsApp will need to verify your account. Carrier charges may apply.
                    </Text>
                    <View style={{
                        backgroundColor: Colors.white,
                        width: '100%',
                        borderRadius: width * 0.025,
                        padding: width * 0.025,
                        gap: width * 0.025,
                    }}>
                        <View style={[
                            styles.listItem,
                            {
                                padding: width * 0.01
                            }
                        ]}>
                            <Text style={styles.listItem}>Nigeria</Text>
                            <Ionicons name="chevron-forward" size={width * 0.045} color={Colors.gray} />
                        </View>
                        <View style={styles.seperator} />
                        <TextInput
                            autoFocus
                            keyboardAppearance='light'
                            placeholder='Enter your first name'
                            placeholderTextColor={Colors.gray}
                            autoComplete='given-name'
                            inputMode='text'
                            style={{
                                padding: width * 0.01,
                                width: '100%'
                            }}
                            value={data.firstName}
                            onChangeText={(newFirstName) => UpdateData('firstName', newFirstName)}
                        />
                        <TextInput
                            keyboardAppearance='light'
                            placeholder='Enter your last name'
                            placeholderTextColor={Colors.gray}
                            autoComplete='family-name'
                            inputMode='text'
                            style={{
                                padding: width * 0.01,
                                width: '100%'
                            }}
                            value={data.lastName}
                            onChangeText={(newLastName) => UpdateData('lastName', newLastName)}
                        />

                        <TextInput
                            keyboardType="email-address"
                            inputMode='email'
                            keyboardAppearance='light'
                            autoComplete='email'
                            placeholderTextColor={Colors.gray}
                            placeholder='Enter your email address'
                            style={{
                                padding: width * 0.01,
                                width: '100%'
                            }}
                            value={data.emailAddress}
                            onChangeText={(newEmail) => UpdateData('emailAddress', newEmail)}
                        />
                        <View style={{ padding: width * 0.01, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingRight: width * 0.03 }}>
                            <TextInput
                                keyboardType="visible-password"
                                inputMode='text'
                                keyboardAppearance='light'
                                autoComplete='current-password'
                                secureTextEntry={!passwordVisible}
                                style={{width: '90%'}}
                                placeholderTextColor={Colors.gray}
                                placeholder='Enter your password'
                                value={data.password}
                                onChangeText={(newPass) => UpdateData('password', newPass)}
                            >
                            </TextInput>
                            <TouchableWithoutFeedback
                                onPress={() => setPasswordVisible(!passwordVisible)}
                            >
                                <Ionicons name={passwordVisible ? "eye" :"eye-off"} size={width * 0.05} color={Colors.gray} />
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    <Text style={[
                        styles.legal,
                        {
                            fontSize: width * 0.034,
                        }
                    ]}>
                        You must be{' '}
                        <Text style={styles.link} onPress={openLink}>
                            at least 16 years old
                        </Text>{' '}
                        to register. Learn how WhatsApp works with the{' '}
                        <Text style={styles.link} onPress={openLink}>
                            Meta Companies
                        </Text>
                        .
                    </Text>
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity
                        disabled={data.password === ''}
                        onPress={sendOTP}
                        style={[
                            styles.button,
                            !(data.password === '') ? styles.enabled : null,
                            {
                                borderRadius: width * 0.025,
                                padding: width * 0.04,
                                marginBottom: bottom
                            }
                        ]}
                    >
                        <Text style={[
                            styles.buttonText,
                            !(data.password === '') ? styles.enabled : null,
                            {
                                fontSize: width * 0.04,

                            }
                        ]}>
                            Next
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.background
    },
    description: {
        color: Colors.gray,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listItemText: {
        color: Colors.primary
    },
    seperator: {
        width: '100%',
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.gray,
        opacity: 0.3
    },
    legal: {
        textAlign: 'center',
        color: Colors.black
    },
    link: {
        color: Colors.primary
    },
    button: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: Colors.lightGray,
    },
    buttonText: {
        fontWeight: '500',
        color: Colors.gray
    },
    enabled: {
        backgroundColor: Colors.primary,
        color: Colors.white
    },
    loading: {
        zIndex: 10,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default Page