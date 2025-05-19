import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

interface ProfileHeaderProps {
  avatar: string;
  username: string;
  handle: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ avatar, username, handle }) => (
  <View style={styles.container}>
    <Image source={avatar} style={styles.avatar} />
    <Text style={styles.username}>{username}</Text>
    <Text style={styles.handle}>{handle}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: theme.colors.divider,
    marginBottom: 12,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.primary,
    letterSpacing: 1,
  },
  handle: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    marginBottom: 8,
  },
});

export default ProfileHeader; 