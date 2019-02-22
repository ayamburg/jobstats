import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
    constructor() {
        super(props);
        this.state = {};
    }

    render() {
        const rc = this;

        var a = <TopTenItem 
            alt={rc.props.alt1}
            src={rc.props.src1}
            primary={rc.props.primary1}
        />
        var b = <TopTenItem 
            alt={rc.props.alt2}
            src={rc.props.src2}
            primary={rc.props.primary2}
        />
        var c = <TopTenItem 
            alt={rc.props.alt3}
            src={rc.props.src3}
            primary={rc.props.primary3}
        />
        var d = <TopTenItem 
            alt={rc.props.alt4}
            src={rc.props.src4}
            primary={rc.props.primary4}
        />
        var e = <TopTenItem 
            alt={rc.props.alt5}
            src={rc.props.src5}
            primary={rc.props.primary5}
        />
        var f = <TopTenItem 
            alt={rc.props.alt6}
            src={rc.props.src6}
            primary={rc.props.primary6}
        />
        var g = <TopTenItem 
            alt={rc.props.alt7}
            src={rc.props.src7}
            primary={rc.props.primary7}
        />
        var h = <TopTenItem 
            alt={rc.props.alt8}
            src={rc.props.src8}
            primary={rc.props.primary8}
        />
        var i = <TopTenItem 
            alt={rc.props.alt9}
            src={rc.props.src9}
            primary={rc.props.primary9}
        />
        var j = <TopTenItem 
            alt={rc.props.alt10}
            src={rc.props.src10}
            primary={rc.props.primary10}
        />

        return (
            <div>
                {/* <BlockCard payload={a}/>
                <BlockCard payload={b}/>
                <BlockCard payload={c}/>
                <BlockCard payload={d}/>
                <BlockCard payload={e}/>
                <BlockCard payload={f}/>
                <BlockCard payload={g}/>
                <BlockCard payload={h}/>
                <BlockCard payload={i}/>
                <BlockCard payload={j}/> */}

                {a}
                <Divider variant="fullWidth" />
                {b}
                <Divider variant="fullWidth" />
                {c}
                <Divider variant="fullWidth" />
                {d}
                <Divider variant="fullWidth" />
                {e}
                <Divider variant="fullWidth" />
                {f}
                <Divider variant="fullWidth" />
                {g}
                <Divider variant="fullWidth" />
                {h}
                <Divider variant="fullWidth" />
                {i}
                <Divider variant="fullWidth" />
                {j}
            </div>
        );


    }
}

export default RankedList;