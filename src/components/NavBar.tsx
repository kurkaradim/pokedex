import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';

export default function NavBar() {
	return (
		<div className="navbar">
			<div className="navLinks">
				<Link className="link" to="/">
					Pokedex
				</Link>
			</div>
		</div>
	);
}
