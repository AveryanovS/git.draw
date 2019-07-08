const { repo, commits, date } = require('./config.json');
const exec = require('child_process').exec;
const moment = require('moment');
const fs = require('fs');
const { scheduleJob } = require('node-schedule');


const commit = (count = 1) => {
    fs.appendFile(`${__dirname}/repo/file.txt`, String( new Date() ), error => {
        if(error)
            return console.error(error);
        console.log(`commiting, ${count - 1} left`);
        exec(`cd ${__dirname}/repo; git add -A; git commit -m "commit_of_${moment().format('DD-MM-YYYY')}"; git push --set-upstream origin master;`,
            (_error, stdout, stderr) => {
                console.log(stdout);
                console.error(stderr);
                if(count > 0)
                    commit(count - 1);
            });
    });
};

const dailyJob = () => {
    const commitsIndex = moment().startOf('day').diff(moment(date).startOf('day'), 'days');
    if(commitsIndex < 0)
        console.log('too early', commitsIndex);
    else
        exec(`cd ${__dirname}/repo; git init; git remote add origin ${repo}`,
            (_err, stdout, stderr) => {
                console.log(stdout);
                console.error(stderr);
                commit(commits[commitsIndex]);
            });
};

scheduleJob('30 11 * * * *', checkRequests);

