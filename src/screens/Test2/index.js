import React, {Component} from 'react';
import {View, Text, Dimensions, Animated, Easing} from 'react-native';
import styles from './styles';
import RNFS from 'react-native-fs';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');
const contentWidth = width - 20;

class Test2 extends Component {
  state = {
    percentAnim: new Animated.Value(0),
    percent: 0,
  };
  componentDidMount() {
    RNFS.getFSInfo().then(info => {
      const {totalSpace, freeSpace} = info;
      const usedSpace = totalSpace - freeSpace;
      const result = (usedSpace * contentWidth) / totalSpace;
      const percent = ((100 * result) / contentWidth).toFixed(2);
      this.setState({percent}, () => this.onAnimated());
    });
  }

  onAnimated = () => {
    Animated.timing(this.state.percentAnim, {
      toValue: 1,
      duration: 1000,
      delay: 500,
      easing: Easing.elastic(1),
    }).start();
  };

  render() {
    const {percentAnim, percent} = this.state;
    const animatedWidth = percentAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', `${percent}%`],
    });
    return (
      <View style={[styles.percent, {width: contentWidth}]}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#7CFC00', '#FF0000']}
          style={styles.percentLinear}
        />
        <Animated.View style={[styles.percentMask, {left: animatedWidth}]} />
        <Text style={styles.percentText}>{percent}%</Text>
      </View>
    );
  }
}

export default Test2;
