import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../theme/theme';

interface PreferencesCardProps {
  preferences: Record<string, any>;
  questions: Array<any>;
  onEdit: () => void;
}

const PreferencesCard: React.FC<PreferencesCardProps> = ({ preferences, questions, onEdit }) => {
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={styles.title}>Your Preferences</Text>
        <TouchableOpacity onPress={onEdit} style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
      {questions.map((q) => {
        const value = preferences[q.key];
        let displayValue = '';
        if (Array.isArray(value)) {
          displayValue = value.join(', ');
        } else {
          displayValue = value || '-';
        }
        return (
          <View key={q.key} style={styles.row}>
            <Text style={styles.label}>{q.title}</Text>
            <Text style={styles.value}>{displayValue}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
  title: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 8,
    letterSpacing: 1,
  },
  editButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 14,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    flex: 1,
  },
  value: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    flex: 1,
    textAlign: 'right',
  },
});

export default PreferencesCard; 