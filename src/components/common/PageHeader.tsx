import {Appbar} from 'react-native-paper';
interface PageHeaderProps {
  onBack: () => void;
  title: string;
  children?: React.ReactNode;
}
const PageHeader: React.FC<PageHeaderProps> = ({onBack, title, children}) => {
  return (
    <Appbar.Header>
      <Appbar.Action icon="arrow-back" onPress={onBack} />
      <Appbar.Content title={title} />
      {children}
    </Appbar.Header>
  );
};

export default PageHeader;
