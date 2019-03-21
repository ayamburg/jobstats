// dynamicly generates a tp ten list of TopTenItems given
// an array of top ten skills

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TopTenItem from './ListItem';
import BlockCard from './BlockCard';
import Divider from '@material-ui/core/Divider';


class RankedList extends React.Component {
    //state = {};
    constructor(props) {
        super(props);
        this.state = {};
    }

    createList() {
        const rc = this;
        let list = [];
        for (let i = 0; i < rc.props.keys.length; i++) {
            let file_path = "/static/images/" + rc.props.keys[i] + "-icon.png";
            let listItem =
                <div key={i}>
                    <TopTenItem
                        alt={(i + 1).toString()}
                        src={file_path}
                        primary={rc.props.keys[i]}
                    />
                    <Divider/>
                </div>;
            list.push(listItem);
        }

        return list;
    }

    render() {
        const rc = this;

        return (
            <div>
                {rc.createList()}
            </div>
        );
    }
}

export default RankedList;
