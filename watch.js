#!/usr/bin/env node

const _ = require('lodash')

const fs = require('fs')
const {spawn} = require('child_process')

const bgGreen = '\x1b[42m'
const fgGreen = '\x1b[32m'
const fgBlack = '\x1b[30m'
const reset = '\x1b[0m'

build()
fs.watch('./src', { encoding: 'buffer' }, _.debounce(build, 500))

function build () {
	console.time('build')
	const buildcmd = spawn('/bin/sh', ['-c', 'cargo build'], { stdio: [0,1,2]})	

	process.stdout.write('\033c')
	console.log(`${bgGreen}${fgBlack} DONE ${reset} ${fgGreen}Compiled${reset}`)

	buildcmd.on('close', (code, signal) => console.timeEnd('build'));
}