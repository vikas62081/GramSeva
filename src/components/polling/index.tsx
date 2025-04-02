import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {PollingStackNavigationProp} from '../../../types/navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TabHeader from '../common/TabHeader';

interface Poll {
  id: string;
  question: string;
  options: string[];
  startDate: Date;
  endDate: Date;
  votes: number;
  hasVoted: boolean;
}

const samplePolls = [
  {
    id: '1',
    question: 'What is your favourite movie?',
    options: ['Option 1', 'Option 2', 'Option 3'],
    startDate: new Date('2025-04-20'),
    endDate: new Date('2025-04-15'),
    votes: 137,
    hasVoted: true,
  },
  {
    id: '2',
    question: 'Do you prefer night or day?',
    options: ['Night', 'Day'],
    startDate: new Date('2024-03-20'),
    endDate: new Date('2025-05-21'),
    votes: 22,
    hasVoted: false,
  },
  {
    id: '3',
    question: 'Who is the better singer?',
    options: ['Singer 1', 'Singer 2'],
    startDate: new Date('2025-03-20'),
    endDate: new Date('2025-05-22'),
    votes: 268,
    hasVoted: true,
  },
  {
    id: '4',
    question: 'Best type of food?',
    options: ['Italian', 'Indian', 'Chinese', 'Mexican'],
    startDate: new Date('2024-03-20'),
    endDate: new Date('2024-03-25'),
    votes: 166,
    hasVoted: false,
  },
];

const samplePoll = {
  id: '2',
  question: 'Do you prefer night or day?',
  options: ['Night', 'Day', 'In the middle'],
  endDate: new Date(Date.now() + 3600000 + 180000), // 1 hour and 3 minutes from now
  votes: 22,
};

const getTimeLeft = (endDate: Date) => {
  const now = new Date();
  const diff = endDate.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    return `${days} DAYS, ${hours} HOURS, ${minutes} MINS LEFT`;
  }
  if (hours > 0) {
    return `${hours} HOURS, ${minutes} MINS LEFT`;
  }
  return `${minutes} MINS LEFT`;
};

const getCardColor = (index: number) => {
  const colors = [
    '#6B8DE6', // Blue
    '#63C7A6', // Green
    '#B36BE6', // Purple
    '#8C8C8C', // Gray
  ];
  return colors[index % colors.length];
};

const PollingContainer = (): React.JSX.Element => {
  const navigation = useNavigation<PollingStackNavigationProp>();

  const renderPollItem = ({item, index}: {item: Poll; index: number}) => {
    const backgroundColor = getCardColor(index);
    const timeLeft = getTimeLeft(item.endDate);

    return (
      <View style={[styles.pollCard, {backgroundColor}]}>
        <View style={styles.cardContent}>
          <View style={styles.leftContent}>
            <Text style={styles.question}>{item.question}</Text>
            <View>
              <Text style={styles.timeLeft}>{timeLeft}</Text>
              <View style={styles.notVotedContainer}>
                <Text
                  style={
                    item.hasVoted ? styles.votedText : styles.notVotedText
                  }>
                  {item.hasVoted
                    ? 'You have voted'
                    : "You haven't voted on this poll"}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.rightContent}>
            <View style={styles.votesContainer}>
              <Text style={styles.votes}>{item.votes}</Text>
              <Text style={styles.votesLabel}>votes</Text>
            </View>
            <TouchableOpacity
              style={styles.viewButton}
              onPress={() => navigation.navigate('VotingScreen', {poll: item})}>
              <Text style={styles.viewButtonText}>
                View <Icon name="arrow-forward" size={20} color="#63C7A6" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TabHeader
        title="Ionic Polls"
        onAdd={() => navigation.navigate('CreatePoll')}
      />
      <FlatList
        data={samplePolls}
        renderItem={renderPollItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
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
    paddingBottom: 48,
  },
  pollCard: {
    borderRadius: 16,
    padding: 16,
    minHeight: 160,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Shadow for Android
    elevation: 5,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftContent: {
    flex: 1,
    marginRight: 16,
  },
  rightContent: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  timeLeft: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    marginBottom: 12,
  },
  notVotedContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  votedText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  notVotedText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  votesContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  votes: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  votesLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  viewButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 12,
  },
  viewButtonText: {
    verticalAlign: 'middle',
    color: '#2d3436',
    fontSize: 16,
    fontWeight: '600',
  },
  addButton: {
    // padding: 8,

    // backgroundColor: '#4C6FFF',
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Shadow for Android
  },
  addButtonText: {},
});

export default PollingContainer;
