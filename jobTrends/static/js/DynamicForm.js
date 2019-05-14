import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';


class DynamicForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fieldData = '',
            countries:[]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    addCountry(){
        event.preventDefault();
        <Typography gutterBottom></Typography>
        this.setState({countries: [...this.state.countries, ""]})
    }

    handleChange(e,index){
        this.state.countries[index] = e.target.value

        this.setState({countries: this.state.countries})
    }

    handleRemove(index){
        event.preventDefault();
        this.state.countries.splice(index,1)
        console.log(this.state.countries, "$$$$");

        this.setState({countries: this.state.countries})
    }

    render(){
        var df = this; 
        
        return( 
            <div className="DynamicForm">

            {
                this.state.countries.map((country,index) =>{
                    return(
                        <div key={index}>
                            <TextField name = {df.props.name} label = {df.props.label} variant = 'outlined' onChange={(e) =>this.handleChange(e,index)} value={df.props.value}></TextField>
                            <Button size = 'large' style={{backgroundColor: '#ff6961 '}} onClick={(e) =>this.handleRemove(index)}>-</Button>
                            <Typography gutterBottom></Typography>
                        </div>
                    );
                })
            }
            
            <hr />

            <Button style={{backgroundColor: '#61a8ff'}} onClick={(e)=>this.addCountry(e)}> {df.props.plus} </Button>
            <Typography gutterBottom></Typography>
            

            <hr />
            </div>
        )
    }
}

export default (DynamicForm);