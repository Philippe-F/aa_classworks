import React from 'react';

class Tabs extends React.Component{
    constructor(props){
        super(props);
        this.state = {tabIndex: 0};
        this.show = this.show.bind(this)
    }

    show(key){
        this.setState({tabIndex: key});
    }

    render(){

        const titles = this.props.lists.map((obj, idx) => <h1 onClick={() => this.show(idx)}>{obj.title}</h1>)
        const content = this.props.lists[this.state.tabIndex].content;
       
        return (
            <div>
                <ul>
                    {titles}
                </ul>
                <article>
                    {content}
                </article>
            </div>
        )
    }
}

export default Tabs;