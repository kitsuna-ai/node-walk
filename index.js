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
        
        if(stat.isDirectory) {
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
 * @param {(root: string, dirs: string[], files: string[]) => void} action 
 * @param {boolean} [traceSymlink=false]
 * @param {boolean} [DFS=false]
 */
module.exports = (root, action, traceSymlink=false, DFS=false) => {
    if(DFS) {
        walkDFS(root, action, traceSymlink)
    }
    else {
        walkBFS(root, action, traceSymlink)
    }
}
