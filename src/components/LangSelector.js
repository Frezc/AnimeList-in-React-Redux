import React, {
	PropTypes
}
from 'react';

function renderItem(langName, props) {
	const {lang, onLangChange} = props;

	if (langName === lang) {
		return langName;
	}

	return (
		<a href="#"
			onClick={e => {
				e.preventDefault();
				onLangChange && 
					onLangChange(langName)
			}}>{langName}</a>
	);
}

function LangSelector(props) {
	return (
		<span style={props.style}>
			Lang:
			{' '}
			{renderItem('en', props)}
			{' '}
			{renderItem('cn', props)}
			{' '}
			{renderItem('ja', props)}
		</span>
	);
}

LangSelector.propTypes = {
	lang: PropTypes.oneOf(['en', 'cn', 'ja']).isRequired,
	onLangChange: PropTypes.func,
	style: PropTypes.object
};

export default LangSelector;