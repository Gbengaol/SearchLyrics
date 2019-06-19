import React, {Component} from 'react';
import axios from 'axios';
import {Consumer} from '../../context'; 

class Search extends Component{

	state = {
		trackTitle: ''
	}

	onChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	}

	findTrack = (dispatch,e) => {
		e.preventDefault();

		axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=36954f7208cbda2d9d55b1e689d3bf5b`)
		.then(result => {
			dispatch({
				type: 'SEARCH_TRACKS',
				payload: result.data.message.body.track_list
			});
			this.setState({trackTitle: ''})
		})
		.catch(err => console.log(err))
	}

	render(){
		return (
			<Consumer>
			{
				value => {
					const { dispatch } = value.state;
					return (
						<div className="card card-body mb-4 p-4">
							<h1 className="display-4 text-center">
								<i className="fas fa-music"></i>Search for a Song
							</h1>
							<p className="lead text-center">Get the Lyrics for any Song</p>
							<form onSubmit={this.findTrack.bind(this, dispatch)}>
								<div className="form-group">
									<input 
										className="form-control form-control-lg" 
										placeholder="Song title" 
										value={this.state.trackTitle} 
										type="text"
										onChange={this.onChange} 
										name="trackTitle"
									/>
								</div>
								<button className="btn btn-primary btn-lg btn-block md-5" type="submit"> Get Tracks Lyrics</button>
							</form>
						</div>
					);
				}
			}
			</Consumer>
		);
	}
}

export default Search;