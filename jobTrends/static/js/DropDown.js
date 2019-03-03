import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state/index';

class DropDown extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <PopupState variant="popover" popupId={this.props.name}>
              {popupState => (
                <React.Fragment>
                  <Button variant="contained" fullWidth={true} {...bindTrigger(popupState)}>
                    {this.props.value}
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    {this.props.MenuItems}
                    <MenuItem onClick={this.props.onChange}>Cake</MenuItem>
                    <MenuItem onClick={popupState.close}>Death</MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
        );
    }
}

export default DropDown;