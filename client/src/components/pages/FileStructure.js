import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


class FileStructure extends React.Component {
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
                <p>File Structure Page!</p>
            </div>
        );
    }
}

export default FileStructure;