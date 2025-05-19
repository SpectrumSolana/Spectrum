import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const data = {
  labels: ['Investor', 'Pro', 'Explorer', 'Beginner', 'Degen'],
  data: [0.8, 0.9, 0.6, 0.4, 0.5], // values between 0 and 1
};

// Define a color for each label
const segmentColors = [
  '#7ED957', // Investor - green
  '#FFD057', // Pro - yellow
  '#7B6FF0', // Explorer - purple
  '#FF3B30', // Beginner - red
  '#00CFFF', // Degen - blue
];

const GMIChart: React.FC = () => (
  <View
    style={{
      marginVertical: 8,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 12,
      width: '100%',
    }}
  >
    <ProgressChart
      data={data}
      width={screenWidth - 48}
      height={240}
      strokeWidth={16}
      radius={38}
      chartConfig={{
        backgroundColor: '#14141F',
        backgroundGradientFrom: '#14141F',
        backgroundGradientTo: '#14141F',
        // Try to use per-segment color coding if supported
        color: (opacity = 1, index = 0) => segmentColors[index % segmentColors.length] + (Math.round(opacity * 255)).toString(16).padStart(2, '0'),
        labelColor: () => '#A3A3C2',
        propsForLabels: { fontSize: 13, fontWeight: '600' },
      }}
      style={{ borderRadius: 16, alignSelf: 'center' }}
      hideLegend={true}
    />
    {/* Custom Legend */}
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 18, flexWrap: 'wrap' }}>
      {data.labels.map((label, idx) => (
        <View key={label} style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 8, marginBottom: 6 }}>
          <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: segmentColors[idx], marginRight: 6, borderWidth: 1, borderColor: '#23233A' }} />
          <Text style={{ color: '#A3A3C2', fontSize: 13, fontWeight: '600' }}>{label}</Text>
        </View>
      ))}
    </View>
  </View>
);

export default GMIChart; 