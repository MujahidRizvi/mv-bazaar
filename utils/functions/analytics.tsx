export const pageview = (url: any) => {
  //@ts-ignore
  if (window && window.gtag) {
    //@ts-ignore
    window.gtag("config", process.env.STAGGING_ANALYTICS_ID, {
      page_path: url,
    });
  }
};

export const event = ({ action, params }: any) => {
  //@ts-ignore
  if (typeof window.gtag !== "undefined") {
    //@ts-ignore
    window.gtag("event", action, params);
  }
};
