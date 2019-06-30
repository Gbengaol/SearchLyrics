import React, { Component } from 'react';
import axios from 'axios';

class Country extends Component {

	state = {
		codes: []
	}

	componentDidMount(){
		axios.get(`https://cors-anywhere.herokuapp.com/https://restcountries.eu/rest/v2/all`)
		.then((result, i)=> {
			this.setState({codes: result.data})
		})
		.catch(err => console.log(err));
	}
	render(){
		const { CountrySearch, MoreResults, LessResults } = this.props;
		return (
			<React.Fragment>
				<div className="row mb-4" style={{display: 'flex', justifyContent: 'center'}}>
				<select className="form-control form-control-lg col-lg-6" onChange={CountrySearch} >
					{
						this.state.codes.map((Country, i) => {
							return (<option key={i} value={Country.alpha2Code}>{Country.name} </option>);
						})
					}
				</select>
				<button className="btn btn-dark mx-2" onClick={MoreResults}> More Results </button>
				<button className="btn btn-secondary mx-2" onClick={LessResults}> Less Resuts </button>
				</div>
			</React.Fragment>
		);
	}

}

export default Country;