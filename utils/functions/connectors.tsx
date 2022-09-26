import {
    injected,
    walletconnect,
    walletlink,
} from "./wallet-connectors";
import { AbstractConnector } from '@web3-react/abstract-connector';

//connectors (wallets)
export const CONNECTORS_BY_NAME: { [name: string]: AbstractConnector } = {
    Metamask: injected,
    WalletConnect: walletconnect,
    WalletLink: walletlink,
};