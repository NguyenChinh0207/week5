import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import Gnews from "./screen/Gnews";
import Weather from "./screen/Weather";
const Tab = createBottomTabNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen
					name="Gnews"
					component={Gnews}
					options={{
						tabBarIcon: ({ color }) => (
							<Entypo name="newsletter" size={24} color={color} />
						),
					}}
				/>
				<Tab.Screen
					name="Weather"
					component={Weather}
					options={{
						tabBarIcon: ({ color }) => (
							<MaterialCommunityIcons
								name="weather-partly-cloudy"
								size={24}
								color={color}
							/>
						),
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
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
