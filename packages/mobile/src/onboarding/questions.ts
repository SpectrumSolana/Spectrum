export const onboardingQuestions = [
  {
    key: 'ageGroup',
    type: 'single',
    title: 'What is your age group?',
    subtitle: 'Select the option that fits you best.',
    options: ['18-24', '25-34', '35-44', '45-54', '55+'],
  },
  {
    key: 'region',
    type: 'text',
    title: 'Where are you located?',
    subtitle: 'Type your country or region.',
    placeholder: 'Your country/region',
  },
  {
    key: 'occupation',
    type: 'single',
    title: 'What best describes your occupation?',
    options: ['Student', 'Professional', 'Entrepreneur', 'Other'],
  },
  {
    key: 'cryptoExperience',
    type: 'single',
    title: 'How experienced are you with crypto?',
    options: ['Beginner', 'Intermediate', 'Advanced'],
  },
  {
    key: 'interests',
    type: 'multi',
    title: 'Which topics are you most interested in?',
    subtitle: 'You can select more than one.',
    options: ['DeFi', 'NFTs', 'DAOs', 'Trading', 'Social', 'Gaming'],
  },
  {
    key: 'learningStyle',
    type: 'single',
    title: 'How do you prefer to learn?',
    options: ['Reading', 'Watching videos', 'Interactive tasks', 'Community discussions'],
  },
]; 