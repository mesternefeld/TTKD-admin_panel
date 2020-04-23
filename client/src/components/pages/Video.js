import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ButtonGroup} from 'react-bootstrap';
import 'react-dropdown/style.css'
import { Upload } from '@progress/kendo-react-upload';
import "@progress/kendo-theme-bootstrap/dist/all.css";
import "@progress/kendo-theme-material/dist/all.css";
import {DropDownList} from '@progress/kendo-react-dropdowns';
import {Button} from "@progress/kendo-react-buttons";


class Video extends React.Component {
    constructor(props){
		  super(props);

      this.state = {
        fetching: true,
        selectedOption: null,
        events: {},
        categories:[]
        }
      
      // Allows these functions access to this (so they can access this.state)
      this.handleChange = this.handleChange.bind(this);
      this.getCategories = this.getCategories.bind(this);
    }

     // Fetch the list on first mount
    componentDidMount() {
      this.getCategories();
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
        return(
            <div className="add-video-content">
                <p>Add Video Page!</p>
                 <DropDownList data={this.state.categories} defaultValue="Select a Category"  className="blah"/>
                 <Upload
                  batch={false}
                  multiple={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/save'}
                  removeUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/remove'}
                />
                <ButtonGroup horizontal= "true">
                  <Button type="primary"onClick={event =>  window.location.href='./Dashboard'}> Cancel </Button>
                  <Button type="primary"> Add Video </Button>
                  <Button type="primary"> Add Audio</Button>
                </ButtonGroup>
            </div>
        );
    }
}

export default Video;