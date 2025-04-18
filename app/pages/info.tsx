import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function AboutSMKMC() {
  return (
    <ScrollView style={styles.container}>
      {/* Header Image */}
      <Image
        source={{ uri: 'https://www.mpscworld.com/wp-content/uploads/2016/09/Sangli-Miraj-Kupwad-Mahanagarpalika.jpg' }}
        style={styles.headerImage}
      />

      {/* Content Container */}
      <View style={styles.card}>
        <Text style={styles.title}>Sangli, Miraj & Kupwad Municipal Corporation</Text>

        <Text style={styles.paragraph}>
          🏙️ The Sangli-Miraj-Kupwad Municipal Corporation (SMKMC) was established on <Text style={styles.bold}>9th February 1998</Text> to oversee the urban development of these three interconnected cities.
        </Text>

        <Text style={styles.paragraph}>
          📍 It spans a geographical area of <Text style={styles.bold}>118.18 km²</Text> and serves a population of approximately <Text style={styles.bold}>650,000 residents</Text>.
        </Text>

        <Text style={styles.paragraph}>
          💧 The corporation is responsible for vital services like water supply, waste management, infrastructure development, public health, and sanitation.
        </Text>

        <Text style={styles.paragraph}>
          🏛️ SMKMC is governed by democratically elected representatives and led by a mayor. The headquarters is located at <Text style={styles.bold}>Rajwada Chowk, Sangli</Text>.
        </Text>

        <Text style={styles.paragraph}>
          🔗 For more details, visit:{' '}
          <Text style={styles.link} onPress={() => Linking.openURL('https://smkc.in')}>
            https://smkc.in
          </Text>
        </Text>
      </View>

      {/* Footer Image */}
      <Image
        source={{ uri: 'https://tse3.mm.bing.net/th?id=OIP.AgKeNNFTG1fRUJOBF7mN_QEsCo&pid=Api&P=0&h=180' }}
        style={styles.footerImage}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf0f6',
  },
  headerImage: {
    width: width,
    height: 220,
    resizeMode: 'cover',
  },
  footerImage: {
    width: width,
    height: 160,
    marginTop: 10,
    resizeMode: 'cover',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    opacity: 0.95,
  },
  card: {
    backgroundColor: '#ffffff',
    margin: 20,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2e3d49',
    marginBottom: 20,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    color: '#4a4a4a',
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'justify',
  },
  bold: {
    fontWeight: 'bold',
    color: '#1e2d3a',
  },
  link: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});
