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
import {getTimeLeft} from '../../utils';

interface Poll {
  id: string;
  question: string;
  options: string[];
  endDate: Date;
  votes: number;
  hasVoted: boolean;
}

const samplePolls = [
  {
    id: '1',
    question: 'What is your favourite movie?',
    options: ['Option 1', 'Option 2', 'Option 3'],
    endDate: new Date('2025-04-15'),
    votes: 137,
    hasVoted: true,
  },
  {
    id: '2',
    question: 'Do you prefer night or day?',
    options: ['Night', 'Day'],
    endDate: new Date('2025-05-21'),
    votes: 22,
    hasVoted: false,
  },
];

const PollingContainer = (): React.JSX.Element => {
  const navigation = useNavigation<PollingStackNavigationProp>();

  const renderPollItem = ({item}: {item: Poll}) => {
    return (
      <View style={styles.pollCard}>
        <View style={styles.cardContent}>
          {/* Left Content */}
          <View style={styles.leftContent}>
            <View>
              <Text style={styles.question}>{item.question}</Text>
              <Text style={styles.timeLeft}>{getTimeLeft(item.endDate)}</Text>
            </View>
            <View style={styles.votingStatus}>
              <Icon
                name={item.hasVoted ? 'check-circle' : 'cancel'}
                size={16}
                color={item.hasVoted ? '#008000' : '#D9534F'}
              />
              <Text
                style={[
                  styles.statusText,
                  {color: item.hasVoted ? '#008000' : '#D9534F'},
                ]}>
                {item.hasVoted ? 'You have voted' : "You haven't voted yet"}
              </Text>
            </View>
          </View>

          <View style={styles.rightContent}>
            <View style={styles.votesContainer}>
              <Text style={styles.votes}>{item.votes}</Text>
              <Text style={styles.votesLabel}>Votes</Text>
            </View>

            {!item.hasVoted && (
              <TouchableOpacity
                style={styles.voteButton}
                onPress={() =>
                  navigation.navigate('VotingScreen', {poll: item})
                }>
                <Text style={styles.voteButtonText}>Vote Now</Text>
              </TouchableOpacity>
            )}
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
    // paddingTop: 10,
  },
  listContainer: {
    paddingBottom: 48,
  },
  pollCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    minHeight: 140,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  cardContent: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flex: 1,
  },
  leftContent: {
    justifyContent: 'space-between',
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  timeLeft: {
    fontSize: 14,
    color: '#777',
    fontWeight: '500',
    marginBottom: 6,
  },
  votingStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(99, 199, 166, 0.1)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },

  /* Right Content Adjustments */
  rightContent: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  votesContainer: {
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    width: 56,
    padding: 8,
    borderRadius: 8, // Space between vote count and button
  },
  votes: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  votesLabel: {
    fontSize: 12,
    color: '#555',
  },
  voteButton: {
    backgroundColor: '#63C7A6',
    padding: 8,
    borderRadius: 8,
  },
  voteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default PollingContainer;
