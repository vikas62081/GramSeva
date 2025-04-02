import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Notice {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  priority: 'high' | 'medium' | 'low';
}

interface NoticeDetailsModalProps {
  visible: boolean;
  notice: Notice | null;
  onClose: () => void;
}

const NoticeDetailsModal: React.FC<NoticeDetailsModalProps> = ({
  visible,
  notice,
  onClose,
}) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getPriorityColor = (priority: Notice['priority']) => {
    const colors = {
      high: '#FF6B6B',
      medium: '#FFB900',
      low: '#63C7A6',
    };
    return colors[priority];
  };

  if (!notice) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onDismiss={onClose}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{notice.title}</Text>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <MaterialIcons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalDescription}>{notice.description}</Text>
            <View style={styles.modalDetails}>
              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <MaterialIcons
                    name="event"
                    size={20}
                    color="#666"
                    style={styles.detailIcon}
                  />
                  <Text style={styles.detailLabel}>Start Date:</Text>
                </View>
                <Text style={styles.detailValue}>
                  {formatDate(notice.startDate)}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <MaterialIcons
                    name="event-busy"
                    size={20}
                    color="#666"
                    style={styles.detailIcon}
                  />
                  <Text style={styles.detailLabel}>End Date:</Text>
                </View>
                <Text style={styles.detailValue}>
                  {formatDate(notice.endDate)}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <MaterialIcons
                    name="schedule"
                    size={20}
                    color="#666"
                    style={styles.detailIcon}
                  />
                  <Text style={styles.detailLabel}>Time:</Text>
                </View>
                <Text style={styles.detailValue}>
                  {formatTime(notice.startDate)} - {formatTime(notice.endDate)}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <MaterialIcons
                    name="flag"
                    size={20}
                    color="#666"
                    style={styles.detailIcon}
                  />
                  <Text style={styles.detailLabel}>Priority:</Text>
                </View>
                <View style={styles.priorityContainer}>
                  <View
                    style={[
                      styles.priorityIndicator,
                      {backgroundColor: getPriorityColor(notice.priority)},
                    ]}
                  />
                  <Text style={styles.detailValue}>
                    {notice.priority.charAt(0).toUpperCase() +
                      notice.priority.slice(1)}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    flex: 1,
  },
  closeButton: {
    padding: 8,
  },
  modalDescription: {
    fontSize: 16,
    color: '#4a4a4a',
    lineHeight: 24,
    marginBottom: 24,
  },
  modalDetails: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    marginRight: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '600',
  },
  priorityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priorityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default NoticeDetailsModal;
