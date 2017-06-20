const fse = require('fs-extra')
var template = require('lodash.template')
const path = require('path')

const args = require('minimist')(process.argv.slice(2))
const { component } = args
const component_upper = component.replace(/^\S/,function(s){return s.toUpperCase();})
const componentRoot = path.join(__dirname, 'components', component)



try {
    fse.ensureDirSync(componentRoot)
    fse.copySync('_component/', componentRoot)

    //docs/README.md
    const docTpl = fse.readFileSync(path.join(componentRoot, 'docs/README.md'))
    fse.writeFileSync(path.join(componentRoot, 'docs/README.md'), template(docTpl)({component, component_upper}))

    //component.js
    const componentTpl = fse.readFileSync(path.join(componentRoot, 'component.js'))
    fse.writeFileSync(path.join(componentRoot, component + '.js'), template(componentTpl)({component, component_upper}))
    fse.removeSync(path.join(componentRoot, 'component.js'))

    //style/component.less
    fse.moveSync(path.join(componentRoot, 'style/component.less'), path.join(componentRoot, 'style/' + component + '.less'), {overwrite: true})

    //index.js
    const mainTpl = fse.readFileSync(path.join(componentRoot, 'index.js'))
    fse.writeFileSync(path.join(componentRoot, 'index.js'), template(mainTpl)({component, component_upper}))

    //README.md
    const readmeTpl = fse.readFileSync(path.join(componentRoot, 'README.md'))
    fse.writeFileSync(path.join(componentRoot, 'README.md'), template(readmeTpl)({component, component_upper}))

    //demo/index.js
    const demoTpl = fse.readFileSync(path.join(componentRoot, 'demo/index.js'))
    fse.writeFileSync(path.join(componentRoot, 'demo/index.js'), template(demoTpl)({component, component_upper}))

} catch(e) {
    console.log(e)
}
