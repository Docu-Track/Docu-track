//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract CareerFair {

    address public owner;
    string public companyName;
    address[] public enrolledStudents;
    string[] public addedCompanies;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    event CompanyAdded(
        string companyName
    );

    constructor() {
        owner = msg.sender;

        addedCompanies.push("Amazon");
        addedCompanies.push("Google");
        addedCompanies.push("Apple");
        addedCompanies.push("Microsoft");
        addedCompanies.push("Meta");
        addedCompanies.push("Gemini");
        addedCompanies.push("SecureEd");
    }

    function enroll() public returns(string memory){
        address _student = msg.sender;
        if (enrolledStudents.length == 0) {
            enrolledStudents.push(_student);

        } else if (enrolledStudents.length > 0) {

            for (uint i = 0; i < enrolledStudents.length; i++){

                // bytes32 _enrolledStudent = keccak256(abi.encodePacked(enrolledStudents[i]));
                // bytes32 __student = keccak256(abi.encodePacked(_student));

                if (_student == enrolledStudents[i]) {
                    return "Student already registered";
                }
            }
            enrolledStudents.push(_student);
            return "";
        }
    }
    
    function getAttendees() view public returns(address[] memory){
        return enrolledStudents;
    } 
    function getCompanies() view public returns(string[] memory){
        return addedCompanies;
    } 

    function add(string memory _companyName) public onlyOwner returns(string memory) {
        for (uint i = 0; i < addedCompanies.length; i++) {

            bytes32 _addedCompany = keccak256(abi.encodePacked(addedCompanies[i]));
            bytes32 __companyName = keccak256(abi.encodePacked(_companyName));

            if (__companyName == _addedCompany) {
                return "Company already exists";
            }
        }
        addedCompanies.push(_companyName);
        return "";
    }

    function unEnroll() public returns(string memory) {
        address _student = msg.sender;
        bool check = false;
        for (uint i = 0; i < enrolledStudents.length; i++) {

            bytes32 _enrolledStudent = keccak256(abi.encodePacked(enrolledStudents[i]));
            bytes32 __student = keccak256(abi.encodePacked(_student));

            if (__student == _enrolledStudent) {
                enrolledStudents[i] = enrolledStudents[enrolledStudents.length - 1];
                check = true;
                enrolledStudents.pop();
            }
        }
        if (check == false) {
            return "You are not enrolled in the career fair";
        } else{
            return "You have been unenrolled from the career fair";
        }
    }
}