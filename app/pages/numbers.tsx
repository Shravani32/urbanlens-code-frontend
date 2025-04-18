import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const contactsData = [
  { title: 'Commissioner Office', info: '📞 0233-2323167' },
  { title: 'Sangli Office', info: '📞 0233-2373721\n📞 0233-2373722\n📞 0233-2373723' },
  { title: 'Kupwad Office', info: '📞 0233-2346081\n📞 0233-2346612' },
  { title: 'Miraj Office', info: '📞 0233-2223271\n📞 2223272\n📞 2223273\n📞 2223274' },
  { title: 'Wellness Wadi Office', info: '📞 0233-2601462' },
  { title: 'Email Directory', info: '📧 smkcorporation@gmail.com\n📎 Email List Available' },
  { title: 'Septic/Sewer Complaints', info: '📧 Complaint via Email\n📎 Email List Available' },
  { title: 'Ad Complaints Toll-Free', info: '📞 1800 233 2374' },
  { title: 'Fire Brigade', info: '📞 101\n📞 102' },
  { title: 'Miraj Fire Brigade', info: '📞 0233-2222610' },
  { title: 'Ambulance', info: '📞 0233-2373333' },
  { title: 'Police', info: '📞 100\n📞 2223333\n📞 2223700\n📞 2212500' },
  { title: 'M.S.E.B.', info: '📞 0233-2374731' },
  { title: 'Water Supply', info: '📞 0233-2373971' },
  { title: 'Miraj Medical College', info: '📞 2232091 /93 /94 /95 /96 /97 /98' },
  { title: 'Lions Eye Bank', info: '📞 2644499' },
  { title: 'Wellness Eye Bank', info: '📞 3223291' },
  { title: 'Wellness Blood Bank', info: '📞 2223291 /95' },
  { title: 'Anila Kothari Blood Bank', info: '📞 2374651 /54' },
  { title: 'Vasantdada Patil Blood Bank', info: '📞 2222319' },
  { title: 'Telephone Enquiry', info: '📞 2221000 /2222200' },
  { title: 'Railway Station', info: '📞 2222081' },
  { title: 'ST Stand', info: '📞 2222658 /2222371' },
  { title: 'Post Office', info: '📞 2225480' },
  { title: 'Disaster Management', info: '📞 7066040330' },
];

export default function ImportantContacts() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const router = useRouter();

  const toggleCard = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>📞 Important Contact Numbers - Sangli</Text>
      <View style={styles.grid}>
        {contactsData.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => toggleCard(index)}
            activeOpacity={0.8}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            {expandedIndex === index && (
              <Text style={styles.cardInfo}>{item.info}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/pages/Home')}>
        <Ionicons name="arrow-back-circle-outline" size={32} color="#2563EB" />
        <Text style={styles.backText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');
const cardSize = width / 2 - 30;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#f0f4f8',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1c2e4a',
    marginBottom: 20,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#ffffff',
    width: cardSize,
    marginBottom: 20,
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1c1c1e',
    textAlign: 'center',
    marginBottom: 10,
  },
  cardInfo: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    lineHeight: 20,
  },
  backButton: {
    marginTop: 30,
    alignItems: 'center',
  },
  backText: {
    marginTop: 5,
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '500',
  },
});
