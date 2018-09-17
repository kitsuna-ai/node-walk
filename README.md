# node-walk
This is a similar type of Python's os.walk function.

In the node-walk, there are 2 types of walk functions.
Searching directories depth first or breath first.


# Example
``` js
walk3('./some folder', (root, dirs, files) => {
    console.log('root path:', root)
    console.log('directoires:', dirs)
    console.log('files:', files)
})
```

# Method

