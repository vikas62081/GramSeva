import {Appbar} from 'react-native-paper';
interface PageHeaderProps {
  onBack: () => void;
  title: string;
}
const PageHeader: React.FC<PageHeaderProps> = ({onBack, title}) => {
  return (
    <Appbar.Header>
      <Appbar.Action icon="arrow-back" onPress={onBack} />
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export default PageHeader;
