import React, { useEffect, useState } from "react";

import {
  Box,
  Flex,
  Text,

  IconButton,
  Stack,
  useDisclosure,
  useColorModeValue,
  Collapse,

  // Link,
  Image,
  Container,
  Spacer,
  useBreakpointValue,
  Select,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  Link,
  TabPanel,
  Input,
  Button,
  useToast,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";

import { Link as LinkScroll } from "react-scroll";

import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';








import Web3 from "web3";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import { useAccount, useContractWrite } from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import abiFile from "./abiFile.json";
import tokenAbi from "./tokenAbi.json";
import "./styles.css";

import tokenLogo from "./images/page/man.png";
import manLogo from "./images/page/mantoken.png";
import manOnly from "./images/page/manonly.png";
import backgroundImage from "./images/page/bkg.png";
import mainbackgroundImage from "./images/page/mainbkg.png";

import twitterImage from "./images/page/twitter.png";
import telegramImage from "./images/page/telegram.png";
import binanceImage from "./images/page/binance.png";
import githubImage from "./images/page/github.png";
import inHausImage from "./images/partners/dh_clear.png";
import genesysImage from "./images/page/genesys.png";
import derbyImage from "./images/page/derby.png";
import fireGif from "./images/page/fire.gif";

// partnerships
import rocketfiImage from "./images/partners/rocketfi.png";
import reflectrImage from "./images/partners/reflectr.png";
import affinityImage from "./images/partners/affinity.png";
import degenHausImage from "./images/partners/degenhaus.png";
import alpha7Image from "./images/partners/alpha7.png";
import bcrImage from "./images/partners/bcr.png";


// Team

import samImage from "./images/team/sam.png";
import selenaImage from "./images/team/selena.png";
import maxImage from "./images/team/max.png";
import mattImage from "./images/team/matt.png";
import cmhImage from "./images/team/cmh.png";







import ZapToLP from './components/ZapToLP/ZapToLP'; // Adjust the import path as necessary

import NftMint from './components/NftMint/ANTMint';





const DEAD_ADDRESS = "0x000000000000000000000000000000000000dEaD";

const CONTRACT_ADDRESS = "0xaA0015FbB55b0f9E3dF74e0827a63099e4201E38"; // Live BTM_NFT

const TOKEN_ADDRESS = "0x689cC7BB716AfF448DcA16a8b61253C7E246D9Fc"; //og manatee on,maxxChain
// const TOKEN_ADDRESS = "0x93A18db183aB34306f4E6D026F4BF50A1A8E8fE9"; //og MAN 0x689cC7BB716AfF448DcA16a8b61253C7E246D9Fc

const getExplorerLink = () => `https://bscscan.com/address/${CONTRACT_ADDRESS}`;
const BLOCK_RATE_SECONDS = 3; // BSC block rate

const TOKEN_IMAGE =
  "https://raw.githubusercontent.com/ArielRin/lastmanholdingnft2023/main/dappfortoken/src/pst.png";
const TOKEN_SYMBOL = "TMT";
const TOKEN_DECIMALS = 18;

const INITIAL_SUPPLY = 100000000; //  set at 1,000,000

const App = () => {


    const [selectedBox, setSelectedBox] = useState('1'); // Default to showing box 1


//Team

// Array of partner images
const partnerImages = [

  { src: affinityImage, alt: 'Affinity', name: "Affinity", url: "https://t.me/affinitydefi" },
  { src: rocketfiImage, alt: 'RocketFi', name: "RocketFi", url: "https://t.me/RocketFi" },
  { src: reflectrImage, alt: 'ReflectR', name: "ReflectR", url: "https://t.me/reflectrtoken" },
  { src: bcrImage, alt: 'Baby Creed', name: "Baby Creed", url: "https://t.me/BabyCreedToken" },
  { src: manLogo, alt: 'Partners', name: "Ongoing Partners", url: "https://themantoken.com" },
  { src: manLogo, alt: 'Partners', name: "Upcoming Partners", url: "https://themantoken.com" },
];


  // Array of partner images
  const teamImages = [

    { src: selenaImage, alt: 'Selena', name: "Selena", title: "Original", title2: "Founder", url:  "https://t.me/InHausDevelopment" },
    { src: samImage, alt: 'Sam', name: "Sam", title: "Original", title2: "Founder", url:  "https://t.me/InHausDevelopment" },
    { src: maxImage, alt: 'Max', name: "Max", title: "Community", title2: "Management", url:  "https://t.me/InHausDevelopment" },
    { src: mattImage, alt: 'Matt', name: "Matt", title: "Contract", title2: "Development", url:  "https://t.me/InHausDevelopment" },

  ];

  // { src: alpha7Image, alt: 'Alpha7', name: "Alpha7", url: "https://alpha7.system7.io/" },



  // add token to metamask
  // ##############################################################

// Function to toggle the open state

  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  // ##############################################################
  const handleAddToken = () => {
    if (window.ethereum) {
      window.ethereum
        .request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: TOKEN_ADDRESS,
              symbol: TOKEN_SYMBOL,
              decimals: TOKEN_DECIMALS,
              image:
                "https://raw.githubusercontent.com/ArielRin/The-Man-Token-Public/master/tmt.png",
            },
          },
        })
        .then((success) => {
          if (success) {
            console.log("Token successfully added to wallet!");
          } else {
            console.log("Token not added to wallet.");
          }
        })
        .catch(console.error);
    } else {
      console.log("MetaMask is not installed!");
    }
  };

  // ##############################################################
  // ##############################################################
  const addTokenToWallet = async () => {
    if (window.ethereum) {
      try {
        const wasAdded = await window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: TOKEN_ADDRESS,
              symbol: TOKEN_SYMBOL,
              decimals: TOKEN_DECIMALS,
              image:
                "https://raw.githubusercontent.com/ArielRin/The-Man-Token-Public/master/tmt.png",
            },
          },
        });

        if (wasAdded) {
          console.log("Token was added to wallet!");
        } else {
          console.log("Token was not added to wallet.");
        }
      } catch (error) {
        console.error("Error adding token to wallet", error);
      }
    } else {
      console.log("Ethereum object does not exist!");
    }
  };

  // ##############################################################

  // copy token address to memory
  // ##############################################################
  // ##############################################################
  const [copySuccess, setCopySuccess] = useState("");

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(TOKEN_ADDRESS)
      .then(() => {
        setCopySuccess("Address Copied!");
        setTimeout(() => setCopySuccess(""), 2000); // Clear message after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        setCopySuccess("Failed to copy");
      });
  };

  // ##############################################################
  // ##############################################################

  //fetch  supply data of PRT
  // ##############################################################
  // ##############################################################

  // ##############################################################
  // ##############################################################

  // fetch marketcap from api
  // ##############################################################
  // ##############################################################
  const [marketCap, setMarketCap] = useState("Loading...");
  const [totalReserveInUSD, setTotalReserveInUSD] = useState("Loading...");

  // ... (existing useEffect hooks)

  // Fetch Market Cap and Total Reserve data
  useEffect(() => {
    const url = `https://api.geckoterminal.com/api/v2/networks/bsc/tokens/${TOKEN_ADDRESS}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data && data.data.attributes) {
          if (data.data.attributes.fdv_usd) {
            const fdvUsd = data.data.attributes.fdv_usd;
            setMarketCap(
              `${parseFloat(fdvUsd).toLocaleString("en-US", { style: "currency", currency: "USD" })}`,
            ); // Format as currency
          } else {
            setMarketCap("Market Cap not available");
          }

          if (data.data.attributes.total_reserve_in_usd) {
            const reserveUsd = data.data.attributes.total_reserve_in_usd;
            setTotalReserveInUSD(
              `${parseFloat(reserveUsd).toLocaleString("en-US", { style: "currency", currency: "USD" })}`,
            ); // Format as currency
          } else {
            setTotalReserveInUSD("Total Reserve not available");
          }
        } else {
          setMarketCap("Data not available");
          setTotalReserveInUSD("Data not available");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setMarketCap("Error fetching data");
        setTotalReserveInUSD("Error fetching data");
      });
  }, []);
  // ##############################################################
  // ##############################################################

  // ##############################################################
  // ##############################################################

  const [totalLiquidityUSD, setTotalLiquidityUSD] = useState("Loading...");

  useEffect(() => {
    if (
      totalReserveInUSD !== "Loading..." &&
      totalReserveInUSD !== "Total Reserve not available" &&
      totalReserveInUSD !== "Error fetching data"
    ) {
      // Extract the number from the formatted currency string
      const reserveValue = Number(totalReserveInUSD.replace(/[^0-9.-]+/g, ""));
      const liquidityValue = reserveValue * 2;
      setTotalLiquidityUSD(
        `${liquidityValue.toLocaleString("en-US", { style: "currency", currency: "USD" })}`,
      ); // Format as currency
    }
  }, [totalReserveInUSD]); // Dependency on totalReserveInUSD

  const { address } = useAccount();
  const isConnected = !!address;

  // Use Chakra UI's useBreakpointValue hook to adjust layout for different screen sizes
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  const headerTextStyle = {
    fontSize: "28px", // Increased font size
    fontWeight: "bold", // Make the text bolder
    color: "#f8f8ff", // Off-white color
  };

  const tokenContractConfig = {
    addressOrName: TOKEN_ADDRESS,
    contractInterface: tokenAbi,
  };

  const account = useAccount();
  const [contractName, setContractName] = useState("");
  const [loading, setLoading] = useState(true);

  const { writeAsync: claimTokens } = useContractWrite({
    ...tokenContractConfig,
    functionName: "claim",
  });

  const onClaimClick = async () => {
    try {
      const tx = await claimTokens();
      await tx.wait();
      toast.success("Claim successful!");
    } catch (error) {
      console.error(error);
      toast.error("Claim failed. Please try again.");
    }
  };

  const [rewardsToClaim, setRewardsToClaim] = useState("Loading...");

  useEffect(() => {
    const fetchRewardsToClaim = async () => {
      if (address) {
        try {
          const provider = new ethers.providers.Web3Provider(
            window.ethereum as ethers.providers.ExternalProvider,
          );
          const tokenContract = new ethers.Contract(
            TOKEN_ADDRESS,
            tokenAbi,
            provider,
          );

          const rewards = await tokenContract.withdrawableDividendOf(address);
          // Format rewards and set it to 4 decimal places
          const formattedRewards = ethers.utils.formatUnits(rewards, "ether");
          setRewardsToClaim(parseFloat(formattedRewards).toFixed(4)); // Now the rewards are a string with 4 decimal places
        } catch (error) {
          console.error("Error fetching rewards:", error);
          setRewardsToClaim("Error");
        }
      }
    };

    fetchRewardsToClaim();
  }, [address]); // Fetch rewards when the address changes

  //fetch btm pricePerBtm in usd
  const [btmPriceUSD, setBtmPriceUSD] = useState("Loading...");
  const btmAddress = "0xc27bbd4276f9eb2d6f2c4623612412d52d7bb43d"; // Your btm address

  useEffect(() => {
    const url = `https://api.geckoterminal.com/api/v2/simple/networks/bsc/token_price/${btmAddress}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (
          data &&
          data.data &&
          data.data.attributes &&
          data.data.attributes.token_prices
        ) {
          const price = data.data.attributes.token_prices[btmAddress];
          setBtmPriceUSD(`${parseFloat(price).toFixed(6)} USD`); // Format the price to 6 decimal places
        } else {
          setBtmPriceUSD("Price not available");
        }
      })
      .catch((error) => {
        console.error("Error fetching btm price:", error);
        setBtmPriceUSD("Error fetching price");
      });
  }, []);

  //fetch anu pricePerAnu in usd
  const [anuPriceUSD, setAnuPriceUSD] = useState("Loading...");
  const anuAddress = "0x6cb6c8d16e7b6fd5a815702b824e6dfdf148a7d9"; // Your anu address

  useEffect(() => {
    const url = `https://api.geckoterminal.com/api/v2/simple/networks/bsc/token_price/${anuAddress}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (
          data &&
          data.data &&
          data.data.attributes &&
          data.data.attributes.token_prices
        ) {
          const price = data.data.attributes.token_prices[anuAddress];
          setAnuPriceUSD(`${parseFloat(price).toFixed(6)} USD`); // Format the price to 6 decimal places
        } else {
          setAnuPriceUSD("Price not available");
        }
      })
      .catch((error) => {
        console.error("Error fetching anu price:", error);
        setAnuPriceUSD("Error fetching price");
      });
  }, []);

  //fetch token pricePerToken in usd
  const [tokenPriceUSD, setTokenPriceUSD] = useState("Loading...");
  const tokenAddress = "0x3e69ba6dd72e39a1694b85775944f713fe0a0e9b"; // Your token address

  useEffect(() => {
    const url = `https://api.geckoterminal.com/api/v2/simple/networks/bsc/token_price/${tokenAddress}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (
          data &&
          data.data &&
          data.data.attributes &&
          data.data.attributes.token_prices
        ) {
          const price = data.data.attributes.token_prices[tokenAddress];
          setTokenPriceUSD(`${parseFloat(price).toFixed(6)} USD`); // Format the price to 6 decimal places
        } else {
          setTokenPriceUSD("Price not available");
        }
      })
      .catch((error) => {
        console.error("Error fetching token price:", error);
        setTokenPriceUSD("Error fetching price");
      });
  }, []);

  const [pwrPriceUSD, setPwrPriceUSD] = useState("Loading...");
  const pwrTokenAddress = "0xa29d0ee618f33d8efe9a20557fd0ef63dd050859"; // PWR token address on BSC

  useEffect(() => {
    const url = `https://api.geckoterminal.com/api/v2/simple/networks/bsc/token_price/${pwrTokenAddress}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (
          data &&
          data.data &&
          data.data.attributes &&
          data.data.attributes.token_prices
        ) {
          const price = data.data.attributes.token_prices[pwrTokenAddress];
          setPwrPriceUSD(`${parseFloat(price).toFixed(6)} USD`); // Format the price to 6 decimal places
        } else {
          setPwrPriceUSD("Price not available");
        }
      })
      .catch((error) => {
        console.error("Error fetching PWR price:", error);
        setPwrPriceUSD("Error fetching price");
      });
  }, []);

  //  const [bnbPriceUSD, setBnbPriceUSD] = useState('Loading...');
  // const bnbTokenAddress = '0xa29d0ee618f33d8efe9a20557fd0ef63dd050859'; // BNB token address on BSC
  //
  // useEffect(() => {
  //   const url = `https://api.geckoterminal.com/api/v2/simple/networks/maxchain/token_price/${bnbTokenAddress}`;
  //
  //   fetch(url)
  //     .then(response => response.json())
  //     .then(data => {
  //       if (data && data.data && data.data.attributes && data.data.attributes.token_prices) {
  //         const price = data.data.attributes.token_prices[bnbTokenAddress];
  //         setBnbPriceUSD(`${parseFloat(price).toFixed(6)} USD`); // Format the price to 6 decimal places
  //       } else {
  //         setBnbPriceUSD('Price not available');
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error fetching BNB price:', error);
  //       setBnbPriceUSD('Error fetching price');
  //     });
  // }, []);

  const [rewardsValueInUSD, setRewardsValueInUSD] = useState("Loading...");

  useEffect(() => {
    // Calculate rewards in USD
    const pwrPrice = parseFloat(pwrPriceUSD.replace(" USD", ""));
    const rewardsAmount = parseFloat(rewardsToClaim);

    if (!isNaN(pwrPrice) && !isNaN(rewardsAmount)) {
      const calculatedValue = (rewardsAmount * pwrPrice).toFixed(2); // Format the result to 2 decimal places
      setRewardsValueInUSD(`${calculatedValue} USD`);
    } else {
      setRewardsValueInUSD("Calculating...");
    }
  }, [pwrPriceUSD, rewardsToClaim]);

  // fetch token balance
  const [tokenBalance, setTokenBalance] = useState("Loading...");

  useEffect(() => {
    const fetchTokenBalance = async () => {
      if (address) {
        try {
          const provider = new ethers.providers.Web3Provider(
            window.ethereum as ethers.providers.ExternalProvider,
          );
          const tokenContract = new ethers.Contract(
            TOKEN_ADDRESS,
            tokenAbi,
            provider,
          );

          const balance = await tokenContract.balanceOf(address);
          // Format balance and set it to 2 decimal places
          const formattedBalance = ethers.utils.formatUnits(balance, "ether");
          setTokenBalance(parseFloat(formattedBalance).toFixed(0)); // Now the balance is a string with 2 decimal places
        } catch (error) {
          console.error("Error fetching balance:", error);
          setTokenBalance("Error");
        }
      }
    };

    fetchTokenBalance();
  }, [address]); // Fetch balance when the address changes

  // Token Staking
  // ######################################################################################################################################################################
  // ##################################

  const { writeAsync: unstake14Days } = useContractWrite({
    ...tokenContractConfig,
    functionName: "Unstake14Days",
  });
  const onUnstake14DaysClick = async () => {
    try {
      const tx = await unstake14Days();
      await tx.wait();
      toast.success("Unstaking successful!");
    } catch (error) {
      console.error(error);
      toast.error("Unstaking failed. Please Check your Unlock Date in dapp.");
    }
  };
  // State for staking amount
  const [stakeAmount, setStakeAmount] = useState("");

  // Contract write hook for staking in the token contract
  const { writeAsync: stakeFor14Days } = useContractWrite({
    ...tokenContractConfig,
    functionName: "StakeFor14Days",
  });

  // Function to handle staking
  const onStakeClick = async () => {
    try {
      if (!stakeAmount) {
        toast.error("Please enter an amount to stake.");
        return;
      }

      // Convert the stake amount to Wei
      const stakeAmountInWei = ethers.utils.parseUnits(stakeAmount, "wei");

      // Call the StakeFor14Days function in the contract
      const tx = await stakeFor14Days({
        args: [stakeAmountInWei],
      });

      await tx.wait();
      toast.success("Staking successful!");
    } catch (error) {
      console.error(error);
      toast.error("Staking failed. Please try again.");
    }
  };

  // is the user staked
  const [userStaked, setUserStaked] = useState("Loading...");

  useEffect(() => {
    const fetchUserStakedStatus = async () => {
      if (address) {
        try {
          const provider = new ethers.providers.Web3Provider(
            window.ethereum as ethers.providers.ExternalProvider,
          );
          const tokenContract = new ethers.Contract(
            TOKEN_ADDRESS,
            tokenAbi,
            provider,
          );

          const isStaked = await tokenContract._isStaked14Days(address);
          setUserStaked(isStaked.toString());
        } catch (error) {
          console.error("Error fetching staking status:", error);
          setUserStaked("Error");
        }
      }
    };

    fetchUserStakedStatus();
  }, [address]); // Fetch staking status when the address changes

  // amount staked 1 month pool
  const [tokensStaked14Days, setTokensStaked14Days] = useState("Loading...");

  useEffect(() => {
    const fetchTokensStaked14Days = async () => {
      if (address) {
        try {
          const provider = new ethers.providers.Web3Provider(
            window.ethereum as ethers.providers.ExternalProvider,
          );
          const tokenContract = new ethers.Contract(
            TOKEN_ADDRESS,
            tokenAbi,
            provider,
          );

          const tokens = await tokenContract.tokensStaked14Days(address);
          setTokensStaked14Days(ethers.utils.formatUnits(tokens, "ether")); // Adjust based on your token's decimals
        } catch (error) {
          console.error("Error fetching tokens staked for 1 month:", error);
          setTokensStaked14Days("Error");
        }
      }
    };

    fetchTokensStaked14Days();
  }, [address]); // Fetch when the address changes
  const [availableBalance, setAvailableBalance] = useState("Loading...");

  // Assuming TOKEN_ADDRESS and tokenAbi are defined elsewhere in your code
  useEffect(() => {
    const fetchBalances = async () => {
      if (address) {
        try {
          const provider = new ethers.providers.Web3Provider(
            window.ethereum as ethers.providers.ExternalProvider,
          );
          const tokenContract = new ethers.Contract(
            TOKEN_ADDRESS,
            tokenAbi,
            provider,
          );

          // Fetch the balance and staked amounts
          const balancePromise = tokenContract.balanceOf(address);
          const staked14DaysPromise = tokenContract.tokensStaked14Days(address);
          const staked30DaysPromise =
            tokenContract.tokensStaked30Days(address); // Assuming a similar method exists
          const staked90DaysPromise =
            tokenContract.tokensStaked90Days(address); // Assuming a similar method exists

          // Use Promise.all to fetch all values concurrently
          const [balance, staked14Days, staked30Days, staked90Days] =
            await Promise.all([
              balancePromise,
              staked14DaysPromise,
              staked30DaysPromise,
              staked90DaysPromise,
            ]);

          // Calculate the total staked amount using BigNumber to prevent precision loss
          const totalStaked = staked14Days
            .add(staked30Days)
            .add(staked90Days);

          // Calculate the available balance
          const available = balance.sub(totalStaked);

          // Format the available balance for display
          const formattedAvailable = ethers.utils.formatUnits(
            available,
            "ether",
          );
          setAvailableBalance(parseFloat(formattedAvailable).toFixed(0));
        } catch (error) {
          console.error("Error fetching balances:", error);
          setAvailableBalance("Error");
        }
      }
    };

    fetchBalances();
  }, [address]); // Re-run the effect if the user's address changes

  const [unlockTime, setUnlockTime] = useState("Loading...");

  useEffect(() => {
    const fetchUnlockTime = async () => {
      if (address) {
        try {
          const provider = new ethers.providers.Web3Provider(
            window.ethereum as ethers.providers.ExternalProvider,
          );
          const tokenContract = new ethers.Contract(
            TOKEN_ADDRESS,
            tokenAbi,
            provider,
          );

          const stakedTimestamp =
            await tokenContract._staked14DaysTimestamp(address);
          const currentBlock = await provider.getBlock("latest");
          const currentTime = currentBlock.timestamp;

          const timeDiff = stakedTimestamp - currentTime;
          if (timeDiff <= 0) {
            setUnlockTime("Unlocked");
            return;
          }

          const days = Math.floor(timeDiff / (24 * 3600));
          const hours = Math.floor((timeDiff % (24 * 3600)) / 3600);
          const minutes = Math.floor((timeDiff % 3600) / 60);
          const seconds = Math.floor(timeDiff % 60);

          setUnlockTime(
            `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`,
          );
        } catch (error) {
          console.error("Error fetching unlock time:", error);
          setUnlockTime("Error");
        }
      }
    };

    fetchUnlockTime();
  }, [address]);

  const [stakedTimestamp, setStakedTimestamp] = useState("Loading...");

  useEffect(() => {
    const fetchStakedTimestamp = async () => {
      if (address) {
        try {
          const provider = new ethers.providers.Web3Provider(
            window.ethereum as ethers.providers.ExternalProvider,
          );
          const tokenContract = new ethers.Contract(
            TOKEN_ADDRESS,
            tokenAbi,
            provider,
          );

          const timestamp = await tokenContract._staked14DaysTimestamp(address);
          const date = new Date(timestamp.toNumber() * 1000).toLocaleString(); // Convert timestamp to readable date
          setStakedTimestamp(date);
        } catch (error) {
          console.error("Error fetching staked timestamp:", error);
          setStakedTimestamp("Error");
        }
      }
    };

    fetchStakedTimestamp();
  }, [address]);

  const [stakedBlockNumber, setStakedBlockNumber] = useState("Loading...");

  useEffect(() => {
    const fetchStakedBlockNumber = async () => {
      if (address) {
        try {
          const provider = new ethers.providers.Web3Provider(
            window.ethereum as ethers.providers.ExternalProvider,
          );
          const tokenContract = new ethers.Contract(
            TOKEN_ADDRESS,
            tokenAbi,
            provider,
          );

          const stakedTimestampBN =
            await tokenContract._staked14DaysTimestamp(address);
          const stakedTimestamp = stakedTimestampBN.toNumber();

          const currentBlock = await provider.getBlock("latest");
          const currentTimestamp = currentBlock.timestamp;
          const currentBlockNumber = currentBlock.number;

          // Estimate the block number of the staked timestamp
          const blockDifference =
            (stakedTimestamp - currentTimestamp) / BLOCK_RATE_SECONDS;
          const estimatedStakedBlockNumber =
            currentBlockNumber + Math.round(blockDifference);

          setStakedBlockNumber(estimatedStakedBlockNumber.toString());
        } catch (error) {
          console.error("Error fetching staked block number:", error);
          setStakedBlockNumber("Error");
        }
      }
    };

    fetchStakedBlockNumber();
  }, [address]);

  const [unlockDate, setUnlockDate] = useState("Loading...");

  useEffect(() => {
    const fetchUnlockDate = async () => {
      if (address) {
        try {
          const provider = new ethers.providers.Web3Provider(
            window.ethereum as ethers.providers.ExternalProvider,
          );
          const tokenContract = new ethers.Contract(
            TOKEN_ADDRESS,
            tokenAbi,
            provider,
          );

          const stakedTimestampBN =
            await tokenContract._staked14DaysTimestamp(address);
          const stakedTimestamp = stakedTimestampBN.toNumber();

          // Add 30 days to the staked timestamp
          const unlockTimestamp = new Date(stakedTimestamp * 1000);
          unlockTimestamp.setDate(unlockTimestamp.getDate() + 30);

          setUnlockDate(unlockTimestamp.toLocaleDateString());
        } catch (error) {
          console.error("Error fetching unlock date:", error);
          setUnlockDate("Error");
        }
      }
    };

    fetchUnlockDate();
  }, [address]);

  // ######################################################################################################################################################################
  // ##################################
  // unstake tokens 3month
  // ##################################

  const { writeAsync: Unstake30Days } = useContractWrite({
    ...tokenContractConfig,
    functionName: "Unstake30Days",
  });
  const onUnstake30DaysClick = async () => {
    try {
      const tx = await Unstake30Days();
      await tx.wait();
      toast.success("Unstaking successful!");
    } catch (error) {
      console.error(error);
      toast.error("Unstaking failed. Please Check your Unlock Date in dapp.");
    }
  };

  // ##################################
  // State for staking amount
  // ##################################
  const [stakeAmount30Days, setStakeAmount30Days] = useState("");

  // Contract write hook for staking in the token contract
  const { writeAsync: stakeFor30Days } = useContractWrite({
    ...tokenContractConfig,
    functionName: "StakeFor30Days",
  });

  // Function to handle staking
  const onStakeClick30Days = async () => {
    try {
      if (!stakeAmount30Days) {
        toast.error("Please enter an amount to stake.");
        return;
      }

      // Convert the stake amount to Wei
      const stakeAmount30DaysInWei = ethers.utils.parseUnits(
        stakeAmount30Days,
        "wei",
      );

      // Call the StakeFor30Days function in the contract
      const tx = await stakeFor30Days({
        args: [stakeAmount30DaysInWei],
      });

      await tx.wait();
      toast.success("Staking successful!");
    } catch (error) {
      console.error(error);
      toast.error("Staking failed. Please try again.");
    }
  };

  // ##################################
  // is the user staked
  // ##################################

  const [userStaked30Days, setUserStaked30Days] = useState("Loading...");

  useEffect(() => {
    const fetchUserStaked30DaysStatus = async () => {
      if (address) {
        try {
          const provider = new ethers.providers.Web3Provider(
            window.ethereum as ethers.providers.ExternalProvider,
          );
          const tokenContract = new ethers.Contract(
            TOKEN_ADDRESS,
            tokenAbi,
            provider,
          );

          const isStaked = await tokenContract._isStaked30Days(address);
          setUserStaked30Days(isStaked.toString());
        } catch (error) {
          console.error("Error fetching staking status:", error);
          setUserStaked30Days("Error");
        }
      }
    };

    fetchUserStaked30DaysStatus();
  }, [address]); // Fetch staking status when the address changes

  // amount staked 3 month pool
  const [tokensStaked30Days, setTokensStaked30Days] = useState("Loading...");

  useEffect(() => {
    const fetchTokensStaked30Days = async () => {
      if (address) {
        try {
          const provider = new ethers.providers.Web3Provider(
            window.ethereum as ethers.providers.ExternalProvider,
          );
          const tokenContract = new ethers.Contract(
            TOKEN_ADDRESS,
            tokenAbi,
            provider,
          );

          const tokens = await tokenContract.tokensStaked30Days(address);
          setTokensStaked30Days(ethers.utils.formatUnits(tokens, "ether")); // Adjust based on your token's decimals
        } catch (error) {
          console.error("Error fetching tokens staked for 1 month:", error);
          setTokensStaked30Days("Error");
        }
      }
    };

    fetchTokensStaked30Days();
  }, [address]); // Fetch when the address changes

  // available balance after staking locks
  const [availableBalance30Days, setAvailableBalance30Days] =
    useState("Loading...");

  useEffect(() => {
    const fetchBalances30Days = async () => {
      if (address) {
        try {
          const provider = new ethers.providers.Web3Provider(
            window.ethereum as ethers.providers.ExternalProvider,
          );
          const tokenContract = new ethers.Contract(
            TOKEN_ADDRESS,
            tokenAbi,
            provider,
          );

          const [balance, tokensStaked30Days] = await Promise.all([
            tokenContract.balanceOf(address),
            tokenContract.tokensStaked30Days(address),
          ]);

          const available = balance.sub(tokensStaked30Days);
          // Format balance and set it to 2 decimal places
          const formattedAvailable = ethers.utils.formatUnits(
            available,
            "ether",
          );
          setAvailableBalance30Days(parseFloat(formattedAvailable).toFixed(0)); // Now the balance is a string with 2 decimal places
        } catch (error) {
          console.error("Error fetching balances:", error);
          setAvailableBalance30Days("Error");
        }
      }
    };

    fetchBalances30Days();
  }, [address]); // Fetch when the address changes

  const [unlockTime30Days, setUnlockTime30Days] = useState("Loading...");

  useEffect(() => {
    const fetchUnlockTime30Days = async () => {
      if (address) {
        try {
          const provider = new ethers.providers.Web3Provider(
            window.ethereum as ethers.providers.ExternalProvider,
          );
          const tokenContract = new ethers.Contract(
            TOKEN_ADDRESS,
            tokenAbi,
            provider,
          );

          const stakedTimestamp30Days =
            await tokenContract._staked30DaysTimestamp(address);
          const currentBlock = await provider.getBlock("latest");
          const currentTime = currentBlock.timestamp;

          const timeDiff = stakedTimestamp30Days - currentTime;
          if (timeDiff <= 0) {
            setUnlockTime30Days("Unlocked");
            return;
          }

          const days = Math.floor(timeDiff / (24 * 3600));
          const hours = Math.floor((timeDiff % (24 * 3600)) / 3600);
          const minutes = Math.floor((timeDiff % 3600) / 60);
          const seconds = Math.floor(timeDiff % 60);

          setUnlockTime30Days(
            `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`,
          );
        } catch (error) {
          console.error("Error fetching unlock time:", error);
          setUnlockTime30Days("Error");
        }
      }
    };

    fetchUnlockTime30Days();
  }, [address]);

  const [stakedTimestamp30Days, setStakedTimestamp30Days] =
    useState("Loading...");

  useEffect(() => {
    const fetchStakedTimestamp30Days = async () => {
      if (address) {
        try {
          const provider = new ethers.providers.Web3Provider(
            window.ethereum as ethers.providers.ExternalProvider,
          );
          const tokenContract = new ethers.Contract(
            TOKEN_ADDRESS,
            tokenAbi,
            provider,
          );

          const timestamp =
            await tokenContract._staked30DaysTimestamp(address);
          const date = new Date(timestamp.toNumber() * 1000).toLocaleString(); // Convert timestamp to readable date
          setStakedTimestamp30Days(date);
        } catch (error) {
          console.error("Error fetching staked timestamp:", error);
          setStakedTimestamp30Days("Error");
        }
      }
    };

    fetchStakedTimestamp30Days();
  }, [address]);

  const [stakedBlockNumber30Days, setStakedBlockNumber30Days] =
    useState("Loading...");

  useEffect(() => {
    const fetchStakedBlockNumber30Days = async () => {
      if (address) {
        try {
          const provider = new ethers.providers.Web3Provider(
            window.ethereum as ethers.providers.ExternalProvider,
          );
          const tokenContract = new ethers.Contract(
            TOKEN_ADDRESS,
            tokenAbi,
            provider,
          );

          const stakedTimestamp30DaysBN =
            await tokenContract._staked30DaysTimestamp(address);
          const stakedTimestamp30Days = stakedTimestamp30DaysBN.toNumber();

          const currentBlock = await provider.getBlock("latest");
          const currentTimestamp = currentBlock.timestamp;
          const currentBlockNumber = currentBlock.number;

          // Estimate the block number of the staked timestamp
          const blockDifference =
            (stakedTimestamp30Days - currentTimestamp) / BLOCK_RATE_SECONDS;
          const estimatedStakedBlockNumber30Days =
            currentBlockNumber + Math.round(blockDifference);

          setStakedBlockNumber30Days(
            estimatedStakedBlockNumber30Days.toString(),
          );
        } catch (error) {
          console.error("Error fetching staked block number:", error);
          setStakedBlockNumber30Days("Error");
        }
      }
    };

    fetchStakedBlockNumber30Days();
  }, [address]);

  const [unlockDate30Days, setUnlockDate30Days] = useState("Loading...");

  useEffect(() => {
    const fetchUnlockDate30Days = async () => {
      if (address) {
        try {
          const provider = new ethers.providers.Web3Provider(
            window.ethereum as ethers.providers.ExternalProvider,
          );
          const tokenContract = new ethers.Contract(
            TOKEN_ADDRESS,
            tokenAbi,
            provider,
          );

          const stakedTimestamp30DaysBN =
            await tokenContract._staked30DaysTimestamp(address);
          const stakedTimestamp30Days = stakedTimestamp30DaysBN.toNumber();

          // Add 30 days to the staked timestamp
          const unlockTime30Daysstamp = new Date(
            stakedTimestamp30Days * 1000,
          );
          unlockTime30Daysstamp.setDate(unlockTime30Daysstamp.getDate() + 90);

          setUnlockDate30Days(unlockTime30Daysstamp.toLocaleDateString());
        } catch (error) {
          console.error("Error fetching unlock date:", error);
          setUnlockDate30Days("Error");
        }
      }
    };

    fetchUnlockDate30Days();
  }, [address]);

  // ######################################################################################################################################################################

  // ######################################################################################################################################################################
  // 6month
  // ##################################
  // unstake tokens 6month
  // ##################################

  const { writeAsync: Unstake90Days } = useContractWrite({
    ...tokenContractConfig,
    functionName: "Unstake90Days",
  });
  const onUnstake90DaysClick = async () => {
    try {
      const tx = await Unstake90Days();
      await tx.wait();
      toast.success("Unstaking successful!");
    } catch (error) {
      console.error(error);
      toast.error("Unstaking failed. Please Check your Unlock Date in dapp.");
    }
  };

  // ##################################
  // State for staking amount
  // ##################################
  const [stakeAmount90Days, setStakeAmount90Days] = useState("");

  // Contract write hook for staking in the token contract
  const { writeAsync: stakeFor90Days } = useContractWrite({
    ...tokenContractConfig,
    functionName: "StakeFor90Days",
  });

  // Function to handle staking
  const onStakeClick90Days = async () => {
    try {
      if (!stakeAmount90Days) {
        toast.error("Please enter an amount to stake.");
        return;
      }

      // Convert the stake amount to Wei
      const stakeAmount90DaysInWei = ethers.utils.parseUnits(
        stakeAmount90Days,
        "wei",
      );

      // Call the StakeFor90Days function in the contract
      const tx = await stakeFor90Days({
        args: [stakeAmount90DaysInWei],
      });

      await tx.wait();
      toast.success("Staking successful!");
    } catch (error) {
      console.error(error);
      toast.error("Staking failed. Please try again.");
    }
  };

  // ##################################
  // is the user staked
  // ##################################

  const [userStaked90Days, setUserStaked90Days] = useState("Loading...");

  useEffect(() => {
    const fetchUserStaked90DaysStatus = async () => {
      if (address) {
        try {
          const provider = new ethers.providers.Web3Provider(
            window.ethereum as ethers.providers.ExternalProvider,
          );
          const tokenContract = new ethers.Contract(
            TOKEN_ADDRESS,
            tokenAbi,
            provider,
          );

          const isStaked = await tokenContract._isStaked90Days(address);
          setUserStaked90Days(isStaked.toString());
        } catch (error) {
          console.error("Error fetching staking status:", error);
          setUserStaked90Days("Error");
        }
      }
    };

    fetchUserStaked90DaysStatus();
  }, [address]); // Fetch staking status when the address changes

  // amount staked 3 month pool
  const [tokensStaked90Days, setTokensStaked90Days] = useState("Loading...");

  useEffect(() => {
    const fetchTokensStaked90Days = async () => {
      if (address) {
        try {
          const provider = new ethers.providers.Web3Provider(
            window.ethereum as ethers.providers.ExternalProvider,
          );
          const tokenContract = new ethers.Contract(
            TOKEN_ADDRESS,
            tokenAbi,
            provider,
          );

          const tokens = await tokenContract.tokensStaked90Days(address);
          setTokensStaked90Days(ethers.utils.formatUnits(tokens, "ether")); // Adjust based on your token's decimals
        } catch (error) {
          console.error("Error fetching tokens staked for 1 month:", error);
          setTokensStaked90Days("Error");
        }
      }
    };

    fetchTokensStaked90Days();
  }, [address]); // Fetch when the address changes

  // available balance after staking locks
  const [availableBalance90Days, setAvailableBalance90Days] =
    useState("Loading...");

  useEffect(() => {
    const fetchBalances90Days = async () => {
      if (address) {
        try {
          const provider = new ethers.providers.Web3Provider(
            window.ethereum as ethers.providers.ExternalProvider,
          );
          const tokenContract = new ethers.Contract(
            TOKEN_ADDRESS,
            tokenAbi,
            provider,
          );

          const [balance, tokensStaked90Days] = await Promise.all([
            tokenContract.balanceOf(address),
            tokenContract.tokensStaked90Days(address),
          ]);

          const available = balance.sub(tokensStaked90Days);
          // Format balance and set it to 2 decimal places
          const formattedAvailable = ethers.utils.formatUnits(
            available,
            "ether",
          );
          setAvailableBalance90Days(parseFloat(formattedAvailable).toFixed(0)); // Now the balance is a string with 2 decimal places
        } catch (error) {
          console.error("Error fetching balances:", error);
          setAvailableBalance90Days("Error");
        }
      }
    };

    fetchBalances90Days();
  }, [address]); // Fetch when the address changes

  const [unlockTime90Days, setUnlockTime90Days] = useState("Loading...");

  useEffect(() => {
    const fetchUnlockTime90Days = async () => {
      if (address) {
        try {
          const provider = new ethers.providers.Web3Provider(
            window.ethereum as ethers.providers.ExternalProvider,
          );
          const tokenContract = new ethers.Contract(
            TOKEN_ADDRESS,
            tokenAbi,
            provider,
          );

          const stakedTimestamp90Days =
            await tokenContract._staked90DaysTimestamp(address);
          const currentBlock = await provider.getBlock("latest");
          const currentTime = currentBlock.timestamp;

          const timeDiff = stakedTimestamp90Days - currentTime;
          if (timeDiff <= 0) {
            setUnlockTime90Days("Unlocked");
            return;
          }

          const days = Math.floor(timeDiff / (24 * 3600));
          const hours = Math.floor((timeDiff % (24 * 3600)) / 3600);
          const minutes = Math.floor((timeDiff % 3600) / 60);
          const seconds = Math.floor(timeDiff % 60);

          setUnlockTime90Days(
            `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`,
          );
        } catch (error) {
          console.error("Error fetching unlock time:", error);
          setUnlockTime90Days("Error");
        }
      }
    };

    fetchUnlockTime90Days();
  }, [address]);

  const [stakedTimestamp90Days, setStakedTimestamp90Days] =
    useState("Loading...");

  useEffect(() => {
    const fetchStakedTimestamp90Days = async () => {
      if (address) {
        try {
          const provider = new ethers.providers.Web3Provider(
            window.ethereum as ethers.providers.ExternalProvider,
          );
          const tokenContract = new ethers.Contract(
            TOKEN_ADDRESS,
            tokenAbi,
            provider,
          );

          const timestamp =
            await tokenContract._staked90DaysTimestamp(address);
          const date = new Date(timestamp.toNumber() * 1000).toLocaleString(); // Convert timestamp to readable date
          setStakedTimestamp90Days(date);
        } catch (error) {
          console.error("Error fetching staked timestamp:", error);
          setStakedTimestamp90Days("Error");
        }
      }
    };

    fetchStakedTimestamp90Days();
  }, [address]);

  const [stakedBlockNumber90Days, setStakedBlockNumber90Days] =
    useState("Loading...");

  useEffect(() => {
    const fetchStakedBlockNumber90Days = async () => {
      if (address) {
        try {
          const provider = new ethers.providers.Web3Provider(
            window.ethereum as ethers.providers.ExternalProvider,
          );
          const tokenContract = new ethers.Contract(
            TOKEN_ADDRESS,
            tokenAbi,
            provider,
          );

          const stakedTimestamp90DaysBN =
            await tokenContract._staked90DaysTimestamp(address);
          const stakedTimestamp90Days = stakedTimestamp90DaysBN.toNumber();

          const currentBlock = await provider.getBlock("latest");
          const currentTimestamp = currentBlock.timestamp;
          const currentBlockNumber = currentBlock.number;

          // Estimate the block number of the staked timestamp
          const blockDifference =
            (stakedTimestamp90Days - currentTimestamp) / BLOCK_RATE_SECONDS;
          const estimatedStakedBlockNumber90Days =
            currentBlockNumber + Math.round(blockDifference);

          setStakedBlockNumber90Days(
            estimatedStakedBlockNumber90Days.toString(),
          );
        } catch (error) {
          console.error("Error fetching staked block number:", error);
          setStakedBlockNumber90Days("Error");
        }
      }
    };

    fetchStakedBlockNumber90Days();
  }, [address]);

  const [unlockDate90Days, setUnlockDate90Days] = useState("Loading...");

  useEffect(() => {
    const fetchUnlockDate90Days = async () => {
      if (address) {
        try {
          const provider = new ethers.providers.Web3Provider(
            window.ethereum as ethers.providers.ExternalProvider,
          );
          const tokenContract = new ethers.Contract(
            TOKEN_ADDRESS,
            tokenAbi,
            provider,
          );

          const stakedTimestamp90DaysBN =
            await tokenContract._staked90DaysTimestamp(address);
          const stakedTimestamp90Days = stakedTimestamp90DaysBN.toNumber();

          // Add 30 days to the staked timestamp
          const unlockTime90Daysstamp = new Date(
            stakedTimestamp90Days * 1000,
          );
          unlockTime90Daysstamp.setDate(
            unlockTime90Daysstamp.getDate() + 180,
          );

          setUnlockDate90Days(unlockTime90Daysstamp.toLocaleDateString());
        } catch (error) {
          console.error("Error fetching unlock date:", error);
          setUnlockDate90Days("Error");
        }
      }
    };

    fetchUnlockDate90Days();
  }, [address]);

  // ######################################################################################################################################################################

  // Calculate total staked across all periods and format it
  const totalStakedAllPeriods = (
    parseFloat(tokensStaked14Days) +
    parseFloat(tokensStaked30Days) +
    parseFloat(tokensStaked90Days)
  ).toFixed(0); // Converts to string with 3 decimal places

  // useState import statement is assumed to be already there
  const [dividendBalance, setDividendBalance] = useState("Loading...");

  useEffect(() => {
    const fetchDividendBalance = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" }); // Request user's account access
          const provider = new ethers.providers.Web3Provider(
            window.ethereum as ethers.providers.ExternalProvider,
          );
          const signer = provider.getSigner();
          const contract = new ethers.Contract(TOKEN_ADDRESS, tokenAbi, signer);

          const address = await signer.getAddress();
          const balance = await contract.dividendTokenBalanceOf(address);
          // Assuming the balance is returned in wei, convert it to ether
          const balanceInEther = ethers.utils.formatEther(balance);
          setDividendBalance(`${parseFloat(balanceInEther).toFixed(0)}`); // Format the balance to no decimal places
        } catch (err) {
          console.error("Failed to load dividend balance:", err);
          setDividendBalance("Failed to load");
        }
      } else {
        setDividendBalance("Ethereum object not found");
      }
    };

    fetchDividendBalance();
  }, []); // This effect does not depend on any changing values and thus runs only on component mount

  // Function to handle clicking the Max button
  const handleMaxClick = () => {
    // Convert availableBalance to a number, round it down to the nearest whole number, and then set it as the new stakeAmount
    const maxStakeAmount = Math.floor(Number(availableBalance)).toString();
    setStakeAmount(maxStakeAmount);
  };

  // ####################################################################################################################################
  // ####################################################################################################################################
  // ####################################################################################################################################

  const [totalSupply, setTotalSupply] = useState("Loading...");

  useEffect(() => {
    const fetchTotalSupply = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum as ethers.providers.ExternalProvider,
        );
        try {
          await provider.send("eth_requestAccounts", []);
          const contract = new ethers.Contract(
            TOKEN_ADDRESS,
            tokenAbi,
            provider,
          );
          const supply = await contract.totalSupply();
          const supplyInEther = ethers.utils.formatEther(supply);
          const supplyRounded = parseFloat(supplyInEther).toFixed(0);
          const supplyFormatted = parseInt(supplyRounded, 10).toLocaleString(
            "en-US",
          );
          setTotalSupply(supplyFormatted);
        } catch (error) {
          console.error(
            "Error fetching total supply:",
            error instanceof Error ? error.message : error,
          );
          setTotalSupply(
            `Error: ${error instanceof Error ? error.message : String(error)}`,
          );
        }
      } else {
        setTotalSupply("Ethereum object not found. Please install MetaMask.");
      }
    };

    fetchTotalSupply();
  }, []);

  // ####################################################################################################################################
  //
  //     ♤  THE MAN TOKEN
  // ♧  8% buy sell tax
  // ♧  6% xrp rewards
  // ♧  2% True burn
  // ♧  1,000,000 supply token

  const [amount, setAmount] = useState("");

  // Fetch available balance (simplified example, implement according to your contract)
  // Assume this updates `availableBalance` with the user's token balance

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const burnTokens = async () => {
    if (!window.ethereum) return alert("Please install MetaMask.");
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);

    const signer = provider.getSigner();
    const tokenContract = new ethers.Contract(TOKEN_ADDRESS, tokenAbi, signer);

    try {
      if (parseFloat(amount) > parseFloat(availableBalance)) {
        alert("Amount exceeds available balance.");
        return;
      }

      const tx = await tokenContract.transfer(
        DEAD_ADDRESS,
        ethers.utils.parseEther(amount),
      );
      await tx.wait();
      alert("Tokens successfully burned.");
    } catch (error) {
      console.error("Error burning tokens:", error);
      alert("Failed to burn tokens.");
    }
  };

  // ####################################################################################################################################
  const [showTopBtn, setShowTopBtn] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowTopBtn(true);
    } else {
      setShowTopBtn(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  // ####################################################################################################################################


const [buttonOpacity, setButtonOpacity] = useState(0.7);

// ####################################################################################################################################
<div
  onMouseOver={() => setButtonOpacity(1)}
  onMouseOut={() => setButtonOpacity(0.7)}
  style={{ opacity: buttonOpacity }}
>
  {/* Content */}
</div>

// ####################################################################################################################################


// ####################################################################################################################################

  const [totalDividends, setTotalDividends] = useState('Loading...');

  const fetchTotalDividendsDistributed = async () => {
    try {
      // This assumes you are using MetaMask or another web3 provider
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as ethers.providers.ExternalProvider,
      );
      await provider.send("eth_requestAccounts", []); // Request access
      const signer = provider.getSigner();
      const contract = new ethers.Contract(TOKEN_ADDRESS, tokenAbi, signer);

      const total = await contract.getTotalDividendsDistributed();
      // Convert the BigNumber to a string or format it as needed
      setTotalDividends(ethers.utils.formatEther(total)); // Assuming the value is in wei
    } catch (error) {
      console.error('Failed to fetch total dividends distributed:', error);
      setTotalDividends('Failed to load');
    }
  };

  useEffect(() => {
    fetchTotalDividendsDistributed();
  }, []);

  // ####################################################################################################################################
  // ####################################################################################################################################


      const [xrpMarketCap, setXrpMarketCap] = useState('Loading...');
      const [xrpTotalReserveInUSD, setXrpTotalReserveInUSD] = useState('Loading...');
      const [xrpPricePoolUSD, setXrpPricePoolUSD] = useState('Loading...');
      xrpPricePoolUSD

      // ... (existing useEffect hooks)

      // Fetch Market Cap and Total Reserve data for XRP Token
      useEffect(() => {
        const xrpTokenAddress = '0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE';
        const url = `https://api.geckoterminal.com/api/v2/networks/bsc/tokens/0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE`;

        fetch(url)
          .then(response => response.json())
          .then(data => {
            if (data && data.data && data.data.attributes) {
              // Renamed from fdvUsd to xrpFdvUsd
              if (data.data.attributes.fdv_usd) {
                const xrpFdvUsd = data.data.attributes.fdv_usd;
                setXrpMarketCap(`${parseFloat(xrpFdvUsd).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`);
              } else {
                setXrpMarketCap('Market Cap not available');
              }

              // Renamed from reserveUsd to xrpReserveUsd
              if (data.data.attributes.total_reserve_in_usd) {
                const xrpReserveUsd = data.data.attributes.total_reserve_in_usd;
                setXrpTotalReserveInUSD(`${parseFloat(xrpReserveUsd).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`);
              } else {
                setXrpTotalReserveInUSD('Total Reserve not available');
              }

                       // Renamed from reserveUsd to xrpPricePoolUSD
                       if (data.data.attributes.price_usd) {
                         const xrpPricePoolUSD = data.data.attributes.price_usd;
                         setXrpPricePoolUSD(`${parseFloat(xrpPricePoolUSD).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`);
                       } else {
                         setXrpPricePoolUSD('Total Reserve not available');
                       }
            } else {
              setXrpMarketCap('Data not available');
              setXrpTotalReserveInUSD('Data not available');
              setXrpPricePoolUSD('Data not available');
            }

          })
          .catch(error => {
            console.error('Error fetching data for XRP:', error);
            setXrpMarketCap('Error fetching data');
            setXrpTotalReserveInUSD('Error fetching data');
            setXrpPricePoolUSD('Error fetching data');
          });
      }, []);

  // ####################################################################################################################################



  return (
    <>
      <ToastContainer />


      <Box p={4} color="white" bg="black">

        <Flex justifyContent="space-between" alignItems="center">

                  <Stack direction={'row'} justifyContent="center" spacing={4} align={'center'} display={{ base: 'none', md: 'flex' }}>

                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "center",
                      marginBottom: "0px",
                    }}
                  >
                  <LinkScroll to="token" smooth={true} duration={500}>Token</LinkScroll>
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "center",
                      marginBottom: "0px",
                    }}
                  >
                  <LinkScroll to="staking" smooth={true} duration={500}>Staking</LinkScroll>
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "center",
                      marginBottom: "0px",
                    }}
                  >
                  <LinkScroll to="about" smooth={true} duration={500}>About</LinkScroll>
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "center",
                      marginBottom: "0px",
                    }}
                  >
                  <LinkScroll to="nft" smooth={true} duration={500}>NFTs</LinkScroll>
                  </div>

                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "center",
                      marginBottom: "0px",
                    }}
                  >
                  <LinkScroll to="chart" smooth={true} duration={500}>Chart</LinkScroll>
                  </div>





                  </Stack>

          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
