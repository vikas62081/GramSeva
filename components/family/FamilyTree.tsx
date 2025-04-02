import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Svg, {Line} from 'react-native-svg';

interface FamilyNode {
  id: string;
  name: string;
  type: string;
  color?: string;
  children?: FamilyNode[];
  metadata?: {
    gender?: string;
    age?: number;
    relationship?: string;
    location?: string;
  };
}

const FamilyTree: React.FC<{data: FamilyNode}> = ({data}) => {
  const [selectedNode, setSelectedNode] = useState<FamilyNode | null>(null);

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'root':
        return '#4A90E2';
      case 'category':
        return '#50C878';
      case 'subcategory':
        return '#FF7F50';
      default:
        return '#9370DB';
    }
  };

  const renderConnectors = (node: FamilyNode, x: number, y: number) => {
    if (!node.children) return null;

    return node.children.map((child, index) => (
      <Line
        key={`line-${node.id}-${child.id}`}
        x1={x}
        y1={y + 30}
        x2={x + (index - (node.children!.length - 1) / 2) * 120}
        y2={y + 90}
        stroke="#666"
        strokeWidth="1"
      />
    ));
  };

  const renderNode = (
    node: FamilyNode,
    level: number = 0,
    index: number = 0,
    siblingCount: number = 1,
  ) => {
    const nodeSpacing = 120;
    const levelHeight = 100;

    return (
      <View
        key={node.id}
        style={[
          styles.nodeContainer,
          {
            marginLeft: index === 0 ? 0 : nodeSpacing,
          },
        ]}>
        <TouchableOpacity
          style={[styles.node, {backgroundColor: getNodeColor(node.type)}]}
          onPress={() => setSelectedNode(node)}>
          <Text style={styles.nodeText}>{node.name}</Text>
        </TouchableOpacity>

        {node.children && node.children.length > 0 && (
          <View style={[styles.childrenWrapper, {marginTop: levelHeight / 2}]}>
            {node.children.map((child, idx) =>
              renderNode(child, level + 1, idx, node.children!.length),
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <ScrollView>
        {renderNode(data)}

        <Modal visible={!!selectedNode} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedNode?.name}</Text>
              {selectedNode?.metadata && (
                <View style={styles.detailsContainer}>
                  {Object.entries(selectedNode.metadata).map(([key, value]) => (
                    <Text key={key} style={styles.detailText}>
                      <Text style={styles.bold}>{key}: </Text>
                      {value}
                    </Text>
                  ))}
                </View>
              )}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedNode(null)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    minHeight: '100%',
  },
  nodeContainer: {
    alignItems: 'center',
  },
  node: {
    padding: 10,
    borderRadius: 25,
    minWidth: 100,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nodeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  childrenWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  detailsContainer: {
    width: '100%',
    marginBottom: 15,
  },
  detailText: {
    fontSize: 16,
    marginVertical: 4,
  },
  bold: {
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FamilyTree;
