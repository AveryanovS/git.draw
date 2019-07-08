const { repo, commits, date } = require('./config.json');
const exec = require('child_process').exec;
const moment = require('moment');
const fs = require('fs');
const { scheduleJob } = require('node-schedule');

const repoParts = ( repo.split('/').splice(-1) )[0].split('.');
repoParts.splice(-1);
const repoName = repoParts.join('.');

fs.exists(`${__dirname}/${repoName}`, exists => {
    if(!exists)
        return exec(`cd ${__dirname}; git clone ${repo}`,
            (error, stdout, stderr) => {
                console.log(stdout);
                console.error(stderr);
                if(error)
                    return console.error(error);
                fs.appendFile(`${__dirname}/${repoName}/file.txt`, String(new Date()), error => {
                    if(error)
                        console.error(error);
                    console.log('repo ready');
                });
            });
    console.log('repo ready');
});

const commit = (count = 1) => {
    fs.appendFile(`${__dirname}/${repoName}/file.txt`, String( new Date() ), error => {
        if(error)
            return console.error(error);
        console.log(new Date(), `commiting, ${count - 1} left`);
        exec(`cd ${__dirname}/${repoName}; git add -A; git commit -m "commit_of_${moment().format('DD-MM-YYYY')}"; git push --set-upstream origin master;`,
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
        console.log(new Date(), 'too early', commitsIndex);
    else
        exec(`cd ${__dirname}/${repoName}; git init; git remote add origin ${repo}`,
            (_error, stdout, stderr) => {
                console.log(stdout);
                console.error(stderr);
                commit(commits[commitsIndex]);
            });
};

scheduleJob('0 0 10 * * *', dailyJob);

