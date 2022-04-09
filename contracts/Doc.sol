// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/security/Pausable.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "hardhat/console.sol";

//contract Doc is ERC721, Pausable, Ownable, ERC721Burnable, ERC721URIStorage {

contract Doc is ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Doc", "DUT") {}

    // function _baseURI() internal pure override returns (string memory) {
    //     return "http://staffmobility.eu/sites/default/files/isewtweetbg.jpg";
    // }

    // function pause() public onlyOwner {
    //     _pause();
    // }

    // function unpause() public onlyOwner {
    //     _unpause();
    // }

    // function safeMint(address to) public onlyOwner {
    //     uint256 tokenId = _tokenIdCounter.current();
    //     _tokenIdCounter.increment();
    //     _safeMint(to, tokenId);
    // }

    // function _beforeTokenTransfer(address from, address to, uint256 tokenId)
    //     internal
    //     whenNotPaused
    //     override
    // {
    //     super._beforeTokenTransfer(from, to, tokenId);
    // }

    function docuMint(address newowner, string memory tokenURI) public returns (uint256)  {
        _tokenIdCounter.increment();

        uint256 newItemId = _tokenIdCounter.current();
        _mint(newowner, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
    function drop() public {
            console.log("Test");
    }
}
