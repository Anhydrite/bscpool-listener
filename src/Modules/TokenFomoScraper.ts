import { JSDOM } from "jsdom";
import fetch, { Response } from "node-fetch";
import { is } from "typescript-is";

export interface ITokenFomoToken {
    addr: string,
    name: string,
    symbol: string,
    blockNum: number,
    blockTime: number,
    chainId: "BSC" | "ETH"
}

export type ITokenFomoTokenList = ITokenFomoToken[];

class TokenFomoScraper
{
    private readonly _url: URL = new URL("https://tokenfomo.io/");

    public constructor() { }

    private async _fetchHTMLContent(): Promise<string>
    {
        const response: Response = await fetch(this._url);
        const HTMLContent: string = await response.text();

        return HTMLContent;
    }

    public async getTokensList(): Promise<ITokenFomoTokenList>
    {
        const HTMLContent: string = await this._fetchHTMLContent();
        const DOM: JSDOM = new JSDOM(HTMLContent);
        // <script id="__NEXT_DATA__" type="application/json"> [JSON DATA] </script>
        const $script = DOM.window.document.getElementById("__NEXT_DATA__");

        if ($script instanceof DOM.window.HTMLElement)
        {
            const pageData: any = JSON.parse($script.innerHTML);
            const tokens: any = pageData.props.pageProps.tokens;

            if (is<ITokenFomoTokenList>(tokens))
            {
                return tokens;
            }

            throw new Error("Invalid data format");
        }

        throw new Error('Cannot find <script id="__NEXT_DATA__">');
    }
}

export const scraper: TokenFomoScraper = new TokenFomoScraper();