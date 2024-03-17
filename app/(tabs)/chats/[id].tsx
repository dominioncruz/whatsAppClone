import { ImageBackground, StyleSheet, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import messageData from '@/assets/data/messages.json'
import { GiftedChat, QuickReplies, User } from 'react-native-gifted-chat'
import whatsAppBackbground from '@/assets/images/whatsappBackground.jpg'
export interface IMessage {
    _id: string | number
    text: string
    createdAt: Date | number
    user: User
    image?: string
    video?: string
    audio?: string
    system?: boolean
    sent?: boolean
    received?: boolean
    pending?: boolean
    quickReplies?: QuickReplies
}

const Page = () => {
    const [messages, setMessages] = useState<IMessage[]>([])
    const backgroundURI = Image.resolveAssetSource(whatsAppBackbground).uri;
    const [text, setText] = useState();
    useEffect(() => {
        setMessages([
            ...messageData.map((message) => {
                return {
                    _id: message.id,
                    text: message.msg,
                    createdAt: new Date(message.date),
                    user: {
                        _id: message.from,
                        name: message.from ? 'You' : 'Bob'
                    }
                }
            })
        ])
    }, [])

    const onSend = useCallback((messages: IMessage[]) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
    }, [])


    return (
        <ImageBackground source ={{uri: backgroundURI}} style={{flex: 1}}>
            <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
            }}
        />
        </ImageBackground>
    )
}

export default Page

const styles = StyleSheet.create({

})