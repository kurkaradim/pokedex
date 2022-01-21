import React, { useEffect, useState } from 'react';
import { POKEMON_API_URL, POKEMON_IMG_URL } from '../config/config';
import { extractPokeID, extractPokemonData } from '../helpers/helpers';
import LoadSpinner from './LoadSpinner';
import PokemonCard from './PokemonCard';
import { useParams } from 'react-router-dom';
import './PokemonList.scss';

const PokemonList: React.FC<any> = (props: any) =>{ 
	const [ limit, setLimit ] = useState(9);
	const [ page, setPage ] = useState<number>(1);
	const [ pokemon, setPokemon ] = useState<any>(null);
	const [ total, setTotal ] = useState(0);
	const [ error, setError ] = useState('none');
	const offset = (page - 1) * limit;

	useEffect(
		() => {
			fetch(`${POKEMON_API_URL}?limit=${limit}&offset=${offset}`)
				.then((res) => {
					if (res.status >= 200 && res.status < 300) {
						const data = res.json();
						data.then((d: any) => {
							setTotal(d.count);
							const pokemonData = extractPokemonData(d.results);
							setPokemon(pokemonData);
						});
					}
				})
				.catch((err) => setError(err));
		},
		[ limit, offset ]
	);

	const lastPage = Math.ceil(total / limit);
	const gotoFirst = page > 1 ? 'visible' : 'hidden';
	const gotoNext = page !== lastPage ? 'visible' : 'hidden';
	const gotoLast = page < lastPage ? 'visible' : 'hidden';

	return (
		<div className={'container'}>
			<h1 className="heading">Page: {page}</h1>

			{error !== 'none' ? 'There was an error' : ''}
			<div className={'pokemonCards'}>
				{pokemon != null && pokemon.length > 1 ? (
					pokemon.map((poke: any, index: number) => {
						return (
							<PokemonCard
								key={index}
								name={poke.name}
								details={poke.detailsURL}
								id={poke.id}
								image={poke.imageURL}
								totalCount={total}
							/>
						);
					})
				) : (
					<LoadSpinner />
				)}
			</div>
			<div className="actionButtons">
				<button onClick={() => setPage(1)} style={{ visibility: gotoFirst }}>
					{'<<'}
				</button>
				<button onClick={() => setPage(page - 1)} style={{ visibility: gotoFirst }}>
					PREV
				</button>
				<button onClick={() => setPage(page + 1)} style={{ visibility: gotoNext }}>
					NEXT
				</button>
				<button onClick={() => setPage(lastPage)} style={{ visibility: gotoLast }}>
					{'>>'}
				</button>
			</div>
		</div>
	);
};

export default PokemonList;
