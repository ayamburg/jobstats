import React from 'react'
import ReactDOM from 'react-dom'
import TrendGraph from './trend_graph.js'
import BlockCard from './BlockCard';
import RankedList from './RankedList';

const App = () => (
    <div>
        <div>
            <h1>test</h1>
        </div>
        <div>
        <BlockCard payload={
            <RankedList
                alt1="#1"
                src1="/static/images/plogo.png"
                primary1="Every programming is best programming"
                alt2="#1"
                src2="/static/images/plogo.png"
                primary2="Every programming is best programming"
                alt3="#1"
                src3="/static/images/plogo.png"
                primary3="Every programming is best programming"
                alt4="#1"
                src4="/static/images/plogo.png"
                primary4="Every programming is best programming"
                alt5="#1"
                src5="/static/images/plogo.png"
                primary5="Every programming is best programming"
                alt6="#1"
                src6="/static/images/plogo.png"
                primary6="Every programming is best programming"
                alt7="#1"
                src7="/static/images/plogo.png"
                primary7="Every programming is best programming"
                alt8="#1"
                src8="/static/images/plogo.png"
                primary8="Every programming is best programming"
                alt9="#1"
                src9="/static/images/plogo.png"
                primary9="Every programming is best programming"
                alt10="#1"
                src10="/static/images/plogo.png"
                primary10="Every programming is best programming"

            />}/>
        </div>
        <nav>
            <a href="/">Index</a>
        </nav>
        <TrendGraph data={window.props}/>
    </div>
);


ReactDOM.render(
    <App/>,
    window.react_mount
);
