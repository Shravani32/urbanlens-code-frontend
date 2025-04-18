// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
//   Dimensions,
// } from 'react-native';
// import { Ionicons, MaterialIcons } from '@expo/vector-icons';
// import axios from 'axios';

// const { width } = Dimensions.get('window');

// export default function SeeIssues() {
//   const [issues, setIssues] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchIssues = async () => {
//     try {
//       const response = await axios.get('http://<your-backend-url>/api/issues'); // Replace with your backend endpoint
//       setIssues(response.data);
//     } catch (error) {
//       console.error('Error fetching issues:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchIssues();
//   }, []);

//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case 'pending':
//         return '#ff9800';
//       case 'in_progress':
//         return '#2196f3';
//       case 'solved':
//         return '#4caf50';
//       default:
//         return '#999';
//     }
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.card}>
//       <Image source={{ uri: item.image }} style={styles.image} />
      
//       {/* Status badge */}
//       <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
//         <Text style={styles.statusText}>{item.status.replace('_', ' ').toUpperCase()}</Text>
//       </View>

//       <View style={styles.cardContent}>
//         <Text style={styles.description}>{item.description}</Text>
//         <Text style={styles.timestamp}>Posted on: {new Date(item.timestamp).toLocaleString()}</Text>

//         <View style={styles.actions}>
//           <TouchableOpacity style={styles.iconButton}>
//             <Ionicons name="heart-outline" size={20} color="#ff4d4d" />
//             <Text style={styles.actionText}>{item.likes}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.iconButton}>
//             <Ionicons name="thumbs-down-outline" size={20} color="#4d79ff" />
//             <Text style={styles.actionText}>{item.dislikes}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.iconButton}>
//             <MaterialIcons name="bookmark-outline" size={20} color="#ff9900" />
//             <Text style={styles.actionText}>Save</Text>
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.comments}>
//           💬 {item.comments?.length || 0} comments
//         </Text>
//       </View>
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#007bff" />
//         <Text style={{ marginTop: 10 }}>Loading issues...</Text>
//       </View>
//     );
//   }

//   return (
//     <FlatList
//       data={issues}
//       keyExtractor={(item, index) => index.toString()}
//       renderItem={renderItem}
//       contentContainerStyle={{ padding: 10 }}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     marginBottom: 20,
//     elevation: 3,
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     position: 'relative',
//   },
//   image: {
//     width: width - 20,
//     height: 200,
//   },
//   statusBadge: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   statusText: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   cardContent: {
//     padding: 15,
//   },
//   description: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#333',
//     marginBottom: 8,
//   },
//   timestamp: {
//     fontSize: 12,
//     color: '#888',
//     marginBottom: 10,
//   },
//   actions: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginVertical: 10,
//   },
//   iconButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   actionText: {
//     marginLeft: 5,
//     fontSize: 14,
//     color: '#333',
//   },
//   comments: {
//     fontSize: 14,
//     fontStyle: 'italic',
//     color: '#666',
//     marginTop: 10,
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const dummyIssues = [
  {
    id: '1',
    user_id: 'user123',
    image: 'https://tse1.mm.bing.net/th?id=OIP.LIe82ZLwW2jtryacyKzhSAHaEK&pid=Api&P=0&h=180',
    time: '2025-04-04 10:00 AM',
    description: 'Overflowing garbage near main street.',
    likes: 12,
    dislikes: 2,
    comments: 4,
    status: 'Pending',
  },
  {
    id: '2',
    user_id: 'user456',
    image: 'https://tse4.mm.bing.net/th?id=OIP.0llKARzQ0sxEQOl2AYRagwHaEK&pid=Api&P=0&h=180',
    time: '2025-04-03 5:30 PM',
    description: 'Water leakage from underground pipe.',
    likes: 30,
    dislikes: 1,
    comments: 10,
    status: 'In Progress',
  },
  {
    id: '3',
    user_id: 'user789',
    image: 'https://d3pc1xvrcw35tl.cloudfront.net/images/686x514/sangli-shivsena_201807102059.jpg',
    time: '2025-04-02 9:45 AM',
    description: 'Streetlight not working for 3 days.',
    likes: 7,
    dislikes: 0,
    comments: 3,
    status: 'Solved',
  },
  {
    id: '4',
    user_id: 'user101',
    image: 'https://feeds.abplive.com/onecms/images/uploaded-images/2023/11/13/327e9ce4d07848dc6eca2608f138c0b1dce88.jpeg?impolicy=abp_cdn&imwidth=720',
    time: '2025-04-01 3:00 PM',
    description: 'Huge pothole on road near market.',
    likes: 19,
    dislikes: 5,
    comments: 6,
    status: 'Pending',
  },
  {
    id: '5',
    user_id: 'user112',
    image: 'https://feeds.abplive.com/onecms/images/uploaded-images/2023/11/13/327e9ce4d07848dc6eca2608f138c0b1dce88.jpeg?impolicy=abp_cdn&imwidth=720',
    time: '2025-03-30 11:20 AM',
    description: 'Illegal dumping of construction waste.',
    likes: 15,
    dislikes: 3,
    comments: 7,
    status: 'In Progress',
  },
];

export default function SeeIssues() {
  const [savedPosts, setSavedPosts] = useState([]);

  const toggleSave = (id) => {
    if (savedPosts.includes(id)) {
      setSavedPosts(savedPosts.filter(postId => postId !== id));
    } else {
      setSavedPosts([...savedPosts, id]);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending':
        return { backgroundColor: '#f8d7da', color: '#721c24' };
      case 'In Progress':
        return { backgroundColor: '#fff3cd', color: '#856404' };
      case 'Solved':
        return { backgroundColor: '#d4edda', color: '#155724' };
      default:
        return {};
    }
  };

  const renderItem = ({ item }) => {
    const statusStyle = getStatusStyle(item.status);
    const isSaved = savedPosts.includes(item.id);

    return (
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.time}>{item.time}</Text>
          <View style={[styles.status, { backgroundColor: statusStyle.backgroundColor }]}>
            <Text style={[styles.statusText, { color: statusStyle.color }]}>{item.status}</Text>
          </View>
          <View style={styles.icons}>
            <View style={styles.iconRow}>
              <Ionicons name="thumbs-up-outline" size={20} color="green" />
              <Text style={styles.iconText}>{item.likes}</Text>
            </View>
            <View style={styles.iconRow}>
              <Ionicons name="thumbs-down-outline" size={20} color="red" />
              <Text style={styles.iconText}>{item.dislikes}</Text>
            </View>
            <View style={styles.iconRow}>
              <Ionicons name="chatbubble-ellipses-outline" size={20} color="#007bff" />
              <Text style={styles.iconText}>{item.comments}</Text>
            </View>
            <TouchableOpacity onPress={() => toggleSave(item.id)}>
              <MaterialIcons
                name={isSaved ? "bookmark" : "bookmark-outline"}
                size={24}
                color="#444"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={dummyIssues}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 10,
    backgroundColor: '#f0f2f5',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: width - 20,
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 15,
  },
  description: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  time: {
    fontSize: 13,
    color: '#777',
    marginBottom: 10,
  },
  status: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  iconText: {
    fontSize: 14,
    marginLeft: 5,
  },
});
