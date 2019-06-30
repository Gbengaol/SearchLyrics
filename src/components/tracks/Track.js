import React from 'react';
import {Link} from 'react-router-dom';

const Track = ({track}) => {
	return (
		<div className="col-md-6 col-sm-6 col-lg-6">
			<div className="card mb-4 shadow-sm">
				<div className="card-body">
					<h5>{track.artist_name}</h5>
					<p className="card-text">
						<strong><i className="fas fa-play"></i>Track</strong> : {track.track_name}
						<br/>
						<strong><i className="fas fa-compact-disc"></i>Album</strong> : {track.album_name}
						<br/>
						<strong><i className="fas fa-star"></i>Rating</strong> : {track.track_rating} / 100
					</p>
					<Link className="btn btn-dark btn-block" to={`lyrics/track/${track.track_id}`}><i className="fas fa-chevron-right"></i> View Lyrics</Link>
					{
						<button className="btn btn-dark btn-block"><i className="fas fa-play"></i> Play Music<audio><source src={``}></source></audio></button>
					}
				</div>
			</div>
		</div>
	)
} 

export default Track;