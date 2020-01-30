import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


class Video extends React.Component {
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
                <p>Add Video Page!</p>
            </div>
        );
    }
}

export default Video;