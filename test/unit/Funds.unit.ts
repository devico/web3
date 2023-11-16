import { expect } from 'chai';
import { ethers } from 'hardhat';
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { Contract } from "ethers";
import { Funds, FoundationContract } from "../../typechain"

const { parseEther } = ethers.utils

describe('Funds Contract', () => {
  let deployer: SignerWithAddress;
  let foundationOwner: SignerWithAddress;
  let donor: SignerWithAddress;
  let nonDonor: SignerWithAddress;
  let user: SignerWithAddress;
  let fundsContract: Funds;
  let foundation: FoundationContract;
  const description = "Test Foundation";
  const donationAmount = parseEther("1.0");

  beforeEach(async () => {
    [deployer, donor, foundationOwner, user, nonDonor] = await ethers.getSigners();

    const FundsFactory = await ethers.getContractFactory('Funds', deployer);
    fundsContract = await FundsFactory.deploy();

    const FoundationContractFactory = await ethers.getContractFactory("FoundationContract");
    foundation = await FoundationContractFactory.deploy(user.address, description, { value: donationAmount });
  });

  describe('Creation and Ownership', () => {
    it('Should deploy Funds contract', async () => {
      expect(fundsContract.address).to.not.equal(undefined);
    });

    it('Should set deployer as the owner', async () => {
      expect(await fundsContract.owner()).to.equal(await deployer.getAddress());
    });

    it("should correctly create a foundation and register its address", async function () {
      const receiverAddress = await user.getAddress();
    
      const foundationTx = await fundsContract.connect(donor).createFoundation(receiverAddress, "Test Description", { value: donationAmount });
      const foundationReceipt = await foundationTx.wait();
    
      const foundationCreatedEvent = foundationReceipt.events?.find(e => e.event === "NewFoundationCreated");
      const foundationAddress = foundationCreatedEvent?.args?.foundationAddress;
      expect(foundationAddress).to.not.be.undefined;
    
      const registeredOwner = await fundsContract.foundations(foundationAddress);
      expect(registeredOwner).to.equal(await donor.getAddress());
    });
  });

  describe('Donation and Transfer', () => {
    it('Should accept donations', async () => {
      const donationAmount = parseEther("1.0");
      await expect(() => user.sendTransaction({ to: fundsContract.address, value: donationAmount }))
        .to.changeEtherBalance(fundsContract, donationAmount);
    });

    it("should allow foundation owner to transfer funds", async function () {
      const receiverAddress = await user.getAddress();
    
      const foundationTx = await fundsContract.connect(donor).createFoundation(receiverAddress, "Test Foundation", { value: donationAmount });
      const foundationReceipt = await foundationTx.wait();
      const foundationCreatedEvent = foundationReceipt.events?.find(e => e.event === "NewFoundationCreated");
      const foundationAddress = foundationCreatedEvent?.args?.foundationAddress;
      expect(foundationAddress).to.not.be.undefined;
    
      const registeredOwner = await fundsContract.foundations(foundationAddress);
      expect(registeredOwner).to.equal(await donor.getAddress());
    
      const initialBalance = await ethers.provider.getBalance(foundationAddress);
    
      await fundsContract.connect(donor).transferFundsToReceiver(foundationAddress, donationAmount);
    
      const finalBalance = await ethers.provider.getBalance(foundationAddress);
      expect(finalBalance).to.be.below(initialBalance);
    });
  
    it("should prevent non-owner from transferring funds", async function () {
      await expect(fundsContract.connect(nonDonor).transferFundsToReceiver(foundation.address, donationAmount))
        .to.be.revertedWithCustomError(fundsContract, "NotFoundationOwner");
    });
  
    it("should revert transfer with zero ether", async function () {
      const zeroAmount = ethers.utils.parseEther("0");
      await expect(fundsContract.connect(donor).transferFundsToReceiver(foundation.address, zeroAmount))
        .to.be.revertedWithCustomError(fundsContract, 'ZeroEther');
    });
  
    it("should revert transfer to non-existing foundation", async function () {
      const nonExistingFoundation = ethers.Wallet.createRandom().address;
      await expect(fundsContract.connect(donor).transferFundsToReceiver(nonExistingFoundation, donationAmount))
        .to.be.reverted;
    });
  
    it('Should revert if funds amount is zero', async () => {
      await expect(user.sendTransaction({ to: fundsContract.address, value: 0 }))
        .to.be.revertedWithCustomError(fundsContract, 'ZeroEther');
    });

    it("Should revert on zero ether send", async function () {
      await expect(fundsContract.transferFundsToReceiver(foundation.address, 0))
        .to.be.revertedWithCustomError(fundsContract, 'ZeroEther');
    });
  });
});

