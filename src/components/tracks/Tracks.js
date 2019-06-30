import React, { Component } from 'react';
import { Consumer } from '../../context';
import Spinner from '../layouts/Spinner';
import Track from './Track';
import Country from '../layouts/Country';

class Tracks extends Component { 
	render(){
		return (
		<Consumer>
		{value => {
			const { track_list, heading } = value.state;
			if (track_list === undefined || track_list.length === 0){
				return <Spinner />
			} else {
				return (
					<React.Fragment>
						<h3 className="text-center mb-4">{heading}</h3>
						<Country CountrySearch={value.CountrySearch} MoreResults={value.MoreResults} LessResults={value.LessResults} />
						<div className="row">
							{
								track_list.map((track, i) => {
									return (
										<Track key={i} track={track.track} />
									)
								})
							}
						</div>
					</React.Fragment>
				)
			}
		}}

		</Consumer>
	);
	}
	
}

export default Tracks;