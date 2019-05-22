import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Typography} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';

const listStyle = {
    overflow: 'auto',
    //float: 'left',
    height: '90vh',
}


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
            <div style={{ display: 'inline-flex' }}>
                <TextField
                    id="outlined-name"
                    label={this.props.label}
                    name={this.props.name + "Field"}
                    value={this.props.fieldValue}
                    onChange={this.props.onChange}
                    margin="normal"
                    variant="outlined"
                    style={{marginLeft: '2vw', display: 'inline-block'}}
                />
            </div>
            <div style={{ display: 'inline-flex' }}>
                <Button
                    variant="contained"
                    color="primary"
                    name={this.props.name}
                    onClick={this.props.onAdd}
                    size='small'
                    style={{display: 'inline-block'}}
                >
                    <AddIcon/>
                </Button>
                </div >
                <div style={{ display: 'inline-flex', alignSelf: 'right', overflow: 'auto', maxWidth:'85vh', marginLeft:'5vh'}}>
                <Grid justify="right">
                <Grid item>
                {this.getChips()}
                </Grid>
                </Grid>
                </div>
            </div>
        )
    }
}

export default (DynamicForm);