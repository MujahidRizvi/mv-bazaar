import React, { useState } from "react";
import { ProfileHeader, ProfileItem } from "mv-shared-components/dist";
import { useRouter } from "next/router";
import { useEthBalance } from "../../hooks/balance-hook";

const ProfileSideBar = ({ walletAddress, onLogoutButtonClick, setShowSideBar }: any) => {
  const [isBalanceLoaded, setIsBalanceLoaded] = useState(false);
  const [EthBalance, setEthBalance]: any = useState(null);
  const [usdBalance, setUsdBalance]: any = useState(null);

  useEthBalance(setEthBalance, setUsdBalance, setIsBalanceLoaded);
  const router = useRouter();

  const profileHeaderSections = [
    {
      title: "YOUR BALANCE",
      eth: `${EthBalance} ETH`,
      worth: `Worth USD ${usdBalance}`,
      header: 1,
      backgroundImage: "/images/profile_wallet_bg.png"
    },
    {
      title: "Wallet Address",
      token: walletAddress,
      header: 2,
      backgroundImage: "/images/profile_wallet_bg.png"
    },
  ];

  const profileSections = [
    {
      value: "Profile",
      header: 1,
      onClick: () => {
        setShowSideBar(false);
        router.push(`/profile`);
      },
    },
    {
      value: "Inventory",
      header: 2,
      onClick: () => {
        router.push({
          pathname: '/profile',
          query: { active: "inventory" }
        })
      },
    },
    {
      value: "favorites",
      header: 2,
      onClick: () => {
        router.push({
          pathname: '/profile',
          query: { active: "favorites" }
        })
      },
    },
    {
      value: "logout",
      header: 3,
      onClick: onLogoutButtonClick,
    },
  ];

  return (
    <>
      {profileHeaderSections.map(function (item, i) {
        return (
          <div key={i}>
            <ProfileHeader
              isBalanceLoaded={isBalanceLoaded}
              title={item.title}
              token={item.token}
              header={item.header}
              eth={item.eth}
              worth={item.worth}
              backgroundImage={item.backgroundImage}
            />
          </div>
        );
      })}
      {profileSections.map(function (item, i) {
        return (
          <div key={i}>
            <ProfileItem
              value={item.value}
              header={item.header}
              onClick={item.onClick}
            />
          </div>
        );
      })}
    </>
  );
};

export default ProfileSideBar;
