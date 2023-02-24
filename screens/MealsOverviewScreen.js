import { MEALS, CATEGORIES } from "../data/dummy-data";
import { useEffect, useLayoutEffect } from "react";
import MealsList from "../components/MealsList/MealsList";

const MealsOverviewScreen = ({ route, navigation }) => {
  // const route = useRoute()
  const catId = route.params.categoryId;

  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >= 0; // indexOf는 false인 경우 -1 리턴하므로
  });

  // ⭐️ useEffect를 사용해야 navigation.setOptions()를 적용할 수 있어서 useEffect 사용
  // but 헤더가 데이터를 받아온 뒤에 바뀌기 때문에 변경에 약간의 지연이 발생
  // --> useLayoutEffect는 로딩이 되는 중에 action을 취하는 hook이기 때문에 이를 사용함!!
  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find((category) => {
      return category.id === catId;
    }).title;

    // useEffect로 씌워줘야 오류나지 않음 ㅠㅠ
    navigation.setOptions({
      title: categoryTitle,
    });
  }, [catId, navigation]);

  return <MealsList items={displayedMeals} />;
};

export default MealsOverviewScreen;
