# Git draw

Tool for automatic drawing picture/text by commits on you git profile line

### Installing

Clone the repo 
```
git clone git@github.com:AveryanovS/git.draw.git
```

Install modules
```
cd git.draw
npm install
```

### Usage

Launch web interface
```
node index
```

* Open http://localhost:8080 in your browser
* Draw, enter your repo url and save

After saving, you just need to start commit.js, for example by pm2
```
pm2 start commit.js
```
