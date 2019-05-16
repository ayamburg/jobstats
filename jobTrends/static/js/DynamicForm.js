import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Typography} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';

class DynamicForm extends React.Component {
    constructor(props) {
        super(props);
    }

    getChips() {
        let chips = [];
        for (let i = 0; i < this.props.value.length; i++) {
            chips.push(
                <Chip
                    key={i}
                    label={this.props.value[i]}
                    onDelete={() => this.props.onRemove(i, this.props.name)}
                    color="primary"
                    variant="outlined"
                />
            )
        }
        return chips;
    }

    render() {
        return (
            <div className="DynamicForm">
                <TextField
                    id="outlined-name"
                    label={this.props.label}
                    name={this.props.name + "Field"}
                    value={this.props.fieldValue}
                    onChange={this.props.onChange}
                    margin="normal"
                    variant="outlined"
                />
                <Button
                    variant="contained"
                    color="primary"
                    name={this.props.name}
                    onClick={this.props.onAdd}
                >
                    <AddIcon/>
                </Button>
                {this.getChips()}
            </div>
        )
    }
}

export default (DynamicForm);