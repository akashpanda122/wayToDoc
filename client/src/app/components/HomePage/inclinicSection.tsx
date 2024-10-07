'use client';
import React from 'react';
import {
    dentist,
    dietitian,
    gastroenterologist,
    generalDoctor,
    generalSurgeon,
    gynecologist,
    orthopedist,
    pediatrician,
    physiotherapist,
} from '../../../../public/assets/index';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';

const inClinicOpds = [
    {
        id: 1,
        image: dentist,
        name: 'Dentist',
        dis: 'Smile brighter! Our dental experts ensure your teeth and gums are in top shape, from routine cleanings to life-changing dental care',
    },
    {
        id: 2,
        image: gynecologist,
        name: 'Gynecologist/Obstetrician',
        dis: 'Empowering womens health at every stage of life, offering compassionate care from fertility to wellness and everything in between.',
    },
    {
        id: 3,
        image: dietitian,
        name: 'Pediatrician',
        dis: 'Where little ones get big care! We provide gentle, expert healthcare for your child growing needs, from newborn to teen.',
    },
    {
        id: 4,
        name: 'Dermatologist',
        dis: 'Love the skin you are in! Our dermatologists offer solutions for clear, glowing skin and treat everything from acne to skin cancer.',
        image: physiotherapist,
    },
    {
        id: 5,
        name: 'General Surgeon',
        dis: 'Need to get operated? Find the right surgeon.',
        image: generalSurgeon,
    },
    {
        id: 6,
        name: 'Cardiologist',
        dis: 'Your heart’s health is our priority. From heart checks to complex care, we help you live a heart-healthy life every beat of the way',
        image: orthopedist,
    },
    {
        id: 7,
        name: 'Orthopedist',
        dis: 'Keep moving with confidence! Whether it’s a sprain, fracture, or joint pain, we help you stay active and pain-free',
        image: generalDoctor,
    },
    {
        id: 8,
        name: 'Psychiatrist',
        dis: 'A healthy mind is key to a healthy life. We provide caring, expert mental health support, from counseling to treatment.',
        image: pediatrician,
    },
    {
        id: 9,
        name: 'Urologist',
        dis: 'Your health, your comfort. We specialize in urinary and reproductive health, offering expert care with a personal touch',
        image: gastroenterologist,
    },
];

const InclinicSection = () => {
    return (
        <div className="w-full mx-4 flex flex-col gap-10">
            <div className="">
                <div className="space-y-2">
                    <h1 className="font-bold text-xl text-[#243352]">
                        Book an appointment for an in-clinic consultation
                    </h1>
                    <p className="font-light">
                        Find experienced doctors across all specialties
                    </p>
                </div>
            </div>
            <div className="flex justify-around items-center">
                <ConsultaionSwiper />
            </div>
        </div>
    );
};

export default InclinicSection;
const ConsultaionSwiper = () => {
    return (
        <Swiper
            // direction={'vertical'}
            slidesPerView={4}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Autoplay, Navigation]}
            className="mySwiper"
        >
            {inClinicOpds.map((opd) => (
                <Link href="/doctors" key={opd.id}>
                    <SwiperSlide className="p-4 cursor-pointer">
                        <Image
                            src={opd.image}
                            alt={opd.name}
                            className="border border-[#52D2CF]  rounded-md p-4"
                        />
                        <h1 className="font-bold text-lg text-[#243352]">{opd.name}</h1>
                        <p className="text-sm">{opd.dis}</p>
                    </SwiperSlide>
                </Link>
            ))}
        </Swiper>
    );
};