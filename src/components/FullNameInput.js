// @flow
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import StringInput from './StringInput';
import TitlePicker from './TitlePicker';
import {Field} from 'redux-form';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

const FullNameInput = (): React.Node => {
  return (
    <View style={styles.container}>
      <Field
        name="name.title"
        component={TitlePicker}
        props={{label: 'Title:'}}
      />
      <Field
        name="name.first"
        component={StringInput}
        props={{label: 'First name:'}}
      />
      <Field
        name="name.last"
        component={StringInput}
        props={{label: 'Last name:'}}
      />
    </View>
  );
};

export default FullNameInput;
