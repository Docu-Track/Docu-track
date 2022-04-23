// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "hardhat/console.sol";

//contract Doc is ERC721, Pausable, Ownable, ERC721Burnable, ERC721URIStorage {

contract Doc is ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    mapping(address => user) public users;

    constructor() ERC721("Doc", "DUT") {}

    struct user {
        address curruser;
        uint256 tokenid;
    }

    function docuMint(address newowner, string memory tokenURI)
        public
        returns (uint256)
    {
        if (tx.origin == msg.sender && users[msg.sender].tokenid == 0) {
            users[msg.sender].curruser = msg.sender;
            _tokenIdCounter.increment();

            uint256 newItemId = _tokenIdCounter.current();
            _mint(newowner, newItemId);
            _setTokenURI(newItemId, tokenURI);
            users[msg.sender].tokenid = newItemId;
            console.log(newItemId);
            return newItemId;
        } else {
            console.log(
                "Can't be added"
            );
            return 1;
        }
    }
    function verify() public view returns (uint256){
        return users[msg.sender].tokenid;
    }
}
