const { repo, commits, date } = require('./config.json');
const exec = require('child_process').exec;
const moment = require('moment');
const fs = require('fs');

const commitsIndex = moment().startOf('day').diff(moment(date).startOf('day'), 'days');

const commit = (count = 1) => {
    fs.appendFile('repo/file.txt', String( new Date() ), error => {
        if(error)
            return console.error(error);
        console.log(`commiting, ${count - 1} left`);
        exec(`cd repo; git add -A; git commit -m "commit_of_${moment().format('DD-MM-YYYY')}"; git push --set-upstream origin master;`,
            (_error, stdout, stderr) => {
                console.log(stdout);
                console.error(stderr);
                if(count > 0)
                    commit(count - 1);
            });
    });
};

if(commitsIndex < 0)
    console.log('too early', commitsIndex);
else
    exec(`cd repo; git init; git remote add origin ${repo}`,
        (_err, stdout, stderr) => {
            console.log(stdout);
            console.error(stderr);
            commit(commits[commitsIndex]);
        });
