export default interface Props {
    familyName: string;
    givenName: string;
    thumbnailPath: string;
    hasThumbnail: boolean;
    phoneNumbers: Array<{
        label: string;
        number: string;
    }>
    recordID: string;
}