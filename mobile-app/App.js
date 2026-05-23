import { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native';

const defaultBackend = 'http://localhost:5000';

export default function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [backendUrl, setBackendUrl] = useState(defaultBackend);

  const analyzeEmotion = async () => {
    if (!text.trim()) {
      Alert.alert('Validation', 'Please enter text to analyze.');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${backendUrl}/emotionDetector`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text_to_analyze: text }),
      });

      const data = await response.json();
      if (!response.ok) {
        Alert.alert('Error', data.error || 'Unable to analyze emotions.');
        setLoading(false);
        return;
      }

      setResult(data);
    } catch (error) {
      Alert.alert('Connection Error', 'Could not reach the backend service. Use the correct backend URL.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Emotion Detection Mobile</Text>
        <Text style={styles.subheading}>Enter text to get instant emotion score predictions powered by Watson NLP.</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Backend URL</Text>
          <TextInput
            style={styles.input}
            value={backendUrl}
            onChangeText={setBackendUrl}
            autoCapitalize="none"
            keyboardType="url"
          />

          <Text style={styles.label}>Text to analyze</Text>
          <TextInput
            style={[styles.input, styles.multiline]}
            value={text}
            onChangeText={setText}
            multiline
            placeholder="Type a sentence and tap Analyze"
          />

          <TouchableOpacity style={styles.button} onPress={analyzeEmotion} disabled={loading}>
            {loading ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.buttonText}>Analyze Emotion</Text>}
          </TouchableOpacity>
        </View>

        {result && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Emotion Results</Text>
            <View style={styles.resultRow}><Text style={styles.resultLabel}>Anger</Text><Text style={styles.resultValue}>{result.anger !== null ? result.anger.toFixed(3) : 'N/A'}</Text></View>
            <View style={styles.resultRow}><Text style={styles.resultLabel}>Disgust</Text><Text style={styles.resultValue}>{result.disgust !== null ? result.disgust.toFixed(3) : 'N/A'}</Text></View>
            <View style={styles.resultRow}><Text style={styles.resultLabel}>Fear</Text><Text style={styles.resultValue}>{result.fear !== null ? result.fear.toFixed(3) : 'N/A'}</Text></View>
            <View style={styles.resultRow}><Text style={styles.resultLabel}>Joy</Text><Text style={styles.resultValue}>{result.joy !== null ? result.joy.toFixed(3) : 'N/A'}</Text></View>
            <View style={styles.resultRow}><Text style={styles.resultLabel}>Sadness</Text><Text style={styles.resultValue}>{result.sadness !== null ? result.sadness.toFixed(3) : 'N/A'}</Text></View>
            <View style={[styles.resultRow, styles.dominantRow]}><Text style={styles.resultLabel}>Dominant</Text><Text style={[styles.resultValue, styles.dominantValue]}>{result.dominant_emotion || 'N/A'}</Text></View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#081b33',
  },
  container: {
    padding: 24,
    alignItems: 'stretch',
  },
  heading: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 12,
  },
  subheading: {
    color: '#cbd5ea',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#f8fbff',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 6,
  },
  label: {
    color: '#334155',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderColor: '#cbd5ea',
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    color: '#0f172a',
    marginBottom: 18,
  },
  multiline: {
    minHeight: 140,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#2867d9',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 18,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultLabel: {
    color: '#475569',
    fontSize: 16,
    fontWeight: '700',
  },
  resultValue: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '800',
  },
  dominantRow: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  dominantValue: {
    color: '#0f172a',
  },
});
