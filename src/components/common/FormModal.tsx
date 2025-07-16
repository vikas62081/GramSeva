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
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Surface, useTheme} from 'react-native-paper';
import PageHeader from './PageHeader';
import LoadingSpinner from './LoadingSpinner';
import {FormModalProps} from '../events/types';

const FormModal: React.FC<FormModalProps & {stickyFooter?: boolean}> = ({
  visible,
  onClose,
  title,
  onSubmit,
  submitText,
  children,
  isLoading,
  stickyFooter = true,
}) => {
  const {colors} = useTheme();

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
      presentationStyle="overFullScreen"
      statusBarTranslucent
      accessibilityViewIsModal
      accessible>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={[styles.backdrop, {backgroundColor: colors.background}]}>
          <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
            <LoadingSpinner loading={isLoading}>
              <Surface style={styles.modalSurface} elevation={4}>
                <SafeAreaView
                  style={[
                    styles.container,
                    {backgroundColor: colors.background},
                  ]}>
                  <View style={styles.content}>
                    <PageHeader onBack={onClose} title={title} />
                    {stickyFooter ? (
                      <>
                        <ScrollView
                          style={styles.formContent}
                          contentContainerStyle={{paddingBottom: 32}}
                          keyboardShouldPersistTaps="handled"
                          showsVerticalScrollIndicator={false}>
                          {children}
                        </ScrollView>
                        <View style={styles.stickyFooter}>
                          <View style={styles.footerButtonWrapper}>
                            <Button
                              mode="outlined"
                              onPress={onClose}
                              contentStyle={styles.cancelButton}
                              style={{width: '100%'}}
                              disabled={isLoading}>
                              Cancel
                            </Button>
                          </View>
                          <View style={styles.footerButtonWrapper}>
                            <Button
                              mode="contained"
                              onPress={onSubmit}
                              contentStyle={styles.submitButton}
                              style={{width: '100%'}}
                              disabled={isLoading}
                              loading={isLoading}>
                              {submitText}
                            </Button>
                          </View>
                        </View>
                      </>
                    ) : (
                      <ScrollView
                        style={styles.formContent}
                        contentContainerStyle={{paddingBottom: 100}}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}>
                        {children}
                        <View style={styles.footer}>
                          <View style={styles.footerButtonWrapper}>
                            <Button
                              mode="outlined"
                              onPress={onClose}
                              contentStyle={styles.cancelButton}
                              style={{width: '100%'}}
                              disabled={isLoading}>
                              Cancel
                            </Button>
                          </View>
                          <View style={styles.footerButtonWrapper}>
                            <Button
                              mode="contained"
                              onPress={onSubmit}
                              contentStyle={styles.submitButton}
                              style={{width: '100%'}}
                              disabled={isLoading}
                              loading={isLoading}>
                              {submitText}
                            </Button>
                          </View>
                        </View>
                      </ScrollView>
                    )}
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
    justifyContent: 'flex-end',
  },
  modalSurface: {
    flex: 1,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: {width: 0, height: 4},
    elevation: 8,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  formContent: {
    flex: 1,
    padding: 16,
  },
  stickyFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E1E1E1',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: -2},
    elevation: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    padding: 16,
  },
  submitButton: {
    paddingVertical: 6,
  },
  cancelButton: {
    paddingVertical: 6,
  },
  footerButtonWrapper: {
    flex: 1,
  },
});

export default FormModal;
