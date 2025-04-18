import React, {useState, useEffect, useMemo} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import FormModal from '../../../common/FormModal';
import {ContributorForm as IContributorForm, Contributor} from '../../types';
import {placeholderTextColor} from '../../../../theme';
import FormGroup from '../../../common/FormGroup';
import {useGetFamiliesQuery} from '../../../../store/slices/familyApiSlice';
import Dropdown from '../../../common/Dropdown';

interface ContributorFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: Contributor) => void;
  initialData?: Contributor;
  isLoading: boolean;
}

const ContributorForm: React.FC<ContributorFormProps> = ({
  visible,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}) => {
  const [form, setForm] = useState<IContributorForm>({
    name: '',
    amount: '',
  });

  const {data: people} = useGetFamiliesQuery({
    limit: 100,
  });
  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.user_id + '-' + initialData.name,
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
    const [user_id, name] = form.name.split('-');
    onSubmit({
      name,
      amount: parseFloat(form.amount),
      user_id,
    });
  };

  const users = useMemo(
    () => people?.data.map(p => ({label: p.name, value: p.id + '-' + p.name})),
    [people],
  );
  return (
    <FormModal
      isLoading={isLoading}
      visible={visible}
      onClose={onClose}
      title={initialData ? 'Edit Contributor' : 'Add Contributor'}
      onSubmit={handleSubmit}
      submitText={initialData ? 'Update' : 'Add'}>
      <FormGroup label="Name">
        <Dropdown
          onChange={value => {
            setForm(prev => ({
              ...prev,
              name: value,
            }));
          }}
          items={users || []}
          placeholder={{label: 'Select contributor', value: null}}
          value={form.name}
        />
      </FormGroup>
      <FormGroup label="Amount">
        <TextInput
          style={styles.input}
          value={form.amount}
          onChangeText={text => {
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
