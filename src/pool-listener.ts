import { ethers } from "ethers"
import socketIO from './socket';

interface IAddresse {
    [key:string] : string
}

const addresses: IAddresse  = {
	factory: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
}

class PoolListener {

    private readonly url: string = "";
    private readonly provider: ethers.providers.WebSocketProvider;
    private readonly factoryContract: ethers.Contract;

    constructor(url: string){
        this.url = url;
        try{

            this.provider = new ethers.providers.WebSocketProvider(this.url);
 

        }catch(e){

            throw new Error("failed to connect to provider");

        }
 

        this.factoryContract = new ethers.Contract(
            addresses.factory,
            [
                'event PairCreated(address indexed token0, address indexed token1, address pair, uint256)'
            ],
            this.provider
        );
    }

    public async start(): Promise<void> {

        this.setupEvents();
        await this.provider.ready;
        this.pingRoutine();
    }

    private pingRoutine(): void {
        setInterval( () => {
            this.provider._websocket.ping();
        }, 10000 )
    }

    private async setupEvents(): Promise<void>{
        this.factoryContract.on("PairCreated", this.pairCreated.bind(this));
    }

    private async pairCreated(token0: string, token1: string, pairAdress: string): Promise<void>{
        let token0Name: string = await this.getName(token0);
        let token1Name: string = await this.getName(token1);

        const string: String = `
        New pair detected\n
        token0: ${token0}\n
            \tname: ${token0Name}\n
        token1: ${token1}\n
            \tname: ${token1Name}\n
        pairAddress: ${pairAdress}\n   
        `

        console.log(string);

        let resJson: Object = {
            "token0": token0,
            "token1": token1,
            "token0Name": token0Name,
            "token1Name": token1Name,
            "pairAddress": pairAdress
        }
        resJson = JSON.stringify(resJson);
        
        socketIO.emit("newPool", resJson)
    }

    private async getName(token: string): Promise<string> {
        const contract: ethers.Contract = new ethers.Contract(
            token,
            ['function name() view returns (string)'],
            this.provider
        );
    
        let name: string = await contract.name();
    
        return name;
    }
}

const url : string = "wss://bsc-ws-node.nariox.org:443"
// const url: string = "wss://bsc.getblock.io/mainnet/?api_key=e7393ca5-b710-4444-93a9-8a73e4b1847e"
// const url: string = "wss://apis.ankr.com/wss/4992bb94c9ad45b5bac884081abb5dc7/fe57c79f6a5e1a368d2fc8f20cdf585a/binance/full/main/"
// const url: string = "https://apis.ankr.com/4992bb94c9ad45b5bac884081abb5dc7/fe57c79f6a5e1a368d2fc8f20cdf585a/binance/full/main"
 
const poolListener = new PoolListener(url);

export default poolListener;