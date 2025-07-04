import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Divider} from 'react-native-paper';

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onChangeTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({tabs, activeTab, onChangeTab}) => {
  return (
    <View style={styles.tabContainer}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tab,
            activeTab === tab && styles.activeTab,
            activeTab === tab && styles.activeTabPill,
          ]}
          onPress={() => onChangeTab(tab)}>
          <Text
            style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
    borderRadius: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    borderRadius: 20,
    marginHorizontal: 4,
  },
  activeTab: {
    borderBottomColor: '#63C7A6',
  },
  activeTabPill: {
    backgroundColor: '#e6f7f1',
    borderRadius: 20,
    elevation: 1,
    shadowColor: '#63C7A6',
    shadowOpacity: 0.08,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 1},
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#63C7A6',
    fontWeight: 'bold',
  },
});

export default Tabs;
