import React from 'react';

import { FlatList, TouchableOpacity, StyleSheet, Image, View, Text } from 'react-native';
import { Icon } from 'components';

import SelectedContacts from "../props/selected-contacts-props";
import ContactUser from "../props/contact-props";

import margins from "src/theme/margins";
import paddings from "src/theme/paddings";
import colors from "src/theme/colors";

interface Props {
    selectedContacts: SelectedContacts
    toggleContact: (isSelected: boolean, contact: ContactUser) => void;
}

const ListHeaderComponent = ({
    selectedContacts,
    toggleContact
}: Props) => {
        
    const renderItem = ({ item }) => {

        return (
            <TouchableOpacity style={styles.container} onPress={() => toggleContact(true, item)}>

                <View>
                    {item.hasThumbnail ? (
                        <Image style={styles.image} source={{
                            uri: item.thumbnailPath
                        }} />
                    ) : (
                        <View style={styles.personView}>
                            <Icon type={"material"} name={'person'} color={colors.white} size={30} />
                        </View>
                    )}

                    <Text numberOfLines={1}>{`${item.givenName} ${item.familyName}`}</Text>

                </View>

                <Icon containerStyle={styles.closeIcon} color={colors.grey} type={'ionicon'} name={'close-circle'} />

            </TouchableOpacity>
        )
    }

    const items = Object.values(selectedContacts) || [];
    if (items.length === 0) {
        return null;
    }

    return (
        <FlatList
            style={styles.flatList}
            horizontal
            data={items}
            renderItem={renderItem} />
    )
}

const styles = StyleSheet.create({
    flatList: {
        padding: paddings.base,
        borderBottomWidth: 2
    },
    container: {
        height: 80,
        width: 70,
        marginRight: margins.base,
        justifyContent: 'center',
        alignItems: 'center'
    },
    personView: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: colors.black,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    closeIcon: {
        position: 'absolute',
        top: 0,
        right: 0
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 25,
        alignSelf: 'center'
    }
})

export {
    ListHeaderComponent
}