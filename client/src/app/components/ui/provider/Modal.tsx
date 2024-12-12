'use client';
{/*import {
    Button,
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from '@headlessui/react';*/}
import { createMedicalRecordAttestation } from '@/app/lib/func';
import { CiCircleCheck } from 'react-icons/ci';
import { RiExternalLinkLine } from 'react-icons/ri';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { CiBellOn } from 'react-icons/ci';
import { fetchAndLogAttestations } from '@/app/lib/query';
import hcaImage from '../../../../../public/assets/HcaImg.png';
import WldImg from '../../../../../public/assets/world-id-2.png';
import WldLogo from '../../../../../public/assets/worldCoinlogo.png';
import Image from 'next/image';
{/*import {
    useSendUserOperation,
    useSigner,
    useSmartAccountClient,
} from '@account-kit/react';*/}
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Input } from '../Input';
import Dropdown from '../Dropdown';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setEasID, storeProof } from '@/redux/reducer/zkProof';
import ViewMedicalModal from '../MedicalModal/ViewMedicalModal';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const bloodTypes = [
    { id: 1, name: 'A+' },
    { id: 2, name: 'A-' },
    { id: 3, name: 'B+' },
    { id: 4, name: 'B-' },
    { id: 5, name: 'AB+' },
    { id: 6, name: 'AB-' },
];
export default function ProviderModal({
    name,
    age,
    gender,
    address,
    attestationId,
    zkProof,
    diagnoseVal,
    isCreated,
    setIsCreated,
}: {
    name: string;
    age: number;
    gender: string;
    address: string;
    attestationId: string;
    zkProof: any;
    diagnoseVal: string;
    isCreated: boolean;
    setIsCreated: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [isOpen, setIsOpen] = useState(false);

    const [insured, setInsured] = useState(true);
    const [diagnose, setDiagnose] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentState, setCurrentState] = useState(0);
    const { leaves, proof, proofFlags } = useAppSelector(
        (state) => state.storeZkProof
    );
    const easID = useAppSelector((state) => state.storeZkProof.easID);
    const dispatch = useAppDispatch();
    function open() {
        setIsOpen(true);
    }

    function close() {
        setIsOpen(false);
    }

    {/*const signer = useSigner();
    const { client } = useSmartAccountClient({
        type: 'LightAccount',
    });*/}

    const handleCopy = () => {
        const targetEasID = easID;
        const data = { leaves, proof, proofFlags };
        navigator.clipboard
            .writeText(JSON.stringify(data))
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

    {/*const { sendUserOperation } = useSendUserOperation({
        client,
        // optional parameter that will wait for the transaction to be mined before returning
        waitForTxn: true,
        onSuccess: async ({ hash }: { hash: any }) => {
            console.log(hash);
            setLoading(false);
            const res: any = await fetchAndLogAttestations({
                txid: {
                    equals: hash,
                },
            });

            if (res.length > 0) {
                dispatch(setEasID(res[0].id));
                setCurrentState(1);
                setIsCreated(true);
            }
        },
        onError: (error) => {
            console.log(error);
            setLoading(false);
            toast.error('Something went wrong');
        },
    });*/}

    {/*const handleCreateRecord = async () => {
        setLoading(true);
        const resp: any = await createMedicalRecordAttestation(
            name,
            age,
            insured,
            diagnose,
            address,
            //signer
        );
        if (resp.data) {
            const sender: any = {
                target: resp.data.to,
                data: resp.data.data,
            };
            dispatch(storeProof(resp.zkProofMedicalRecord));
            sendUserOperation({
                uo: sender,
            });
        }
    };*/}
    
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {isCreated || attestationId ? (
                    <div className="flex items-center gap-4">
                        <ViewMedicalModal
                            name={name}
                            age={age}
                            gender={gender}
                            diagnoses={isCreated ? diagnose : diagnoseVal}
                            bloodType={bloodType || 'A+'}
                        />
                        <Button
                            variant="outline"
                            onClick={() => handleCopy()}
                            className='text-black'
                        >
                            Verify
                        </Button>
                    </div>
                ) : (
                    <Button className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
                        Create record
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-gray-900 text-gray-100">
                <DialogHeader>
                    <DialogTitle>
                        {currentState === 0 ? "Patient Details" : "Medical Record created successfully"}
                    </DialogTitle>
                </DialogHeader>
                <AnimatePresence mode="wait">
                    {currentState === 0 ? (
                        <motion.div
                            key="details"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" value={name} disabled className="bg-gray-800 text-gray-300" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="age">Age</Label>
                                    <Input id="age" type="number" value={age} disabled className="bg-gray-800 text-gray-300" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="gender">Gender</Label>
                                    <Input id="gender" value={gender} disabled className="bg-gray-800 text-gray-300" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="diagnosis">Diagnosis*</Label>
                                    <Input 
                                        id="diagnosis" 
                                        value={diagnose} 
                                        onChange={(e) => setDiagnose(e.target.value)}
                                        className="bg-gray-800 text-gray-100"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="bloodType">Blood Type*</Label>
                                    <Select onValueChange={setBloodType}>
                                        <SelectTrigger className="bg-gray-800 text-gray-100">
                                            <SelectValue placeholder="Select blood type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {bloodTypes.map((type) => (
                                                <SelectItem key={type.id} value={type.name}>
                                                    {type.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label>Is insured*</Label>
                                    <RadioGroup defaultValue={insured ? "yes" : "no"} onValueChange={(value) => setInsured(value === "yes")}>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="yes" id="yes" />
                                            <Label htmlFor="yes">Yes</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="no" id="no" />
                                            <Label htmlFor="no">No</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                            <Button 
                                //onClick={handleCreateRecord} 
                                disabled={loading} 
                                className="w-full mt-4"
                            >
                                {loading ? "Generating record..." : "Create"}
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="confirmation"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="flex items-center gap-2 mt-4">
                                <a
                                    href={`https://base-sepolia.easscan.org/attestation/view/${easID}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-400 hover:text-blue-300"
                                >
                                    View on EAS
                                </a>
                                <RiExternalLinkLine size={20} />
                            </div>
                            <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-teal-500">
                                Notify Doctor and Patient <CiBellOn size={20} className="ml-2" />
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
            {(isCreated || attestationId) && (
                <div className="flex items-center justify-center gap-2 mt-4 text-gray-300">
                    <CiCircleCheck color="green" size={25} />
                    <Image src="/assets/HcaImg.png" alt="HCA Healthcare" width={40} height={40} />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="p-0">
                                {/*<Image src="/assets/worldCoinlogo.png" alt="WorldCoin" width={20} height={20} />*/}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gray-800 text-gray-100">
                            <DropdownMenuItem className="flex items-center gap-2">
                                {/*<Image src="/assets/world-id-2.png" alt="World ID" width={30} height={30} />*/}
                                World ID verified
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}
        </Dialog>
    );

    {/*return (
        <>
            {isCreated ? (
                <div>
                    <div className="flex items-center gap-x-4">
                        <ViewMedicalModal
                            name={name}
                            age={age}
                            gender={gender}
                            diagnoses={diagnose}
                            bloodType={'A+'}
                        />
                        <div
                            className="border-2 rounded-xl px-4 py-2 cursor-pointer"
                            onClick={() => handleCopy()}
                        >
                            Verify
                        </div>
                    </div>
                    <div className="font-medium justify-center gap-x-1 pt-2 text-sm flex items-center">
                        <CiCircleCheck color="green" size={25} />
                        <Image
                            src={hcaImage}
                            alt="hclHealthcare Image"
                            width={40}
                        />
                        <div className=" ">
                            <Menu>
                                <MenuButton className="inline-flex items-center gap-2 rounded-md  py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none   data-[focus]:outline-1 data-[focus]:outline-white">
                                    <Image
                                        src={WldLogo}
                                        alt="wldCoinlogo"
                                        width={20}
                                    />
                                </MenuButton>

                                <MenuItems
                                    transition
                                    anchor="right start"
                                    className="w-52 origin-top-right rounded-lg border bg-slate-200   text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                                >
                                    <MenuItem>
                                        <button className="group flex w-full  items-center gap-2 rounded-lg py-1 px-3 ">
                                            <Image
                                                src={WldImg}
                                                alt="hclHealthcare Image"
                                                width={35}
                                            />
                                            World id verified
                                        </button>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>
                </div>
            ) : attestationId ? (
                <div>
                    <div className="flex items-center gap-x-4">
                        <ViewMedicalModal
                            name={name}
                            age={age}
                            gender={gender}
                            diagnoses={diagnoseVal}
                            bloodType={'A+'}
                        />
                        <div
                            className="border-2 rounded-xl px-4 py-2 cursor-pointer"
                            onClick={() =>
                                handleCopyStatic(attestationId, zkProof)
                            }
                        >
                            Verify
                        </div>
                    </div>
                    <div className="font-medium justify-center gap-x-1 pt-2 text-sm flex items-center">
                        <CiCircleCheck color="green" size={25} />
                        <Image
                            src={hcaImage}
                            alt="hclHealthcare Image"
                            width={40}
                        />
                        <div className=" ">
                            <Menu>
                                <MenuButton className="inline-flex items-center gap-2 rounded-md  py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none   data-[focus]:outline-1 data-[focus]:outline-white">
                                    <Image
                                        src={WldLogo}
                                        alt="wldCoinlogo"
                                        width={20}
                                    />
                                </MenuButton>

                                <MenuItems
                                    transition
                                    anchor="right start"
                                    className="w-40 origin-top-right rounded-lg border bg-slate-200   text-xs text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                                >
                                    <MenuItem>
                                        <button className="group flex w-full  items-center  rounded-lg py-1 px-1 ">
                                            <Image
                                                src={WldImg}
                                                alt="hclHealthcare Image"
                                                width={30}
                                            />
                                            World id verified
                                        </button>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>
                </div>
            ) : (
                <Button
                    onClick={open}
                    className="bg-themelinear px-6 py-2 text-sm  rounded-lg font-semibold cursor-pointer text-white "
                >
                    Create record
                </Button>
            )}
            <Transition appear show={isOpen}>
                <Dialog
                    open={isOpen}
                    as="div"
                    className="relative z-10 focus:outline-none"
                    onClose={close}
                >
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <TransitionChild
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 transform-[scale(95%)]"
                                enterTo="opacity-100 transform-[scale(100%)]"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 transform-[scale(100%)]"
                                leaveTo="opacity-0 transform-[scale(95%)]"
                            >
                                <DialogPanel
                                    transition
                                    className="w-full max-w-md rounded-xl shadow-2xl bg-[#EDF9FC] p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                                >
                                    {currentState === 0 ? (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                scale: 0.8,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                            }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <DialogTitle
                                                as="h3"
                                                className=" font-medium text-black"
                                            >
                                                Patient Details
                                            </DialogTitle>
                                            <div className="text-black pt-2">
                                                <label
                                                    htmlFor="name"
                                                    className="text-sm"
                                                >
                                                    Name
                                                </label>
                                                <Input
                                                    type="text"
                                                    id="name"
                                                    className="mt-2"
                                                    value={name}
                                                    disabled
                                                />
                                            </div>
                                            <div className="text-black pt-2">
                                                <label
                                                    htmlFor="name"
                                                    className="text-sm"
                                                >
                                                    Age
                                                </label>
                                                <Input
                                                    type="number"
                                                    id="age"
                                                    value={age}
                                                    className="mt-2"
                                                    disabled
                                                />
                                            </div>
                                            <div className="text-black pt-2">
                                                <label
                                                    htmlFor="name"
                                                    className="text-sm"
                                                >
                                                    Gender
                                                </label>
                                                <Input
                                                    type="text"
                                                    id="gender"
                                                    value={gender}
                                                    className="mt-2"
                                                    disabled
                                                />
                                            </div>
                                            <div className="text-black pt-2">
                                                <label
                                                    htmlFor="name"
                                                    className="text-sm"
                                                >
                                                    Diagnosis*
                                                </label>
                                                <Input
                                                    type="text"
                                                    id="diagnosis"
                                                    className="mt-2"
                                                    value={diagnose}
                                                    onChange={(e) => {
                                                        setDiagnose(
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                            </div>
                                            <div className="text-black pt-4 flex items-center justify-between">
                                                <div className="text-sm ">
                                                    <label
                                                        htmlFor="name"
                                                        className="text-sm"
                                                    >
                                                        Blood Type*
                                                    </label>
                                                    <div className="pt-2">
                                                        <Dropdown
                                                            data={bloodType}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="name"
                                                        className="text-sm"
                                                    >
                                                        Is insured*
                                                    </label>
                                                    <div className="flex items-center pt-2">
                                                        <input
                                                            type="radio"
                                                            id="yes"
                                                            name="insured"
                                                            value="yes"
                                                            checked={
                                                                insured === true
                                                            }
                                                            onChange={() => {
                                                                setInsured(
                                                                    true
                                                                );
                                                            }}
                                                        />

                                                        <label
                                                            htmlFor="html"
                                                            className="pl-1"
                                                        >
                                                            Yes
                                                        </label>
                                                        <div className="pl-5">
                                                            <input
                                                                type="radio"
                                                                id="no"
                                                                name="insured"
                                                                value="no"
                                                                checked={
                                                                    insured ===
                                                                    false
                                                                }
                                                                onChange={() => {
                                                                    setInsured(
                                                                        false
                                                                    );
                                                                }}
                                                            />
                                                            <label
                                                                htmlFor="html"
                                                                className="pl-1"
                                                            >
                                                                No
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                {loading ? (
                                                    <div className="text-center mt-10 bg-green-200 px-5 py-2  w-full rounded-lg">
                                                        Generating record...
                                                    </div>
                                                ) : (
                                                    <Button
                                                        //onClick={() => handleCreateRecord()}
                                                        className={`inline-flex items-center mt-2 gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700`}
                                                    >
                                                        Create
                                                    </Button>
                                                )}
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                scale: 0.8,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                            }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <DialogTitle
                                                as="h3"
                                                className="flex items-center gap-x-2 font-medium text-black"
                                            >
                                                Medical Record created
                                                successfully
                                                <a
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    href={`https://base-sepolia.easscan.org/attestation/view/${easID}`}
                                                >
                                                    <RiExternalLinkLine
                                                        size={20}
                                                    />
                                                </a>
                                            </DialogTitle>
                                            <div className="flex items-center w-fit mt-5 bg-themelinear px-6 py-2 text-sm  rounded-lg font-semibold cursor-pointer text-white ">
                                                Notify Doctor and Patient{'   '}
                                                <CiBellOn
                                                    size={20}
                                                    className="ml-2"
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );*/}
}