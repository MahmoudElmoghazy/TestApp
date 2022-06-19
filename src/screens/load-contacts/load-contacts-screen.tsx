import React, { useEffect, useState, useCallback } from 'react';

import { View, StyleSheet, FlatList, ListRenderItemInfo, TextInput, AppState } from 'react-native';
import { requestContactPerimmission } from './helpers/getContacts';
import { openSettings } from 'react-native-permissions';

import { Button, Icon, Text } from 'components';
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

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        requestContacts();

        const appStateChange = AppState.addEventListener('change', requestContacts);

        return () => {
            appStateChange.remove();
        }
    }, [])

    const requestContacts = async () => {
        if (!isPerimmissionDenied && contacts.length > 0) {
            return;
        }

        // .. check for contacts access perimmission
        try {
            await requestContactPerimmission();
            getContacts();

            setIsPerimmissionDenied(false);

        } catch (error) {
            setIsPerimmissionDenied(true);
        }

    }

    const getContacts = () => {
        setLoading(true);

        // .. fetch contacts and added to state
        Contacts.getAll()
            .then((data) => {
                setLoading(false);

                setContacts(data);
                setSearchedContacts(data);
            })
            .catch((e) => {
                setLoading(false);
                console.log(e)
            })
    }

    const toggleContact = useCallback(async (isSelected: boolean, item: ContactUser) => {        // // .. event to trigger when press on contact from list to select it or remove it
        const contacts = { ...selectedContacts };
        if (isSelected) {
            delete contacts[item.recordID];
        } else {
            contacts[item.recordID] = item;
        }

        setSelectedContacts(contacts);

    }, [selectedContacts])

    const renderItem = ({ item }: ListRenderItemInfo<ContactUser>) => {
        return <ContactItem item={item} selectedContacts={selectedContacts} toggleContact={toggleContact} />
    }

    const listHeaderComponent = () => {
        return <ListHeaderComponent selectedContacts={selectedContacts} toggleContact={toggleContact} />
    }

    const keyExtractor = (item, index: number) => {
        return index.toString()
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

            {loading ? <Text style={styles.loadinText}>{'Loading...'}</Text> : null}

            <View style={styles.searchBox}>
                <Icon type='material' name={'search'} color={colors.grey} />
                <TextInput
                    style={styles.searchInput}
                    placeholder={'Find Contact...'}
                    placeholderTextColor={colors.grey}
                    value={search}
                    onChangeText={onSearch} />
            </View>

            <FlatList
                keyExtractor={keyExtractor}
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
        paddingLeft: paddings.base,
        color: colors.black
    },
    searchInput: {
        flex: 1,
        marginLeft: margins.base,
        color: colors.black
    },
    loadinText: {
        textAlign: 'center',
        color: colors.black
    }
});

export {
    LoadContactsScreen
};