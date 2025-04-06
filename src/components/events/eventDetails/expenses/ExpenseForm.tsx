import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import FormModal from '../../../common/FormModal';
import {ExpenseForm as IExpenseForm, Expense} from '../../types';
import {placeholderTextColor} from '../../../../theme';
import FormGroup from '../../../common/FormGroup';

interface ExpenseFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: {name: string; amount: number; receipt: string}) => void;
  initialData?: Expense;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  visible,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [form, setForm] = useState<IExpenseForm>({
    name: '',
    amount: '',
    receipt: '',
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        amount: initialData.amount.toString(),
        receipt: initialData.receipt,
      });
    } else {
      setForm({name: '', amount: '', receipt: ''});
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
      receipt: form.receipt,
    });
  };

  return (
    <FormModal
      visible={visible}
      onClose={onClose}
      title={initialData ? 'Edit Expense' : 'Add Expense'}
      onSubmit={handleSubmit}
      submitText={initialData ? 'Update' : 'Add'}>
      <FormGroup label="Name">
        <TextInput
          style={styles.input}
          value={form.name}
          onChangeText={text => setForm(prev => ({...prev, name: text}))}
          placeholder="Enter expense name"
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

export default ExpenseForm;
