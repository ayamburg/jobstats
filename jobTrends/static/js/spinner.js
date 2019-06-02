import React from 'react';
import Button from '@material-ui/core/Button';

class Spinner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        loading: false
    }
    this.handleClick = this.handleClick.bind(this);
  };

  handleClick() {
    this.setState({ loading: true });

    //Faking API call here
    // setTimeout( this.setState({ loading: false }), 2000)
  };

  render() {
    const { loading } = this.state;

    return (
      <div style={{ marginTop: "60px" }}>
        <Button className="button" onClick={this.handleClick} disabled={loading}>
          {loading && <span>Loading Data from Server</span>}
          {!loading && <span>Submit</span>}
        </Button>
      </div>
    );
  }
}
export default Spinner;