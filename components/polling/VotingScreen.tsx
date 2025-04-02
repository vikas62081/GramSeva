import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {PollingStackNavigationProp, Poll} from '../../types/navigation';
import PageHeader from '../common/PageHeader';

const VotingScreen = (): React.JSX.Element => {
  const navigation = useNavigation<PollingStackNavigationProp>();
  const route = useRoute();
  const {poll} = route.params as {poll: Poll};
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const getTimeLeft = (endDate: Date) => {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} HOURS, ${minutes} MINS LEFT`;
  };

  const handleVote = () => {
    if (selectedOption !== null) {
      console.log('Voted for option:', selectedOption);
      // Handle vote submission here
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader onBack={() => navigation.goBack()} title="Ionic Poll" />

      <View style={styles.pollCard}>
        <Text style={styles.question}>{poll.question}</Text>
        <Text style={styles.timeLeft}>{getTimeLeft(poll.endDate)}</Text>
        <Text style={styles.votes}>{poll.votes} votes already</Text>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {poll.options.map((option: string, index: number) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === index && styles.optionButtonSelected,
            ]}
            onPress={() => setSelectedOption(index)}>
            <Text
              style={[
                styles.optionText,
                selectedOption === index && styles.optionTextSelected,
              ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.shareButton}>
          <Icon name="share" size={20} color="#fff" />
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.showVotesButton} onPress={handleVote}>
          <Icon name="analytics" size={20} color="#63C7A6" />
          <Text style={styles.showVotesText}>Show votes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 16,
    marginTop: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  backText: {
    color: '#63C7A6',
    fontSize: 16,
    marginLeft: 4,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000000',
  },
  pollCard: {
    backgroundColor: '#63C7A6',
    padding: 20,
    margin: 16,
    borderRadius: 16,
    // Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  question: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  timeLeft: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    marginBottom: 12,
  },
  votes: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  optionsContainer: {
    padding: 16,
    gap: 12,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#63C7A6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  optionButtonSelected: {
    backgroundColor: '#63C7A6',
  },
  optionText: {
    color: '#63C7A6',
    fontSize: 16,
    fontWeight: '500',
  },
  optionTextSelected: {
    color: '#ffffff',
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  shareButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#63C7A6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  shareButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  showVotesButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#63C7A6',
  },
  showVotesText: {
    color: '#63C7A6',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default VotingScreen;
