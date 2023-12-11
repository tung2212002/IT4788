import React from 'react';
import { Text, View, Button} from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';

function FriendsScreen({ navigation }) {
    const email = "linhlinh17122002@gmail.com";
    const password = "vbd123s";
    const uuid = "string";
    const handleSignup = async () => {
        try {
          const response = await axios.post('https://it4788.catan.io.vn/signup', {
            email,
            password,
            uuid,
          });
    
          const data = await response.data;
    
          if (response.status === 200) {
            // handle successful signup
            console.log('Sign up successful!');
          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error(error);
        }
      };
    
      return (
        <View>
          <Button title="Sign Up" onPress={handleSignup} />
        </View>
      );
}

export default FriendsScreen;
