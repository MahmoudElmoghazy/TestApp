import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Platform } from 'react-native';

const perimmission = Platform.select({
    ios: PERMISSIONS.IOS.CONTACTS,
    android: PERMISSIONS.ANDROID.READ_CONTACTS
});
export const requestContactPerimmission = async () => {
    return new Promise<string>(async (resolve, reject) => {
        const hasContactsPerimmission = await check(perimmission);

        if (hasContactsPerimmission === RESULTS.GRANTED) {
            // .. perimmission granted
            resolve(hasContactsPerimmission);
        } else if (hasContactsPerimmission === RESULTS.DENIED || hasContactsPerimmission === RESULTS.BLOCKED) {

            // .. perimmission denied
            const requestContactsPerimmission = await request(perimmission);
            if (requestContactsPerimmission === RESULTS.GRANTED) {
                // .. perimmission granted
                resolve(requestContactsPerimmission);
            } else if (hasContactsPerimmission === RESULTS.DENIED || hasContactsPerimmission === RESULTS.BLOCKED) {
                // .. perimmission denied
                reject(requestContactsPerimmission);
            }

        }
    })
}
