# Blockchain Final Project
First of all, `cd` into this Repo.

## [Demo Page](http://140.112.21.12:7070)
If you encounter issues, please contact me by `leo19941227@gmail.com`.
I will check the status of the demo server ASAP. Thanks!

## Local Development

### Run the server which serves static files

```bash
python3 -m http.server --bind localhost
```

### Run the server which reads blocks from the chain
1. Install packages
```bash
npm install web3
npm install quorum-js
```

2. Run the server
```bash
node server.js
```

### Preview Webpage
You can access the webpage at `http://127.0.0.1`
