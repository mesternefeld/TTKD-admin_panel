import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ButtonGroup} from 'react-bootstrap';
import 'react-dropdown/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "@progress/kendo-theme-bootstrap/dist/all.css";
import "@progress/kendo-theme-material/dist/all.css";
import {Button} from "@progress/kendo-react-buttons";
import { Upload } from '@progress/kendo-react-upload';

class Audio extends React.Component {
    constructor(props){
		super(props);

		this.state = {
            renderSteps: false,
            fetching: true,
            selectedOption: null,
            events: {},
            categories: [],
            videos: [],
        }
    }

    render(){
        console.log('A dropdown', this.props.categorie);
        return(
             <div className="add-audio-content">
                <legend>Add Audio Below</legend>
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
                    <ButtonGroup horizontal= "true">
                    <Button type="primary" onClick={event =>  window.location.href='./Dashboard'}> Cancel </Button>
                    <Button type="primary"> Pair Content </Button>
                    </ButtonGroup>
                </div>
            </div>
        );
    }   
}

export default Audio;