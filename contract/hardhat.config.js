/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require("@nomiclabs/hardhat-waffle");

 module.exports = {
   solidity: "0.8.0",
   networks: {
     rinkeby: {
       url: "https://eth-rinkeby.alchemyapi.io/v2/BX59fRl-6ru9W-bOSGtXYbwD4eDmncSX",
       accounts: ["b8b62e5de0726750c035e184a1505c51447468b4a00684b1197402efb163a1f0"]
     },
   },
 };