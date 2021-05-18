# Protocole Uniswap

## Whitepaper

https://uniswap.org/whitepaper.pdf
https://uniswap.org/whitepaper-v3.pdf

## Autres ressources

https://uniswap.org/docs/v2
https://uniswap.org/docs/v2/javascript-SDK/trading/
https://pintail.medium.com/uniswap-a-good-deal-for-liquidity-providers-104c0b6816f2
https://medium.com/scalar-capital/uniswap-a-unique-exchange-f4ef44f807bf
https://uniswap.org/docs/v2/advanced-topics/understanding-returns/
https://hackmd.io/@HaydenAdams/HJ9jLsfTz
https://medium.com/block-journal/uniswap-understanding-the-decentralised-ethereum-exchange-5ee5d7878996

# Concepts

## Approval

https://medium.com/ethex-market/erc20-approve-allow-explained-88d6de921ce9

Supposons :
- Mon addresse BSC : 0x801084df2d0960d741b2588616f097635fff36dd
- Router V2 Pancakeswap : 0x10ED43C718714eb63d5aA57B78B54704E256024E
- Contrat BEP20 PITJUPITER : 0x359f35085202c8527a0c767557339635a335eb76

Lors du clic sur "Approve PITJUPITER", une transaction est effectuée :
- PITJUPITER.approve(address(Router V2 Pancakeswap), uint256 [MONTANT DEFINI PAR PANCAKESWAP])

Maintenant, le Router de Pancakeswap a le droit le transférer des tokens PITJUPITER en mon nom, il faut donc approuver seulement les addresses de confiance (ici, celle du Router de Pancakeswap).

On peut vérifier cela :
- PITJUPITER.allowance(address(moi), address(Router V2 Pancakeswap))
-> retourne le montant

# Interagir avec les contrats de Pancakeswap

https://github.com/pancakeswap/pancakeswap-sdk-v2
https://youtu.be/bKWCdBi_vx8
https://github.com/jklepatch/eattheblocks/blob/master/screencast/348-pancakeswap-trading-bot/bot.js
https://github.com/ethers-io/ethers.js/
https://docs.ethers.io/v5/

# Bibliothèques JavaScript/TypeScript

- `typescript-is` : https://github.com/woutervh-/typescript-is
