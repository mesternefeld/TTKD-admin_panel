import "@progress/kendo-theme-bootstrap/dist/all.css";
import "@progress/kendo-theme-material/dist/all.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Steps.css';
import React from 'react';
import 'react-dropdown/style.css';
import {MaskedTextBox} from "@progress/kendo-react-inputs";
import {Button} from "@progress/kendo-react-buttons";

class Steps extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {
            values: [{
                value: null,
                time: null 
            }]
        }
    }
// const Steps = (props) => {
//         const {
//             transctipt,
//             values
//         } = props;
    
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
    
    convertToSeconds(time){
        var split_time = time.split(":");

        var total_seconds = (split_time[0] * 60) + Number(split_time[1]);

        return total_seconds;
    }


    createTranscript(e) {
        e.preventDefault();
        var newTranscript = "";

        console.log("Old Transcript: " + this.state.transcript);

        this.state.values.map(value =>{

            let start_time = this.convertToSeconds(value.time);
            let description = value.value;

            return newTranscript = newTranscript.concat("{\n" +
                "start_time: " + start_time + "\n" +
                "description: " + description + 
                "\n}\n");
             
        })

        console.log("transcribing: " + newTranscript);

        this.setState({transcript: newTranscript});
        return this.state.transcript;
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
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
                    </div>
                ))}
                <Button type="primary" onClick={(e) => this.createTranscript(e)}> Save Transcript </Button>
            </form>
        );
    }
}

export default Steps;