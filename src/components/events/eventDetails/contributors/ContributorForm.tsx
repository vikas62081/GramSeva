import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import FormModal from '../FormModal';
import {ContributorForm as IContributorForm, Contributor} from '../../types';

interface ContributorFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: {name: string; amount: number}) => void;
  initialData?: Contributor;
}

const ContributorForm: React.FC<ContributorFormProps> = ({
  visible,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [form, setForm] = useState<IContributorForm>({
    name: '',
    amount: '',
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        amount: initialData.amount.toString(),
      });
    } else {
      setForm({name: '', amount: ''});
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!form.name || !form.amount) {
      // You might want to show an error message here
      return;
    }
    onSubmit({
      name: form.name,
      amount: parseFloat(form.amount),
    });
  };

  return (
    <FormModal
      visible={visible}
      onClose={onClose}
      title={initialData ? 'Edit Contributor' : 'Add Contributor'}
      onSubmit={handleSubmit}
      submitText={initialData ? 'Update' : 'Add'}>
      <View>
        <Text style={styles.formLabel}>Name</Text>
        <TextInput
          style={styles.input}
          value={form.name}
          onChangeText={text => setForm(prev => ({...prev, name: text}))}
          placeholder="Enter contributor name"
        />
        <Text style={styles.formLabel}>Amount</Text>
        <TextInput
          style={styles.input}
          value={form.amount}
          onChangeText={text => {
            // Only allow numbers and decimal point
            const filtered = text.replace(/[^0-9.]/g, '');
            setForm(prev => ({...prev, amount: filtered}));
          }}
          placeholder="Enter amount"
          keyboardType="numeric"
        />
      </View>
    </FormModal>
  );
};

const styles = StyleSheet.create({
  formLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
});

export default ContributorForm;
