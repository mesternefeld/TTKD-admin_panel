import React from 'react';
import Audio from './Audio';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ButtonGroup} from 'react-bootstrap';
import 'react-dropdown/style.css'
import { Upload } from '@progress/kendo-react-upload';
import "@progress/kendo-theme-bootstrap/dist/all.css";
import "@progress/kendo-theme-material/dist/all.css";
import {Button} from "@progress/kendo-react-buttons";

class Video extends React.Component {
    constructor(props){
		  super(props);

      this.state = {
        renderAudio:false,
        fetching: true,
        selectedOption: null,
        events: {},
        categories:[],
      } 
    }

    

    render(){
        return(
            <div className="add-video-content">
                 <Upload
                  batch={false}
                  multiple={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  onStatusChange={(event) => this.setState({
                    uploadFiles: event.newState
                  })}
                  // onAdd={() => console.log("Video add:", this.props.currentCategorie)}
                  //onBeforeUpload={() => console.log('about to upload')}
                  saveUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/save'}
                  removeUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/remove'}
                />
                <ButtonGroup horizontal= "true">
                  <Button type="primary"onClick={event =>  window.location.href='./Dashboard'}> Cancel </Button>
                  <Button type="primary"> Add Video </Button>
                  <Button type="primary"onClick={event => this.setState({renderAudio: true}) }> Add Audio </Button>
                </ButtonGroup>
                <div>
                  {this.renderedAudio(this.state.renderAudio)}
                </div>
            </div>
        );
    }
   
    renderedAudio(renderAudio){
      if(this.state.renderAudio === true){
        this.audio = <Audio
        // ref = {component => this.audio = component}
        // currentCategorie={this.currentCategorie}
        />;
        // console.log('==================== \n Audio categories', this.audio.props.currentCategorie, "\n====================");
        // console.log('==================== \n VA dropdown', this.audio, "\n====================");
        //console.log('==================== \n upload files in audio:', this.state.uploadFiles[0].getRawFile(), "\n ==============");
        return this.audio;
      }
    }
    
}

export default Video;