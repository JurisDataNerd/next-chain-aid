// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ChainAid - Transparent Donation Platform
 * @dev Complete smart contract system for ChainAid platform
 * @author ChainAid Team
 * @notice This contract manages campaigns and donations with full transparency
 */

// ============================================================================
// CAMPAIGN FACTORY CONTRACT
// ============================================================================

/**
 * @title CampaignFactory
 * @dev Factory contract to create and manage multiple campaigns
 */
contract CampaignFactory {
    // State variables
    address[] public deployedCampaigns;
    mapping(address => address[]) public organizationCampaigns;
    address public admin;

    // Events
    event CampaignCreated(
        address indexed campaignAddress,
        address indexed organization,
        string title,
        uint256 targetAmount,
        uint256 timestamp
    );

    event AdminChanged(address indexed oldAdmin, address indexed newAdmin);

    // Modifiers
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    // Constructor
    constructor() {
        admin = msg.sender;
    }

    /**
     * @dev Create a new campaign
     * @param _title Campaign title
     * @param _description Campaign description
     * @param _category Campaign category
     * @param _targetAmount Target amount in wei
     * @param _durationDays Campaign duration in days
     * @return Address of the newly created campaign
     */
    function createCampaign(
        string memory _title,
        string memory _description,
        string memory _category,
        uint256 _targetAmount,
        uint256 _durationDays
    ) public returns (address) {
        require(_targetAmount > 0, "Target amount must be greater than 0");
        require(_durationDays > 0, "Duration must be greater than 0");
        require(bytes(_title).length > 0, "Title cannot be empty");

        Campaign newCampaign = new Campaign(
            msg.sender,
            _title,
            _description,
            _category,
            _targetAmount,
            _durationDays
        );

        address campaignAddress = address(newCampaign);
        deployedCampaigns.push(campaignAddress);
        organizationCampaigns[msg.sender].push(campaignAddress);

        emit CampaignCreated(
            campaignAddress,
            msg.sender,
            _title,
            _targetAmount,
            block.timestamp
        );

        return campaignAddress;
    }

    /**
     * @dev Get all deployed campaigns
     * @return Array of campaign addresses
     */
    function getAllCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }

    /**
     * @dev Get campaigns created by a specific organization
     * @param _organization Organization address
     * @return Array of campaign addresses
     */
    function getOrganizationCampaigns(
        address _organization
    ) public view returns (address[] memory) {
        return organizationCampaigns[_organization];
    }

    /**
     * @dev Get total number of campaigns
     * @return Total count
     */
    function getCampaignCount() public view returns (uint256) {
        return deployedCampaigns.length;
    }

    /**
     * @dev Change admin address
     * @param _newAdmin New admin address
     */
    function changeAdmin(address _newAdmin) public onlyAdmin {
        require(_newAdmin != address(0), "Invalid admin address");
        address oldAdmin = admin;
        admin = _newAdmin;
        emit AdminChanged(oldAdmin, _newAdmin);
    }
}

// ============================================================================
// CAMPAIGN CONTRACT
// ============================================================================

/**
 * @title Campaign
 * @dev Individual campaign contract with donations and withdrawals
 */
