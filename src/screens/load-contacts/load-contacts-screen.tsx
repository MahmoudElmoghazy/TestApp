import React, { useEffect, useState } from 'react';

import { View, StyleSheet, Text, FlatList, ListRenderItemInfo, TextInput } from 'react-native';
import { requestContactPerimmission } from './helpers/getContacts';
import { openSettings } from 'react-native-permissions';

import { Button, Icon } from 'components';
import { ContactItem, ListHeaderComponent } from './components';

import Contacts from 'react-native-contacts';
import ContactUser from "./props/contact-props";
import SelectedContacts from "./props/selected-contacts-props";

import colors from "src/theme/colors";
import paddings from 'src/theme/paddings';
import margins from 'src/theme/margins';


const LoadContactsScreen = () => {

    const [isPerimmissionDenied, setIsPerimmissionDenied] = useState<boolean>(false);

    const [contacts, setContacts] = useState<Array<ContactUser>>([]); // .. contacts state
    const [searchedContacts, setSearchedContacts] = useState<Array<ContactUser>>([]); // .. searched contact state

    const [selectedContacts, setSelectedContacts] = useState<SelectedContacts>({}); // .. selected contacts
    const [search, setSearch] = useState<string>(""); // .. search value

    useEffect(() => {
        (async () => {
            // .. check for contacts access perimmission
            try {
                await requestContactPerimmission();
                getContacts();

            } catch (error) {
                setIsPerimmissionDenied(true);
            }

        })()
    }, [])

    const getContacts = () => {
        // .. fetch contacts and added to state
        Contacts.getAll()
            .then((data) => {
                setContacts(data);
                setSearchedContacts(data);
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const toggleContact = (isSelected: boolean, item: ContactUser) => {
        // .. event to trigger when press on contact from list to select it or remove it
        const contacts = { ...selectedContacts };
        if (isSelected) {
            delete contacts[item.recordID];
        } else {            
            contacts[item.recordID] = item;
        }        

        setSelectedContacts(contacts);
    }

    const renderItem = ({ item }: ListRenderItemInfo<ContactUser>) => {
        return <ContactItem item={item} selectedContacts={selectedContacts} toggleContact={toggleContact} />
    }

    const listHeaderComponent = () => {
        return <ListHeaderComponent selectedContacts={selectedContacts} toggleContact={toggleContact} />
    }

    const onSearch = (value) => {
        // .. filter by name
        setSearch(value);

        const filterData = contacts.filter((option) => {
            const givenName = option["givenName"]
            const familyName = option["familyName"]

            let itemData = `${givenName?.toUpperCase()} ${familyName?.toUpperCase()}`

            return itemData.indexOf(value?.toLocaleUpperCase()) > -1
        })

        setSearchedContacts(filterData)
    }

    if (isPerimmissionDenied) {
        // .. perimmission denied view
        return (
            <View style={styles.emptyStateView}>
                <Icon type={'material-community'} name={'alert-circle'} size={50} />
                <Text>{"Access denied !"}</Text>
                <Text>{"You have to give us access to list your contacts"}</Text>

                <Button title='Open Settings' onPress={openSettings} />
            </View>
        )
    }

    return (
        <View style={styles.container}>

            <View style={styles.searchBox}>
                <Icon type='material' name={'search'} color={colors.grey} />
                <TextInput
                    style={styles.searchInput}
                    placeholder={'Find Contact...'}
                    value={search}
                    onChangeText={onSearch} />
            </View>

            <FlatList
                data={searchedContacts}
                renderItem={renderItem}
                ListHeaderComponent={listHeaderComponent}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    emptyStateView: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: colors.white
    },
    searchBox: {
        height: 50,
        borderRadius: 10,
        backgroundColor: `${colors.grey}30`,
        margin: margins.base,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: paddings.base
    },
    searchInput: {
        flex: 1,
        marginLeft: margins.base,
        color: colors.black
    }
});

export {
    LoadContactsScreen
};