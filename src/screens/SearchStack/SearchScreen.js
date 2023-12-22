import React, {useEffect, useState} from 'react';
import { Text, TouchableOpacity, View, Animated, TextInput, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Color from '../../utils/Color';
import VectorIcon from '../../utils/VectorIcon';
import ButtonComponent from '../../components/ButtonComponent';
import { get_recentSearch } from '../../services/userService';


const Container = styled.View`
    width: 100%;
    flexDirection: 'column'
`;
const ButtonIcon = styled(VectorIcon)`
    padding: 6px;
    margin-horizontal: 5px;
    border-radius: 50px;
`;
const ButtonInput = styled.View`
    flexDirection: 'row';
    alignItems: 'center';
    backgroundColor: ${Color.lightGray};
    width: 88%;
    borderRadius: 50px;
    padding: 5px;
    paddingLeft: 15px;
`;
const AnimatedHeader = styled(Animated.View)`
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    flex-direction: row;
    align-items: center;
    padding:5px;
    border-bottom-width: 1px;
    border-bottom-color: ${Color.lightGray};
`;

const Input = styled.TextInput`
    flex: 1px;
    fontSize: 16px;
`;
const Title = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${Color.black};
    margin: 10px;
`;

const Button = styled(ButtonComponent)`
    width: 120px;
    backgroundColor: ${Color.mainBackgroundColor};
    height: 40px;
    marginTop: 0px;
    marginBottom: 0px;
`



function SearchScreen({ route, navigation }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [recent, setRecentSearch] = useState([]);
    const [error, setError] = useState('');

  // Mock search function
  const handleSearch = (text) => {
    setSearchTerm(text);
    setSearchResults([
      'Result 1',
      'Result 2',
      'Result 3',
      // ... based on search term
    ]);
  };
  const getRecentSearch = async() =>{
    const params = {
        index: 0,
        count: 10,
    };
    get_recentSearch(params)
        .then((reponse) =>{
            if(reponse.data.code === 1000){
                console.log(reponse.data);
            }
            else{
                console.log(reponse);
            }
        })
  }
  useEffect(() =>{
    getRecentSearch();
  }, []);

  
    return (
        <Container>
            <AnimatedHeader>
                <ButtonIcon nameIcon={'arrowleft'} typeIcon={'AntDesign'} size={22} color={Color.black}></ButtonIcon>
                <ButtonInput>
                    <Input
                    placeholder="Tìm kiếm"
                    value={searchTerm}
                    onChangeText={handleSearch}
                    autoFocus = {true}
                    />
                </ButtonInput>
            </AnimatedHeader>
            <View style = {{flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: Color.lightGray, alignItems: "center",}}>
                <Title>Tìm kiếm gần đây</Title>
                <Button
                    title={"CHỈNH SỬA"}
                    color={Color.gray}
                    size={18}
                />
            </View>

        </Container>
    );
}

export default SearchScreen;
