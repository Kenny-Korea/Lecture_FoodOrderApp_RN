import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

import CategoriesScreen from "./screens/CategoriesScreen";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import FavoritesScreen from "./screens/FavoritesScreen";

import FavoritesContextProvider from "./store/context/favorites-context";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  // react-native-reanimated 이거 docs에서 하라는대로 다시 설치하니깐 됐음 ㅠㅠ
  return (
    <Drawer.Navigator
      // Stack.Navigator에 지정한 스타일은 전역, Stack.Screen에 지정한 스타일은 해당 스크린만 적용됨
      screenOptions={{
        headerStyle: { backgroundColor: "#351401" },
        headerTintColor: "white",
        // react navigation을 사용하면 config에서 설정한 배경색이 적용되지 않으므로 아래와 같이 배경색 지정
        sceneContainerStyle: { backgroundColor: "#3f2f25" },
        drawerContentStyle: { backgroundColor: "#351401" },
        drawerInactiveTintColor: "white",
        drawerActiveTintColor: "#351401",
        drawerActiveBackgroundColor: "#e4baa1",
      }}
    >
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: "All Categories",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: "Favorites",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <FavoritesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "#351401" },
              headerTintColor: "white",
              contentStyle: { backgroundColor: "#3f2f25" },
            }}
          >
            {/* Stack.Screen에서 설정한 name값은 화면에서 디폴트 텍스트로 출력됨 */}
            <Stack.Screen
              name="MealsCategories"
              component={
                // CategoriesScreen
                DrawerNavigator
              }
              // 아래의 options 속성을 사용하여 여러가지를 조작할 수 있음. 공식문서 참조하기
              options={{
                // Drawer의 header만 남기기 위해서 아래의 헤더 안보이게 처리
                // title: "All Categories",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="MealsOverview"
              component={MealsOverviewScreen}
              // Screen 헤더 텍스트 바꾸는 법 1
              // options={({ route, navigation }) => {
              //   const catId = route.params.categoryId;
              //   return {
              //     title: catId,
              //   };
              // }}
            />
            <Stack.Screen
              name="MealDetail"
              component={MealDetailScreen}
              // 즐겨찾기 추가할 건데, 아래와 같은 방법은 컴포넌트와 상호작용이 없을 때 간단하게 사용하기 좋음
              // options={{
              //   headerRight: () => {
              //     return <Button title="tap me!" />;
              //   },
              // }}
            />
          </Stack.Navigator>
          {/* <CategoriesScreen />  이거는 Stack.Screen의 component 속성에 추가해줘서 주석 처리 */}
        </NavigationContainer>
      </FavoritesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
