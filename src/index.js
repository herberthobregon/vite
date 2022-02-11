import { VAR1 } from "./constants";

const getUrlParamsAsMap = () => {
	const [empty, params] = window.location.search?.split("?");
	return params;
};

try {
	console.log(getUrlParamsAsMap, 123, VAR1);
} catch (e) {
	console.error(e);
}
