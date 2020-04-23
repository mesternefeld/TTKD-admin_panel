import React from 'react';
import {DropDownList} from '@progress/kendo-react-dropdowns';
import {Input} from '@progress/kendo-react-inputs'
import Video from './Video';
import Steps from './Steps';
import {Button} from "@progress/kendo-react-buttons";
//import { Upload } from '@progress/kendo-react-upload';



class Content extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            name: null,
            currentCategorie: null,
            currentVideo: null,
            currentAudio: null,
            currentSteps: null,
        }

        // Allows these functions access to this (so they can access this.state)
        this.getCategories = this.getCategories.bind(this);
        this.getVideos = this.getVideos.bind(this);
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

    returnContent = () => {
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
                  //onAdd={console.log(this.props)}
                  ref ={component => this.video = component}
                  onChange={(event) => this.setState({currentVideo: event.newState})}
                />
                <Steps 
                transcript = {this.props.transcript}
                onChange={() => this.setState({currentSteps: this.steps.children.transcipt})}/>
                <Button type="primary" onClick={() => this.returnContent()}>Upload Data</Button>
            </div>
        );
    }
    
}


// Returns the Content object and posts it to AWS

export default Content;