import React from 'react';
import {View, StyleSheet, Modal, ScrollView} from 'react-native';
import {FormModalProps} from '../events/types';
import PageHeader from './PageHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoadingSpinner from './LoadingSpinner';
import {Button} from 'react-native-paper';

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
      // transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <LoadingSpinner loading={isLoading}>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '90%',
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 8,
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
