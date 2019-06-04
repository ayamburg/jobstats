// npm install react-transition group --save
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import BlockCard from './BlockCard.js';
import Grow from '@material-ui/core/Grow';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const head_style = {
  textAlign: 'center',
  marginTop:'5vh',
  marginBottom:'5vh'
}

const par_style={
  textAlign:'left',
  marginRight:'30vw',
  marginLeft:'30vw',
  marginTop:'5vh',
  marginBottom:'5vh',
}


const par1 = "With the Bureau of Labor Statistics predicting a 24% increase in computer science related jobs over the next five years, there’s never been a better time to enter the tech industry. There’s only one problem: finding a job in tech is hard. Technology evolves at breakneck speeds, and with it the alphabet soup of technical skills, making it difficult to know just what you should learn to land your dream job."

const par2 = "We aim to change the way you search for a job in the tech industry. With JobStats you have the power to see exactly what technical skills are in demand— right now. JobStats gathers data from Computer Science related job listings posted online, and then performs robust analysis on those listings to see exactly what technical skills are in demand. This way you can tell what skills you should focus on sharpening in order to maximize your chances of landing your dream job. Data is presented in the form of graphs, lists and maps, and is viewable by company, concentration, location, and more."

const par3 = "We gather our data from American job listings found on popular job hunting sites."


class AboutPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reveal_header:true,
            reveal_text:false,
            reveal_contact:false,
        };
    }

    componentDidMount() {
       setTimeout(function(){this.setState({reveal_text: true})}.bind(this), 1000);
       setTimeout(function(){this.setState({reveal_contact: true})}.bind(this), 2000);
   }

    render() {
        return (
          <div>
            {this.state.reveal_header &&
              <Fade in={true} timeout={1000}>
                    <Typography style={head_style} variant="h1">- Our Mission -</Typography>
              </Fade>
            }

            {this.state.reveal_text &&
              <div>
              <Fade in={true} timeout={1000}>
                    <Typography style={par_style} variant="h5">{par1}</Typography>
              </Fade>
              <Fade in={true} timeout={1000}>
                    <Typography style={par_style} variant="h5">{par2}</Typography>
              </Fade>
              <Fade in={true} timeout={1000}>
                    <Typography style={par_style} variant="h5">{par3}</Typography>
              </Fade>
              </div>
            }

            {this.state.reveal_contact &&
              <div>
              <Fade in={true} timeout={1000}>
                    <Typography style={head_style} variant="h4">Questions?</Typography>
              </Fade>
              <Fade in={true} timeout={1000}>
                    <Typography style={head_style} variant="h6"> <span> Contact us at contact@jobstats.net</span></Typography>
              </Fade>
              </div>
            }
          </div>
        );
    }
}

// SimpleCard.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

// style={{ transformOrigin: '0 0 0' }}
// {/* Conditionally applies the timeout property to change the entry speed. */}
// <Fade
// in={true}
// {...(true ? { timeout: 1000 } : {})}
// >
// </Fade>
  // {setTimeout(this.renderFade,3000,"hello")

  // <Typography style={par_style} variant="h5">{par1}</Typography>
  // <Typography style={head_style} variant="h2">About</Typography>
  // <Typography style={par_style} variant="h5">{par2}</Typography>

export default (AboutPage);
