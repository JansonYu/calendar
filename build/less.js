#!/usr/bin/env node
/* eslint-disable */
const fs = require('fs');
const path = require('path');

// 在 dist/app.less 中集中 import componets 下组件的 less 样式
if (fs.existsSync(path.join(__dirname, '../dist'))) {
    let lessContent = ''
    const componentsFolders = fs.readdirSync(path.join(__dirname, '../components'))
    componentsFolders.forEach(component => {
        const stylePath = path.join(__dirname, '../components', component, 'style')
        if(fs.existsSync(stylePath)) {
            const lessFiles = fs.readdirSync(stylePath)
            lessContent += lessFiles.map( less => `@import "../${path.join(component, 'style', less)}";`).join('\n')
        }
    })
    fs.writeFileSync(path.join(process.cwd(), '../dist', 'app.less'), lessContent);
}
