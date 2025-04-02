import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import Svg, {Circle, Line, G, Text as SvgText} from 'react-native-svg';

const {width: screenWidth} = Dimensions.get('window');

const familyData = {
  id: '1',
  name: 'John Doe',
  relationship: 'Head',
  members: [
    {id: '2', name: 'Jane Doe', relationship: 'Wife', parentId: '1'},
    {
      id: '3',
      name: 'Abc Doe',
      relationship: 'Son',
      parentId: '1',
      members: [
        {id: '4', name: 'Abc Doe', relationship: 'Wife', parentId: '3'},
        {id: '5', name: 'Laila', relationship: 'Daughter', parentId: '3'},
      ],
    },
  ],
};

const FamilyTree = () => {
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [scaleAnim] = useState(new Animated.Value(1));

  const handlePress = (member: any) => {
    setSelectedMember(member);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderTree = (member: any, x: number, y: number, level = 0) => {
    const nodeSize = 40;
    const spacingX = Math.max(screenWidth / (level + 2), 140); // More space for clarity
    const spacingY = 110;

    return (
      <>
        <G onPress={() => handlePress(member)}>
          <AnimatedCircle cx={x} cy={y} r={nodeSize} fill="#63C7A6" />
          <SvgText
            x={x}
            y={y + 6}
            fontSize="14"
            fontWeight="bold"
            textAnchor="middle"
            fill="white">
            {member.name.split(' ')[0]}
          </SvgText>
        </G>

        {member.members &&
          member.members.map((child, index) => {
            const childX =
              x + (index - (member.members.length - 1) / 2) * spacingX;
            const childY = y + spacingY;

            return (
              <React.Fragment key={child.id}>
                <Line
                  x1={x}
                  y1={y + nodeSize}
                  x2={childX}
                  y2={childY - nodeSize}
                  stroke="#aaa"
                  strokeWidth="2"
                />
                {renderTree(child, childX, childY, level + 1)}
              </React.Fragment>
            );
          })}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Svg width={screenWidth} height="600">
        {renderTree(familyData, screenWidth / 2, 70)}
      </Svg>

      {selectedMember && (
        <Modal transparent animationType="fade">
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedMember.name}</Text>
              <Text style={styles.modalText}>
                {selectedMember.relationship}
              </Text>
              <TouchableOpacity
                onPress={() => setSelectedMember(null)}
                style={styles.closeButton}>
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

// Animated Circle with scaling effect
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: '#F0F4F8',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 25,
    borderRadius: 16,
    width: 320,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 5},
  },
  modalTitle: {fontSize: 22, fontWeight: 'bold', color: '#222'},
  modalText: {fontSize: 16, marginVertical: 10, color: '#555'},
  closeButton: {
    marginTop: 15,
    padding: 12,
    backgroundColor: '#4A90E2',
    borderRadius: 10,
  },
  closeText: {color: 'white', fontWeight: 'bold'},
});

export default FamilyTree;
