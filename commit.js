const { repo, commits, date } = require('./config.json');
const exec = require('child_process').exec;
const moment = require('moment');
const fs = require('fs');
console.log(moment(date).diff(moment(), 'days'));
exec(`cd repo; git init; git remote add origin ${repo}`,
    () => {
        fs.appendFile('repo/file.txt', String( new Date() ), error => {
            if(error)
                return console.error(error);
            exec(`git add -A; git commit -m "commit_of_${moment().format('DD-MM-YYYY')}"; git push --set-upstream origin master;`,
                (_error, stdout, stderr) => {
                    console.log(stdout);
                    console.error(stderr);
                });
        });
    });
