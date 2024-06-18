import React from "react";
import { Facility } from "../../../interface";
import { Link } from "react-router-dom";
interface Props {
    facility: Facility;
}
export const FacilitiesCard: React.FC<Props> = (props) => {
    const { facility } = props;
    const imageStyle: React.CSSProperties = {
        position: "absolute",
        height: "100%",
        width: "100%",
        inset: "0px",
        color: "transparent",
    };
    return (
        <Link to={`/location/${facility._id}`}>
            <div className="flex p-2 rounded-xl shadow-[rgba(0,0,0,0.1)_0px_2px_20px_0px]">
                <div className="relative rounded-lg overflow-hidden flex-shrink-0 mr-3 sm:mr-4 min-w-[120px] sm:min-w-[200px] min-h-[100px] sm:min-h-[166px]">
                    <img
                        alt="Listing"
                        loading="lazy"
                        decoding="async"
                        data-nimg="fill"
                        className="object-cover w-full h-full"
                        sizes="100vw"
                        src={facility.img[0]}
                        style={imageStyle}
                    />
                    <div className="absolute top-[6px] right-[6px] bg-primary text-white rounded-full pb-[5px] pt-[2px] px-[8px] sm:py-1 sm:px-[12px] leading-[10px] sm:leading-[14px]">
                        <span className="text-[10px] sm:text-sm font-semibold">
                            {facility.price_min} - {facility.price_max}
                        </span>
                    </div>
                </div>
                <div className="w-full truncate sm:py-2 text-black-ish-100 text-xs sm:text-sm whitespace-nowrap">
                    <div className="sm:mt-[2px] sm:mb-1 flex justify-between">
                        <span className="text-[10px] sm:text-sm">Cách bạn ~ {facility.distance.text}</span>
                        <div className="flex items-center gap-2 mr-2"></div>
                    </div>
                    <div className="sm:mb-1">
                        <h3 className="text-black-ish-200 font-bold text-base sm:text-xl truncate">{facility.name}</h3>
                    </div>
                    <div className="flex gap-2 items-start pl-1 sm:mb-1">
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 512 512"
                            className="flex-shrink-0 stroke-primary"
                            height="20"
                            width="20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="32"
                                d="M256 48c-79.5 0-144 61.39-144 137 0 87 96 224.87 131.25 272.49a15.77 15.77 0 0 0 25.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137z"></path>
                            <circle
                                cx="256"
                                cy="192"
                                r="48"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="32"></circle>
                        </svg>
                        <span className="text-wrap line-clamp-2 sm:text-nowrap sm:truncate">{facility.address}</span>
                    </div>
                    <div className="flex gap-2 items-center pl-1 sm:mb-1">
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 512 512"
                            className="flex-shrink-0 fill-primary stroke-primary"
                            height="20"
                            width="20"
                            xmlns="http://www.w3.org/2000/svg">
                            <rect
                                width="416"
                                height="384"
                                x="48"
                                y="80"
                                fill="none"
                                strokeLinejoin="round"
                                strokeWidth="32"
                                rx="48"></rect>
                            <circle cx="296" cy="232" r="24"></circle>
                            <circle cx="376" cy="232" r="24"></circle>
                            <circle cx="296" cy="312" r="24"></circle>
                            <circle cx="376" cy="312" r="24"></circle>
                            <circle cx="136" cy="312" r="24"></circle>
                            <circle cx="216" cy="312" r="24"></circle>
                            <circle cx="136" cy="392" r="24"></circle>
                            <circle cx="216" cy="392" r="24"></circle>
                            <circle cx="296" cy="392" r="24"></circle>
                            <path
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="32"
                                d="M128 48v32m256-32v32"></path>
                            <path fill="none" strokeLinejoin="round" strokeWidth="32" d="M464 160H48"></path>
                        </svg>
                        <span>
                            {" "}
                            giờ mở: {facility.openHours?.start.toString()} - {facility.openHours?.end.toString()}
                        </span>
                    </div>
                    <div className="flex pl-1 gap-2 items-center sm:mb-1">
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 24 24"
                            className="flex-shrink-0 fill-primary stroke-primary"
                            height="20"
                            width="20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M21 12V6c0-1.1-.9-2-2-2h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h7v-2H5V10h14v2h2zm-5.36 8a3.504 3.504 0 0 0 6.86-1c0-1.93-1.57-3.5-3.5-3.5-.95 0-1.82.38-2.45 1H18V18h-4v-4h1.5v1.43c.9-.88 2.14-1.43 3.5-1.43 2.76 0 5 2.24 5 5a5.002 5.002 0 0 1-9.9 1h1.54z"></path>
                        </svg>
                        <span className="">
                            {facility.openDays?.start} - {facility.openDays?.end}
                        </span>
                    </div>
                    <div className="flex gap-2 items-start pl-1 sm:mb-1">
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            // strokeWidth="0"
                            viewBox="0 0 512 512"
                            className="flex-shrink-0 stroke-primary"
                            height="24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M120.8 55L87.58 199h18.52l29.1-126h18.2l-20.6 126h18.3l10.1-62H247v62h18v-62h85.8l10.1 62h18.3L358.6 73h18.2l29.1 126h18.5L391.2 55H120.8zm50.9 18h168.6l7.6 46H164.1l7.6-46zM73 217v30h366v-30H73zm-.64 48L20.69 489H491.3l-51.7-224h-18.5l47.6 206h-45L390 265h-18.3l14.2 87H265v-87h-18v87H126.1l14.2-87H122L88.35 471H43.31l47.56-206H72.36zm50.74 105h265.8l16.5 101H106.6l16.5-101z"></path>
                        </svg>
                        <span className="text-wrap line-clamp-2 sm:text-nowrap sm:truncate">
                            {facility.numberOfCourts}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};
