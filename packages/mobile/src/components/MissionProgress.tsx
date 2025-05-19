import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MissionProgressProps {
  title: string;
  progress: number; // 0 to 1
  current: number;
  total: number;
  active?: boolean;
  color?: string;
}

const MissionProgress: React.FC<MissionProgressProps> = ({
  title,
  progress,
  current,
  total,
  active = false,
  color = '#A3A3C2',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={[styles.title, active && styles.activeTitle]}>{title}</Text>
        <Text style={[styles.progressText, { color: active ? color : '#A3A3C2' }]}>
          {current}/{total} <Text style={styles.done}>Done</Text>
        </Text>
      </View>
      <View style={[styles.progressBarBg, active && { borderColor: color }] }>
        <View style={[styles.progressBar, { width: `${progress * 100}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  title: {
    color: '#A3A3C2',
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  activeTitle: {
    color: '#fff',
  },
  progressText: {
    fontSize: 13,
    fontWeight: '600',
  },
  done: {
    fontWeight: '400',
    fontSize: 13,
    color: '#A3A3C2',
  },
  progressBarBg: {
    width: '100%',
    height: 8,
    backgroundColor: 'transparent',
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#23233A',
    marginTop: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
});

export default MissionProgress; 