import React from 'react';
import {DropDownList} from '@progress/kendo-react-dropdowns';
import {Input} from '@progress/kendo-react-inputs'
//import Video from "./Content";
// import Steps from "./Content";
// import Video from "./Video";
//import Steps from "./Steps"
import Audio from "./Audio"
import {Button, ButtonGroup} from "@progress/kendo-react-buttons";
import {MaskedTextBox} from "@progress/kendo-react-inputs";
import { Upload } from '@progress/kendo-react-upload';


class Content extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            name: null,
            currentCategorie: null,
            currentVideo: null,
            currentAudio: null,
            currentSteps: null,
            renderAudio: false,
        }

        // Allows these functions access to this (so they can access this.state)
        this.getCategories = this.getCategories.bind(this);
        this.getVideos = this.getVideos.bind(this);
        this.handleAudioChange = this.handleAudioChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    // Fetch the list on first mount
    componentDidMount() {
      this.getCategories();
      this.getVideos();
    }

    // Retrieves the list of videos from the Express app
    getVideos = () => {
      console.log("Calling getVideos api endpoint ");
      fetch('/getVideos')
      .then(res => res.json())
      .then(videos => this.setState({ videos },
          () => console.log(`[INFO][CLIENT][API: /getVideos]:`, this.state.videos)))
    }

    // Retrieves the list of categories from the Express app
    getCategories = () => {
      console.log("Calling getCategories api endpoint ");
      fetch('/getCategories')
      .then(res => res.json())
      .then(categories => this.setState({ categories },
        () => console.log(`[INFO][CLIENT][API: /getCategories]:`, this.state.categories)))
    }

    // Posts the video to the Express app
    addVideo = () => {
      console.log("Calling addVideo api endpoint ");
      fetch('/addVideo')
      .then(res => res.json())
      .then(categories => this.setState({ categories },
        () => console.log(`[INFO][CLIENT][API: /addVideo]:`, this.state.categories)))
    }
    // ////////////////////////////////////////////////////////////////
    // //Video
    // ////////////////////////////////////////////////////////////////

    handleAudioChange = () => {
      // eslint-disable-next-line no-unused-expressions
      this.setState({renderAudio: true});
      return this.state.renderAudio;
    }

    handleUpload = (videoFile) => {
      this.setState({currentVideo: videoFile});
      return this.state.currentVideo;
    }

    handleTranscript = (values) => {  
      this.setState({currentSteps: values});
      return this.state.currentSteps;
    }

    renderedAudio = (audiostate) => {
      console.log("renderaudio:" + audiostate);
      if(audiostate === true){

        return(<div><Audio/></div>);

      }
    }

    // ////////////////////////////////////////////////////////////////

    // ////////////////////////////////////////////////////////////////
    // //Steps
    // ////////////////////////////////////////////////////////////////

        
    convertToSeconds(time){
      var split_time = time.split(":");
      var total_seconds = (split_time[0] * 60) + Number(split_time[1]);
      return total_seconds;
    }

    createTranscript() {

      var newTranscript = "";

      console.log("Old Transcript: " + this.state.currentSteps);

      this.state.currentSteps.map(value =>{

          let start_time = this.convertToSeconds(value.time);
          let description = value.value;

          return newTranscript = newTranscript.concat("{\n" +
              "start_time: " + start_time + "\n" +
              "description: " + description + 
              "\n}\n");
          
      })

      console.log("transcribing: " + newTranscript);

      return this.state.currentSteps;
    }
    

    ///////////////////////////////////////////////////////////////////


    returnContent = () => {
      
      this.createTranscript();
      console.log(this.state);
    }
    
    render(){
        return(
            <div className="add-content">
              <div>
                <legend> The Content Page!</legend>
                <Input 
                  type="primary"
                  placeholder="Enter Content Name "
                  ref={component => this.input = component}
                  onChange={() => this.setState({name: this.input.value})}
                />
              </div>
                <DropDownList 
                  className="catDropdown"
                  data={this.state.categories}
                  defaultValue="Select a Category"
                  ref={component => this.dropdownlist = component}
                  onChange={() => this.setState({currentCategorie: this.dropdownlist.value})}
                />
                <Video
                  handleUpload ={this.handleUpload}
                  handleAudioChange = {this.handleAudioChange}
                />
                {this.renderedAudio(this.state.renderAudio)}
                <Steps 
                  handleTranscript = {this.handleTranscript.bind(this)}
                />
                <Button type="primary" onClick={() => this.returnContent()}>Upload Data</Button>
            </div>
        );
    }
    
}

class Video extends React.Component {

  render(){
    var handleAudioChange = this.props.handleAudioChange;
    var handleUpload = this.props.handleUpload;

    return(
      <div className="add-video-content">
          <Upload
            batch={false}
            multiple={false}
            defaultFiles={[]}
            withCredentials={false}
            onStatusChange={(event) => handleUpload(event.newState)}
            saveUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/save'}
            removeUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/remove'}
          />
          <ButtonGroup horizontal= "true">
            <Button type="primary"onClick={event =>  window.location.href='./Dashboard'}> Cancel </Button>
            <Button type="primary"onClick={event => handleAudioChange(event, true)}> Add Audio </Button>
          </ButtonGroup>
      </div>
    );
  }
}

class Steps extends React.Component {

  state = {
    values: [{ value: null, transcript: null}]
  }

    handleValueChange(i, event) {
      let values = [...this.state.values];
      values[i].value = event.target.value;
      this.setState({ values });

    }

    handleTimeChange(i, event){
        let values = [...this.state.values];
        values[i].time = event.target.value;
        this.setState({ values });
    }

    addClick(e) {
        e.preventDefault();
        this.setState(prevState => ({
          values: [...prevState.values, { value: null, time: null }],
        }));
    }

    removeClick(i, e) {
        e.preventDefault();
        let values = [...this.state.values];
        values.splice(i, 1);
        this.setState({ values });
    }

  render(){

    var handleTranscript = this.props.handleTranscript;

    return(
      <div >
          <legend> Add Steps Below </legend>
          <Button type="primary" onClick={(e) => this.addClick(e)} > Add More </Button>
            {this.state.values.map((el, i) => (
              <div className="step-component" key={i}>
                  <b> Step {i+1} </b> 
                  <textarea className="k-textarea" width="75%" value={el.value || ""} onChange={e => this.handleValueChange(i, e)}></textarea>
                            
                  <MaskedTextBox
                    mask="00:00"
                    placeholder="Start Time"
                    width="10%"
                    value={el.time || ""}
                    onChange={e => this.handleTimeChange(i, e)}
                  />
                  <Button type="primary" value="remove" onClick={(e) => this.removeClick(i, e)}> Remove </Button>
                </div>))}
          <Button type="primary" onClick={() => handleTranscript(this.state.values)}> Save Transcript </Button>
      </div>
    );
  }
}


// Returns the Content object and posts it to AWS

export default Content;