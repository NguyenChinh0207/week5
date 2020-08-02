import React, { Component } from "react";
import {
	Text,
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	Linking,
	Dimensions,
} from "react-native";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default class FeedItem extends Component {
	onPressReadMore = () => {
		const {
			item: { url },
		} = this.props;
		Linking.openURL(url).catch((err) =>
			console.error("An error occured", err)
		);
	};
	render() {
		const {
			item: { title, urlToImage, url, name, content },
		} = this.props;
		return (
            
			<View style={styles.item}>

				<Text
					style={{
						textAlign: "center",
						fontSize: 18,
						marginHorizontal: 8,
						marginVertical: 15,
					}}
				>
					{title}
				</Text>
				<Image source={{ uri: urlToImage }} style={styles.image} />
				<Text style={styles.info}>
					<Text style={styles.label}>Content: </Text>
					{content}
				</Text>

				<TouchableOpacity
					style={styles.button}
					onPress={this.onPressReadMore}
				>
					<Text style={styles.text}>Read More</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	item: {
		flexDirection: "column",
		alignItems: "center",
		borderColor: "#dcdde1",
		borderWidth: 2,
		borderRadius: 14,
		marginBottom: 10,
		backgroundColor: "#ffff",
	},
	image: {
		width: width - 40,
		height: height / 4,
		marginVertical: 15,
	},
	button: {
		marginVertical: 15,
		width: width - 40,
		paddingVertical: 15,
		backgroundColor: "#487eb0",
		borderRadius: 15,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
	text: {
		color: "white",
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 18,
	},
	label: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "left",
	},
	info: {
		fontSize: 16,
		marginHorizontal:12
	},
});
