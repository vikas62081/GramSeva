import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import FormModal from '../../../common/FormModal';
import {Expense} from '../../types';
import {placeholderTextColor} from '../../../../theme';
import FormGroup from '../../../common/FormGroup';

interface ExpenseFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (expense: Expense) => void;
  initialData?: Expense;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  visible,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [form, setForm] = useState({
    item: '',
    cost: '',
    receipt_url: '',
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        item: initialData.item,
        cost: initialData.cost.toString(),
        receipt_url: initialData.receipt_url,
      });
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!form.item || !form.cost) {
      // You might want to show an error message here
      return;
    }
    onSubmit(form as unknown as Expense);
  };

  return (
    <FormModal
      visible={visible}
      onClose={onClose}
      title={initialData ? 'Edit Expense' : 'Add Expense'}
      onSubmit={handleSubmit}
      submitText={initialData ? 'Update' : 'Add'}>
      <FormGroup label="Item">
        <TextInput
          style={styles.input}
          value={form.item}
          onChangeText={text => setForm(prev => ({...prev, item: text}))}
          placeholder="Enter expense name"
          placeholderTextColor={placeholderTextColor}
        />
      </FormGroup>
      <FormGroup label="Amount">
        <TextInput
          style={styles.input}
          value={form.cost}
          onChangeText={text => {
            // Only allow numbers and decimal point
            const filtered = text.replace(/[^0-9.]/g, '');
            setForm(prev => ({...prev, cost: filtered}));
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

export default ExpenseForm;
