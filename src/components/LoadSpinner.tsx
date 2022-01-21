import { useState } from 'react';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
	display: block;
	margin: 50px auto;
	border-color: white;
	position: relative;
	top: 200px;
`;

function LoadSpinner() {
	let [ loading, setLoading ] = useState(true);
	let [ color, setColor ] = useState('blue');

	return (
		<div className="sweet-loading">
			<ClipLoader loading={loading} css={override} size={150} />
		</div>
	);
}

export default LoadSpinner;
