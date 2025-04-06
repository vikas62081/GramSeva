import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import FormModal from '../../../common/FormModal';
import {ContributorForm as IContributorForm, Contributor} from '../../types';
import {placeholderTextColor} from '../../../../theme';
import FormGroup from '../../../common/FormGroup';

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
      <FormGroup label="Name">
        <TextInput
          style={styles.input}
          value={form.name}
          onChangeText={text => setForm(prev => ({...prev, name: text}))}
          placeholder="Enter contributor name"
          placeholderTextColor={placeholderTextColor}
        />
      </FormGroup>
      <FormGroup label="Amount">
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
          placeholderTextColor={placeholderTextColor}
        />
      </FormGroup>
    </FormModal>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#2D3436',
  },
});

export default ContributorForm;
