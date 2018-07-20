#!/usr/bin/env node

const program = require('commander');

program
    .command('search <search_query>')
    .alias('s')
    .description('Search for a question')
    .action((searchKey)=>{
        console.log(searchKey)
    })

program.parse(process.argv);
