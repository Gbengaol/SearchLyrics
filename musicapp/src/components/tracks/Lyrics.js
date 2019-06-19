import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../layouts/Spinner';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import ErrorBoundary from '../../ErrorBoundary';

class Lyrics extends Component {

	state = {
		track: {},
		lyrics: {},
		music_genre: ''
	}

	componentDidMount = async () => {
		// Get Lyrics 
		await axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=36954f7208cbda2d9d55b1e689d3bf5b`)
		.then(result => {
			this.setState({lyrics: result.data.message.body.lyrics})
		})
		.catch(err => console.log(err));

		//Get Track Name
		await axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=36954f7208cbda2d9d55b1e689d3bf5b`)
		.then(result => {
			this.setState({track: result.data.message.body.track})
			this.setState({music_genre: result.data.message.body.track.primary_genres.music_genre_list[0].music_genre})
		})
		.catch(err => {
			console.log(err)
		})
	}

	render(){
		const { track, lyrics, music_genre } = this.state;
		if (track === undefined || lyrics === undefined || Object.keys(track).length === 0 || Object.keys(lyrics).length === 0 ){
			return <Spinner />;
		} else {
				return (
				(
					<React.Fragment>
						<Link to={"/"} className="btn btn-dark btn-sm mb-4">Go Back</Link>
						<div className="card">
							<h4 className="card-header">
								{track.track_name} by <span className="text-secondary">{track.artist_name}</span>
							</h4>
							<div className="card-body">
								<p className="card-text">{lyrics.lyrics_body}</p>
							</div>
						</div>

						<ul className="list-group mt3">
							<li className="list-group-item">
								<strong>Album ID: </strong> {track.album_id}
							</li>
							<ErrorBoundary>
								<li className="list-group-item">
									<strong>Genre: </strong> {music_genre.music_genre_name}
								</li>
							</ErrorBoundary>

							<li className="list-group-item">
								<strong>Explicit Words: </strong> {track.explicit === 0 ? 'No' : 'Yes'}
							</li>

							<li className="list-group-item">
								<strong>Release Date: </strong> <Moment format="DD/MM/YYYY">{track.updated_time}</Moment>
							</li>
							<li className="list-group-item">
								<strong>Copyright: </strong> {lyrics.lyrics_copyright}
							</li>
						</ul>
					</React.Fragment>
				)
			);
		}
		
	}
}

export default Lyrics;