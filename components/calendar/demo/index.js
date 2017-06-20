import 'react-hot-loader/patch'
import React from 'react'
import ReactDom from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import Calendar from '../index'

const Page = () => <div><Calendar /></div>

const rootEl = document.getElementById('app')

const render = (Component) => {
    ReactDom.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        rootEl,
    )
}

render(Page)

if (module.hot) {
    module.hot.accept(Page, () => { render(Page) })
}