describe('FoundationContract', () => {
  let deployer: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let receiver: SignerWithAddress;
  let failingReceiver: Contract;
  let foundationContract: FoundationContract;

  beforeEach(async () => {
    [deployer, nonOwner, receiver] = await ethers.getSigners();

    const FoundationContractFactory = await ethers.getContractFactory('FoundationContract', deployer);
    foundationContract = await FoundationContractFactory.deploy(await receiver.getAddress(), 'Test Description');
  });

  describe('Creation and Ownership', () => {
    it('Should deploy FoundationContract', async () => {
      expect(foundationContract.address).to.not.equal(undefined);
    });

    it('Should set the correct receiver and description', async () => {
      expect(await foundationContract.receiver()).to.equal(await receiver.getAddress());
      expect(await foundationContract.description()).to.equal('Test Description');
    });
  });

  describe('Donation', () => {
    it('Should revert if donation amount is zero', async () => {
      await expect(receiver.sendTransaction({ to: foundationContract.address, value: 0 }))
        .to.be.revertedWithCustomError(foundationContract, 'ZeroEther');
    });

    it('Should accept donations', async () => {
      const donationAmount = parseEther("1.0");
      await expect(() => receiver.sendTransaction({ to: foundationContract.address, value: donationAmount }))
        .to.changeEtherBalance(foundationContract, donationAmount);
    });

    it("should correctly handle subsequent donations from the same address", async function () {
      const donationAmount = parseEther("1.0");
      await foundationContract.connect(nonOwner).donate({ value: donationAmount });
  
      let totalDonated = await foundationContract.donations(nonOwner.getAddress());
      expect(totalDonated).to.equal(donationAmount);
  
      await foundationContract.connect(nonOwner).donate({ value: donationAmount });
  
      totalDonated = await foundationContract.donations(nonOwner.getAddress());
      expect(totalDonated).to.equal(donationAmount.mul(2));
    });
  });

  describe("Send funds to receiver", function () {
    it("Should allow owner to send funds to receiver", async function () {
      const donationAmount = parseEther("0.5");

      await receiver.sendTransaction({ to: foundationContract.address, value: donationAmount });
      
      await expect(foundationContract.connect(deployer).sendFundsToReceiver(donationAmount))
        .to.changeEtherBalances([foundationContract, receiver], [donationAmount.mul(-1), donationAmount]);
    });

    it("Should prevent non-owners from sending funds", async function () {
      const donationAmount = parseEther("0.5");
      await expect(foundationContract.connect(nonOwner).sendFundsToReceiver(donationAmount))
        .to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should revert on zero ether send", async function () {
      await expect(foundationContract.sendFundsToReceiver(0))
        .to.be.revertedWithCustomError(foundationContract, 'ZeroEther');
    });

    it("Should handle EtherSendError correctly", async function () {
      const FailingReceiverFactory = await ethers.getContractFactory("FailingReceiver", deployer);
      failingReceiver = await FailingReceiverFactory.deploy();

      const FoundationContractFactory = await ethers.getContractFactory("FoundationContract", deployer);
      const newFoundation = await FoundationContractFactory.deploy(failingReceiver.address, "Test Foundation", { value: parseEther("1.0") });

      const donationAmount = parseEther("1.0");
      await expect(newFoundation.sendFundsToReceiver(donationAmount))
        .to.be.revertedWithCustomError(foundationContract, 'EtherSendError');
    });
  });
});