size={'md'}
icon={isOpen ? <CloseIcon w={6} h={6} color="white" /> : <HamburgerIcon w={6} h={6} color="white" />}
aria-label={'Open Menu'}
display={{ md: 'none' }}
onClick={onToggle}


bg="black" // Set the background color to black
_hover={{ bg: 'gray.700' }} // Optional: change background color on hover
borderRadius="md" // Optional: adjust the border radius if you need rounded corners
/>
            <Collapse in={isOpen} animateOpacity>
              <Stack
                bg={useColorModeValue('black', 'gray.900')}
                p={4}
                marginTop="30px"
                display={{ md: 'none' }}>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: "0px",
                  }}
                >
                <LinkScroll to="token" smooth={true} duration={500}>Token</LinkScroll>
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: "0px",
                  }}
                >
                <LinkScroll to="staking" smooth={true} duration={500}>Staking</LinkScroll>
                </div>

                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: "0px",
                  }}
                >
                <LinkScroll to="about" smooth={true} duration={500}>About</LinkScroll>
                </div>

                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: "0px",
                  }}
                >
                <LinkScroll to="nft" smooth={true} duration={500}>NFTs</LinkScroll>
                </div>

                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: "0px",
                  }}
                >
                <LinkScroll to="chart" smooth={true} duration={500}>Chart</LinkScroll>
                </div>
              </Stack>
            </Collapse>
          </Flex>

          {/* Desktop Links */}


          <ConnectButton  label="Connect"/>

        </Flex>

      </Box>

      <Box
        flex={1}
        p={1}
        display="flex"
        flexDirection="column"
        bg="rgba(31, 31, 31, 0.4)"
        bgImage={`url(${mainbackgroundImage})`}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
      >
        <Container maxW="container.xl" p={1} color="white">{/* Navigation */}





          <Flex direction="column" gap={4}>
            <Box minH="20px" bg="" p={4} borderRadius="lg" marginTop="20px">
              <img
                src={manOnly}
                alt="Main Text Logo"
                className="logobodyheader"

              />

              <div
                id="home"
                style={{
                  fontSize: "48px",
                  fontWeight: "bolder",
                  textAlign: "center",
                  marginTop: "8px",
                  marginBottom: "5px",
                }}
              >
                The Man Token
              </div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: "0px",
                }}
              >
                0x689cC7BB716AfF448DcA16a8b61253C7E246D9Fc
              </div>
              <Box id="token"
                flex="1"
                minW="160px"
                p={4}
                m={2}
                textAlign="center"
                borderRadius="lg"
              >

            <a
                  href="https://pancakeswap.finance/swap?outputCurrency=0x689cC7BB716AfF448DcA16a8b61253C7E246D9Fc"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "8px 16px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "white",
                    backgroundColor: "#e79000",
                    textDecoration: "none",
                    textAlign: "center",
                    borderRadius: "4px",
                    display: "inline-block",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#ff9d0b"; // Darker #e79000 on hover
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "#e79000"; // Original #e79000
                  }}
                >
                  Buy Now
                </a>

                              </Box>
                              <Box id="token"
                                flex="1"
                                minW="160px"
                                p={4}
                                m={2}
                                textAlign="center"
                                borderRadius="lg"
                              >

                            <a
                                  href="https://dexscreener.com/bsc/0x511f4f91b5147243088bb07e1f192f160f009e82"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    padding: "8px 16px",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    color: "white",
                                    backgroundColor: "#e79000",
                                    textDecoration: "none",
                                    textAlign: "center",
                                    borderRadius: "4px",
                                    display: "inline-block",
                                  }}
                                  onMouseOver={(e) => {
                                    e.currentTarget.style.backgroundColor = "#ff9d0b"; // Darker #e79000 on hover
                                  }}
                                  onMouseOut={(e) => {
                                    e.currentTarget.style.backgroundColor = "#e79000"; // Original #e79000
                                  }}
                                >
                                  Dex Screener Chart
                                </a>

              </Box>
            </Box>

            <Flex
              wrap="wrap"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                flex="1"
                minW="160px"
                bg="rgba(31, 31, 31, 0.4)"
                p={4}
                m={2}
                textAlign="center"
                borderRadius="lg"
              >
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "bolder",
                    marginBottom: "0px",
                  }}
                >
                  Market Cap
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "bolder",
                    marginBottom: "0px",
                  }}
                >
                  {marketCap}
                </div>
              </Box>
              <Box
                flex="1"
                minW="240px"
                bg="rgba(31, 31, 31, 0.4)"
                p={4}
                m={2}
                textAlign="center"
                borderRadius="lg"
              >
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "bolder",
                    marginBottom: "0px",
                  }}
                >
                  Liquidity
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "bolder",
                    marginBottom: "0px",
                  }}
                >
                  {totalLiquidityUSD}
                </div>
              </Box>
              <Box
                flex="1"
                minW="240px"
                bg="rgba(31, 31, 31, 0.4)"
                p={4}
                m={2}
                textAlign="center"
                borderRadius="lg"
              >
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "bolder",
                    marginBottom: "0px",
                  }}
                >
                  Initial Supply
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "bolder",
                    marginBottom: "0px",
                  }}
                >
                  1,000,000
                </div>
              </Box>
              <Box
                flex="1"
                minW="240px"
                bg="rgba(31, 31, 31, 0.4)"
                p={4}
                m={2}
                textAlign="center"
                borderRadius="lg"
              >
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "bolder",
                    marginBottom: "0px",
                  }}
                >
                  Remaining Supply
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "bolder",
                    marginBottom: "0px",
                  }}
                >
                  {totalSupply}
                </div>
              </Box>
            </Flex>

            <Box minH="200px"  p={4} borderRadius="lg">
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "normal",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
Man Token, a BSC based hyper rewards token, provides XRP BEP20 reflections to holders. Earn up to 9x reflections by staking in our pools.

              </div>
            </Box>




            <Flex
              wrap="wrap"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box id="token"
                flex="1"
                minW="160px"
                bg="rgba(31, 31, 31, 0.4)"
                p={4}
                m={2}
                textAlign="center"
                borderRadius="lg"
              >
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bolder",
                    marginBottom: "0px",
                  }}
                >
                  Tokenomics
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "normal",
                      textAlign: "center",
                      marginBottom: "20px",
                    }}
                  >
                    This is truly a token that has taken reflections to the next
                    level! Just holding this Man Token you will receive 6%
                    reflections in XRP.
                  </div>
                </div>
              </Box>
            </Flex>

            <Flex
              wrap="wrap"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                flex="1"
                minW="160px"
                bg="rgba(31, 31, 31, 0.4)"
                p={4}
                m={2}
                textAlign="center"
                borderRadius="lg"
              >
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bolder",
                    marginBottom: "0px",
                  }}
                >
                  8% Buys / 8% Sells
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "bolder",
                    marginTop: "15px",
                  }}
                >
                  Breakdown of Taxes below
                </div>
              </Box>
            </Flex>

            <Flex
              wrap="wrap"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                flex="1"
                minW="240px"
                bg="rgba(31, 31, 31, 0.4)"
                p={4}
                m={2}
                textAlign="center"
                borderRadius="lg"
              >
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bolder",
                    marginBottom: "0px",
                  }}
                >
                  XRP Relections
                </div>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bolder",
                    marginBottom: "0px",
                  }}
                >
                  6%
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "bolder",
                    marginTop: "15px",
                  }}
                >
                  Token holders benefit from XRP Reflections
                </div>
              </Box>
              <Box
                flex="1"
                minW="240px"
                bg="rgba(31, 31, 31, 0.4)"
                p={4}
                m={2}
                textAlign="center"
                borderRadius="lg"
              >
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bolder",
                    marginBottom: "0px",
                  }}
                >
                  True Burn
                </div>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bolder",
                    marginBottom: "0px",
                  }}
                >
                  2%
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "bolder",
                    marginTop: "15px",
                  }}
                >
                  Tokens True Burned are removed from total Supply
                </div>
              </Box>
            </Flex>

            <Flex
              wrap="wrap"
              justifyContent="space-between"
              alignItems="center"

            >

  <Box

    flex="1"
    minW="160px"
    p={4}
    m={2}
    textAlign="center"
    borderRadius="lg"
  >
    <div
      style={{
        fontSize: "24px",
        fontWeight: "bolder",
        marginTop: "100px",
      }}
    >
    </div>
  </Box>