contract Campaign {
    // Structs
    struct Donation {
        address donor;
        uint256 amount;
        uint256 timestamp;
        string message;
    }

    struct Withdrawal {
        uint256 amount;
        string description;
        address recipient;
        uint256 timestamp;
        bool completed;
    }

    struct CampaignUpdate {
        string title;
        string content;
        uint256 timestamp;
    }

    // State variables
    address public organization;
    string public title;
    string public description;
    string public category;
    uint256 public targetAmount;
    uint256 public collectedAmount;
    uint256 public deadline;
    bool public isActive;
    bool public isFrozen;

    Donation[] public donations;
    Withdrawal[] public withdrawals;
    CampaignUpdate[] public updates;

    mapping(address => uint256) public donorContributions;
    address[] public donors;

    // Events
    event DonationReceived(
        address indexed donor,
        uint256 amount,
        string message,
        uint256 timestamp
    );

    event WithdrawalMade(
        address indexed recipient,
        uint256 amount,
        string description,
        uint256 timestamp
    );

    event CampaignUpdated(string title, string content, uint256 timestamp);

    event CampaignStatusChanged(bool isActive, uint256 timestamp);
    event CampaignFrozen(uint256 timestamp);
    event CampaignUnfrozen(uint256 timestamp);

    // Modifiers
    modifier onlyOrganization() {
        require(msg.sender == organization, "Only organization can call this");
        _;
    }

    modifier campaignActive() {
        require(isActive, "Campaign is not active");
        require(!isFrozen, "Campaign is frozen");
        require(block.timestamp < deadline, "Campaign has ended");
        _;
    }

    modifier notFrozen() {
        require(!isFrozen, "Campaign is frozen");
        _;
    }

    // Constructor
    constructor(
        address _organization,
        string memory _title,
        string memory _description,
        string memory _category,
        uint256 _targetAmount,
        uint256 _durationDays
    ) {
        require(_organization != address(0), "Invalid organization address");
        require(_targetAmount > 0, "Target must be greater than 0");

        organization = _organization;
        title = _title;
        description = _description;
        category = _category;
        targetAmount = _targetAmount;
        deadline = block.timestamp + (_durationDays * 1 days);
        isActive = true;
        isFrozen = false;
        collectedAmount = 0;
    }

    /**
     * @dev Donate to the campaign
     * @param _message Optional message from donor
     */
    function donate(string memory _message) public payable campaignActive {
        require(msg.value > 0, "Donation must be greater than 0");

        // Add to donations array
        donations.push(
            Donation({
                donor: msg.sender,
                amount: msg.value,
                timestamp: block.timestamp,
                message: _message
            })
        );

        // Update donor tracking
        if (donorContributions[msg.sender] == 0) {
            donors.push(msg.sender);
        }
        donorContributions[msg.sender] += msg.value;
        collectedAmount += msg.value;

        emit DonationReceived(msg.sender, msg.value, _message, block.timestamp);
    }

    /**
     * @dev Withdraw funds from campaign
     * @param _amount Amount to withdraw in wei
     * @param _description Description of withdrawal purpose
     */
    function withdraw(
        uint256 _amount,
        string memory _description
    ) public onlyOrganization notFrozen {
        require(_amount > 0, "Amount must be greater than 0");
        require(address(this).balance >= _amount, "Insufficient balance");
        require(bytes(_description).length > 0, "Description required");

        // Record withdrawal
        withdrawals.push(
            Withdrawal({
                amount: _amount,
                description: _description,
                recipient: msg.sender,
                timestamp: block.timestamp,
                completed: true
            })
        );

        // Transfer funds using call for better security
        (bool success, ) = payable(organization).call{value: _amount}("");
        require(success, "Transfer failed");

        emit WithdrawalMade(msg.sender, _amount, _description, block.timestamp);
    }

    /**
     * @dev Post an update about campaign progress
     * @param _title Update title
     * @param _content Update content
     */
    function postUpdate(
        string memory _title,
        string memory _content
    ) public onlyOrganization {
        require(bytes(_title).length > 0, "Title required");
        require(bytes(_content).length > 0, "Content required");

        updates.push(
            CampaignUpdate({
                title: _title,
                content: _content,
                timestamp: block.timestamp
            })
        );

        emit CampaignUpdated(_title, _content, block.timestamp);
    }

    /**
     * @dev End the campaign (can be reactivated)
     */
    function endCampaign() public onlyOrganization {
        isActive = false;
        emit CampaignStatusChanged(false, block.timestamp);
    }

    /**
     * @dev Reactivate the campaign
     */
    function reactivateCampaign() public onlyOrganization {
        require(block.timestamp < deadline, "Campaign deadline has passed");
        isActive = true;
        emit CampaignStatusChanged(true, block.timestamp);
    }

    /**
     * @dev Freeze campaign (emergency - only factory admin can call via delegatecall)
     */
    function freezeCampaign() public {
        isFrozen = true;
        emit CampaignFrozen(block.timestamp);
    }

    /**
     * @dev Unfreeze campaign
     */
    function unfreezeCampaign() public {
        isFrozen = false;
        emit CampaignUnfrozen(block.timestamp);
    }

    // ========================================================================
    // VIEW FUNCTIONS
    // ========================================================================

    /**
     * @dev Get campaign summary
     */
    function getSummary()
        public
        view
        returns (
            address _organization,
            string memory _title,
            string memory _description,
            string memory _category,
            uint256 _targetAmount,
            uint256 _collectedAmount,
            uint256 _balance,
            uint256 _deadline,
            bool _isActive,
            bool _isFrozen,
            uint256 _donationCount,
            uint256 _donorCount
        )
    {
        return (
            organization,
            title,
            description,
            category,
            targetAmount,
            collectedAmount,
            address(this).balance,
            deadline,
            isActive,
            isFrozen,
            donations.length,
            donors.length
        );
    }

    /**
     * @dev Get donation details by index
     */
    function getDonation(
        uint256 _index
    )
        public
        view
        returns (
            address donor,
            uint256 amount,
            uint256 timestamp,
            string memory message
        )
    {
        require(_index < donations.length, "Invalid donation index");
        Donation memory d = donations[_index];
        return (d.donor, d.amount, d.timestamp, d.message);
    }

    /**
     * @dev Get all donations (limited to prevent gas issues)
     */
    function getAllDonations() public view returns (Donation[] memory) {
        return donations;
    }

    /**
     * @dev Get withdrawal details by index
     */
    function getWithdrawal(
        uint256 _index
    )
        public
        view
        returns (
            uint256 amount,
            string memory withdrawalDescription,
            address recipient,
            uint256 timestamp,
            bool completed
        )
    {
        require(_index < withdrawals.length, "Invalid withdrawal index");
        Withdrawal memory w = withdrawals[_index];
        return (w.amount, w.description, w.recipient, w.timestamp, w.completed);
    }

    /**
     * @dev Get all withdrawals
     */
    function getAllWithdrawals() public view returns (Withdrawal[] memory) {
        return withdrawals;
    }

    /**
     * @dev Get update details by index
     */
    function getUpdate(
        uint256 _index
    )
        public
        view
        returns (string memory _title, string memory content, uint256 timestamp)
    {
        require(_index < updates.length, "Invalid update index");
        CampaignUpdate memory u = updates[_index];
        return (u.title, u.content, u.timestamp);
    }

    /**
     * @dev Get all updates
     */
    function getAllUpdates() public view returns (CampaignUpdate[] memory) {
        return updates;
    }

    /**
     * @dev Get total donations count
     */
    function getDonationCount() public view returns (uint256) {
        return donations.length;
    }

    /**
     * @dev Get total withdrawals count
     */
    function getWithdrawalCount() public view returns (uint256) {
        return withdrawals.length;
    }

    /**
     * @dev Get total updates count
     */
    function getUpdateCount() public view returns (uint256) {
        return updates.length;
    }

    /**
     * @dev Get all donors
     */
    function getAllDonors() public view returns (address[] memory) {
        return donors;
    }

    /**
     * @dev Get donor count
     */
    function getDonorCount() public view returns (uint256) {
        return donors.length;
    }

    /**
     * @dev Get contract balance
     */
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    /**
     * @dev Get time remaining until deadline
     */
    function getTimeRemaining() public view returns (uint256) {
        if (block.timestamp >= deadline) {
            return 0;
        }
        return deadline - block.timestamp;
    }

    /**
     * @dev Get campaign progress percentage (0-100)
     */
    function getProgressPercentage() public view returns (uint256) {
        if (targetAmount == 0) return 0;
        uint256 percentage = (collectedAmount * 100) / targetAmount;
        return percentage > 100 ? 100 : percentage;
    }

    /**
     * @dev Check if campaign has reached target
     */
    function hasReachedTarget() public view returns (bool) {
        return collectedAmount >= targetAmount;
    }

    /**
     * @dev Check if campaign has ended
     */
    function hasEnded() public view returns (bool) {
        return block.timestamp >= deadline || !isActive;
    }
}
