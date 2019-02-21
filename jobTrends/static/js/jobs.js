import React from 'react'
import ReactDOM from 'react-dom'
import TrendGraph from './trend_graph.js'
import axios from 'axios'

class GraphForm extends React.Component {
    constructor(props) {
        super(props);
        let raw_check = false;
        if(window.props.raw === '1')
            raw_check = true;
        this.state = {
            keywords: window.props.keywords,
            filters: window.props.filters,
            period: window.props.period,
            raw_bool: raw_check,
            graph_data: {
                keywords: window.props.keywords,
                filters: window.props.filters,
                period: window.props.period,
                raw: window.props.raw,
                x: window.props.x,
                y: window.props.y
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let raw = '0';
        if (this.state.raw_bool)
            raw = '1';
        axios.get('/api/trend_data', {
            responseType: 'json',
            params: {
                keywords: this.state.keywords.toString(),
                filters: this.state.filters.toString(),
                period: this.state.period,
                raw: raw,
            }
        })
            .then(response => {
                this.setState({
                    graph_data: response.data
                });
            });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Keywords:
                        <input name="keywords" type="text" value={this.state.keywords} onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <label>
                        Filters:
                        <input name="filters" type="text" value={this.state.filters} onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <label>
                        Period:
                        <input name="period" type="text" value={this.state.period} onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <label>
                        Raw:
                        <input name="raw_bool" type="checkbox" checked={this.state.raw_bool} onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <input type="submit" value="Submit"/>
                </form>
                <TrendGraph data={this.state.graph_data}/>
            </div>
        );
    }
}

const App = () => (
    <div>
        <nav>
            <a href="/">Index</a>
        </nav>
        <GraphForm/>
    </div>
);


ReactDOM.render(
    <App/>,
    window.react_mount
);
