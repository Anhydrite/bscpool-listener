const { Server } = require("socket.io");
import { server } from "./servers"

class SocketIO
{

  private io;
  
  constructor() {

    this.io = new Server(server);

  }

 

  public emit(eventType: String, message: Object) {

    this.io.emit(eventType, message);
  
  }

}

const socketIO = new SocketIO();

export default socketIO;