import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacityBase, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Colors from '@/constants/Colors';
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';

const CELL_COUNT = 6;
const Page = () => {

    const { width, height } = useWindowDimensions();
    const { email, signin, password } = useLocalSearchParams<{ email: string, signin: string, password: string }>();
    const [code, setCode] = useState('');
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: code,
        setValue: setCode,
    });

    const { signUp, setActive } = useSignUp();
    const { signIn } = useSignIn();

    useEffect(() => {
        if (code.length === 6) {
            if (signin === 'true') {
                verifySIgnIn()
            } else {
                verifyCode()
            }
        }
    })

    const verifyCode = async () => {
        try {
            await signUp!.attemptEmailAddressVerification({
                code
            })
            await setActive!({ session: signUp!.createdSessionId });
        } catch (err) {
            console.log('error', JSON.stringify(err, null, 2));
            if (isClerkAPIResponseError(err)) {
                Alert.alert('Error', err.errors[0].message)
            }
        }

    }

    const verifySIgnIn = async () => {
        try {
            await signIn!.attemptFirstFactor({
                strategy: 'email_code',
                code
            })
            await setActive!({ session: signIn!.createdSessionId })
        } catch (err) {
            console.log('error', JSON.stringify(err, null, 2));
            if (isClerkAPIResponseError(err)) {
                Alert.alert('Error', err.errors[0].message)
            }
        }
    }

    const resendCode = async () => {
        try {
            if (signin === 'true') {
                const { supportedFirstFactors } = await signIn!.create({
                    identifier: email,
                });

                const firstPhoneFactor: any = supportedFirstFactors.find((factor: any) => {
                    return factor.strategy === 'email_code';
                });

                const { emailAddressId } = firstPhoneFactor;

                await signIn!.prepareFirstFactor({
                    strategy: 'email_code',
                    emailAddressId,
                });
            } else {
                await signUp!.create({
                    emailAddress: email,
                    password
                });
                signUp!.prepareEmailAddressVerification();
            }
        } catch (err) {
            console.log('error', JSON.stringify(err, null, 2));
            if (isClerkAPIResponseError(err)) {
                Alert.alert('Error', err.errors[0].message);
            }
        }
    }
    return (
        <View style={[
            styles.container,
            {
                padding: width * 0.04,
                gap: width * 0.05
            }
        ]}>
            <Text style={[styles.legal, { fontSize: width * 0.034 }]}>We have sent you an SMS with a code to the number above.</Text>
            <Text style={[styles.legal, { fontSize: width * 0.034 }]}>
                To complete your phone number verification, please enter the 6-digit activation code.
            </Text>
            <CodeField
                ref={ref}
                {...props}
                value={code}
                onChangeText={setCode}
                autoFocus
                autoComplete={'one-time-code'}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <View
                        key={index}
                        style={[
                            styles.cellRoot,
                            isFocused && styles.focusCell,
                            {
                                width: width * 0.12,
                                height: width * 0.12
                            }
                        ]}
                        onLayout={getCellOnLayoutHandler(index)}
                    >
                        <Text style={[
                            styles.cellText,
                            {
                                fontSize: width * 0.06
                            }
                        ]}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    </View>
                )}
            />
            <TouchableOpacity
            >
                <Text style={[styles.buttonText, { fontSize: width * 0.04 }]}>Didn't receive a verification code?</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.background
    },
    legal: {
        textAlign: 'center',
        color: Colors.black
    },
    button: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: Colors.lightGray,
    },
    buttonText: {
        fontWeight: '500',
        color: Colors.primary
    },
    codeFieldRoot: {
        marginLeft: 'auto',
        marginRight: 'auto',
        gap: 6
    },
    cellRoot: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5
    },
    cellText: {
        color: '#000',
        textAlign: 'center',
    },
    focusCell: {
        borderColor: Colors.primary,
    },

});

export default Page