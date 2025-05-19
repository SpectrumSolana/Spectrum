import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { onboardingQuestions } from './questions';

const OnboardingFlow = ({ onFinish }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const question = onboardingQuestions[step];

  const handleSelect = (value) => {
    setAnswers({ ...answers, [question.key]: value });
  };

  const handleMultiSelect = (value) => {
    const prev = answers[question.key] || [];
    setAnswers({
      ...answers,
      [question.key]: prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value],
    });
  };

  const handleNext = () => {
    if (step < onboardingQuestions.length - 1) {
      setStep(step + 1);
    } else {
      // Send to API or context here
      onFinish(answers);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  // Render options
  const renderOptions = () => {
    if (question.type === 'single') {
      return question.options.map((opt) => (
        <TouchableOpacity
          key={opt}
          style={[
            styles.option,
            answers[question.key] === opt && styles.optionSelected,
          ]}
          onPress={() => handleSelect(opt)}
        >
          <Text style={styles.optionText}>{opt}</Text>
        </TouchableOpacity>
      ));
    }
    if (question.type === 'multi') {
      return question.options.map((opt) => (
        <TouchableOpacity
          key={opt}
          style={[
            styles.option,
            (answers[question.key] || []).includes(opt) && styles.optionSelected,
          ]}
          onPress={() => handleMultiSelect(opt)}
        >
          <Text style={styles.optionText}>{opt}</Text>
        </TouchableOpacity>
      ));
    }
    if (question.type === 'text') {
      return (
        <TextInput
          style={styles.input}
          placeholder={question.placeholder}
          placeholderTextColor="#A3A3C2"
          value={answers[question.key] || ''}
          onChangeText={(text) => handleSelect(text)}
        />
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.title}</Text>
      {question.subtitle && <Text style={styles.subtitle}>{question.subtitle}</Text>}
      <View style={{ marginVertical: 24 }}>{renderOptions()}</View>
      <View style={styles.progressRow}>
        {onboardingQuestions.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === step && styles.dotActive,
            ]}
          />
        ))}
      </View>
      <View style={styles.buttonRow}>
        {step > 0 && (
          <TouchableOpacity style={styles.navButton} onPress={handleBack}>
            <Text style={styles.navButtonText}>Back</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.navButton}
          onPress={handleNext}
        >
          <Text style={styles.navButtonText}>
            {step === onboardingQuestions.length - 1 ? 'Finish' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#14141F' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  subtitle: { color: '#A3A3C2', fontSize: 15, marginBottom: 12 },
  option: {
    borderWidth: 1,
    borderColor: '#35354D',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  optionSelected: {
    backgroundColor: '#23233A',
    borderColor: '#7B6FF0',
  },
  optionText: { color: '#fff', fontSize: 16, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#35354D',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 12,
    color: '#fff',
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#23233A',
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#7B6FF0',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  navButton: {
    backgroundColor: '#23233A',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginLeft: 8,
  },
  navButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default OnboardingFlow; 