import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	FlatList,
} from "react-native";
import FeedItem from "../components/FeedItem";

export default class Gnews extends React.Component {
	state = {
		isRefreshing: false,
		isLoading: true,
		listArticles: [],
		totalResult: 0,
		page: 1,
		isLoadMore: false,
	};
	componentDidMount = async () => {
		const { page } = this.state;
		this.setState({ isLoading: true });
		this.callApi(page);
	};
	callApi = async (page) => {
		const { listArticles } = this.state;
		const response = await fetch(
			`https://newsapi.org/v2/top-headlines?country=us&apiKey=6eec2f7fe6cd4c40a3fef8f33f5778fe&page=${page}`
		);

		const jsonResponse = await response.json();
		this.setState({
			page: page,
			isLoading: false,
			isRefreshing: false,
			listArticles: listArticles.concat(jsonResponse.articles),
			totalResult: response.totalResult,
		});
	};
	onEndReached = async () => {
		const { page } = this.state;
		const newPage = page + 1;
		this.callApi(newPage);
	};
	onRefresh = async () => {
		const newPage = 1;
		await this.setState({
			isRefreshing: true,
			listArticles: [],
			page: newPage,
		});
		await setTimeout(() => {
			this.callApi(newPage);
		}, 2000);
	};
	renderItem = ({ item }) => {
		return <FeedItem item={item} />;
	};
	renderFooter = () => {
		const { isRefreshing } = this.state;
		if (!isRefreshing) {
			return <ActivityIndicator size="large" animating={true} />;
		}
	};
	render() {
		const { isLoading, listArticles, isRefreshing } = this.state;
		if (isLoading) {
			return (
				<View style={styles.container}>
					<ActivityIndicator animating={isLoading} />
					<FlatList data={listArticles} renderItem={this.renderItem} />
				</View>
			);
		}
		return (
			<View>
				<View style={styles.header}>
					<Text style={styles.label}>Articles Count: </Text>
					<Text style={styles.info}>{listArticles.length}</Text>
				</View>
				<FlatList
					style={styles.flatlist}
					data={listArticles}
					renderItem={this.renderItem}
					onEndReached={this.onEndReached}
					onEndReachedThreshold={0.1}
					ListFooterComponent={this.renderFooter()}
					onRefresh={this.onRefresh}
					refreshing={isRefreshing}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	flatlist: {
		marginHorizontal: 6,
		marginVertical: 6,
	},
	header: {
		backgroundColor: "#ffff",
		paddingVertical: 26,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	label: {
		fontSize: 20,
		fontWeight: "bold",
	},
	info: {
		fontSize: 20,
		color: "gray",
	},
});
