import React, { useState } from 'react';
import { router } from 'expo-router';
import auth from '@react-native-firebase/auth';
import { View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { parsePhoneNumber } from 'libphonenumber-js';
import Toast from 'react-native-toast-message';

import { firebaseAuthService } from '../../utils/firebase.utils';

import OTPModal from '../../components/phone-validate/OTPModal';

import { PhoneCheck } from '../../assets/icons';

import { SHADOWS, SIZES } from '../../constants/theme';
import styles from '../../components/phone-validate/style/phone-validate.style';

export default function PhoneValidate() {
    const [phone, setPhone] = useState({
        number: '9999999999',
        countryCode: 'PH'
    });
    const [code, setCode] = useState('');

    const [showModal, setShowModal] = useState(false);

    const [confirm, setConfirm] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [phoneError, setPhoneError] = useState('');
    const [OTPError, setOTPError] = useState('');

    const validPhone = () => {
        const { countryCode, number } = phone;
        if (countryCode === null || number === null) {
            return false;
        }

        try {
            const parsedNum = parsePhoneNumber(number, countryCode)
            
            if (parsedNum === null) {
                return false;
            }

            return parsedNum.isValid();
        } catch {
            return false;
        }
    };

    const formatPhone = (phone, countryCode) => {
        try {
          const phoneNumber = parsePhoneNumber(phone, countryCode);
          return phoneNumber?.formatInternational();
        } catch (err) {
          return "";
        }
    }

    const handleSendCode = async () => {
        try {
            const { countryCode, number } = phone;
    
            if (!validPhone()) {
                setPhoneError('Invalid Phone Number');
                return;
            }
    
            const phoneNumber = formatPhone(number, countryCode);

            Keyboard.dismiss();
            setProcessing(true);

            const confirmation = await auth().verifyPhoneNumber(phoneNumber, true);
            setConfirm(confirmation);
            setShowModal(true);
        } catch (error) {
            console.error(error);
            Toast.show({
                type: 'error',
                text1: 'Something went wrong.',
                text2: 'Please try again later.',
                position: 'bottom',
                autoHide: true,
                visibilityTime: 5000
            });
        } finally {
            setProcessing(false);
        }
    }

    const handleVerify = async () => {
        try {
            if (code.length !== 6) {
                setOTPError('Invalid OTP. OTP must be a 6 digit pin. Please try again.');
                return;
            }

            setProcessing(true);
            Keyboard.dismiss();
            await firebaseAuthService.linkPhoneCredential(confirm.verificationId, code);

            setCode('');
            setShowModal(false);

            Toast.show({
                type: 'success',
                text1: 'Registration Successfully',
                position: 'bottom',
                bottomOffset: SIZES.xxLarge * 1.8,
                autoHide: true,
                visibilityTime: 5000
            });
            
            router.replace('/home');
        } catch (error) {
            console.error(error);

            if (error.code === 'auth/invalid-verification-code') {
                setOTPError('Invalid OTP. Please try again.');
            } else {
                setOTPError('Something went wrong. Please try again later.')
            }

            setCode('');
        } finally {
            setProcessing(false);
        }
    }

    const handlePhoneInput = (text) => {
        // Hide the error if user needs to type again
        if (phoneError) {
            setPhoneError('');
        }

        setPhone({ ...phone, number: text });
    }

    const handleChangeCountry = (details) => {
        const countryCode = details.cca2;
        setPhone({ ...phone, countryCode: countryCode });
    }

    return (
        <>
            <View style={styles.phoneValidateContainer}>
                <PhoneCheck style={styles.phoneIcon} />
                <Text style={[styles.phoneValidateHeader, SHADOWS.text]}>VERIFY ACCOUNT</Text>
                <Text style={styles.description}>
                    You will receive a 6 digit code on this number for verification. 
                </Text>
                
                <View style={styles.inputContainer}>
                    <Text style={styles.inputHeader}>Enter your Phone Number</Text>
                    <View style={styles.inputWrapper}>
                        <CountryPicker 
                            containerButtonStyle={styles.pickerContainer}
                            countryCode={phone.countryCode}
                            withFilter
                            withCallingCode
                            withCallingCodeButton
                            prefferedCountries={['PH']}
                            onSelect={handleChangeCountry}
                        />
                        <TextInput
                            style={styles.phoneInput}
                            keyboardType='phone-pad'
                            placeholder='Phone number'
                            autoComplete='tel'
                            textContentType='telephoneNumber'
                            maxLength={15}
                            value={phone.number}
                            onChangeText={handlePhoneInput}
                            focusable
                        />
                    </View>
                    {phoneError && <Text style={styles.error}>{phoneError}</Text>}
                </View>
                <TouchableOpacity
                    style={[styles.submitBtn(processing), SHADOWS.medium]}
                    onPress={handleSendCode}
                    disabled={processing}
                >
                    <Text style={styles.submitBtnText}>Send Code</Text>
                </TouchableOpacity>
            </View>
            <OTPModal processing={processing} showModal={showModal} setShowModal={setShowModal} handleVerify={handleVerify} code={code} setCode={setCode} OTPError={OTPError} setOTPError={setOTPError} handleResendOTP={handleSendCode} />
        </>
        
    )
}