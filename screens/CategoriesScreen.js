import { FlatList, StyleSheet, Text, View } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import CategoryGridTile from "../components/GategoryGridTile";

const CategoriesScreen = ({ navigation }) => {
  const renderCategoryItem = (itemData) => {
    const pressHandler = () => {
      // ⭐️ navigate 하는 법
      // 이렇게 말고도 useNavigation이라는 hook을 사용해서 리액트처럼 해도 됨
      // 첫 번째 인자로 이동할 페이지의 name을 갖고, 두 번째 인자로 전달할 데이터 prop 객체를 갖음
      navigation.navigate("MealsOverview", {
        categoryId: itemData.item.id,
      });
    };

    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={pressHandler}
      />
    );
  };

  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      // grid-template-columns 와 동일한 속성
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  CategoriesScreenContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CategoriesScreen;
