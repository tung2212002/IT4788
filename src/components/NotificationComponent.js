import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { images } from '../../assets';
import convertTimeAgo from '../utils/convertTimeAgo';
import Color from '../utils/Color';
import styled from 'styled-components';
import VectorIcon from '../utils/VectorIcon';
import PopupComponent from './PopupComponent';
import ButtonIconComponent from './ButtonIconComponent';
import routes from '../constants/route';
import { navigate } from '../navigation/RootNavigator';

const ThreeDotsContainer = styled.Pressable`
    position: absolute;
    right: 0;
    top: 5px;
    border-radius: 10px;
    padding: 15px;
`;
const ThreeDots = styled(VectorIcon)``;
const Container = styled.View`
    width: 70%;
    background-color: ${Color.white};
    opacity: 1.8;
`;
const PostTime = styled.Text`
    font-size: 13px;
    color: ${Color.gray};
`;
const ImageBackgroundAvatar = styled.ImageBackground`
    width: 60px;
    height: 60px;
    marginRight: 20px;
    alignItems: 'flex-end';
`;


const NotificationComponent = ({ item, navigation }) => {
  const [renderPopUpComponent, setRenderPopUpComponent] = useState(false);
  const [read, setRead] = useState(item.read);

  const listItems = [
    {
        title: 'Gỡ thông báo này',
        name: 'close-box',
        type: 'MaterialCommunityIcons',
        handlePress: () => {
            console.log('xoa thong bao');
            setRenderPopUpComponent(false);
        },
    },
    {
        title: 'Tắt thông báo tương tự',
        name: 'close-box-multiple',
        type: 'MaterialCommunityIcons',
        handlePress: () => {
            console.log('tat thong bao tuong tu');
            setRenderPopUpComponent(false);
        },
    },
  ];
  let titleBtn = '';
  const postTitle = item.post ? item.post.described : '';
  const avatar = item?.user?.avatar ? { uri: item.user?.avatar } : images.defaultAvatar;
  let notificationText = '';
  switch (item.type) {
    case '1':
      notificationText = ` đã gửi lời mời kết bạn đến bạn.`;
      titleBtn = 'Tắt thông báo về thông tin mới của ' + item.user.username;
      break;
    case '2': 
      notificationText = ` đã chấp nhận lời mời kết bạn của bạn.`;
      titleBtn = 'Tắt thông báo về thông tin mới của ' + item.user.username;
      break;
    case '3':
      notificationText = ` có bài viết mới: `;
      titleBtn = 'Tắt thông báo về thông tin mới của ' + item.user.username;
      break;
    case '4': 
      notificationText = ` đã cập nhật bài viết: `;
      titleBtn = 'Tắt thông báo về thông tin mới của ' + item.user.username;
      break;
    case '5':
      notificationText = ` đã bày tỏ cảm xúc về bài viết của bạn `;
      titleBtn = 'Tắt thông báo về bài viết này';
      break;
    case '6':
      notificationText = ` đã đánh dấu bài viết `;
      titleBtn = 'Tắt thông báo về bài viết này';
      break;
    case '7':
      notificationText = ` đã đánh dấu bình luận của bạn.`;
      break;
    case '8':
      notificationText = ` chia sẻ video mới.`;
      titleBtn = 'Tắt thông báo về thông tin mới của ' + item.user.username;
      break;
    case '9':
      notificationText = ` bình luận về bài viết của bạn.`;
      titleBtn = 'Tắt thông báo về bài viết này';
      break;
    default:
      notificationText = `Thông báo mới.`;
      break;
  }

  const getPost =  () => {
    switch(item.type){
      case '1':
        // den trang ca nhan
        navigate(routes.PROFILE_SCREEN)
        break;
      case '2':
        // den trang ca nhan
        navigation(routes.PROFILE_SCREEN)
        break;
      case '3':
        // den bai viet cua user
        break;
      case '4': 
        // den bai viet
        break;
      case '5':
        break;
      case '6':
        break;
      case '7':
        break;
      case '8':
        break;
      case '9':
        break;
      default:
        break;
    }
  }
  return (
    <TouchableOpacity style = {[styles.notificationContainer, read ? null :  {backgroundColor: 'rgba(0, 128, 255, 0.1)'},]}
                      onPress={() => getPost()}>
        <ImageBackgroundAvatar source = {avatar}
        imageStyle={{ borderRadius: 30}}
        >
          {item.feel&&(<Image style= {styles.avatar} source = {item.feel ? images.dislike : images.like}></Image>)}
        </ImageBackgroundAvatar>
      <Container style = { read ? null:  {backgroundColor: 'rgba(0, 128, 255, 0.01)'}}>
        <Text style={styles.username}>{item.user?.username}
                  <Text style = {{fontWeight: 'normal', fontSize: 15,}}>{notificationText}</Text>
                  {postTitle && <Text style={styles.username}>{postTitle}</Text>}
        </Text>
        <PostTime>{convertTimeAgo(item.created)}</PostTime>
      </Container>
      <ThreeDotsContainer onPress={() => setRenderPopUpComponent(true)}>
        <ThreeDots nameIcon={'dots-three-horizontal'} typeIcon={'Entypo'} size={15} color={Color.black} />
      </ThreeDotsContainer>
      {renderPopUpComponent && (
                <PopupComponent renderPopUpComponent={renderPopUpComponent} setRenderPopUpComponent={setRenderPopUpComponent}>
                <View style = {{width: '100%', alignItems: 'center',}}>
                  <Image style = {[styles.avatar, {height: 50, width: 50, borderRadius: 30, marginLeft: 0}]} source={avatar}/>
                  <Text style = {styles.postTitle}>{item.user?.username +  notificationText + postTitle} </Text>
                </View>
                {listItems.map((button, index) =>
                        
                  <ButtonIconComponent
                    key={index}
                    title={ button.title === 'Tắt thông báo tương tự' &&  titleBtn != '' ? titleBtn : button.title }
                    nameIcon={button.name}
                    typeIcon={button.type}
                    propsButton={{ height: 64 }}
                    propsIcon={{ size: 24, color: Color.black }}
                    propsTitle={{ size: 16, color: Color.black, fontWeight: 'normal' }}
                    onPress={button.handlePress}
                  />
                        
      )}
                </PopupComponent>
            )}
    </TouchableOpacity>
  );

  // return (
  //   <TouchableOpacity style={styles.notificationContainer}>
  //     <Image source={avatar} style={styles.avatar} />
  //     <View style={styles.textContainer}>
  //       <Text style={styles.username}>{item.user.username}
  //           <Text style = {{fontWeight: 'normal',}}>{notificationText}</Text>
  //       </Text>
  //       {postTitle && <Text style={styles.postTitle}>{postTitle}</Text>}
  //       <Text>{convertTimeAgo(item.create)}</Text>
  //     </View>
  //   </TouchableOpacity>
  // );
  

};

const styles = StyleSheet.create({
  notificationContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#fff',
    height: 80,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#888',
    marginTop: 30,
    marginLeft: 35,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  postTitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
    marginBottom: 10,
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotificationComponent;
