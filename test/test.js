const walk = require('../index')

walk('../', (root, dirs, files) => {
    console.log(root, dirs, files)
})
