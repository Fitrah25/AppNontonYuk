import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { API_KEY, BASE_DETAIL_URL } from '../constants/Api';

interface MovieDetail {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  imdbRating: string;
  RottenTomatoes?: string;
  Metascore?: string;
  BoxOffice: string;
  Type: string;
}

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      if (!id) {
        setError('Movie ID not provided.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${BASE_DETAIL_URL}?apikey=${API_KEY}&i=${id}`);
        if (response.data.Response === 'True') {
          setMovieDetail(response.data);
        } else {
          setError(response.data.Error || 'Failed to fetch movie details.');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching movie details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6A5ACD" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!movieDetail) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No movie details found.</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: movieDetail.Poster !== 'N/A' ? movieDetail.Poster : 'https://via.placeholder.com/300' }} style={styles.poster} />

        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backArrow}>
            <Ionicons name="arrow-back" size={28} color="#E0E0E0" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nontonyuk</Text>
        </View>

        <View style={styles.detailCard}>
          <View style={styles.titleRatingContainer}>
            <Text style={styles.movieTitle}>{movieDetail.Title}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={18} color="#FFD700" />
              <Text style={styles.ratingText}>{movieDetail.imdbRating}</Text>
            </View>
          </View>
          <View style={styles.metaInfoRow}>
            <Text style={styles.metaInfoBadge}>{movieDetail.Type}</Text>
            <Text style={styles.metaInfoText}>{movieDetail.Released}</Text>
            <Text style={styles.metaInfoText}>{movieDetail.Rated}</Text>
            <Text style={styles.metaInfoText}>{movieDetail.Genre}</Text>
          </View>

          <Text style={styles.sectionTitle}>Plot</Text>
          <Text style={styles.plotText}>{movieDetail.Plot}</Text>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Director</Text>
            <Text style={styles.infoValue}>{movieDetail.Director}</Text>

            <Text style={styles.infoLabel}>Writer</Text>
            <Text style={styles.infoValue}>{movieDetail.Writer}</Text>

            <Text style={styles.infoLabel}>Actors</Text>
            <Text style={styles.infoValue}>{movieDetail.Actors}</Text>

            <Text style={styles.infoLabel}>Language</Text>
            <Text style={styles.infoValue}>{movieDetail.Language}</Text>

            <Text style={styles.infoLabel}>Country</Text>
            <Text style={styles.infoValue}>{movieDetail.Country}</Text>

            <Text style={styles.infoLabel}>Awards</Text>
            <Text style={styles.infoValue}>{movieDetail.Awards}</Text>

            <Text style={styles.infoLabel}>Boxoffice</Text>
            <Text style={styles.infoValue}>{movieDetail.BoxOffice !== 'N/A' ? movieDetail.BoxOffice : '-'}</Text>
          </View>

          <View style={styles.ratingsContainer}>
            {movieDetail.imdbRating !== 'N/A' && (
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingBadgeLabel}>Internet Movie Database</Text>
                <Text style={styles.ratingBadgeValue}>{movieDetail.imdbRating}/10</Text>
              </View>
            )}
            {movieDetail.RottenTomatoes && movieDetail.RottenTomatoes !== 'N/A' && (
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingBadgeLabel}>Rotten Tomatoes</Text>
                <Text style={styles.ratingBadgeValue}>{movieDetail.RottenTomatoes}</Text>
              </View>
            )}
            {movieDetail.Metascore && movieDetail.Metascore !== 'N/A' && (
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingBadgeLabel}>Metacritic</Text>
                <Text style={styles.ratingBadgeValue}>{movieDetail.Metascore}/100</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282828',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282828',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282828',
    padding: 20,
  },
  errorText: {
    color: '#FF6347',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#6A5ACD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  poster: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
  },
  header: {
    position: 'absolute',
    top: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  backArrow: {
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E0E0E0',
    marginLeft: 10,
  },
  detailCard: {
    backgroundColor: '#333333',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    padding: 20,
    paddingBottom: 50,
  },
  titleRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  movieTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#E0E0E0',
    flexShrink: 1,
    marginRight: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#444',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  ratingText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  metaInfoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    alignItems: 'center',
  },
  metaInfoBadge: {
    backgroundColor: '#FFD700',
    color: '#333',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontWeight: 'bold',
    marginRight: 10,
    marginBottom: 5,
  },
  metaInfoText: {
    color: '#B0B0B0',
    fontSize: 14,
    marginRight: 10,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E0E0E0',
    marginBottom: 10,
    marginTop: 10,
  },
  plotText: {
    color: '#B0B0B0',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: '#282828',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  infoLabel: {
    color: '#A0A0A0',
    fontSize: 14,
    marginBottom: 2,
  },
  infoValue: {
    color: '#E0E0E0',
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  ratingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  ratingBadge: {
    backgroundColor: '#282828',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    margin: 5,
    width: '30%', // Adjust as needed for spacing
  },
  ratingBadgeLabel: {
    color: '#A0A0A0',
    fontSize: 12,
    marginBottom: 5,
    textAlign: 'center',
  },
  ratingBadgeValue: {
    color: '#E0E0E0',
    fontSize: 18,
    fontWeight: 'bold',
  },
});