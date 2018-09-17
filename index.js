'use strict'
const fs = require('fs')
const path = require('path')

/**
 * Walk through path breadth first searching method.
 * @param {string} root The directory path to search.
 * @param {(root: string, dirs: string[], files: string[]) => void} action 
 * @param {boolean} [traceSymlink=false]
 */
function walkBFS(root, action, traceSymlink=false) {
    let rootQueue = [root]
    while(rootQueue.length !== 0) {
        let dirpath = rootQueue.shift()
        if(!fs.existsSync(dirpath)) continue
        let dirs = [], files = []
        fs.readdirSync(dirpath).forEach(file => {
            let abspath = path.join(dirpath, file)
            let stat = fs.statSync(abspath)
            if(traceSymlink && stat.isSymbolicLink()) {
                stat = fs.lstatSync(abspath)
            }
            
            if(stat.isDirectory()) {
                dirs.push(file)
                rootQueue.push(abspath)
            }
            else if(stat.isFile()) {
                files.push(file)
            }
        })
        action(dirpath, dirs, files)
    }
}


/**
 * Walk through path deep first searching method.
 * @param {string} root The directory path to search.
 * @param {(root: string, dirs: string[], files: string[]) => void} action 
 * @param {boolean} [traceSymlink=false]
 */
function walkDFS(root, action, traceSymlink=false) {
    if(!fs.existsSync(root)) return
    let dirs = [], files = []
    fs.readdirSync(root).forEach(file => {
        let abspath = path.join(root, file)
        let stat = fs.statSync(abspath)
        if(traceSymlink && stat.isSymbolicLink()) {
            stat = fs.lstatSync(abspath)
        }
        
        if(stat.isDirectory()) {
            dirs.push(file)
        }
        else if(stat.isFile()) {
            files.push(file)
        }
    });
    action(root, dirs, files)
    dirs.forEach(dir => {
        let droot = path.join(root, dir)
        walkDFS(droot, action, traceSymlink)
    })
}

/**
 * Walk through path breadth first searching method.
 * @param {string} root
 * @param {(boolean|(root: string, dirs: string[], files: string[]) => void)} arg1 Use DFS walk|Walk action
 * @param {(boolean|(root: string, dirs: string[], files: string[]) => void)} arg2 Trace symlink or not|Walk action
 * @param {boolean} [arg3] trace symlink or not
 */
module.exports = (root, arg1, arg2, arg3) => {
    if(typeof arg1 == 'boolean') {
        if(arg1) walkDFS(root, arg2, arg3)
        else walkBFS(root, arg2, arg3)
    }
    else {
        walkBFS(root, arg1, arg2)
    }
}
