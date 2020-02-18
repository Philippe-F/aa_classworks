import React from 'react';

class Clock extends React.Component {
    constructor(props){
        super(props);
        this.state = {time: new Date()}
        this.tick = this.tick.bind(this)
    }

    tick(){
        this.setState({time: new Date()});
    }

    componentDidMount(){
        this.interval = setInterval(this.tick, 1000)
    }

    componentWillUnmount(){
        clearInterval(this.interval);
        this.interval = 0;
    }

    render(){
    return (
        <div>
            <h1 id ="head">Clock</h1>
            <div id="clock">
                <div id= "time">
                    <h2>Time:</h2>
                    <h2>{this.state.time.getHours()}: {this.state.time.getMinutes()}: {this.state.time.getSeconds()} EST</h2>
                </div>

                <div id="date">
                    <h2>Date:</h2>
                    <h2>{this.state.time.toDateString()}</h2>
                </div>
            </div>
        </div>
        )
    }
}

export default Clock;