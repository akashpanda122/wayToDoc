# WayToDoc - NextGen Healthcare On-Chain

The WayToDoc is a decentralized healthcare platform that uses blockchain to securely manage medical records and facilitate cross-chain payments.

### **Core Focus**

WayToDoc leverages blockchain technologies to solve key problems in healthcare: privacy, security, and efficient management of medical records and prescriptions. Its standout features include:

- **Secure Patient Onboarding**: Using decentralized identity mechanisms (Smart Accounts via Alchemy) to ensure patient security.
- **Verified Healthcare Providers**: Ensuring only authenticated healthcare professionals participate through World ID verification.
- **Cross-Chain Payments**: Enabling seamless transactions across various blockchains using the CCIP MultiHop router, which enhances flexibility for both patients and healthcare providers.
- **On-Chain Medical Records**: Employing zkProofs and Ethereum Account Service (EAS) to secure and attest medical records and prescriptions.

## 📜 Deployed Contracts

### **WayToDoc Single Hop**

Here are the contract addresses for different testnets involved in the wayToDoc singlehop functionality:

#### **Sepolia Testnet**
- **Contract Address:** [0x98e7375398DE78FcFA685204D219A1571B888535](https://sepolia.etherscan.io/address/0x98e7375398DE78FcFA685204D219A1571B888535)

#### **Base Sepolia Testnet**
- **Contract Address:** [0xc1ca35997dd2c981c7ade0c73bd8628079fd0a4e](https://base-sepolia.blockscout.com/address/0xc1ca35997dd2c981c7ade0c73bd8628079fd0a4e)

#### **Optimism Sepolia Testnet**
- **Contract Address:** [0x309222b7833D3D0A59A8eBf9C64A5790bf43E2aA](https://optimism-sepolia.blockscout.com/address/0x309222b7833D3D0A59A8eBf9C64A5790bf43E2aA)

#### **Polygon Amoy Testnet**
- **Contract Address:** [0x7A409A3A36112bd6906a113d9612D7f7e1abd6d4](https://amoy.polygonscan.com/address/0x7A409A3A36112bd6906a113d9612D7f7e1abd6d4)

---

### **CCIP Multichain Hop Router**

The following are the **CCIP Multichain Hop Router** contract addresses deployed across different testnets:

#### **Base Sepolia Testnet**
- **Router Address:** [0x273C282A9f1B45416CB9967611d431C116286ef9](https://base-sepolia.blockscout.com/address/0x273C282A9f1B45416CB9967611d431C116286ef9)

#### **Sepolia Testnet**
- **Router Address:** [0x96EE5fb7bc57C1f03D560Fcb1b8574ddC8bf5F37](https://sepolia.etherscan.io/address/0x96EE5fb7bc57C1f03D560Fcb1b8574ddC8bf5F37)

#### **Optimism Sepolia Testnet**
- **Router Address:** [0xF99b791257ab50be7F235BC825E7d4B83942cf38](https://optimism-sepolia.blockscout.com/address/0xF99b791257ab50be7F235BC825E7d4B83942cf38)

#### **Amoy Testnet**
- **Router Address:** [0x40Fee4c8A3a66Dba113b881Dca0E4B2828b86BB7](https://amoy.polygonscan.com/address/0x40Fee4c8A3a66Dba113b881Dca0E4B2828b86BB7)

#### **Arbitrum Sepolia Testnet**
- **Router Address:** [0x309222b7833D3D0A59A8eBf9C64A5790bf43E2aA](https://sepolia-explorer.arbitrum.io/address/0x309222b7833D3D0A59A8eBf9C64A5790bf43E2aA)

---

## **Transaction Examples**

Here are some examples of multi-hop transactions executed across various testnets:

- **Base ➡ Optimism ➡ Amoy**
  - **Transaction:** [CCIP Multi-Hop](https://ccip.chain.link/tx/0xe6e1effa58c4d081159a3fa2d567d52364218f1b748a696adac6ff16732ae02b)

- **Base ➡ Optimism ➡ Sepolia ➡ Amoy**
  - **Transaction Optimism --> Sepolia :** [CCIP Multi-Hop](https://ccip.chain.link/tx/0x1213cfb14f128a2a0468b0b848e9dacb2e8a359364a8b9d16666f7d2a8dc6f53)
  - **Transaction Sepolia --> Amoy :** [CCIP Multi-Hop](https://ccip.chain.link/tx/0xd24a66d5ed53a4bada1fe4bc8a31a22a7867220e8cc652e885834da0fe304bfe)


## 🚀 Future Enhancements

- **🌐 Expansion to More Chains**
  - Broaden support to include additional chains, increasing accessibility and flexibility for users.
  
- **🧑‍⚕️ Enhanced Provider Tools**
  - Develop advanced tools for healthcare providers to manage their practices more effectively on-chain.

- **📈 Advanced Analytics**
  - Integrate analytics for tracking patient outcomes and optimizing healthcare services.
