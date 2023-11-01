import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function TelaLogin() {
  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const renderPasswordInput = () => {
    return(
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="rgba(0, 0, 0, 0.35)"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry={!showPassword} 
        />
        <View style={{ backgroundColor: "#88CDF6", height: 40, borderBottomRightRadius: 10, borderTopRightRadius: 10 }}>
          <TouchableOpacity onPress={toggleShowPassword}>
            <View style={{ padding: 5 }}>
              {showPassword ? (
                <Ionicons
                  name="eye"
                  color="#FFF"
                  size={25}
                />
              ) : (
                <Ionicons
                  name="eye-off"
                  color="#FFF"
                  size={25}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo}></Image>
      <Text style={styles.text}>Login</Text>

      <View>
        <Text style={styles.text1}> E-mail</Text>
        <TextInput
          style={styles.input2}
          placeholder="Digite seu email"
          placeholderTextColor="rgba(0, 0, 0, 0.35)"
        />
      </View>
      <View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.text1}> Senha </Text>
        </View>
        {renderPasswordInput()}
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('Principal')}
        style={styles.botao2}>
        <View>
          <Text style={styles.text5}>Entrar</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  text: {
    fontSize: 20,
    color: '#88CDF6',
    marginTop: 20,
    fontWeight: 'bold',
    fontFamily: 'Urbanist_700Bold',
  },

  logo: {
    marginBottom: 30,
    width: 300,
    height: 300,
  },

  text5: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFF',
    fontFamily: 'Urbanist_700Bold',
  },
  botao2: {
    width: 180,
    height: 40,
    backgroundColor: '#88CDF6',
    marginTop: 25,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 3,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderColor: '#88CDF6',
    padding: 5,
    paddingLeft: 15,
    fontFamily: 'Urbanist_700Bold',
    color: 'rgba(0, 0, 0, 0.35)',
    width: 300,
    height: 40,
  },
  input2: {
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#88CDF6',
    padding: 5,
    paddingLeft: 15,
    fontFamily: 'Urbanist_700Bold',
    color: 'rgba(0, 0, 0, 0.35)',
    width: 335,
    height: 40,
  },
  text1: {
    fontSize: 15,
    marginTop: 5,
    marginRight: 5,
    marginLeft: 5,
    color: '#88CDF6',
    fontFamily: 'Urbanist_700Bold',
  },
});
