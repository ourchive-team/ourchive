# Ourchive

## Skill
<div style="display:flex;">
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/>
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white"/>
 <img src="https://img.shields.io/badge/StyledComponents-DB7093?style=flat&logo=StyledComponents&logoColor=white"/>
</div>

## Project Description

The global stock images market is continuously growing. It is expected that the market will be accelerate at a compound annual growth rate (CAGR) of 5.61% between 2021 and 2025. The growth of the stock images market is mainly driven by the increasing popularity of stock images for digital and social media marketing.

There are several stock images marketplaces such as Shutterstock, Getty Images, and Adobe Stock. However, these marketplaces have several problems such as high trading fee, large costs to handle copyright issues, and inconvenient mobile user experience. These problems make people hesitate to join the stock images market.

To tackle these problems, our team suggests *Ourchive*, which is an Aptos-based stock image marketplace where you can trade stock images with no regards for copyright issues, reasonable low trading fees, and user-friendly mobile interfaces.

In Ourchive, stock images are minted as non-fungible tokens (NFTs) for transparent and effective ownership management. With Ourchive, the copyright issues can be easily managed with a fast and transparent proof of ownership based on the Aptos blockchain. Ourchive also provides integrated UX solution where creators and users can experience uploading and downloading images all at once.

Hope you are interested in our Ourchive marketplace!

## Start Frontend

### `npm start`



## Smart Contracts

Move contracts can be found [here](https://github.com/usdc-snu-aptos/ourchive/tree/main/contracts).

To use view functions, you need to specify bytecode version when compile & deploy.

```
aptos move compile --named-addresses ourchive=default --bytecode-version 6
aptos move publish --named-addresses ourchive=default --bytecode-version 6
``` 

The demo version smart contracts are deployed to [Devnet](https://explorer.aptoslabs.com/account/0x5163ad43db9b7354a5bc8af9e4c18130ffe5c2d077ab52c0f6553827b2e8c15f/modules).
