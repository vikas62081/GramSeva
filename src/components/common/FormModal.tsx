import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {FormModalProps} from '../events/types';
import PageHeader from './PageHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoadingSpinner from './LoadingSpinner';
import {Button, Surface} from 'react-native-paper';

const FormModal: React.FC<FormModalProps> = ({
  visible,
  onClose,
  title,
  onSubmit,
  submitText,
  children,
  isLoading,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      presentationStyle="overFullScreen"
      statusBarTranslucent
      accessibilityViewIsModal
      accessible>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.backdrop}>
          <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
            <LoadingSpinner loading={isLoading}>
              <Surface style={styles.modalSurface} elevation={4}>
                <SafeAreaView style={styles.container}>
                  <View style={styles.content}>
                    <PageHeader onBack={onClose} title={title} />
                    <ScrollView
                      style={styles.formContent}
                      contentContainerStyle={{paddingBottom: 32}}
                      showsVerticalScrollIndicator={false}
                      keyboardShouldPersistTaps="handled">
                      {children}
                    </ScrollView>
                  </View>
                  <View style={styles.footer}>
                    <Button
                      mode="outlined"
                      onPress={onClose}
                      style={styles.cancelButton}
                      accessibilityLabel="Cancel"
                      disabled={isLoading}>
                      Cancel
                    </Button>
                    <Button
                      mode="contained"
                      contentStyle={styles.submitButton}
                      onPress={onSubmit}
                      accessibilityLabel={submitText}
                      disabled={isLoading}
                      loading={isLoading}>
                      {submitText}
                    </Button>
                  </View>
                </SafeAreaView>
              </Surface>
            </LoadingSpinner>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'flex-end',
  },
  modalSurface: {
    flex: 1,
    marginTop: 32,
    marginHorizontal: 0,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: {width: 0, height: 4},
    elevation: 8,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
  },
  formContent: {
    flex: 1,
    padding: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E1E1E1',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: -2},
    elevation: 2,
  },
  submitButton: {
    paddingVertical: 6,
    paddingHorizontal: 18,
  },
  cancelButton: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderColor: '#bbb',
  },
});

export default FormModal;
