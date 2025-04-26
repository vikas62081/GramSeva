import React from 'react';
import {View, StyleSheet, Modal, ScrollView} from 'react-native';
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
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <LoadingSpinner loading={isLoading}>
        <Surface style={{flex: 1}}>
          <SafeAreaView style={styles.container}>
            <View style={styles.content}>
              <PageHeader onBack={onClose} title={title} />
              <ScrollView
                style={styles.formContent}
                showsVerticalScrollIndicator={false}>
                {children}
              </ScrollView>
              <View style={styles.footer}>
                <Button
                  mode="contained"
                  style={styles.submitButton}
                  onPress={onSubmit}>
                  {submitText}
                </Button>
              </View>
            </View>
          </SafeAreaView>
        </Surface>
      </LoadingSpinner>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E1E1E1',
  },
  submitButton: {
    padding: 8,
  },
});

export default FormModal;
