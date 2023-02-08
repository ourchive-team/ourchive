# Ourchive

## Project Description

The global stock images market is continuously growing. It is expected that the market will be accelerate at a compound annual growth rate (CAGR) of 5.61% between 2021 and 2025. The growth of the stock images market is mainly driven by the increasing popularity of stock images for digital and social media marketing.

There are several stock images marketplaces such as Shutterstock, Getty Images, and Adobe Stock. However, these marketplaces have several problems such as high trading fee, large costs to handle copyright issues, and inconvenient mobile user experience. These problems make people hesitate to join the stock images market.

To tackle these problems, our team suggests *Ourchive*, which is an Aptos-based stock image marketplace where you can trade stock images with no regards for copyright issues, reasonable low trading fees, and user-friendly mobile interfaces.

In Ourchive, stock images are minted as non-fungible tokens (NFTs) for transparent and effective ownership management. With Ourchive, the copyright issues can be easily managed with a fast and transparent proof of ownership based on the Aptos blockchain. Ourchive also provides integrated UX solution where creators and users can experience uploading and downloading images all at once.

Hope you are interested in our Ourchive marketplace!

## Compile, Deploy

To use view function, you need to specify bytecode version.

```
aptos move compile --named-addresses ourchive=default --bytecode-version 6
aptos move publish --named-addresses ourchive=default --bytecode-version 6
```
