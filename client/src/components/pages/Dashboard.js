import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ButtonGroup } from 'react-bootstrap';
import {Button} from "@progress/kendo-react-buttons";


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
                <Button type="primary" > File Structure </Button>
                <Button type="primary"> Add Video </Button>
                <Button type="primary"> Add Audio</Button>
                </ButtonGroup>
            </div>
        );
    }
}

export default Dashboard;