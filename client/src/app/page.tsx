'use client';
{/*import {
    AuthCard,
    useAccount,
    useSmartAccountClient,
} from '@account-kit/react';*/}
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, {useEffect} from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperImage1 from '../../public/assets/swiper-1.png';
import SwiperImage2 from '../../public/assets/swiper-2.png';
import SwiperImage3 from '../../public/assets/swiper-3.png';
import SlightFlip from './components/ui/SlightFlip';
import ConnectButton from './ConnectButton';
import {
    Abstraxion,
    useAbstraxionAccount,
    useAbstraxionSigningClient,
    useModal,
} from "@burnt-labs/abstraxion";

export default function Home() {
    const searchParams = useSearchParams();
    const searchId = searchParams?.get('orgId');
    const router = useRouter();

    {/*const { address } = useSmartAccountClient({
        type: 'LightAccount',
    });*/}
    {/*const { isLoadingAccount } = useAccount({
        type: 'LightAccount',
    });*/}

    const { data: { bech32Address }, isConnected, isConnecting } = useAbstraxionAccount();

    useEffect(() => {
        console.log({ isConnected, isConnecting });

        if (isConnected) {
            router.push('/home');
        }
    }, [isConnected, isConnecting])

    React.useLayoutEffect(() => {
        if (searchId) {
            router.replace('/home');
        }
    }, [searchId]);
    const swiperConfig = [
        {
            title: 'Customizable Health Records',
            desc: 'Supports comprehensive patient records, including medical history, prescriptions, diagnostics, and treatment plans, all customizable to individual healthcare provider needs.',
            image: SwiperImage1,
        },
        {
            title: 'Real-Time Updates',
            desc: 'Facilitates real-time updates on patient data, allowing healthcare teams to collaborate seamlessly, improving patient outcomes.',
            image: SwiperImage2,
        },
        {
            title: 'Analytics & Reporting',
            desc: 'Provides detailed analytics on patient data and care trends, helping healthcare providers make informed decisions.',
            image: SwiperImage3,
        },
        {
            title: 'Multi-Layered Security',
            desc: 'Employs encryption, role-based access, and secure login protocols to protect sensitive patient information.',
            image: SwiperImage3,
        },
    ];

    return (
        <main className="grid grid-cols-1 lg:grid-cols-2 h-full min-h-screen bg-gray-900 text-gray-100 py-10 px-4 lg:px-10">
            <Swiper
                modules={[Autoplay]}
                className="h-full w-full "
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                loop={true}
            >
                {swiperConfig.map((elem, index) => (
                    <SwiperSlide key={index}>
                        <div className="text-center">
                            <Image
                                src={elem.image}
                                alt="images"
                                height={500}
                                width={500}
                                className="mx-auto rounded-lg shadow-2xl mb-8"
                            />
                            <h2 className="font-bold text-2xl mb-4 text-blue-400">
                                {elem.title}
                            </h2>
                            <p className="text-sm max-w-md mx-auto text-gray-300">{elem.desc}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="flex items-center justify-center lg:justify-end mt-10 lg:mt-0">
                <div className="bg-gray-800 shadow-xl rounded-xl p-8 text-gray-100 w-full max-w-md">
                    {bech32Address ? (
                        <SlightFlip
                            className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400 md:leading-tight mb-6"
                            word="Welcome to WayToDoc"
                        />
                    ) : (
                        <ConnectButton />
                    )}
                    {/*<ConnectButton />*/}
                </div>
            </div>
        </main>
    );
}