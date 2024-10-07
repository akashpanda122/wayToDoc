'use client';
import { useAccount, useLogout } from '@account-kit/react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { FaPowerOff } from 'react-icons/fa6';
import { RxAvatar, RxExternalLink } from 'react-icons/rx';
import alchemyLogo from '../../../public/assets/alchemy.png';
import logo from '../../../public/assets/logo.png';
import { shortenAddress } from '../lib';
import WordId from './wordId';
import { usePathname } from 'next/navigation';
import eacLogo from '@/../../public/assets/EasLogo.png';
const Navbar = () => {
    const { address } = useAccount({
        type: 'LightAccount',
    });
    const { logout } = useLogout();
    const pathname = usePathname();
    return (
        <>
            <div className="border-b-2  border-black h-fit px-10">
                <div className="container mx-auto w-full  flex justify-between py-5 ">
                    <div className="flex items-center gap-x-8">
                        <Image
                            src={logo}
                            alt="logo"
                            width={50}
                        />
                        <Link
                            href={'/home'}
                            className="bg-themelinear text-[#0A6EFF] bg-clip-text text-4xl font-extrabold"
                        >
                            WayToDoc
                        </Link>

                        {pathname === '/home' ? (
                            <Link
                                href={'/view-records'}
                                className="capitalize text-sm text-[#157D7A]"
                            >
                                View records
                            </Link>
                        ) : pathname === '/verified-doctor' ||
                          pathname === '/healthcare-provider' ? (
                            <Image src={eacLogo} alt="EacLogo" width={80} />
                        ) : null}
                    </div>
                    {address ? (
                        <div className="flex items-center gap-x-3">
                            {pathname === '/home' && (
                                <span className="cursor-pointer text-[#157D7A] hover:underline ">
                                    <WordId />
                                </span>
                            )}
                            <RxAvatar size={30} />
                            <div
                                className="cursor-pointer hover:underline"
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        address as string
                                    );
                                    toast.success(
                                        'Address copied to clipboard'
                                    );
                                }}
                            >
                                {shortenAddress(address)}
                            </div>
                            <FaPowerOff
                                className="cursor-pointer"
                                onClick={() => logout()}
                            />
                            <Image
                                src={logo}
                                alt="logo"
                                width={25}
                            />
                        </div>
                    ) : (
                        <div className="bg-themelinear px-6 py-2 rounded-lg text-[#243352] font-semibold flex items-center gap-x-2 cursor-pointer">
                            <Link
                                href={'/home'}
                            >
                                Book Appointment
                            </Link>
                            <RxExternalLink /> 
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;