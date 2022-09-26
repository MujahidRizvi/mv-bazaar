export const ethBalanceConvertor = (balance: any, formatEther: any) => {
    return balance === undefined
        ? "..."
        : balance === null
            ? "Error"
            : `${parseFloat(formatEther(balance)).toPrecision(4)}`
}

export const GetUSDExchangeRate = async () => {
    var requestOptions: any = { method: "GET", redirect: "follow" };
    return fetch("https://api.coinbase.com/v2/exchange-rates?currency=ETH", requestOptions)
        .then((response) => response.json())
        .then((result) => { return (result.data.rates.USD) })
        .catch((error) => { return (error) });
}

export const twitterURLValidator = (handle: string) => {
    if (handle.match(/(?:http:\/\/)?(?:www\.)?twitter\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/)) return true;
    return false;
}

export const instagramURLValidator = (handle: string) => {
    if (handle.match(/^\s*(https\:\/\/)??(?:www\.)?instagram\.com\/[a-z\d-_]{1,255}\s*\/?[a-z\d-_]{1,255}/i)) return true;
    return false;
}