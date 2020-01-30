import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


class Audio extends React.Component {
    constructor(props){
		super(props);

		this.state = {
			fetching: true,
			events: {}
		}
	}
    render(){
        return(
            <div>
                <p>Add Audio Page!</p>
            </div>
        );
    }
}

export default Audio;