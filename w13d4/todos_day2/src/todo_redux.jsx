import React from 'react'
import { render } from 'react-dom'
import Root from './components/root'
import store from './store/store'

window.data = store
render(<Root store={data} />, document.getElementById('main'))
