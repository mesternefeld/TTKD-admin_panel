import React from 'react';
//import {ButtonGroup} from 'react-bootstrap';
import {DropDownList} from '@progress/kendo-react-dropdowns';

import Video from './Video';
import Steps from './Steps';

class Content extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            name: null,
            currentCategorie: null,
            currentVideo: null,
            //currentAudio: null,
            currentSteps: null,
        }

        // Allows these functions access to this (so they can access this.state)
        this.handleChange = this.handleChange.bind(this);
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
    
    handleChange = selectedOption => {
      this.setState(
        { selectedOption },
        () => console.log(`Option selected:`, this.state.selectedOption)
      );
    };
    
    render(){
      console.log("render:", this.state.currentCategorie)
        return(
            <div className="add-content">
                <p> The Content Page!</p>
                <DropDownList 
                  data={this.state.categories} 
                  defaultValue="Select a Category"
                  ref= {component => this.dropdownlist = component}
                  onChange={() => this.setState({
                    currentCategorie: this.dropdownlist.value}
                    )}
                  //className="catDropdown"
                />
                <div>
                    <DropDownList data={this.state.videos} defaultValue="Select a Video" className= "audio-dropdown-video"/>  
                </div>
                <Video />
                {/* <Audio categorie={this.state.currentCategorie}/> */}
                <Steps />
            </div>
        );
    }
    
}


 // Returns the Content object and posts it to AWS

export default Content;