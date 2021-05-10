// @flow
import * as React from 'react';
import {StyleSheet, View, Image, Button} from 'react-native';
import type {FieldProps} from 'redux-form';
import {launchImageLibrary} from 'react-native-image-picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  picture: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
});

type PictureInputProps = {
  ...FieldProps,
  label: string,
};

const handleChooseAvatar = onChange => {
  const options = {
    noData: true,
  };

  launchImageLibrary(options, response => {
    if (response.uri) {
      const picture = {
        large: response.uri,
        medium: response.uri,
        thumbnail: response.uri,
      };
      onChange(picture);
    }
  });
};

const PictureInput = (props: PictureInputProps): React.Node => {
  const {
    input: {value, onChange},
    label,
  } = props;

  return (
    <View style={styles.container}>
      <Image source={{uri: value?.large}} style={styles.picture} />
      <Button title={label} onPress={() => handleChooseAvatar(onChange)} />
    </View>
  );
};

export default PictureInput;
