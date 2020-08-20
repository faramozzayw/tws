import { gql } from "@apollo/client";
import { MapInfoFrag, MapTilesFrag } from "./fragments";

export const CREATE_MAP = gql`
	mutation CreateMap($newMap: NewMap!) {
		createMap(newMap: $newMap) {
			...MapInfo
			...MapTiles
		}
	}
	${MapInfoFrag}
	${MapTilesFrag}
`;

export const DELETE_MAP_BY_ID = gql`
	mutation DeleteMap($mapID: ID!) {
		deleteMap(id: $mapID) {
			id
		}
	}
`;

export const UPDATE_TILE = gql`
	mutation UpdateTile(
		$mapID: ID!
		$tileID: ID!
		$updateValue: UpdateTileConfig!
	) {
		updateTile(mapId: $mapID, tileId: $tileID, updateValue: $updateValue)
	}
`;
