
import { POKEMON_IMG_URL } from '../config/config';

export interface Pokemon {
	id: string;
	imageURL: string;
	name: string;
	detailsURL: string;
}

export const extractPokeID = (detailsURL: string) => {
	const splittedURL = detailsURL.split('/');
	const neededIndex = splittedURL.length - 2;
	const pokeID = splittedURL[neededIndex];
	return pokeID;
};

export const calculateBMI = (height: number, weight: number) => {
	const heightSQ = height * height;
	const BMI = weight / heightSQ;
	return BMI.toFixed(1);
};

export const extractPokemonData = (pokemonData: Pokemon[]) => {
	const newPokemonData: Pokemon[] = [];
	pokemonData.forEach((pk: any, index: any) => {
		index++;
		let pokeID = extractPokeID(pk.url);
		let pokemonObj = {
			id: pokeID,
			imageURL: `${POKEMON_IMG_URL}${pokeID}.png`,
			name: pk.name,
			detailsURL: pk.url
		};
		newPokemonData.push(pokemonObj);
	});
	return newPokemonData;
};

export const getBMIColor = (bmi: any) => {
	if (bmi > 0 && bmi < 18.5) {
		return 'lightgreen';
	}
	if (bmi >= 18.5 && bmi < 25) {
		return 'green';
	}
	if (bmi >= 25 && bmi < 30) {
		return 'yellow';
	}
	if (bmi >= 30 && bmi < 35) {
		return 'orange';
	}
	if (bmi >= 35) {
		return 'red';
	}
};
