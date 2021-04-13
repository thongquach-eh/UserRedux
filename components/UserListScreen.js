import * as React from 'react';
import { StyleSheet, Text, FlatList, Image, TouchableHighlight } from 'react-native';
import userData from '../data/users.json';

function UserListScreen({ navigation }) {
  const styles = StyleSheet.create({
    list: {
    },
    item : {
      backgroundColor: 'lightblue',
      padding: 15,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    name: {
      fontSize: 20,
    },
    avatar: {
      width: 72,
      height: 72,
    }
  });
  
  const renderName = (name) => (
    <Text style={styles.name}>
      {name.title}. {name.first} {name.last}
    </Text>
  );

  const renderLocation = (loc) => (
    <Text>
      {loc.street.number} {loc.street.name}, {loc.city} {loc.state}, {loc.postcode}, {loc.country}
    </Text>
  )

  const renderDob = (dob) => (
    <Text>
      {(new Date(dob.date)).toLocaleDateString('default', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}
    </Text>
  )

  const renderItem = ({item : user}) => {
    return (
      <TouchableHighlight style={styles.item}>
        <>
          <Image
            style={styles.avatar}
            source={{
              uri: user.picture.medium,
            }}
          />
          {renderName(user.name)}
          {renderLocation(user.location)}
          {renderDob(user.dob)}
        </>
      </TouchableHighlight>
    );
  };

  return (
    <FlatList style={styles.list}
      data={userData}
      renderItem={renderItem}
      keyExtractor={user => user.email}
    />
  );
}

export default UserListScreen;