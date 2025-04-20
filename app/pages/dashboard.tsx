import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Post {
  _id: string;
  description: string;
  department: string;
  status: string;
  image: string;
  imageType: string;
  createdAt: string;
}

const DashboardScreen = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserPosts = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      const user = userData ? JSON.parse(userData) : null;
      const userId = user?._id;

      if (!userId) {
        console.log("User ID not found in storage");
        return;
      }

      console.log("Fetching posts for user:", userId);

      const res = await axios.get(`http://192.168.15.152:5001/api/issues/userposts/${userId}`);
      alert(res.data)
      console.log("Fetched posts:", res.data);

      setPosts(res.data);
    } catch (err) {
      console.error("Failed to load posts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1E40AF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Reported Issues</Text>

      {posts.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No reported issues yet.</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {item.image && item.imageType && (
                <Image
                  source={{ uri: `data:${item.imageType};base64,${item.image}` }}
                  style={styles.image}
                />
              )}
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.meta}>Department: {item.department}</Text>
              <Text
                style={[
                  styles.status,
                  styles[item.status?.toLowerCase()] || { backgroundColor: '#eee', color: '#333' },
                ]}
              >
                {item.status.toUpperCase()}
              </Text>
              <Text style={styles.date}>
                {item.createdAt ? new Date(item.createdAt).toLocaleString() : ''}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
  },
  meta: {
    fontSize: 14,
    color: '#666',
  },
  status: {
    fontWeight: 'bold',
    marginTop: 6,
    padding: 4,
    borderRadius: 4,
    textAlign: 'center',
  },
  pending: {
    backgroundColor: '#fff3cd',
    color: '#856404',
  },
  approved: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  rejected: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginTop: 6,
    textAlign: 'right',
  },
});
