import React from 'react';
import { Link } from 'react-router-dom';
import './PokemonCard.scss';

export interface PokemonCardProps {
	name: string,
	details: string,
	id: number,
	image: string,
	totalCount: number
}


const PokemonCard: React.FC<PokemonCardProps> = (props: PokemonCardProps) =>  {
	return (
		<div>
			<Link to={`/pokemon/${props.id}`} style={{ textDecoration: 'none', color: 'black' }}>
				<div className={'pokeCard'}>
					<img className="sprite" src={props.image} alt="pokemon sprite" />
					<h1 style={{ textTransform: 'capitalize' }}>{props.name}</h1>
					<h3>ID #{props.id}</h3>
				</div>
			</Link>
		</div>
	);
};

export default PokemonCard;
