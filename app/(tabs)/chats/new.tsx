import { View, Text } from 'react-native'
import React, { FC } from 'react'

import CONTACTS from '@/assets/data/contacts.json';
import { AlphabetList } from 'react-native-section-alphabet-list';
import Colors from '@/constants/Colors';

interface ContactType {
    value: string;
    name: string;
    img: string;
    desc: string;
    key: string;
}

const NewChat: FC<ContactType> = () => {
    const data = CONTACTS.reduce((acc: ContactType[], contact, index) => {
        return [
            ...acc,
            {
                value: `${contact.first_name} ${contact.last_name}`,
                name: `${contact.first_name} ${contact.last_name}`,
                img: contact.img,
                desc: contact.desc,
                key: `${contact.first_name} ${contact.last_name}-${index}`,
            }
        ];
    }, []);


    return (
        <View style={{ flex: 1, paddingTop: 110, backgroundColor: Colors.background }}>
            <AlphabetList
                data={data}
                indexLetterStyle={{ color: Colors.primary, fontSize: 12 }}
                indexContainerStyle={{
                    paddingHorizontal: 5,
                    width: 24
                }}
                renderCustomItem={(item) => (
                    <View style={{}}>
                        <Text style={{}}>{item.value}</Text>
                    </View>
                )}
                renderCustomSectionHeader={(section) => (
                    <View style={{width: '100%', backgroundColor: Colors.gray, paddingVertical: 10, paddingLeft: 20}}>
                        <Text style={{fontSize: 18, color: Colors.lightGray}}>{section.title}</Text>
                    </View>
                )}
            />
        </View>
    )
}

export default NewChat