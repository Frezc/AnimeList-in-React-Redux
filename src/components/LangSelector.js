import React, {
	PropTypes
}
from 'react';

export default class LangSelector extends React.Component {

	renderItem(langName) {
		const {lang, onLangChange} = this.props;

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

	render() {

		return (
			<span style={this.props.style}>
				Lang:
				{' '}
				{this.renderItem('en')}
				{' '}
				{this.renderItem('cn')}
				{' '}
				{this.renderItem('ja')}
			</span>
		);
	}
}

LangSelector.propTypes = {
	lang: PropTypes.oneOf(['en', 'cn', 'ja']).isRequired,
	onLangChange: PropTypes.func,
	style: PropTypes.object
};