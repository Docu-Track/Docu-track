![GitHub last commit](https://img.shields.io/github/last-commit/Docu-Track/Docu-track?style=flat&logo=github)
![Lines of code](https://img.shields.io/tokei/lines/github/Docu-Track/Docu-track?style=flat&logo=github)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Docu-Track/Docu-track?style=flat&logo=github)

# Welcome to DocuTrack!
>This demo was performed on goerli testnet but it works on any other testnet as well.
## Overview:
DocuTrack, your one place for the all your publicly viewable documents.
Important documents such as membership certificates, skills certificates, award certificates and property deeds have long suffered from fraud, misplacement, mistakes and false information. Blockchain technology has the ability to solve this problem. Blockchain has the ability to store information using ipfs that is publicly available and tamperproof. IPFS is p2p solution for storing documents distributed over data nodes spread across the world.DocuTrack is a project that encroporate IPFS and blockchain technology to fulfill these needs.

> [Certified Ethical Developer UseCase](https://docu-track-open.vercel.app/)

> [Open Access Implementation](https://docu-track.vercel.app/)

## Intstallion steps:
* Create an Alchemy account, create a new project in your dashboard 
* Clone this repo with `git clone https://github.com/Docu-Track/Docu-track.git`
* `cd DocuTrack`
* Create .env with api key. follow below format, values without single or double quotes. 
```
APIKEYG=<Metamask Private key>
APIURLG=<Alchemy API URL (https)>
```
* Perform `npm install`
* if any hardhat erros are thrown while npm install (mostly due to no local install) please perform `npm hardhat install`
* once hardhat is installed, run `npx hardhat run .\scripts\deploy.js --network goerli`.
* Wait for the above process to complete, make sure to copy contract deployed for address. ( Here is the sample contract deployed address=> Contract deployed to: 0x8D8e40bC3Bb164aCeFA6d03205B4742DE0F228F0[remove this part]
* replace contract deployed address `(.\client\src\App.js =>"contractAddress")`
* replace newly created abi file [this should be generated part of npx hardhat process] `(.\artificats\contracts\Doc.sol\doc.json => .\client\src\doc.json)` 
* run `cd client`  and `npm install` finally perform `npm start` to fire up the front-end


## Customization tips:
* Try changing the token name and token symbol before deploying in Doc.sol.
