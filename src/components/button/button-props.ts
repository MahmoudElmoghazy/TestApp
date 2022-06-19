import { ViewStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

export default interface Props {
    onPress: () => void;
    title: string;
    style?: ViewStyleProp
}