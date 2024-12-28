import { useEffect } from "react";
import {
  Animated,
  StyleSheet,
  useAnimatedValue,
  View,
  ViewProps,
} from "react-native";

export function CustomIndicator({ style }: ViewProps) {
  const moveAnim = useAnimatedValue(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(moveAnim, {
          toValue: 1,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(moveAnim, {
          toValue: 0,
          duration: 750,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [moveAnim]);

  return (
    <View style={style}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.item,
            {
              left: 0,
              top: 0,
              transform: [
                {
                  translateX: moveAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 25],
                  }),
                },
                {
                  translateY: moveAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 25],
                  }),
                },
                {
                  rotateZ: moveAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "45deg"],
                  }),
                },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.item,
            {
              left: 0,
              bottom: 0,
              transform: [
                {
                  translateX: moveAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 25],
                  }),
                },
                {
                  translateY: moveAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -25],
                  }),
                },
                {
                  rotateZ: moveAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "45deg"],
                  }),
                },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.item,
            {
              right: 0,
              top: 0,
              transform: [
                {
                  translateX: moveAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -25],
                  }),
                },
                {
                  translateY: moveAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 25],
                  }),
                },
                {
                  rotateZ: moveAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "45deg"],
                  }),
                },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.item,
            {
              right: 0,
              bottom: 0,
              transform: [
                {
                  translateX: moveAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -25],
                  }),
                },
                {
                  translateY: moveAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -25],
                  }),
                },
                {
                  rotateZ: moveAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "45deg"],
                  }),
                },
              ],
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 100,
    height: 100,
  },
  item: {
    position: "absolute",
    width: 26,
    height: 26,
    borderWidth: 1,
    backgroundColor: "lightblue",
  },
});
