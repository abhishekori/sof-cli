#!/usr/bin/env node

const program = require('commander');

const request = require('request-promise');
const colors = require('colors/safe');



program
    .command('search <search_query>')
    .alias('s')
    .description('Search for a question')
    .action((searchKey)=>{
        console.log('\t '+colors.yellow.bold(searchKey)+'\n');
        getTopAnswer(searchKey);
    })

program.parse(process.argv);


function getTopAnswer(searchKey){
    var queryLink='http://api.stackexchange.com/2.2/search/advanced?sort=relevance&site=stackoverflow&q='+queryBuilder(searchKey);
    
    request(queryLink,{json:true,gzip:true})
        .then(function(body){
            console.log('\n')
            body["items"].reverse().forEach((item,index)=>{
                console.log((body["items"].length-index)+" "+colors.bold(item.title)+"\n"+colors.blue.underline(item.link)+'\n\n')
            })

    }).
        catch(function(err){
            console.log(err)
        });

    
}

function queryBuilder(searchKey){
    return searchKey.replace(/ /g,"+")
}

