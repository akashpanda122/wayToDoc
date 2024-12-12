import { DatePickerWithPresets } from '@/app/components/ui/DatePicker';
import Dropdown from '@/app/components/ui/Dropdown';
import Modal from '@/app/components/ui/Modal';
import { RadioGroupDemo } from '@/app/components/ui/RadioButton/radioButton';
import { DOCTOR_PROFILE } from '@/config';
import usdcLogo from '../../../../../public/assets/usdcLogo.png';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";

const DoctorProfile = () => {
    const reason = [
        { id: 1, name: 'Wound Care' },
        { id: 2, name: 'Hypertension' },
        { id: 3, name: 'Injury' },
        { id: 4, name: 'Orthopedic' },
    ];

    return (
        <div className="grid grid-cols-3 pt-5 h-full w-full gap-x-10">
            {DOCTOR_PROFILE.map((doctor, index) => (
                    <Card key={index} className="bg-gray-800 text-gray-100">
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src="/assets/doctor-3.png" alt={doctor.name} />
                                    <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle className="text-xl text-blue-400">{doctor.name}</CardTitle>
                                    <p className="text-sm text-gray-400">{doctor.short_desc}</p>
                                    <p className="text-sm text-gray-400">{doctor.language}</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-gray-300 border-b border-gray-700 pb-2">About</h3>
                                    <p className="text-sm text-gray-400 mt-2">{doctor.desc}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-300">Education</h3>
                                    <p className="text-sm text-gray-400">{doctor.education}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-300">Hospital Affiliations</h3>
                                    <p className="text-sm text-gray-400">{doctor.hospitals}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-300">Fees</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                        <span>{doctor.fees}</span>
                                        <Image src={usdcLogo} alt="USDC" width={20} height={20} />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )
            )}

            <Card className="col-span-1 lg:col-span-2 bg-gray-800 text-gray-100">
                <CardHeader>
                    <CardTitle className="text-2xl">Book an Appointment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="visit">Have you visited this provider/practice before? *</Label>
                            <RadioGroupDemo />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="reason">Appointment reason *</Label>
                            <div className="pt-5">
                                <Dropdown data={reason} />
                            </div>
                        </div>
                    </div>
                    <Card className="bg-gray-700">
                        <CardContent className="p-4">
                            <DatePickerWithPresets />
                        </CardContent>
                    </Card>
                    <div className="flex justify-end">
                        <Modal />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default DoctorProfile;