import React from 'react';
import { useWeb3React } from "@web3-react/core";
import { ethBalanceConvertor } from '../utils/functions/common-functions';
import { formatEther } from 'ethers/lib/utils';
import { GetUSDExchangeRate } from '../utils/functions/common-functions';

export function useEthBalance(setEthBalance: any, setUsdBalance: any, setIsBalanceLoaded: any) {
    const { library, account } = useWeb3React();

    React.useEffect(() => {
        if (library && account) {
            let stale = false;

            library
                .getBalance(account)
                .then((balance: any) => {
                    if (!stale) {
                        const ethBalance: any = ethBalanceConvertor(balance, formatEther);
                        setEthBalance(ethBalance);
                        (async () => {
                            const usdRate = await GetUSDExchangeRate();
                            setUsdBalance(parseInt(ethBalance) * parseInt(usdRate));
                            setIsBalanceLoaded(true);
                        }
                        )()
                    }
                })
                .catch(() => {
                    if (!stale) {
                        setEthBalance(null);
                    }
                    setIsBalanceLoaded(true);
                });

            return () => {
                stale = true;
                setEthBalance(undefined);
            };
        }
    }, [library, account]);
}

