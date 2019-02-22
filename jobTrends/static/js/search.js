import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
});

class Search extends React.Component{
    //state
    constructor() {
      super(props);
      this.state = {
        name: 'Cat in the Hat',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
    };
  }

    // handleChange = name => event => {
    //     this.setState({
    //       [name]: event.target.value,
    //     });
    // };

    render() {
        //const { classes } = this.props;

        return (
            <Form inline>
        <FormGroup>
          <Label for="exampleSearch" hidden>SEARCH</Label>
          <Input type="Search" name="SEARCH" id="exampleSEARCH" placeholder="Search" />
        </FormGroup>
        {' '}
        {' '}
        <Button>Submit</Button>
      </Form>
        );
    }
}

export default Search;
