import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { View, StyleSheet, Alert } from 'react-native';

function GoogleLoginButton({ onSuccess, onError }) {
    const handleSuccess = (response) => {
        try {
            const decoded = jwtDecode(response.credential);
            console.log("Google Login Success:", decoded);
            if (onSuccess) onSuccess(decoded);
        } catch (error) {
            console.error("Decode Error:", error);
            if (onError) onError(error);
        }
    };

    const handleError = (error) => {
        console.error("Google Login Error:", error);
        Alert.alert("Erro", "Falha no login com Google");
        if (onError) onError(error);
    };

    return (
        <View style={styles.container}>
            <GoogleLogin 
                onSuccess={handleSuccess}
                onError={handleError}
                size="large"
                width={300}
                theme="filled_blue"
                logo_alignment="center"
                text="signin_with"
                shape="rectangular"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
});

export default GoogleLoginButton;