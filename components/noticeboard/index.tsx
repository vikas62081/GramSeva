import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CreateNoticeModal from './CreateNotice';
import NoticeDetailsModal from './NoticeDetailsModal';
import TabHeader from '../common/TabHeader';

interface Notice {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  priority: 'high' | 'medium' | 'low';
}

const sampleNotices: Notice[] = [
  {
    id: '1',
    title: 'Pay Electricity Bill',
    description: 'Monthly electricity bill payment for March 2024',
    startDate: new Date('2024-03-20T00:00:00'),
    endDate: new Date('2024-03-25T23:59:59'),
    priority: 'high',
  },
  {
    id: '2',
    title: 'Water Supply Maintenance',
    description: 'Water supply will be interrupted from 10 AM to 2 PM',
    startDate: new Date('2024-03-22T10:00:00'),
    endDate: new Date('2024-03-22T14:00:00'),
    priority: 'medium',
  },
  {
    id: '3',
    title: 'Community Meeting',
    description: 'Monthly community meeting to discuss upcoming events',
    startDate: new Date('2024-03-28T15:00:00'),
    endDate: new Date('2024-03-28T17:00:00'),
    priority: 'low',
  },
  {
    id: '4',
    title: 'Property Tax Due',
    description: 'Last date for property tax payment with 5% discount',
    startDate: new Date('2024-03-01T00:00:00'),
    endDate: new Date('2024-03-31T23:59:59'),
    priority: 'high',
  },
];

const NoticeListing = (): React.JSX.Element => {
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);

  const getTimeLeft = (endDate: Date) => {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
      return `${days}d ${hours}h left`;
    }
    if (hours > 0) {
      return `${hours}h ${minutes}m left`;
    }
    if (minutes > 0) {
      return `${minutes}m left`;
    }
    return 'Ended';
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getCardColor = (priority: Notice['priority']) => {
    const colors = {
      high: '#FFA8A8',
      medium: '#FFD966',
      low: '#A4E8D1',
    };
    return colors[priority];
  };

  const renderNoticeItem = ({item, index}: {item: Notice; index: number}) => {
    const backgroundColor = getCardColor(item.priority);
    const timeLeft = getTimeLeft(item.endDate);
    const startTime = formatTime(item.startDate);
    const endTime = formatTime(item.endDate);

    return (
      <TouchableOpacity
        style={[styles.noticeCard, {backgroundColor}]}
        onPress={() => {
          setSelectedNotice(item);
          setModalVisible(true);
        }}>
        <View style={styles.cardContent}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <Text style={styles.description} numberOfLines={1}>
            {item.description}
          </Text>
          <View style={styles.footerRow}>
            <Text style={styles.timeLeft}>{timeLeft}</Text>
            <Text style={styles.timing}>
              {startTime} - {endTime}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderEventItem = ({item}: {item: Notice}) => {
    const backgroundColor = getCardColor(item.priority);
    const timeLeft = getTimeLeft(item.endDate);
    const startTime = formatTime(item.startDate);
    const endTime = formatTime(item.endDate);
    return (
      <TouchableOpacity
        style={[styles.noticeCard, {backgroundColor}]}
        onPress={() => {
          setSelectedNotice(item);
          setModalVisible(true);
        }}>
        <View style={styles.cardContent}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>{item.title}</Text>
            <MaterialIcons name="chevron-right" size={24} color="#666" />
          </View>
          <Text style={styles.description} numberOfLines={1}>
            {item.description}
          </Text>
          <View style={styles.footerRow}>
            <View style={styles.dateContainer}>
              <MaterialIcons name="event" size={16} color="#666" />
              {/* <Text style={styles.date}>{formatDate(item.date)}</Text> */}
              <Text style={styles.timeLeft}>{timeLeft}</Text>
            </View>
            <View style={styles.timeContainer}>
              <MaterialIcons name="schedule" size={16} color="#666" />
              <Text style={styles.timing}>
                {startTime} - {endTime}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TabHeader
        title="Notice Board"
        onAdd={() => setCreateModalVisible(true)}
      />
      <FlatList
        data={sampleNotices}
        renderItem={renderEventItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      <NoticeDetailsModal
        visible={modalVisible}
        notice={selectedNotice}
        onClose={() => setModalVisible(false)}
      />
      <CreateNoticeModal
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    paddingHorizontal: 16,
  },
  listContainer: {
    gap: 16,
    paddingBottom: 80,
  },
  noticeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: '#4a4a4a',
    marginBottom: 12,
    lineHeight: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  timeLeft: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  timing: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
});

export default NoticeListing;
