import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
	uri: "https://api-tilemap-editor.herokuapp.com/graphql",
	cache: new InMemoryCache(),
});

export { DELETE_MAP_BY_ID, CREATE_MAP } from "./mutation";

export { GET_MAP_DATA, GET_MAPS, GET_MAPS_BY_USER } from "./query";

export { MapInfoFrag } from "./fragments";
