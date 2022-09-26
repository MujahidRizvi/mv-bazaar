import { HeaderImage, MintingCountDown } from "mv-shared-components/dist";
import Image from "next/image";
import React from "react";
import {
  AppColors,
  AppDimens,
  AppFonts,
  AppIcons,
  AppTexts,
} from "../utils/consts/DesignConstants";

const MintingPage = () => {
  const styles: any = {
    verticalContainer: {
      display: AppTexts.FLEX,
      flexDirection: AppTexts.COLUMN,
      flexWrap: AppTexts.WRAP,
    },
    horizontalContainerWithBg: {
      display: AppTexts.FLEX,
      flexDirection: AppTexts.ROW,
      alignItems: AppTexts.CENTER,
      justifyContent: AppTexts.CENTER,
      flexWrap: AppTexts.WRAP,
      height: "700px",
      backgroundSize: "100% 700px",
      backgroundImage: `url(${AppIcons.ICON_MINTING_BLUR_BG})`,
      backgroundRepeat: AppTexts.NO_REPEAT,
    },
    horizontalContainer: {
      display: AppTexts.FLEX,
      flexDirection: AppTexts.ROW,
    },
    verticalContainerWithBg: {
      display: AppTexts.FLEX,
      flexDirection: AppTexts.COLUMN,
      alignItems: AppTexts.CENTER,
      // justifyContent: AppTexts.CENTER,
      height: "700px",
      backgroundSize: "100% 700px",
      backgroundImage: `url(${AppIcons.ICON_MINTING_BLUR_BG})`,
      backgroundRepeat: AppTexts.NO_REPEAT,
    },
    breaker: {
      width: "606px",
      backgroundColor: AppColors.COLOR_WHITE,
      color: AppColors.COLOR_WHITE,
      height: "1px",
      border: 0,
      opacity: "0.4",
    },
    nameStyle: {
      fontFamily: AppFonts.Font_GRAND_SLANG,
      fontStyle: AppTexts.NORMAL,
      fontWeight: AppDimens.FOUR_HUNDRED,
      fontSize: "32px",
      lineHeight: "14px",
      color: AppColors.COLOR_WHITE,
      textAlign: AppTexts.CENTER,
      textTransform: AppTexts.UPPER_CASE,
    },
    tagStyle: {
      fontFamily: AppFonts.Font_GRAND_SLANG,
      fontStyle: AppTexts.NORMAL,
      fontWeight: AppDimens.FIVE_HUNDRED,
      fontSize: "12px",
      lineHeight: "15px",
      color: AppColors.COLOR_5F,
      textTransform: AppTexts.UPPER_CASE,
      marginTop: "10px",
    },
    seasonTextStyle: {
      fontFamily: AppFonts.FONT_AKTIV_GROTESK_ENTENDED,
      fontStyle: AppTexts.NORMAL,
      fontWeight: AppDimens.FOUR_HUNDRED,
      fontSize: "24px",
      lineHeight: "40px",
      color: AppColors.COLOR_WHITE,
      textTransform: AppTexts.UPPER_CASE,
    },
    seasonHeadingStyle: {
      fontFamily: AppFonts.Font_GRAND_SLANG,
      fontStyle: AppTexts.NORMAL,
      fontWeight: AppDimens.FOUR_HUNDRED,
      fontSize: "48px",
      lineHeight: "40px",
      color: AppColors.COLOR_WHITE,
      textTransform: AppTexts.UPPER_CASE,
    },
  };

  const clockTime = [
    {
      time: "01",
    },
    {
      time: "19",
    },
    {
      time: "48",
    },
    {
      time: "00",
    },
  ];

  const mintingObj = {
    section: "Fire District",
    name: "Exclusive Land collection",
    sale: "Minting Starts",
    status: "",
    items: "1234 Items",
    timeArray: clockTime,
    link: "Go to collection",
    value: "Go to collection",
    mintingName: "WRLD",
    mintingTag: "@WRLD",
  };

  return (
    <>
      <div className="web-minting">
        <div style={styles.horizontalContainerWithBg}>
          <div style={{ marginRight: "50px" }}>
            <HeaderImage
              width={"606px"}
              height={"533.49px"}
              src={AppIcons.TEST_IMAGE}
            />

            <hr style={styles.breaker} />

            <div
              style={{
                display: AppTexts.FLEX,
                flexDirection: AppTexts.ROW,
                alignItems: AppTexts.CENTER,
                height: "61.22px",
              }}
            >
              <div
                style={{
                  display: AppTexts.FLEX,
                  alignItems: AppTexts.CENTER,
                  justifyContent: AppTexts.CENTER,
                  width: "60.82px",
                  height: "61.22px",
                  backgroundImage: `url(${AppIcons.ICON_BLACK_CIRCLE})`,
                  backgroundRepeat: AppTexts.NO_REPEAT,
                }}
              >
                <Image height={40} width={40} src={AppIcons.ICON_LOGO} />
              </div>

              <div
                style={{
                  display: AppTexts.FLEX,
                  flexDirection: AppTexts.COLUMN,
                  justifyContent: AppTexts.CENTER,
                  marginTop: "15px",
                  marginLeft: "25px",
                }}
              >
                <label style={styles.nameStyle}>{mintingObj.mintingName}</label>
                <label style={styles.tagStyle}>{mintingObj.mintingTag}</label>
              </div>
            </div>
          </div>

          <div>
            <MintingCountDown
              section={mintingObj.section}
              name={mintingObj.name}
              sale={mintingObj.sale}
              status={mintingObj.status}
              items={mintingObj.items}
              timeArray={mintingObj.timeArray}
              link={mintingObj.link}
              value={mintingObj.value}
            />
          </div>
        </div>

        <div
          style={{
            ...styles.horizontalContainer,
            marginLeft: "10%",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              ...styles.verticalContainer,
              justifyContent: AppTexts.CENTER,
              marginRight: "10%",
            }}
          >
            <label style={styles.seasonTextStyle}>Season 01</label>

            <label style={{ ...styles.seasonHeadingStyle, marginTop: "20px" }}>
              IT ALL STARTS WITH AN ISLAND
            </label>

            <label
              style={{
                ...styles.seasonHeadingStyle,
                fontSize: "16px",
                fontFamily: AppFonts.FONT_AKTIV_GROTESK_ENTENDED,
                lineHeight: "22.16px",
                color: AppColors.COLOR_7D,
                marginTop: "40px",
                fontWeight: AppDimens.FIVE_HUNDRED,
              }}
            >
              Our journey begins on 0,0 Island where the world is reborn as a
              single island in the ocean. Here the ancient voices of the past
              will heal the world of tomorrowOur journey begins on 0,0 Island
              where the world is reborn as a single island in the ocean. Here
              the ancient voices of the past will heal the world of tomorrowOur
              journey begins on 0,0 Island where the world is reborn as a single
              island in the ocean. Here the ancient voices of the past will heal
              the world of tomorrowOur journey begins on 0,0 Island where the
              world is reborn as a single island in the ocean.
            </label>

            <label
              style={{
                ...styles.seasonHeadingStyle,
                fontSize: "16px",
                fontFamily: AppFonts.FONT_AKTIV_GROTESK_ENTENDED,
                lineHeight: "22.16px",
                color: AppColors.COLOR_7D,
                marginTop: "25px",
                fontWeight: AppDimens.FIVE_HUNDRED,
              }}
            >
              Our journey begins on 0,0 Island where the world is reborn as a
              single island in the ocean. Here the ancient voices of the past
              will heal the world of tomorrowOur journey begins on 0,0 Island
              where the world is reborn as a single island in the ocean. Here
              the an
            </label>
          </div>

          <div style={styles.verticalContainer}>
            <img src={AppIcons.ICON_GENESIS_ISLAND} />
          </div>
        </div>
      </div>

      <div className="mobile-minting">
        <div style={styles.verticalContainerWithBg}>
          <div>
            <MintingCountDown
              section={mintingObj.section}
              name={mintingObj.name}
              sale={mintingObj.sale}
              status={mintingObj.status}
              items={mintingObj.items}
              timeArray={mintingObj.timeArray}
              link={mintingObj.link}
              value={mintingObj.value}
            />
          </div>

          <div style={{ marginTop: "20px" }}>
            <HeaderImage
              width={"606px"}
              height={"533.49px"}
              src={AppIcons.TEST_IMAGE}
            />

            <hr style={styles.breaker} />

            <div
              style={{
                display: AppTexts.FLEX,
                flexDirection: AppTexts.ROW,
                alignItems: AppTexts.CENTER,
                height: "61.22px",
              }}
            >
              <div
                style={{
                  display: AppTexts.FLEX,
                  alignItems: AppTexts.CENTER,
                  justifyContent: AppTexts.CENTER,
                  width: "60.82px",
                  height: "61.22px",
                  backgroundImage: `url(${AppIcons.ICON_BLACK_CIRCLE})`,
                  backgroundRepeat: AppTexts.NO_REPEAT,
                }}
              >
                <Image height={40} width={40} src={AppIcons.ICON_LOGO} />
              </div>

              <div
                style={{
                  display: AppTexts.FLEX,
                  flexDirection: AppTexts.COLUMN,
                  justifyContent: AppTexts.CENTER,
                  marginTop: "15px",
                  marginLeft: "25px",
                }}
              >
                <label style={styles.nameStyle}>{mintingObj.mintingName}</label>
                <label style={styles.tagStyle}>{mintingObj.mintingTag}</label>
              </div>
            </div>
          </div>

          <div
            style={{
              marginLeft: "10%",
              marginTop: "8%",
            }}
          >
            <div
              style={{
                ...styles.verticalContainer,
                alignItems: AppTexts.CENTER,
                justifyContent: AppTexts.CENTER,
                marginRight: "10%",
              }}
            >
              <label style={styles.seasonTextStyle}>Season 01</label>

              <label
                style={{
                  ...styles.seasonHeadingStyle,
                  marginTop: "20px",
                  textAlign: AppTexts.CENTER,
                  lineHeight: "44.32px",
                  marginLeft: "15%",
                  marginRight: "15%",
                }}
              >
                IT ALL STARTS WITH AN ISLAND
              </label>

              <label
                style={{
                  ...styles.seasonHeadingStyle,
                  fontSize: "16px",
                  fontFamily: AppFonts.FONT_AKTIV_GROTESK_ENTENDED,
                  lineHeight: "22.16px",
                  color: AppColors.COLOR_7D,
                  marginTop: "40px",
                  fontWeight: AppDimens.FIVE_HUNDRED,
                }}
              >
                Our journey begins on 0,0 Island where the world is reborn as a
                single island in the ocean. Here the ancient voices of the past
                will heal the world of tomorrowOur journey begins on 0,0 Island
                where the world is reborn as a single island in the ocean. Here
                the ancient voices of the past will heal the world of
                tomorrowOur journey begins on 0,0 Island where the world is
                reborn as a single island in the ocean. Here the ancient voices
                of the past will heal the world of tomorrowOur journey begins on
                0,0 Island where the world is reborn as a single island in the
                ocean.
              </label>

              <label
                style={{
                  ...styles.seasonHeadingStyle,
                  fontSize: "16px",
                  fontFamily: AppFonts.FONT_AKTIV_GROTESK_ENTENDED,
                  lineHeight: "22.16px",
                  color: AppColors.COLOR_7D,
                  marginTop: "25px",
                  fontWeight: AppDimens.FIVE_HUNDRED,
                }}
              >
                Our journey begins on 0,0 Island where the world is reborn as a
                single island in the ocean. Here the ancient voices of the past
                will heal the world of tomorrowOur journey begins on 0,0 Island
                where the world is reborn as a single island in the ocean. Here
                the an
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MintingPage;
