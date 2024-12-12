'use client';
import { invoices } from '@/config';
import React from 'react';
import toast from 'react-hot-toast';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const ViewRecords = () => {
    const data = invoices[3];
    const handleCopyStatic = (attestationId: string, zkProof: any) => {
        const targetEasID = attestationId;
        navigator.clipboard
            .writeText(JSON.stringify(zkProof))
            .then(() => {
                toast.success('Zk proof copied to clipboard');
                toast.loading(
                    'You will be redirected to the external link shortly.'
                );
                setTimeout(() => {
                    toast.dismiss();
                    window.open(
                        `https://base-sepolia.easscan.org/attestation/view/${targetEasID}`,
                        '_blank'
                    );
                }, 5000);
            })
            .catch((err) => {
                toast.error('Failed to copy Zk proof to clipboard');
                console.error('Error copying to clipboard:', err);
            });
    };
    return (
            <div className="py-16 flex flex-col items-center bg-gray-900 text-gray-100 min-h-screen">
                <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
                    <Card className="w-full md:w-1/2 bg-gray-800 border-gray-700">
                        <CardHeader>
                            <CardTitle className='text-white'>Medical Records</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-400">Name</p>
                                    <p className="font-medium text-white">{data.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Age</p>
                                    <p className="font-medium text-white">{data.age}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Gender</p>
                                    <p className="font-medium text-white">{data.gender}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Diagnose</p>
                                    <p className="font-medium text-white">{data.diagnoses}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Blood Type</p>
                                    <p className="font-medium text-white">{data.bloodType}</p>
                                </div>
                            </div>
                            <Button 
                                className="mt-6 w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
                                onClick={() => handleCopyStatic(data.attestationId, data.zkProof)}
                            >
                                Verify
                            </Button>
                        </CardContent>
                    </Card>
                
                
                    <Card className="w-full md:w-1/2 bg-gray-800 border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-white">Doctor Records</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-400">Medication</p>
                                    <p className="font-medium text-white">{data.medication}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Dosage</p>
                                    <p className="font-medium text-white">{data.dosage}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Duration</p>
                                    <p className="font-medium text-white">{data.duration}</p>
                                </div>
                            </div>
                            <Button 
                                className="mt-6 w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
                                onClick={() => handleCopyStatic(data.docAttestationId || '', data.docZkProof)}
                            >
                                Verify
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            
                <p className="text-sm text-center mt-8 text-gray-400">
                    As per diagnoses 6 months is required*
                </p>
                <Button 
                    className="mt-6 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
                >
                    Start Treatment
                </Button>
            </div>

    );
};

export default ViewRecords;