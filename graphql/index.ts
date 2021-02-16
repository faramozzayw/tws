import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import jwt_decode from "jwt-decode";

import { getAccessToken, refreshToken, getRefreshToken } from "../hooks/utils";
import { Claims } from "../types";
import { relayStylePagination } from "@apollo/client/utilities";

const authLink = setContext(async (_, { headers }) => {
	let token = getAccessToken();

	if (token) {
		const { exp } = jwt_decode<Claims>(token);
		const currentTime = Math.floor(Date.now() / 1000);

		if (currentTime >= exp) {
			await refreshToken();
			token = getAccessToken();
		}
	} else if (getRefreshToken()) {
		await refreshToken();
		token = getAccessToken();
	}

	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const httpLink = createHttpLink({
	uri: "https://api-tilemap-editor.herokuapp.com/graphql",
	credentials: "include",
	fetchOptions: {
		mode: "cors",
	},
	headers: {
		"Access-Control-Allow-Credentials": true,
	},
});

export const initializeApollo = ({ initialState }: any) =>
	new ApolloClient({
		link: ApolloLink.from([authLink, httpLink]),
		ssrMode: typeof window === "undefined",
		cache: new InMemoryCache({
			typePolicies: {
				Query: {
					fields: {
						mapsPagination: relayStylePagination(),
					},
				},
			},
		}).restore(initialState || {}),
	});

/*
export const createeApolloClient = () =>
	new ApolloClient({
		link: ApolloLink.from([authLink, httpLink]),
		ssrMode: typeof window === "undefined",
		cache: new InMemoryCache({
			typePolicies: {
				Query: {
					fields: {
						mapsPagination: relayStylePagination(),
					},
				},
			},
		}),
	});

export const initializeApollo = (initialState = null) => {
	const apolloClient = createeApolloClient();

	if (initialState) {
		const existingCache = apolloClient.extract();

		apolloClient.cache.restore({ ...existingCache, ...initialState });
	}

	return apolloClient;
};
 */
