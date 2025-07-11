import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import EmptyState from '../components/EmptyState';
import MovieCard from '../components/MovieCard';
import { API_KEY, BASE_SEARCH_URL } from '../constants/Api';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

export default function IndexScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState(true); // To show "Temukan film..." initially

  const fetchMovies = async (query: string) => {
    if (!query.trim()) {
      setMovies([]);
      setInitialLoad(true);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    setInitialLoad(false);

    try {
      const response = await axios.get(`${BASE_SEARCH_URL}?apikey=${API_KEY}&s=${query}`);
      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
        setError(response.data.Error || 'Film tidak tersedia.');
      }
    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan saat mengambil data.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial data when the component mounts (e.g., "iron")
  useEffect(() => {
    fetchMovies(''); // Default search for initial display
  }, []);

  useFocusEffect(
    useCallback(() => {
      // Reset search results when navigating back to this screen
      setSearchQuery('');
      // You might want to re-fetch default movies here or clear them
      // setMovies([]); // Uncomment to clear results when user navigates back
      // setInitialLoad(true); // Uncomment to show initial message when user navigates back
    }, [])
  );

  const handleSearch = () => {
    fetchMovies(searchQuery);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nontonyuk</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Movie, series"
          placeholderTextColor="#A0A0A0"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <Text style={styles.categoriesTitle}>Categories</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#6A5ACD" style={styles.loadingIndicator} />
      ) : error ? (
        <EmptyState message={error} />
      ) : movies.length > 0 ? (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.imdbID}
          renderItem={({ item }) => (
            <MovieCard
              id={item.imdbID}
              title={item.Title}
              year={item.Year}
              poster={item.Poster}
              type={item.Type}
            />
          )}
          contentContainerStyle={styles.movieList}
          showsVerticalScrollIndicator={false}
        />
      ) : initialLoad ? (
        <EmptyState message="Temukan Film, Series, Kesukaan mu di pencarian" />
      ) : (
        <EmptyState message="Film tidak Tersedia" />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282828', // Dark background
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#3A3A3A',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFBDE',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#3A3A3A',
    borderRadius: 30,
    marginHorizontal: 20,
    marginVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    color: '#E0E0E0',
    fontSize: 16,
    paddingVertical: 12,
  },
  searchButton: {
    marginLeft: 10,
    padding: 5,
  },
  categoriesTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFBDE',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  movieList: {
    paddingHorizontal: 20,
    paddingBottom: 20, // Add some padding at the bottom for better scrolling
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
  },
});