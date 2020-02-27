import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "@progress/kendo-react-buttons";

class Steps extends React.Component {
    
    constructor(props){
        super(props);

    this.state = {
        fetching: true,
        events: {},
        description: "",
        start: "",
        stop: "",
        steps: [{ description: "", start:""}]
        }
    }

    handleChange = (e) => {
        if (["description", "start"].includes(e.target.className) ) {
          let steps = [...this.state.steps]
          steps[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
          this.setState({ steps }, () => console.log(this.state.steps))
        } else {
          this.setState({ [e.target.description]: e.target.value.toUpperCase() })
        }
      };

      addStep = (e) => {
        this.setState((prevState) => ({
            steps: [...prevState.steps, {description:"", start:""}],
        }));
      };

    handleSubmit = (e) => { e.preventDefault() };

    handleSubmit = evt => {
        console.log("BLAH DID IT! ");
    };

    handleNameChange = evt => {
        this.setState({ description: evt.target.value });
      };

    handleShareholderNameChange = idx => evt => {
    const newSteps = this.state.steps.map((steps, index) => {
        if (index !== index) return steps & index+1;
        return { ...steps, description: evt.target.value };
    });

    this.setState({ steps: newSteps });
    };
      
    handleAddShareholder = () => {
        this.setState({
            steps: this.state.steps.concat([{ description: "" }])
        });
      };

    render(){
        return(
            <div>
                <p>Add Steps to Audio Page!</p>
                <form onSubmit={this.handleSubmit}>
                {this.state.steps.map((steps, idx) => (
                <div className="shareholder">
                    <input
                        type="text"
                        placeholder={`Step #${idx + 1} Description`}
                        value={steps.description}
                        onChange={this.handleShareholderNameChange(idx)}
                    />
                </div>
            ))}
            <Button type="primary"onClick={this.addStep}> Add Step </Button>
            </form>
            
                
            </div>
        );


    }
}

export default Steps;
