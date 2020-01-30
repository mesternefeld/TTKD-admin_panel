import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AwesomeButton from 'react-awesome-button';
import AwesomeButtonStyles from "react-awesome-button/src/styles/styles.scss";
import { Button, ButtonGroup } from 'react-bootstrap';

class Dashboard extends React.Component {
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
                <p>Options!</p>
                <ButtonGroup vertical>
                <Button type="primary"> File Structure </Button>
                <Button type="primary"> Add Video </Button>
                <Button type="primary"> Add Audio</Button>
                </ButtonGroup>
            </div>
        );
    }
}

export default Dashboard;