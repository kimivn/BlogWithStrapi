import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';

// type Props = TextInputProps;

export const FormTextInput = (props) => {
    const { style, ...otherProps } = props;
    return (
        <TextInput
            selectionColor="blue"
            autoCapitalize="none"
            style={[styles.textInput, style]}
            {...otherProps}
        />
    );
};

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 20,
    },
});

export default FormTextInput;
