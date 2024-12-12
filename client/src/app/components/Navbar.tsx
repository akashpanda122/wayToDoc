'use client';
//import { useAccount, useLogout } from '@account-kit/react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { FaPowerOff } from 'react-icons/fa6';
import { RxAvatar, RxExternalLink } from 'react-icons/rx';
//import alchemyLogo from '../../../public/assets/alchemy.png';
import logo from '../../../public/assets/logo.png';
import { shortenAddress } from '../lib';
import WordId from './wordId';
import { usePathname } from 'next/navigation';
import eacLogo from '@/../../public/assets/EasLogo.png';
import {
    Abstraxion,
    useAbstraxionAccount,
} from "@burnt-labs/abstraxion";
import { Button } from "../../components/ui/button"

const Navbar = () => {
    {/*const { address } = useAccount({
        type: 'LightAccount',
    });*/}
    {/*const { logout } = useLogout();*/}

    const { data: { bech32Address } } = useAbstraxionAccount();

    const pathname = usePathname();
    return (
        <>
            <div className="border-b border-gray-800 bg-gray-900 text-gray-100">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-6">
                        <Link
                            href={'/home'}
                            className="flex items-center space-x-2"
                        >
                            <Image
                                src={logo}
                                alt="logo"
                                width={40}
                                height={40}
                            />
                        
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 text-transparent bg-clip-text">
                                WayToDoc
                            </span>
                        </Link>

                        {pathname === '/home' ? (
                            <Link
                                href={'/view-records'}
                                className="text-sm text-teal-400 hover:text-teal-300 transition-colors"
                            >
                                View records
                            </Link>
                        ) : pathname === '/verified-doctor' ||
                          pathname === '/healthcare-provider' ? (
                            <Image src={eacLogo} alt="EacLogo" width={80} />
                        ) : null}
                    </div>
                    {bech32Address ? (
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
                                        bech32Address as string
                                    );
                                    toast.success(
                                        'Address copied to clipboard'
                                    );
                                }}
                            >
                                {/*{bech32Address}*/}
                                {shortenAddress(bech32Address)}
                            </div>
                            {/*<FaPowerOff
                                className="cursor-pointer"
                                onClick={() => logout()}
                            />*/}
                            {/*<Image
                                src={logo}
                                alt="logo"
                                width={50}
                            />*/}
                        </div>
                    ) : (
                        <Button asChild variant="outline" className="bg-gradient-to-r from-blue-500 to-teal-500 text-white border-none hover:from-blue-600 hover:to-teal-600">
                            <Link href="/home" className="flex items-center space-x-2">
                                <span>Book Appointment</span>
                                <RxExternalLink />
                            </Link>
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;