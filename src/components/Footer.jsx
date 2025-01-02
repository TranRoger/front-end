import React from "react";

const Footer = () => {
    return (
        <footer className="flex flex-col bg-black bg-opacity-25 p-5 space-y-2 bottom-0">
            <div className="text-white text-center text-[12px] md:text-lg lg:text-xl">
                Liên hệ hỗ trợ: <a href="mailto:support@phongkhamx.com" className="underline">support@phongkhamx.com</a> - 0999 999 999
            </div>
            <div className="text-white text-center text-[12px] md:text-lg lg:text-xl">
                Địa chỉ: 95 XXX, Quận 10, Tp HCM
            </div>
        </footer>
    );
};

export default Footer;
