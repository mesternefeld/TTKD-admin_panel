import { Button } from "@progress/kendo-react-buttons";
import "@progress/kendo-theme-bootstrap/dist/all.css";
import "@progress/kendo-theme-material/dist/all.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { ButtonGroup } from 'react-bootstrap';
import 'react-dropdown/style.css';


class Steps extends React.Component {
    constructor(props){
		super(props);

		this.state = {
			fetching: true,
			events: {}
		}
	}
    render(){
        return(
            <div className="add-step-content">
                <p>Add Steps for Audio!</p>
                 {/* <DropDownList 
                  data={this.state.categories} 
                  defaultValue="Select a Category"
                  ref= {component => this.dropdownlist = component}
                  onChange={() => this.currentCategorie = this.dropdownlist.value}
                  //className="catDropdown"
                /> */}
                <ButtonGroup horizontal= "true">
                  <Button type="primary"onClick={event =>  window.location.href='./Dashboard'}> Cancel </Button>
                  {/*<Button type="primary"> Add Video </Button>*/}
                  <Button type="primary"onClick={event => this.setState({renderAudio: true})}> Add Steps</Button>
                </ButtonGroup>
                <div><br></br>
                  <textarea type="text" name="addStep" defaultValue="Add Step"/>
                  {/*this.renderedAudio(this.state.renderAudio)*/}
                </div>
            </div>
        );
    }
}

export default Steps;