import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import FormGroup from './FormGroup';

interface DropdownProps {
  label?: string;
  value: any;
  onChange: (value: any) => void;
  items: {label: string; value: any}[];
  placeholder: {label: string; value: any};
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  onChange,
  items,
  placeholder = 'Select',
}) => {
  return (
    <FormGroup label={label}>
      <RNPickerSelect
        useNativeAndroidPickerStyle={false}
        onValueChange={onChange}
        items={items}
        placeholder={placeholder}
        style={dropdownStyles}
        value={value}
      />
    </FormGroup>
  );
};

const dropdownStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 12,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    // paddingVertical: 0,
    // backgroundColor: '#F8F9FA',
    // borderRadius: 12,
    // padding: 16,
    // paddingVertical: 14,
    color: '#2D3436',

    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 0,
  },
});

export default Dropdown;
