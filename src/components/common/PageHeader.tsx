import {Appbar, useTheme} from 'react-native-paper';
import {StyleSheet, ViewStyle} from 'react-native';

interface PageHeaderProps {
  onBack: () => void;
  title: string;
  children?: React.ReactNode;
  style?: ViewStyle;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  onBack,
  title,
  children,
  style,
}) => {
  const {colors} = useTheme();
  return (
    <Appbar.Header
      style={[styles.header, {backgroundColor: colors.surface}, style]}>
      <Appbar.BackAction onPress={onBack} />
      <Appbar.Content title={title} titleStyle={styles.title} />
      {children}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
  },
});

export default PageHeader;
