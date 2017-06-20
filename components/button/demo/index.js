import 'react-hot-loader/patch'
import React from 'react'
import ReactDom from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import Button from '../button'
import styles from './index.less'

const Page = () => (
    <div className={styles['demo-button-wrap']}>
        <h3>Button 按钮</h3>
        <div className={styles['demo-button-section']}>
            <div className={styles.title}>按钮样式</div>
            <Button type="important" text="重要按钮" size="big" />
            <Button type="primary" text="主要按钮" size="big" />
            <Button type="secondary" text="次要按钮" size="big" />
            <Button type="ghost" text="幽灵按钮" size="big" />
            <Button type="disabled" text="失效按钮" size="big" />
        </div>
        <div className={styles['demo-button-section']}>
            <div className={styles.title}>按钮尺寸</div>
            <Button type="important" text="重要按钮" size="big" />
            <Button type="important" text="重要按钮" size="normal" />
            <Button type="important" text="重要按钮" size="small" />
        </div>
        <div className={styles['demo-button-section']}>
            <div className={styles.title}>按钮 Group</div>
            <Button type="ellipse" text="未选中" />
            <Button type="ellipse" text="选中" selected={true} />
        </div>
    </div>
)

const rootEl = document.getElementById('app')

const render = Component => {
    ReactDom.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        rootEl,
    )
}

render(Page)

if (module.hot) {
    module.hot.accept(Page, () => {
        render(Page)
    })
}
