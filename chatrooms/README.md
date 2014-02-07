# install

This chatroom uses a few 3rd-party modules on the npm registry. With [npm](http://npmjs.org) do:

```
npm install -g mime
```

```
npm install -g socket.io
```

```
npm install -g ngrok
```

# usage


```
$ node server.js
```

The server is listening on port 3000. The output from the console includes the url with which you can access the chatroom (tunneling with [ngrok](https://npmjs.org/package/ngrok)). 