</Flex>



                        <Flex
                          wrap="wrap"
                          justifyContent="space-between"
                          alignItems="center"

                        >

              <Box  id="staking"

                flex="1"
                minW="160px"
                bg="rgba(31, 31, 31, 0.4)"
                p={4}
                m={2}
                textAlign="center"
                borderRadius="lg"
              >
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bolder",
                    marginTop: "10px",
                  }}
                >
                  Token Staking
                </div>
              </Box>


            </Flex>


            <Flex direction={{ base: "column", md: "row" }} gap={4}>
              <Box
                flex={1}
                p={4}
                display="flex"
                flexDirection="column"
                borderRadius="lg"
                bg="rgba(31, 31, 31, 0.4)"
                bgPosition="center"
                bgRepeat="no-repeat"
                bgSize="cover"
              >
                <img src={manLogo} alt="Main Text Logo" className="logobody" />
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: "24px",
                  }}
                >
                  Man Token (MAN) Balances
                </div>

                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  marginTop="4"
                >
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      textAlign: "center",
                      marginBottom: "20px",
                    }}
                  >
                    Available Balance: {availableBalance} Tokens
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "center",
                      marginBottom: "20px",
                    }}
                  >
                    Your Total Token Balance: {tokenBalance}
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "center",
                      marginBottom: "20px",
                    }}
                  >
                    Your Total Staked Balance: {totalStakedAllPeriods}
                  </div>

                  <Box
                    flex={1}
                    bg=""
                    borderRadius="lg"
                    p={4}
                    display="flex"
                    flexDirection="column"
                  >
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        textAlign: "center",
                        marginBottom: "0px",
                      }}
                    >
                      Current Staking Boost
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: "24px",
                          fontWeight: "bold",
                          textAlign: "center",
                          marginBottom: "20px",
                        }}
                      >
                        {tokenBalance !== "Loading..." &&
                        dividendBalance !== "Loading..." &&
                        parseFloat(tokenBalance) !== 0
                          ? (
                              parseFloat(dividendBalance) /
                              parseFloat(tokenBalance)
                            ).toFixed(3)
                          : "N/A"}
                        x Reflections Multiplier
                      </div>
                        <div
                          style={{
                            fontSize: "24px",
                            fontWeight: "bold",
                            textAlign: "center",
                            marginBottom: "20px",
                          }}
                        >
                         $0.0USD Value of XRP Tokens Distibuted already to holders
                        </div>

                    </div>
                  </Box>

                                                          <Box
                                                            flex={1}
                                                            p={4}
                                                            m={2}
                                                            display="flex"
                                                            flexDirection="column"
                                                            borderRadius="lg"
                                                            bg="rgba(213, 143, 45, 0.7)"
                                                            bgPosition="center"
                                                            bgRepeat="no-repeat"
                                                            bgSize="cover"
                                                          >
                                                              <div
                                                                style={{
                                                                  fontSize: "18px",
                                                                  fontWeight: "bold",
                                                                  textAlign: "center",
                                                                  marginTop: "30px",
                                                                }}
                                                              >
                                                                XRP Reflections distributed regularly!
                                                              </div>
                                                              <div
                                                                style={{
                                                                  fontSize: "12px",
                                                                  fontWeight: "bold",
                                                                  textAlign: "center",
                                                                  marginTop: "20px",
                                                                }}
                                                              >
                                                                Cant wait, you can manual Claim now for all users (you pay the gas to manual claim)
                                                              </div>

                                                          <Button
                                                            onClick={onClaimClick}
                                                            textColor='white'
                                                            bg="#e79000"
                                                            _hover={{ bg: "#ff9d0b" }}
                                                          >
                                                            Claim pending Rewards
                                                          </Button>



                                                          </Box>
                </Box>
              </Box>

              <Box
                flex={1}
                p={4}
                display="flex"
                flexDirection="column"
                borderRadius="lg"
                bg="rgba(31, 31, 31, 0.4)"
                bgPosition="center"
                bgRepeat="no-repeat"
                bgSize="cover"
              >

                <Tabs isFitted variant="enclosed" flex="1">
                  <TabList mb="1em">
                    <Tab>14 Days</Tab>
                    <Tab>30 Days</Tab>
                    <Tab>90 Days</Tab>
                    <Tab>More</Tab>
                  </TabList>
                  <TabPanels flex="1">
                    <TabPanel>
                      <Box minH="350px">
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          justifyContent="center"
                          marginTop="4"
                          style={{ backgroundColor: "" }} // Light dark grey color
                        >
                          <div
                            style={{
                              fontSize: "24px",
                              fontWeight: "bold",
                              textAlign: "center",
                              marginBottom: "20px",
                            }}
                          >
                            14 Day Staking Pool
                          </div>

                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "bold",
                              textAlign: "center",
                              marginBottom: "20px",
                            }}
                          >
                            Receive 2x Reflections on staked tokens in this pool
                          </div>


                          <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            marginTop="4"
                          >
                            <Flex
                              alignItems="center"
                              justifyContent="center"
                              marginTop="4"
                            >
                              <Input
                                placeholder="Enter amount to stake"
                                value={stakeAmount}
                                onChange={(e) => setStakeAmount(e.target.value)}
                                size="md"
                                bg="white"
                                color="black"
                                borderColor="gray.990"
                                type="number"
                              />

                              <Button
                                onClick={() =>
                                  setStakeAmount(
                                    Math.floor(
                                      +availableBalance - 1,
                                    ).toString(),
                                  )
                                } // Subtract 1 from available balance, convert to number, then back to string
                                ml="2"
                                bg="gray.600"
                                _hover={{ bg: "gray.500" }}
                              >
                                Max
                              </Button>
                            </Flex>

                            <Button
                              onClick={onStakeClick}
                              marginTop="2"
                              textColor="white"
                              bg="#e79000"
                              _hover={{ bg: "#ff9d0b" }}
                            >
                              Stake for 14 Days
                            </Button>
                          </Box>

                          <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            marginTop="4"
                            marginBottom="4"
                          >
                            <Button
                              onClick={onUnstake14DaysClick}
                              textColor="white"
                              bg="#e79000"
                              _hover={{ bg: "#ff9d0b" }}
                            >
                              Unstake
                            </Button>
                          </Box>

                          <div
                            style={{
                              fontSize: "18px",
                              fontWeight: "bold",
                              textAlign: "center",
                              marginTop: "5px",
                            }}
                          >
                            Your Tokens Staked for 14 Days: {tokensStaked14Days}
                          </div>

                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "bold",
                              textAlign: "center",
                              marginTop: "15px",
                            }}
                          >
                            Staked on: {stakedTimestamp}
                          </div>

                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "bold",
                              textAlign: "center",
                              marginBottom: "0px",
                            }}
                          >
                            Unlock Date: {unlockDate}
                          </div>
                        </Box>
                      </Box>
                    </TabPanel>
                    <TabPanel>
                      <Box minH="350px">
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          justifyContent="center"
                          marginTop="4"
                          style={{ backgroundColor: "" }} // Light dark grey color
                        >
                          <div
                            style={{
                              fontSize: "24px",
                              fontWeight: "bold",
                              textAlign: "center",
                              marginBottom: "20px",
                            }}
                          >
                            30 Day Staking Pool
                          </div>

                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "bold",
                              textAlign: "center",
                              marginBottom: "20px",
                            }}
                          >
                            Receive 3x Reflections on staked tokens in this pool
                          </div>

                          <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            marginTop="4"
                          >
                            <Flex
                              alignItems="center"
                              justifyContent="center"
                              marginTop="4"
                            >
                              <Input
                                placeholder="Enter amount to stake"
                                value={stakeAmount30Days}
                                onChange={(e) =>
                                  setStakeAmount30Days(e.target.value)
                                }
                                size="md"
                                bg="white"
                                color="black"
                                borderColor="gray.990"
                                type="number"
                              />

                              <Button
                                onClick={() =>
                                  setStakeAmount30Days(
                                    Math.floor(
                                      +availableBalance - 1,
                                    ).toString(),
                                  )
                                } // Subtract 1 from available balance, convert to number, then back to string
                                ml="2"
                                bg="gray.600"
                                _hover={{ bg: "gray.500" }}
                              >
                                Max
                              </Button>
                            </Flex>

                            <Button
                              onClick={onStakeClick30Days}
                              marginTop="2"
                              textColor="white"
                              bg="#e79000"
                              _hover={{ bg: "#ff9d0b" }}
                            >
                              Stake for 30 Days
                            </Button>
                          </Box>
                          <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            marginTop="4"
                            marginBottom="4"
                          >
                            <Button
                              onClick={onUnstake30DaysClick}
                              textColor="white"
                              bg="#e79000"
                              _hover={{ bg: "#ff9d0b" }}
                            >
                              Unstake
                            </Button>
                          </Box>

                          <div
                            style={{
                              fontSize: "18px",
                              fontWeight: "bold",
                              textAlign: "center",
                              marginTop: "5px",
                            }}
                          >
                            Your Tokens Staked for 30 Days:{" "}
                            {tokensStaked30Days}
                          </div>

                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "bold",
                              textAlign: "center",
                              marginTop: "15px",
                            }}
                          >
                            Staked on: {stakedTimestamp30Days}
                          </div>

                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "bold",
                              textAlign: "center",
                              marginBottom: "0px",
                            }}
                          >
                            Unlock Date: {unlockDate30Days}
                          </div>
                        </Box>
                      </Box>
                    </TabPanel>
                    <TabPanel>
                      <Box minH="350px">
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          justifyContent="center"
                          marginTop="4"
                          style={{ backgroundColor: "" }} // Light dark grey color
                        >
                          <div
                            style={{
                              fontSize: "24px",
                              fontWeight: "bold",
                              textAlign: "center",
                              marginBottom: "20px",
                            }}
                          >
                            90 Day Staking Pool
                          </div>

                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "bold",
                              textAlign: "center",
                              marginBottom: "20px",
                            }}
                          >
                            Receive 9x Reflections on staked tokens in this pool
                          </div>

                          <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            marginTop="4"
                          >
                            <Flex
                              alignItems="center"
                              justifyContent="center"
                              marginTop="4"
                            >
                              <Input
                                placeholder="Enter amount to stake"
                                value={stakeAmount90Days}
                                onChange={(e) =>
                                  setStakeAmount90Days(e.target.value)
                                }
                                size="md"
                                bg="white"
                                color="black"
                                borderColor="gray.990"
                                type="number"
                              />

                              <Button
                                onClick={() =>
                                  setStakeAmount90Days(
                                    Math.floor(
                                      +availableBalance - 1,
                                    ).toString(),
                                  )
                                } // Subtract 1 from available balance, convert to number, then back to string
                                ml="2"
                                bg="gray.600"
                                _hover={{ bg: "gray.500" }}
                              >
                                Max
                              </Button>
                            </Flex>
                            <Button
                              onClick={onStakeClick90Days}
                              marginTop="2"
                              textColor="white"
                              bg="#e79000"
                              _hover={{ bg: "#ff9d0b" }}
                            >
                              Stake for 90 Days
                            </Button>
                          </Box>
                          <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            marginTop="4"
                            marginBottom="4"
                          >
                            <Button
                              onClick={onUnstake90DaysClick}
                              textColor="white"
                              bg="#e79000"
                              _hover={{ bg: "#ff9d0b" }}
                            >
                              Unstake
                            </Button>
                          </Box>

                          <div
                            style={{
                              fontSize: "18px",
                              fontWeight: "bold",
                              textAlign: "center",
                              marginTop: "5px",
                            }}
                          >
                            Your Tokens Staked for 90 Days:{" "}
                            {tokensStaked90Days}
                          </div>

                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "bold",
                              textAlign: "center",
                              marginTop: "15px",
                            }}
                          >
                            Staked on: {stakedTimestamp90Days}
                          </div>
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "bold",
                              textAlign: "center",
                              marginBottom: "0px",
                            }}
                          >
                            Unlock Date: {unlockDate90Days}
                          </div>
                        </Box>
                      </Box>
                    </TabPanel>

                    <TabPanel>

      {/*              <Box
                      flex={1}
                      p={4}
                      m={2}
                      display="flex"
                      flexDirection="column"
                      borderRadius="lg"
                      bg="rgba(213, 143, 45, 0.8)"
                      bgPosition="center"
                      bgRepeat="no-repeat"
                      bgSize="cover"
                    >

                      <ZapToLP />
                    </Box>

*/}

                    <Box
                      flex={1}
                      p={4}
                      m={2}
                      display="flex"
                      flexDirection="column"
                      borderRadius="lg"
                      bg="rgba(197, 76, 76, 0.8)"
                      bgPosition="center"
                      bgRepeat="no-repeat"
                      bgSize="cover"
                    >
                        <div
                          style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            textAlign: "center",
                            marginTop: "30px",
                          }}
                        >
                          Destroy Token to remove from Supply using Man Tokens
                          True Burn!
                        </div>

                        <Flex
                          alignItems="center"
                          justifyContent="center"
                          marginTop="4"
                        >
                          <div
                            style={{
                              fontSize: "22px",
                              fontWeight: "bold",
                              textAlign: "center",
                              marginBottom: "20px",
                            }}
                          >
                            <Input
                              type="number"
                              value={amount}
                              onChange={handleInputChange}
                              placeholder="Amount to True Burn"
                              min="0"
                              step="any"
                              size="md"
                              bg="white"
                              color="black"
                              borderColor="gray.990"
                            />
                            <div
                              style={{
                                fontSize: "12px",
                                fontWeight: "bold",
                                textAlign: "center",
                                marginTop: "20px",
                              }}
                            >
                              NOTE: This section will burn your tokens! Once
                              transaction is confirmed, you will have removed these
                              tokens from your wallet and destroyed these tokens.
                              Please understand what you are doing here!
                            </div>


                            <Button
                              onClick={burnTokens}
                              marginTop="2"
                              textColor="white"
                              bg="Red"
                              _hover={{ bg: "Red" }}
                            >
                              Destroy Tokens
                            </Button>
                          </div>
                        </Flex>
                      </Box>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            </Flex>

            <Box

              flex="1"
              minW="160px"
              p={4}
              m={2}
              textAlign="center"
              borderRadius="lg"
            >
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bolder",
                  marginTop: "45px",
                }}
              >
              </div>
            </Box>
            <Flex
              wrap="wrap"
              justifyContent="space-between"
              alignItems="center"
            >


              <Box id="about"
                flex="1"
                minW="160px"
                bg="rgba(31, 31, 31, 0.4)"
                p={4}
                m={2}
                textAlign="center"
                borderRadius="lg"
              >
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bolder",
                    marginBottom: "0px",
                  }}
                >
                  About
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "normal",
                      textAlign: "center",
                      marginBottom: "20px",
                    }}
                  >
                  Man Token is all about giving back to the community.  We want to be known as the Man's token. For all Mankind to share in. We begin with offering strong rewards. NFT's for holders,  and partnerships that will grow us. Having a name that as the Man Community We will take crypto to the people.
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "normal",
                      textAlign: "center",
                      marginBottom: "20px",
                    }}
                  >
                  We host a weekly Telegram Chat each Friday night. There we bring projects in for short impersonal AMA'S then end it with some fun Kentucky Derby style Horse Races. Chance to win NFT's, Tokens, Prizes, and More. We call this The DeFi Derby!

                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "normal",
                      textAlign: "center",
                      marginBottom: "20px",
                    }}
                  >
                  This is truly a Project that is taking reflections to the next level! Just holding this Man Token you will receive 6% reflections in XRP. But let's take it steps further. We are introducing our in contract staking pools.

                  </div>


                </div>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  marginTop="4"
                >
                  <Button
                    onClick={addTokenToWallet}
                    textColor="white"
                    bg="#e79000"
                    _hover={{ bg: "#ff9d0b" }}
                  >
                    Add to Wallet
                  </Button>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  marginTop="4"
                >
                  <Button
                    onClick={copyToClipboard}
                    textColor="white"
                    bg="#e79000"
                    _hover={{ bg: "#ff9d0b" }}
                  >
                    Copy
                  </Button>
                  {copySuccess && <div>{copySuccess}</div>}
                </Box>


                                      <Box
                                        p={4}
                                        color="white"
                                        textAlign="center" // Align text and content to the center
                                        display="flex" // Use Flexbox
                                        flexDirection="column" // Stack items vertically
                                        alignItems="center" // Center items horizontally
                                        justifyContent="center" // Center items vertically (if there's height specified)

                                      >
                                <div
                                  style={{ fontSize: "16px", fontWeight: "bolder", marginTop: "15px" }}
                                >
                                  0x689cC7BB716AfF448DcA16a8b61253C7E246D9Fc
                                </div>
                              </Box>
              </Box>
            </Flex>



            <Box

              flex="1"
              minW="160px"
              p={4}
              m={2}
              textAlign="center"
              borderRadius="lg"
            >
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bolder",
                  marginTop: "45px",
                }}
              >
              </div>
            </Box>


            <Box  minH="100px" bg="rgba(31, 31, 31, 0.4)" p={4} borderRadius="lg">
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "normal",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                <Flex
                  wrap="wrap"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box
                    flex="1"
                    minW="160px"

                    p={4}
                    m={2}
                    textAlign="center"
                    borderRadius="lg"
                  >
                    <div
                      style={{
                        fontSize: "24px",
                        fontWeight: "bolder",
                        marginBottom: "0px",
                      }}
                    >
                      NFT Collections
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: "bolder",
                        marginTop: "15px",
                      }}
                    >
                    </div>
                  </Box>




                <Box
                  minH="350px"

                  marginTop="15px"
                  p={4}
                  borderRadius="lg"
                  bg="gray.800"
                  bgImage={`url(${derbyImage})`}
                  bgPosition="center"
                  bgRepeat="no-repeat"
                  bgSize="cover"
                >


                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "bolder",
                      marginTop: "84px",
                    }}
                  >
                    Defi Derby Winners Circle NFTs
                  </div>




                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginTop: "85px",
                  }}
                >
                Experience the excitement of horse racing with NFTs at just $5.00USD each, starting with race 1! Win prizes totaling $250.00USD in this electrifying event. Beyond the thrill, join the defi derby winners circle for more than just excitement; your $5.00USD ticket supports Hope Rescued, directly contributing $200.00USD to their cause, making you part of a movement for positive change.
                </div>


                  <a
                    href="https://tofunft.com/discover/items?contracts=90532"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: "8px 16px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "white",
                      backgroundColor: "#e79000",
                      textDecoration: "none",
                      textAlign: "center",
                      borderRadius: "4px",
                      display: "inline-block",
                      marginTop: "40px"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#ff9d0b"; // Darker #e79000 on hover
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "#e79000"; // Original #e79000
                    }}
                  >
                    Derby NFT
                  </a>
                </Box>



              </Flex>

              <Flex direction={{ base: "row", md: "row" }} gap={4}>
                                      <Box  flex={1} bg="" p={0} m={0} h="500px" display="flex" flexDirection="column" borderRadius="lg">
                                      <NftMint />
                                      </Box>
                        </Flex>







              </div>
            </Box>



            <Box

              flex="1"
              minW="160px"
              p={4}
              m={2}
              textAlign="center"
              borderRadius="lg"
            >
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bolder",
                  marginTop: "45px",
                }}
              >
              </div>
            </Box>



            <Flex justifyContent="center" bg="rgba(31, 31, 31, 0.4)" p={4} borderRadius="lg" textAlign="center" flexDirection="column">
                  <Box fontSize="24px" fontWeight="bold" mb="20px">
                    Friends and Partners
                  </Box>
                  <SimpleGrid columns={{ base: 2, md: 3 }} spacing="20px" justifyContent="center" width="auto">
                    {partnerImages.map((partner, index) => (
                      <Box bg="rgba(42, 44, 45, 0.4)" key={index} p="4" borderRadius="lg" display="flex"  flexDirection="column" alignItems="center" _hover={{ transform: 'scale(1.05)', transition: 'transform .2s' }}>
                        <Image src={partner.src} alt={partner.alt} borderRadius="full" boxSize="45px" objectFit="cover" mb="2" />
                        <Text fontSize="sm" fontWeight="bold">{partner.name}</Text>
                        <Link href={partner.url} isExternal color="blue.500" mt="2">More Info</Link>
                      </Box>
                    ))}
                  </SimpleGrid>
                </Flex>




                <Box

                  flex="1"
                  minW="160px"
                  p={4}
                  m={2}
                  textAlign="center"
                  borderRadius="lg"
                >
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "bolder",
                      marginTop: "45px",
                    }}
                  >
                  </div>
                </Box>



                                <Flex justifyContent="center" bg="rgba(31, 31, 31, 0.4)" p={4} borderRadius="lg" textAlign="center" flexDirection="column">
                                      <Box fontSize="24px" fontWeight="bold" mb="20px">
                                        Team behind The Man
                                      </Box>
                                      <SimpleGrid columns={{ base: 2, md: 4 }} spacing="20px" justifyContent="center" width="auto">
                                        {teamImages.map((team, index) => (
                                          <Box  key={index} p="4" borderRadius="lg" display="flex"  flexDirection="column" alignItems="center" _hover={{ transform: 'scale(1.05)', transition: 'transform .2s' }}>
                                            <Image src={team.src} alt={team.alt} borderRadius="full" boxSize="50px" objectFit="cover" mb="2" />

                                            <Text fontSize="sm" fontWeight="normal">{team.title}</Text>
                                            <Text fontSize="sm" fontWeight="normal">{team.title2}</Text>
                                            <Text fontSize="md" fontWeight="bold">{team.name}</Text>
                                          </Box>
                                        ))}
                                      </SimpleGrid>
                                    </Flex>

          </Flex>



          <Box

            flex="1"
            minW="160px"
            p={4}
            m={2}
            textAlign="center"
            borderRadius="lg"
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bolder",
                marginTop: "45px",
              }}
            >
            </div>
          </Box>


          <Flex justifyContent="center" marginTop="15px" marginBottom="45px"  bg="rgba(0, 0, 0, 0.9)" p={4} borderRadius="lg" textAlign="center" flexDirection="column">

          <div>
