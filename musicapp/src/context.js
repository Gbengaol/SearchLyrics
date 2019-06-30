import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
	switch(action.type){
		case 'SEARCH_TRACKS':
			return {
				...state, track_list: action.payload, heading: 'Search Results'
			};
			default:
				return state;
	}
};

export class Provider extends Component {
	state = {
		track_list: [],
		heading: 'Top 10 tracks in Nigeria',
		country: 'ng',
		page: 1,
		dispatch: action => this.setState(state => reducer (state, action))
	}

	CountrySearch = async (event) => {
		await this.setState({country: event.target.value});
		this.getMusics();
	}

	MoreResults = async () => {
		await this.setState({page: this.state.page + 1})
		this.getMusics();
	}
	LessResults = async () => {
		if(this.state.page > 1){
			await this.setState({page: this.state.page - 1})
			this.getMusics();
		}
		
	}

	componentDidMount () {
		this.getMusics();
	}

	getMusics(){
		axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=${this.state.page}&page_size=10&country=${this.state.country}&f_has_lyrics=1&apikey=36954f7208cbda2d9d55b1e689d3bf5b`)
		.then(result => {
			this.setState({track_list: result.data.message.body.track_list})
		})
		.catch(err => console.log(err))
	}

	render(){
		return (
			<Context.Provider value={{
				state: this.state,
				CountrySearch: this.CountrySearch,
				MoreResults: this.MoreResults,
				LessResults: this.LessResults
			}}>
				{this.props.children}
			</Context.Provider>
		);
	}
}

export const Consumer = Context.Consumer;