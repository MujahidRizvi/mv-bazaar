import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

const RPC_URLS = {
    1: process.env.NEXT_PUBLIC_MAINNET_URL || "",
    5: process.env.NEXT_PUBLIC_GOERLI_TESTNET || ""
};

const ETHEREUM_MAIN_NETWORK = 1;
const ETHEREUM_GOERLI_NETWORK = 5;

export const injected = new InjectedConnector({
    supportedChainIds: [ETHEREUM_MAIN_NETWORK, ETHEREUM_GOERLI_NETWORK],
});

export const walletconnect = new WalletConnectConnector({
    rpc: { 1: RPC_URLS[1], 5: RPC_URLS[5] },
    bridge: process.env.NEXT_PUBLIC_BRIDGE_URL,
    qrcode: true,
    //pollingInterval: parseInt(process.env.NEXT_PUBLIC_POLLING_INTERVAL || ""),
});

export const walletlink = new WalletLinkConnector({
    url: RPC_URLS[1],
    supportedChainIds: [ETHEREUM_MAIN_NETWORK, ETHEREUM_GOERLI_NETWORK],
    appName: "mv-auth",
});