<Select placeholder="Select box" onChange={(e) => setSelectedBox(e.target.value)}>
<option value="1">TMT-BNB </option>
<option value="2">TMT-BNB</option>
<option value="3">TMT-BNB</option>
</Select>

{selectedBox === '1' && (
<Box id="box1" minH="400px" bg="grey.700">
{/* Box 1 Content */}
<div id="dexscreener-embed">
<iframe src="https://dexscreener.com/bsc/0x511f4f91B5147243088BB07E1F192F160f009e82?embed=1&theme=dark&trades=0&info=0"></iframe>
</div>
</Box>
)}

{selectedBox === '2' && (
<Box id="box2" minH="400px" bg="grey.700">
{/* Box 2 Content */}
<div id="dexscreener-embed">
<iframe src="https://dexscreener.com/bsc/0x511f4f91B5147243088BB07E1F192F160f009e82?embed=1&theme=dark"></iframe>
</div>
</Box>
)}

{selectedBox === '3' && (
<Box id="box3" minH="400px" bg="grey.700">
{/* Box 3 Content */}
<div id="dexscreener-embed">
<iframe src="https://dexscreener.com/bsc/0x511f4f91B5147243088BB07E1F192F160f009e82?embed=1&theme=dark&trades=0&info=0"></iframe>
</div>
</Box>
)}
</div>
                                    </Flex>
        </Container>




      </Box>


      <Box
        p={4}
        color="white"
        bg="black"
        textAlign="center" // Align text and content to the center
        display="flex" // Use Flexbox
        flexDirection="column" // Stack items vertically
        alignItems="center" // Center items horizontally
        justifyContent="center" // Center items vertically (if there's height specified)
        className="black-section"
      >
        <div
          className="social-links"
          style={{ display: "flex", justifyContent: "center", gap: "20px" }}
        >
          {/* Using Chakra UI's Link and Image components for better integration */}
          <Link
            href="https://twitter.com/lastm3042?t=qgE8f4poKYZ4GEuSLh20Sg&s=09"
            isExternal
          >
            <Image src={twitterImage} alt="Twitter" className="social-icon" />
          </Link>
          <Link href="https://t.me/last1man2standing" isExternal>
            <Image src={telegramImage} alt="Telegram" className="social-icon" />
          </Link>
          <Link
            href="https://bscscan.com/token/0x689cC7BB716AfF448DcA16a8b61253C7E246D9Fc#code"
            isExternal
          >
            <Image src={binanceImage} alt="Binance" className="social-icon" />
          </Link>
        </div>
        <div
          style={{ fontSize: "20px", fontWeight: "bolder", marginTop: "25px" }}
        >
          The Man Token 2024
        </div>

      </Box>
      {showTopBtn && (
        <button
         style={{







           position: 'fixed',
           bottom: '40px',
           right: '40px',
           opacity: 0.7, // Make the button slightly transparent
           backgroundColor: 'rgba(255, 255, 0, 0.5)', // Semi-transparent yellow
           border: 'none',
           cursor: 'pointer',
           transition: 'opacity 0.5s ease', // Smooth transition for the opacity
         }}
         onClick={goToTop}

  onMouseOver={() => setButtonOpacity(1)}
  onMouseOut={() => setButtonOpacity(0.7)}
       >
         ↑
       </button>
       )}
     </>
  );
  };

  export default App;


//
