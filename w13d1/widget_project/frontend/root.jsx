import React from 'react';
import Clock from './clock';
import Tabs from './tabs';

const lists = [
    {title: "Greetings", content: "hello from React" },
    {title: "JS", content: "hello from JavaScript" },
    {title: "Node", content: "hello from Node" },
]

const Root = ()=> {
    return (<div>
        <Clock />
        <Tabs lists={lists}/>
    </div>)
}

export default Root;
