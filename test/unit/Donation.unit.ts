import { expect } from "chai"
import { ethers } from "hardhat"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { Donation } from "../../typechain"

const { parseEther } = ethers.utils

describe("Donation Contract", () => {
  let donationContract: Donation
  let owner: SignerWithAddress
  let user: SignerWithAddress
  let user2: SignerWithAddress

  beforeEach(async () => {
      [owner, user, user2] = await ethers.getSigners()

      const donationContractFactory = await ethers.getContractFactory("Donation")
      donationContract = await donationContractFactory.connect(owner).deploy()
  })
  describe("Contract initialization", () => {
      it("Should have the correct owner address", async () => {
          expect(await donationContract.owner()).to.equal(owner.address)
      })
  })

  describe("Recieve and save donations", () => {
    it("Should accept donations", async () => {
        const donationAmount = parseEther("1.0")
        await expect(() =>
            user.sendTransaction({ to: donationContract.address, value: donationAmount })
        ).to.changeEtherBalance(donationContract, donationAmount)
    })

    it("Should store donor information", async () => {
        const donationAmount = parseEther("2.0")
        await user.sendTransaction({ to: donationContract.address, value: donationAmount })

        const donators = await donationContract.getDonators()
        expect(donators).to.include(user.address)
    })

    it("Should revert with ZeroEther if donation is zero", async () => {
      await expect(user.sendTransaction({ to: donationContract.address, value: 0 }))
          .to.be.revertedWithCustomError(donationContract, 'ZeroEther');
    });

    it("Should only add new donators once", async () => {
        const donationAmount = parseEther("1.0");
        await user.sendTransaction({ to: donationContract.address, value: donationAmount });
        await user.sendTransaction({ to: donationContract.address, value: donationAmount });

        const donators = await donationContract.getDonators();
        const occurrences = donators.filter((addr) => addr === user.address).length;
        expect(occurrences).to.equal(1);
    });

    it("Should accumulate donations for a single address", async () => {
        const donationAmount1 = parseEther("1.0");
        const donationAmount2 = parseEther("2.0");

        await user.sendTransaction({ to: donationContract.address, value: donationAmount1 });
        await user.sendTransaction({ to: donationContract.address, value: donationAmount2 });

        const totalDonated = await donationContract.donations(user.address);
        expect(totalDonated).to.equal(donationAmount1.add(donationAmount2));
    });
  })

  describe("Get sum of donations", () => {
    it("Should calculate total donations", async () => {
        const donationAmount1 = parseEther("1.0")
        const donationAmount2 = parseEther("2.0")

        await user.sendTransaction({ to: donationContract.address, value: donationAmount1 })
        await owner.sendTransaction({ to: donationContract.address, value: donationAmount2 })

        const totalDonations = await donationContract.getSumOfDonations()
        expect(totalDonations).to.equal(donationAmount1.add(donationAmount2))
    })
  })

  describe("Send help", () => {
    it("Should allow only the owner to send help", async function () {
      const donationAmount = parseEther("1.0");
      await expect(donationContract.connect(user).sendHelp(user2.address, donationAmount))
        .to.be.revertedWithCustomError(donationContract, 'OnlyOwner');
    });

    it("Should send help successfully", async function () {
        const donationAmount = parseEther("1.0");
        await donationContract.connect(user).donate({ value: donationAmount });
        await expect(donationContract.sendHelp(user2.address, donationAmount)).to.not.be.reverted;
    });

    it("Should not send help if insufficient funds", async function () {
      const donationAmount = parseEther("100.0");
      await expect(donationContract.connect(owner).sendHelp(user.address, donationAmount))
        .to.be.revertedWithCustomError(donationContract, 'InsufficientFunds');
    });

    it("Should revert with EtherSendError if Ether transfer fails", async function () {
      const FailingReceiver = await ethers.getContractFactory("FailingReceiver");
      const failingReceiver = await FailingReceiver.deploy();
      await failingReceiver.deployed();
  
      const donationAmount = parseEther("1.0");
      await donationContract.connect(owner).donate({ value: donationAmount });
      await expect(donationContract.sendHelp(failingReceiver.address, donationAmount))
          .to.be.revertedWithCustomError(donationContract, 'EtherSendError');
  });
  })
})
