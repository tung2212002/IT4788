import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';

const NotificationComponent = ({ data }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications(data);
  }, [data]);

  const renderNotification = ({ item }) => {
    const postTitle = item.post ? item.post.described : '';
    let notificationText = '';

    switch (item.type) {
      case 1:
        notificationText = `${item.user.username} commented on your post.`;
        break;
      case 5:
        notificationText = `${item.user.username} reacted to your post with "${item.feel.type}"`;
        break;
      default:
        notificationText = `New notification`;
        break;
    }

    return (
      <TouchableOpacity style={styles.notificationContainer}>
        <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text style={styles.username}>{item.user.username}</Text>
          <Text>{notificationText}</Text>
          {postTitle && <Text style={styles.postTitle}>{postTitle}</Text>}
        </View>
        <Text style={styles.time}>{item.created.split('T')[0]}</Text>
      </TouchableOpacity>
    );
  };

  if (!notifications.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text>No notifications yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.notification_id}
      renderItem={renderNotification}
    />
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
  },
  postTitle: {
    fontSize: 12,
    color: '#888',
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
