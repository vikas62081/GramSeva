import React, {use} from 'react';
import {Modal, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {useTheme} from 'react-native-paper';

interface BottomSheetProps {
  visible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onDismiss,
  children,
}) => {
  const theme = useTheme();
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onDismiss}>
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View
          style={[styles.overlay, {backgroundColor: theme.colors.backdrop}]}
        />
      </TouchableWithoutFeedback>
      <View style={styles.sheet}>{children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 8,
    paddingVertical: 24,
    paddingBottom: 32,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: -2},
  },
});

export default BottomSheet;
