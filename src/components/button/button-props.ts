import { ButtonsProps } from 'react-native'

export default interface ButtonProps extends ButtonsProps {
    title: string;
    onPress: () => void;
}