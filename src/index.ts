/** INDEX **/
import poolListener from "./pool-listener";
import { Request, Response } from "express";
import socketIO from './socket';
import { app, server} from "./servers"

app.get('/', (req: Request, res: Response) => {
    res.sendFile(__dirname + '/index.html')
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});



poolListener.start();