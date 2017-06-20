const req = require.context('../components', true, /^\.\/(\w+)\/index\.js$/)
const keys = req.keys()
keys.forEach(k => {
    const r = req(k)
    const exportR = r.default || r
    const moduleName = k.match(/^\.\/(\S*)\/index.js$/)[1].replace(/^\S/, s => s.toUpperCase())
    exports[moduleName] = exportR
})
