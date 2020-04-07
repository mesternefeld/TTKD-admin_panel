import "@progress/kendo-theme-bootstrap/dist/all.css";
import "@progress/kendo-theme-material/dist/all.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import 'react-dropdown/style.css';

class Steps extends React.Component {
    constructor(props){
		super(props);

		this.state = {
            transcript: [],
            values: [{ value: null }]
        }
    }
    
    handleChange(i, event) {
        let values = [...this.state.values];
        values[i].value = event.target.value;
        this.setState({ values });
    }

    // generateStep(){
    //     return this.state.values.map((el, i) => (
    //         <div key={i}>
    //           <input
    //             type="text"
    //             value={el.value || ""}
    //             onChange={this.handleChange.bind(this, i)}
    //           />
    //           <input
    //             type="button"
    //             value="remove"
    //             onClick={this.removeClick.bind(this, i)}
    //           />
    //         </div>
    //       ));
    // }

    addClick() {
        this.setState(prevState => ({
          values: [...prevState.values, { value: null }]
        }));
    }

    removeClick(i) {
        let values = [...this.state.values];
        values.splice(i, 1);
        this.setState({ values });
    }
  

    createTranscript(){
        return null;
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <p> Add Steps Below </p>
                {this.state.values.map((el, i) => (
                    <div key={i}>
                        <input
                            type="textarea"
                            value={el.value || ""}
                            onChange={e => this.handleChange(i, e)}
                        />
                        <input
                            type="button"
                            value="remove"
                            onClick={() => this.removeClick(i)}
                        />
                    </div>
                ))}

            <input type="button" value="add more" onClick={() => this.addClick()} />
            <input type="submit" value="Submit" />
        </form>
        );
    }


}

export default Steps;