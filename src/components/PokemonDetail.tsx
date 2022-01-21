import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { POKEMON_API_URL, POKEMON_IMG_URL, POKEMON_SOUND_URL} from '../config/config';
import { calculateBMI, getBMIColor } from '../helpers/helpers';
import LoadSpinner from './LoadSpinner';
import './PokemonDetail.scss';
import ImagePlayer from './ImagePlayer';


const PokemonDetail: React.FC<any> = (props: any) =>{
	let { id } = useParams();

	//TODO: pokemon datatype object
	const [ pokemon, setPokemon ] = useState<any>();
	useEffect(() => {
		fetch(`${POKEMON_API_URL}/${id}`).then((res) => {
			const pokemonData = res.json();

			pokemonData.then((d) => {
				let pokemonObj = {
					id: d.id,
					imageURL: `${POKEMON_IMG_URL}${d.id}.png`,
					name: d.name,
					height: (d.height * 0.1).toFixed(1),
					weight: (d.weight * 0.1).toFixed(1),
					types: d.types
				};
				setPokemon(pokemonObj);
			});
		});
	}, []);

	if (!pokemon) {
		return <LoadSpinner />;
	} else {
		const bmi = calculateBMI(pokemon.height, pokemon.weight);
		const bmiColor = getBMIColor(bmi);
		const isFirstPokemon = pokemon.id === 1 ? 'hidden' : 'visible';
		const isLastPokemon = pokemon.id === 10220 ? 'hidden' : 'visible';
		const idGapCheckUp = pokemon.id === 898 ? 10001 : pokemon.id + 1;
		const idGapCheckDown = pokemon.id === 10001 ? 898 : pokemon.id - 1;
		return (
			<div className="pokemonDetail">
				<div className="pokemonDetailCard">
					<ImagePlayer imgURL={pokemon.imageURL} url={`https://pokemoncries.com/cries/${pokemon.id}.mp3`} />
					<div className="pokemonInfo">
						<p className="id">ID #{pokemon.id}</p>
						<p className="name">{pokemon.name}</p>

						<p className="height">height {pokemon.height}m</p>
						<p className="weight">weight {pokemon.weight}kg</p>
						<p className="bmi" style={{ color: bmiColor }}>
							BMI {bmi}
						</p>
						<div className="type">
							{pokemon.types.map((t: any, index: number) => {
								return (
									<img key={index} src={`${POKEMON_SOUND_URL}${t.type.name}.png`} />
								);
							})}
						</div>
					</div>
					
					<div className="arrowContainer">
						<div
							className="arrow"
							style={{ visibility: isFirstPokemon }}
							onClick={() => (window.location.href = `/pokemon/${idGapCheckDown}`)}
						>
							<p>{'<<'}</p>
						</div>

						<div
							className="arrow"
							style={{ visibility: isLastPokemon }}
							onClick={() => (window.location.href = `/pokemon/${idGapCheckUp}`)}
						>
							<p>{'>>'}</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default PokemonDetail;
