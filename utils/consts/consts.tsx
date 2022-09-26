const Responsive_Breakdown_Rectangular = {
    desktopLg: {
        breakpoint: { max: 5000, min: 1893 },
        items: 5,
    },
    desktopMd: {
        breakpoint: { max: 1893, min: 1483 },
        items: 5,
    },
    desktopSm: {
        breakpoint: { max: 1482, min: 1087 },
        items: 5,
    },
    tablet: {
        breakpoint: { max: 1087, min: 710 },
        items: 3,
    },
    mobile: {
        breakpoint: { max: 710, min: 0 },
        items: 2,
        slidesToSlide: 1,
    },
};

const toastConfiguration: any = {
    position: "bottom-right",
    autoClose: 2000,
    theme: 'colored',
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}

export { Responsive_Breakdown_Rectangular, toastConfiguration };
