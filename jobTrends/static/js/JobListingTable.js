import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import Typography from '@material-ui/core/Typography';

const styles = {
root: {
    width: '100%',
    marginTop: 3,
    overflowX: 'auto',
  }
};

class JobListingTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            job_listings: [],
        }
        this.getJobListings = this.getJobListings.bind(this);
    }

    getJobListings() {
        console.log(this.props.job_listings_titles);
        axios.get('/api/job_listings', {
            responseType: 'json',
            params: {
                filters: this.props.job_listings_filters.toString(),
                companies: this.props.job_listings_companies.toString(),
                titles: this.props.job_listings_titles.toString(),
                locations: this.props.job_listings_locations.toString(),
                count: 10
            }
        }).then(response => {
            this.setState({
              job_listings: response.data.job_listings
            })
        });
    }

    componentDidMount() {
        this.getJobListings()
    }

    render() {
        const classes = styles;
        if(this.state.job_listings.length === 0) {
            return(<span> Loading... </span>)
        } else {
            return (
                <div>
                    <Typography variant="h5" align="center">Job Listings</Typography>
                    <Paper style={styles.root}>
                        <Table>
                            <TableHead>
                            <TableRow>
                                <TableCell>Positions</TableCell>
                                <TableCell align="right">Date</TableCell>
                                <TableCell align="right">Location</TableCell>
                                <TableCell align="right">Company</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {this.state.job_listings.map(listing => (
                                <TableRow key={listing.indeed_id}>
                                        <TableCell component="th" scope="row">
                                            <a href={"//www.indeed.com/viewjob?jk=" + listing.indeed_id}>
                                                {listing.title}
                                            </a>
                                        </TableCell>
                                        <TableCell align="right">{listing.posted_date.split('T')[0]}</TableCell>
                                        <TableCell align="right">{listing.location}</TableCell>
                                        <TableCell align="right">{listing.company}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            );
        }
    }
}

export default JobListingTable;
