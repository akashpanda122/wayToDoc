import React from 'react';
import {
    cardiologyImg,
    dentalImg,
    gastroImg,
    generalImg,
    neurologyImg,
    orthopedicImg,
    urologyImg,
} from '../../../../public/assets/index';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"

const opds = [
    {
        id: 1,
        opdName: 'General Doctor',
        image: generalImg,
    },
    {
        id: 2,
        opdName: 'Urology',
        image: urologyImg,
    },
    {
        id: 3,
        opdName: 'Dental',
        image: dentalImg,
    },
    {
        id: 4,
        opdName: 'Neurology ',
        image: neurologyImg,
    },
    {
        id: 5,
        opdName: 'Gastroenterology',
        image: gastroImg,
    },
    {
        id: 6,
        opdName: 'Orthopedic',
        image: orthopedicImg,
    },
    {
        id: 7,
        opdName: 'Cardiology',
        image: cardiologyImg,
    },
];

const OpdSelection = () => {
    return (
        <div className="w-full bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div className="space-y-2 max-w-2xl">
                        <h2 className="text-2xl font-bold text-gray-100">
                            Get expert medical advice from top doctors, anytime,
                            anywhere.
                        </h2>
                        <p className="text-gray-400">
                            Secure online sessions with verified doctors in every
                            specialty.
                        </p>
                    </div>
                    <Button asChild variant="outline" className="bg-gradient-to-r from-teal-500 to-blue-500 text-white border-none hover:from-teal-600 hover:to-blue-600">
                        <Link href="/doctors">
                            Explore All Specialties
                        </Link>
                    </Button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
                    {opds.map((opd) => (
                        <Card key={opd.id} className="bg-gray-800 border-gray-700">
                            <CardContent className="p-4 flex flex-col items-center gap-4">
                                <Image
                                    src={opd.image}
                                    alt={opd.opdName}
                                    width={100}
                                    height={100}
                                    className="rounded-lg"
                                />
                                <h3 className="text-gray-100 text-center">{opd.opdName}</h3>
                                <Button asChild variant="outline" size="sm" className="w-full">
                                    <Link href="/doctors">
                                        Consult Now
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OpdSelection;