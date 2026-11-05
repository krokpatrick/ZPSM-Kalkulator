import { Key, KeyRole } from '../keys';
import { Pressable, StyleSheet, ViewStyle, Text } from 'react-native';

type CalculatorKeyProps = {
    item: Key;
    onPress: (label: string) => void;
};

const styles = StyleSheet.create({
    key: {
        flex: 1,
        backgroundColor: '#E9EDF2',
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
    },

    digitKey: {
        backgroundColor: '#E9EDF2',
    },

    operatorKey: {
        backgroundColor: '#DCEAEC',
    },

    equalsKey: {
        backgroundColor: '#007477',
    },

    clearKey: {
        backgroundColor: '#F4DAD6',
    },

    buttonPressed: {
        backgroundColor: '#D4DDE8',
    },

    buttonText: {
        color: '#1D4165',
        fontSize: 18,
        fontWeight: '500',
    },
});

const ROLE_VIEW: Record<KeyRole, ViewStyle> = {
    digit: styles.digitKey,

    operator: styles.operatorKey,

    equals: styles.equalsKey,

    clear: styles.clearKey,
};

export default function CalculatorKey({ item, onPress }: CalculatorKeyProps)
{
    return (
        <Pressable 
            style={({ pressed }) => [
                styles.key,
                ROLE_VIEW[item.role],
                { flex: item.span ?? 1},
                pressed && styles.buttonPressed,
                ]}
                onPress={() => onPress(item.label)}
                accessibilityRole='button'
        >
            <Text
                style={[
                    styles.buttonText,
                    item.role === 'equals' && { color: '#FFFFFF' },
                    item.role === 'clear' && { color: '#C34C40' },
                    item.role === 'operator' && { color: '#277E85' },
                ]}
            >
                {item.label}
            </Text>
        </Pressable>
    )
}

