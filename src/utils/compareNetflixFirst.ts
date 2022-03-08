/**
 * Permet d'avoir le service netflix en premier
 * @param a 
 * @param b 
 * @returns 
 */
const compareNetflixFirst = (a, b) => {
	if (a.name.toLowerCase() === "netflix") {
			return -1;
	}
	return 1
};

export default compareNetflixFirst
