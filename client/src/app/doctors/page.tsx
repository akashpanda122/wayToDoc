import Image from 'next/image';
import { RxAvatar } from 'react-icons/rx';
//import MedxApp from '../../../public/assets/MedxApp.png';
import Link from 'next/link';
import { Button } from '@/components/ui/button'
import { CalendarIcon } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const doctorDetails = [
    {
        avatar: <RxAvatar size={100} />,
        name: 'Dr. Emily Watson',
        short_desc: 'Cardiologist with 10+ years of experience in treating heart-related conditions',
        desc: 'Dr. Emily Watson is a board-certified cardiologist specializing in heart disease prevention, diagnosis, and treatment. She has successfully managed complex cases of hypertension, arrhythmia, and heart failure. Dr. Watson is known for her compassionate patient care and uses the latest diagnostic tools to ensure effective treatment.',
        language: 'English',
        education: 'MD - Cardiology, Harvard Medical School',
        fees: '$150',
        hospitals: 'Mercy General Hospital, Heart Care Clinic',
    },
    {
        avatar: <RxAvatar size={100} />,
        name: 'Dr. John Mitchell',
        short_desc: 'Orthopedic Surgeon with expertise in joint replacement and sports injuries',
        desc: 'Dr. John Mitchell is a leading orthopedic surgeon with over 12 years of experience in joint reconstruction, trauma surgery, and sports injury management. His patients commend his meticulous surgical approach and comprehensive post-operative care. Dr. Mitchell is committed to helping patients regain mobility and improve their quality of life.',
        language: 'English',
        education: 'MS - Orthopedics, Johns Hopkins University',
        fees: '$200',
        hospitals: 'City Orthopedic Center, Sports Medicine Institute',
    },
    {
        avatar: <RxAvatar size={100} />,
        name: 'Dr. Priya Sharma',
        short_desc: 'Pediatrician focused on child health and development.',
        desc: 'Dr. Priya Sharma is a highly experienced pediatrician who has dedicated her career to improving children’s health and well-being. With over 8 years of experience, she specializes in treating childhood illnesses, monitoring developmental milestones, and providing preventive healthcare. Parents appreciate her warm and patient approach to caring for their children.',
        language: 'English, Hindi',
        education: 'MBBS, AIIMS Delhi',
        fees: '$100',
        hospitals: 'Sunshine Children’s Hospital, Kids Care Clinic',
    },
    {
        avatar: <RxAvatar size={100} />,
        name: 'Dr. Richard Lee',
        short_desc: 'Dermatologist with specialization in cosmetic and medical dermatology.',
        desc: 'Dr. Richard Lee is an expert in both medical and cosmetic dermatology, treating conditions such as acne, eczema, and skin cancer. He also offers cosmetic services, including laser treatments, anti-aging therapies, and chemical peels. With over 15 years of practice, Dr. Lee is known for personalized treatments and exceptional results.',
        language: 'English',
        education: 'MD - Dermatology, Stanford University',
        fees: '$180',
        hospitals: 'Skin Health Center, Aesthetic Dermatology Clinic',
    },
];

const page = () => {
    return (
        <div className="flex flex-col lg:flex-row bg-gray-900 text-gray-100 min-h-screen">
            <div className="w-full lg:w-[70%] p-4">
                {doctorDetails.map((doctor, index) => (
                    <Card key={index} className="mb-6 bg-gray-800 border-gray-700">
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="flex-shrink-0">
                                    {doctor.avatar}
                                </div>
                                <div className="flex-grow">
                                    <h2 className="text-xl font-semibold text-blue-400 mb-1">{doctor.name}</h2>
                                    <p className="text-sm text-gray-400 mb-2">{doctor.education}</p>
                                    <p className="text-gray-300 mb-2">{doctor.short_desc}</p>
                                    <p className="text-gray-400 mb-2">{doctor.hospitals}</p>
                                    <p className="text-gray-300">{doctor.fees} Consultation fee at clinic</p>
                                </div>
                                <div className="flex flex-col items-center gap-4 mt-4 md:mt-0">
                                    <div className="flex items-center text-sm text-gray-400">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        Available Tomorrow
                                    </div>
                                    <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                                        <Link href={'/doctor/shikha'}>
                                            Book Clinic Visit
                                        </Link>
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                        Book Video Consult
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="w-full lg:w-[30%] p-8 bg-gray-800">
                <Card className="bg-gray-700 border-gray-600">
                    <CardContent className="p-6">
                        <h2 className="text-xl font-semibold mb-4 text-center">
                            Connect with doctors online, available 24/7, from the comfort of your home.
                        </h2>
                        <Image 
                            src="/assets/MedxApp.png" 
                            alt="MedxApp" 
                            width={400} 
                            height={300}
                            className="rounded-lg"
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default page;