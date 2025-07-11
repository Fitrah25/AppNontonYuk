import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface MovieCardProps {
  id: string;
  title: string;
  year: string;
  poster: string;
  type: string;
}

export default function MovieCard({ id, title, year, poster, type }: MovieCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/detail?id=${id}`);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image
        source={{ uri: poster !== 'N/A' ? poster : 'https://via.placeholder.com/150' }}
        style={styles.poster}
      />
      <View style={styles.infoContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
          <View style={styles.movieTypeBadge}>
            <Text style={styles.movieTypeBadgeText}>{type.toUpperCase()}</Text>
          </View>
        </View>

        <Text style={styles.year}>{year}</Text>

        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Selengkapnya</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#333333',
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  poster: {
    width: 100,
    height: 150,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E0E0E0',
    flex: 1, // agar title mengambil ruang yang tersedia
  },
  year: {
    fontSize: 14,
    color: '#B0B0B0',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#6A5ACD',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  movieTypeBadge: {
    backgroundColor: '#FFD700', // Gold color for "MOVIE" badge
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  movieTypeBadgeText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
