import React from 'react';

import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text } from 'components';

import ContactUser from "../props/contact-props";
import SelectedContacts from "../props/selected-contacts-props";

import colors from "src/theme/colors";
import { Icon } from 'components';

interface Props {
    item: ContactUser
    selectedContacts: SelectedContacts
    toggleContact: (isSelected: boolean, contact: ContactUser) => void;
}

const ContactItem = ({
    item,
    selectedContacts,
    toggleContact
}: Props) => {

    const number = Array.isArray(item.phoneNumbers) && item.phoneNumbers.length !== 0 ? item.phoneNumbers[0].number : null;
    const isSelected = selectedContacts[item.recordID] ? true : false;
    return (
        <TouchableOpacity style={styles.container} onPress={() => {

            toggleContact(isSelected, item);

        }}>
            <View style={styles.contentView}>

                {item.hasThumbnail ? (
                    <Image style={styles.image} source={{
                        uri: item.thumbnailPath
                    }} />
                ) : (
                    <View style={styles.personView}>
                        <Icon type={"material"} name={'person'} color={colors.white} size={30} />
                    </View>
                )}

                <Text></Text>

                <View style={styles.infoView}>
                    <View>
                        <Text>{`${item.givenName} ${item.familyName}`}</Text>
                        <Text>{number}</Text>
                    </View>


                    {isSelected ?
                        <Icon type={'font-awesome'} color={colors.primary} name={'check-circle'} flip={false} /> :
                        <Icon type={'font-awesome-5'} color={"#E1E3E7"} name={'circle'} />
                    }

                </View>

            </View>
            <View style={styles.seprator} />

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: 50
    },
    contentView: {
        padding: 12,
        flexDirection: 'row'
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 25
    },
    seprator: {
        height: 0.5,
        marginLeft: 70,
        // flex: 1,
        backgroundColor: `${colors.black}30`
    },
    personView: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: colors.black,
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoView: {
        marginLeft: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1
    }
})

export {
    ContactItem
}