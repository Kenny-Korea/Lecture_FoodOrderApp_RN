import { Pressable, StyleSheet, Text, View, Platform } from "react-native";

const GategoryGridTile = ({ title, color, onPress }) => {
  return (
    <View style={styles.gridItem}>
      <Pressable
        // RN에서 제공하는 pressed 속성을 사용하여, 버튼을 클릭했을 때 스타일이 적용될 수 있도록
        // 조건부 스타일 추가
        // IOS에는 ripple Effect가 따로 없어서 이런 식으로 설정해줌
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        android_ripple={{ color: "#ccc" }}
        onPress={onPress}
      >
        <View style={[styles.innerContainer, { backgroundColor: color }]}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4,
    // ⭐️ IOS에서는 backgroundColor를 적용해야 shadow 효과가 나타남
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    // IOS에서 overflow-hidden 설정하면 그림자가 안보이는 현상 발생
    // --> 특정 OS에서만 적용할 수 있는 Platform API 사용
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  // Pressable에 button 스타일을 주지 않으면 텍스트가 출력되지 않음
  button: { flex: 1 },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default GategoryGridTile;
