import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ButtonGroup, Form, Card, ListGroup } from 'react-bootstrap';
import 'react-dropdown/style.css'
import { Upload } from '@progress/kendo-react-upload';
import "@progress/kendo-theme-bootstrap/dist/all.css";
import "@progress/kendo-theme-material/dist/all.css";
import {DropDownList} from '@progress/kendo-react-dropdowns';
import {Button} from "@progress/kendo-react-buttons";


class Video extends React.Component {
  categories = [ "Stances", "Blocks", "One-Steps", "Forms"];

    constructor(props){
		super(props);

		this.state = {
      fetching: true,
      selectedOption: null,
			events: {}
		  }
    }
    
    handleChange = selectedOption => {
      this.setState(
        { selectedOption },
        () => console.log(`Option selected:`, this.state.selectedOption)
      );
    };
    
    render(){
        return(
            <div className="add-video-content">
                <p>Add Video Page!</p>
                 <DropDownList data={this.categories} defaultValue="Select a Category" />
                 <Upload
                  batch={false}
                  multiple={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/save'}
                  removeUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/remove'}
                />
                <ButtonGroup horizontal>
                <Button type="primary"> Cancel </Button>
                <Button type="primary"> Add Video </Button>
                <Button type="primary"> Add Audio</Button>
                </ButtonGroup>
            </div>
        );
    }
}

export default Video;