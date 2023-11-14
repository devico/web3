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

    it("Should create a new foundation", async function () {
      const donationAmount = parseEther("1.0");
      const tx = await fundsContract.connect(donor).createFoundation(user.address, "Charity", { value: donationAmount });

      await expect(tx)
          .to.emit(fundsContract, "NewFoundationCreated")
          .withArgs(donor.address, user.address, "Charity");
    });
  });

  describe('Donation and Transfer', () => {
    it('Should accept donations', async () => {
      const donationAmount = parseEther("1.0");
      await expect(() => user.sendTransaction({ to: fundsContract.address, value: donationAmount }))
        .to.changeEtherBalance(fundsContract, donationAmount);
    });

    it('Should transfer funds to recipient foundation', async () => {
      const foundationFactory = await ethers.getContractFactory('FoundationContract', deployer);
      const foundation = await foundationFactory.deploy(await user.getAddress(), 'Test Foundation');

      const donationAmount = parseEther("1.0");
      await user.sendTransaction({ to: foundation.address, value: donationAmount });

      await fundsContract.transferFundsToReceiver(foundation.address, donationAmount);

      const foundationBalance = await ethers.provider.getBalance(foundation.address);
      expect(foundationBalance).to.equal(donationAmount);
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
