import React, { useRef } from 'react';
import { Modal, View, Text, TextInput, Pressable, TouchableOpacity, TouchableHighlight } from 'react-native';

import { SHADOWS } from '../../constants/theme';

import styles from './style/otpModal.style';

export default function OTPModal({ showModal, setShowModal, code, setCode, handleVerify, OTPError, setOTPError, handleResendOTP }) {
    const inputRef = useRef(null);

    const codeArray = new Array(6).fill(' ');

    const handleOTPInput = (text) => {
        // Hide the error if user needs to type again
        if (OTPError) {
            setOTPError('');
        }

        setCode(text);
    }

    const handleOnPress = () => {
        inputRef?.current?.focus();
    };

    const toTextBoxes = () => {
        return codeArray.map((_, index) => {
            const value = code[index] || '';

            const isFocused = code.length > index;

            return <Text key={index} style={styles.textBox(isFocused, OTPError)}>{value}</Text>
        })
    };

    const renderInput = toTextBoxes();

    return (
        <Modal
            animationType='slide'
            visible={showModal}
            onRequestClose={() => setShowModal(false)}
        >
            <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.exitBtn} onPress={() => setShowModal(false)}>
                    <Text style={styles.exitBtnText}>X</Text>
                </TouchableOpacity>
                <Text style={styles.otpHeader}>PHONE VERIFICATION</Text>
                <Text style={styles.description}>We have sent an OTP code to your phone number +63 999 999 9999. Enter the OTP code below to verify.</Text>
                <View style={styles.inputWrapper}>
                    <Pressable style={styles.textBoxWrapper} onPress={handleOnPress}>{renderInput}</Pressable>
                    <TextInput
                        ref={inputRef}
                        style={styles.hiddenInput}
                        keyboardType='number-pad'
                        maxLength={6}
                        value={code}
                        onChangeText={handleOTPInput}
                    />
                    {OTPError && <Text style={styles.error}>{OTPError}</Text>}
                </View>
                <TouchableOpacity
                    style={[styles.submitBtn, SHADOWS.medium]}
                    onPress={handleVerify}
                >
                    <Text style={styles.submitBtnText}>Verify OTP</Text>
                </TouchableOpacity>
                <View style={styles.otpOptionsWrapper}>
                    <Text style={styles.otpSubtitle}>Didn't receive code?</Text>
                    <TouchableHighlight onPress={handleResendOTP}>
                        <Text style={styles.otpResend}>Resend OTP</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </Modal>
    )
}