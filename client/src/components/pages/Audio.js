import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ButtonGroup, Form, Card, ListGroup } from 'react-bootstrap';
import 'react-dropdown/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {DropDownList} from '@progress/kendo-react-dropdowns';
import "@progress/kendo-theme-bootstrap/dist/all.css";
import "@progress/kendo-theme-material/dist/all.css";
import {Button} from "@progress/kendo-react-buttons";
import { Upload } from '@progress/kendo-react-upload';

class Audio extends React.Component {
    categories = [ "Stances", "Blocks", "One-Steps", "Forms"];
    videos = ["Video1", "Video2", "Video3", "Video4", "Video5", "Video6", ];
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
             <div className="add-audio-content">
                <p>Add Audio Page!</p>
                <Upload
                batch={false}
                multiple={true}
                defaultFiles={[]}
                withCredentials={false}
                saveUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/save'}
                removeUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/remove'}
                className="audio-upload"
                />
                <div>
                    <DropDownList data={this.categories} defaultValue="Select a Category" className= "audio-dropdown-category"/>
                </div>
                <div>
                    <DropDownList data={this.videos} defaultValue="Select a Video" className= "audio-dropdown-video"/>  
                </div>
                <div>
                    <ButtonGroup horizontal>
                    <Button type="primary"> Cancel </Button>
                    <Button type="primary"> Pair Content </Button>
                    </ButtonGroup>
                </div>
            </div>
        );
    }
}

export default Audio;