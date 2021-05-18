import { Db, MongoClient } from "mongodb";

export class MongoManager
{
    private readonly _client = new MongoClient(this.connectionString, {
        useUnifiedTopology: true
    });

    public constructor
    (
        //private readonly _username: string,
        //private readonly _password: string,
        private readonly _host: string,
        private readonly _port: number
    ) { }

    public get connectionString(): string
    {
        return `mongodb://${this._host}:${this._port}`;
        //return `mongodb://${this._username}:${this._password}@${this._host}:${this._port}`;
    }

    private async _getClient(): Promise<MongoClient>
    {
        if (!this._client.isConnected())
        {
            console.log(`Connecting to ${this.connectionString}`);
            await this._client.connect();
        }

        return this._client;
    }

    public async selectDatabase(databaseName: string): Promise<Db>
    {
        const connectedClient: MongoClient = await this._getClient();

        return connectedClient.db(databaseName);
    }
}