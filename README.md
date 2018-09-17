# node-walk
This is a similar type of Python's os.walk function.

In the node-walk, there are 2 types of walk functions.
Searching directories depth first or breath first.

# Example
``` js
// BFS search
walk('./some folder', (root, dirs, files) => {
    console.log('root path:', root)
    console.log('directoires:', dirs)
    console.log('files:', files)
})

// BFS search #2
walk('./some folder', false, (root, dirs, files) => {
    console.log('root path:', root)
    console.log('directoires:', dirs)
    console.log('files:', files)
})
```

``` js
// DFS search
walk('./some folder', true, (root, dirs, files) => {
    console.log('root path:', root)
    console.log('directoires:', dirs)
    console.log('files:', files)
}
```

# Methods
``` js
walk('path', [Use DFS search: boolean], function(root, dirs, files), [trace symlink])
```


