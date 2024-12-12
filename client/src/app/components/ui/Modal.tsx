'use client';
{/*import {
    Button,
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from '@headlessui/react';*/}
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Dropdown from './Dropdown';
import { Input } from './Input';
import Payment from '../Payment';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { TbExternalLink } from 'react-icons/tb';
import { userData } from '@/redux/reducer/userData';
import toast from 'react-hot-toast';
import { validationCheck } from '@/app/lib';
import BlockScout from '../../../../public/assets/blockscout.svg';
import Image from 'next/image';
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import {
    Abstraxion,
    useAbstraxionAccount,
    useAbstraxionSigningClient,
} from "@burnt-labs/abstraxion";

const seatContractAddress = "xion1z70cvc08qv5764zeg3dykcyymj5z6nu4sqr7x8vl4zjef2gyp69s9mmdka";

type ExecuteResultOrUndefined = ExecuteResult | undefined;

export default function Modal() {

    const { data: account } = useAbstraxionAccount();
    const { client, signArb, logout } = useAbstraxionSigningClient();

    const [executeResult, setExecuteResult] = useState<ExecuteResultOrUndefined>(undefined);

    const blockExplorerUrl = `https://explorer.burnt.com/xion-testnet-1/tx/${executeResult?.transactionHash}`;
    const [isOpen, setIsOpen] = useState(false);
    const [currentState, setCurrentState] = useState(0);
    const [loading, setLoading] = useState(false);
    const [blockLink, setBlockLink] = useState('');
    function open() {
        setIsOpen(true);
    }

    function close() {
        setIsOpen(false);
    }
    const genderData = [
        { id: 1, name: 'Male' },
        { id: 2, name: 'Female' },
        { id: 3, name: 'Other' },
    ];
    const { name, age, gender } = useAppSelector(
        (state) => state.createUserData
    );
    const handleValidation = () => {
        if (!validationCheck({ name, age, gender })) {
            toast.error('Please fill all the details');
            return;
        }
        setCurrentState(1);
    };
    const dispatch = useAppDispatch();

    function getTimestampInSeconds(date: Date | null) {
        if (!date) return 0;
        const d = new Date(date);
        return Math.floor(d.getTime() / 1000);
    }

    const now = new Date();
    now.setSeconds(now.getSeconds() + 15);
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

    async function claimSeat() {
        setLoading(true);
        const msg = {
          sales: {
            claim_item: {
              token_id: String(getTimestampInSeconds(now)),
              owner: account.bech32Address,
              token_uri: "",
              extension: {},
            },
          },
        };
    
        try {
          const claimRes = await client?.execute(
            account.bech32Address,
            seatContractAddress,
            msg,
            {
              amount: [{ amount: "0.001", denom: "uxion" }],
              gas: "500000",
            },
            "", // memo
            [],
          );
    
          setExecuteResult(claimRes);
        } catch (error) {
          // eslint-disable-next-line no-console -- No UI exists yet to display errors
          console.log(error);
        } finally {
          setLoading(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    //onClick={open}
                    className="bg-gradient-to-r from-blue-500 to-teal-500 text-white"
                >
                    Schedule
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-gray-900 text-gray-100">
                <DialogHeader>
                    <DialogTitle>
                        {currentState === 0 && "Please fill your Details"}
                        {currentState === 1 && "Payment"}
                        {currentState === 2 && (
                        <div className="flex items-center gap-x-2">
                            Appointment Scheduled
                            <IoIosCheckmarkCircleOutline size={20} />
                        </div>
                        )}
                    </DialogTitle>
                </DialogHeader>
                <AnimatePresence mode="wait">
                    {currentState === 0 && (
                        <motion.div
                            key="details"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                            <Label htmlFor="name">Name*</Label>
                            <Input
                                id="name"
                                placeholder="Your Name"
                                onChange={(e) => dispatch(userData({ name: e.target.value }))}
                                className="bg-gray-800 text-gray-100 border-gray-700"
                            />
                            </div>
                            <div className="grid gap-2">
                            <Label htmlFor="age">Age*</Label>
                            <Input
                                id="age"
                                type="number"
                                placeholder="Your Age"
                                onChange={(e) => dispatch(userData({ age: e.target.value }))}
                                className="bg-gray-800 text-gray-100 border-gray-700"
                            />
                            </div>
                            <div className="grid gap-2">
                            <Label>Gender*</Label>
                            <Dropdown data={genderData} />
                            </div>
                        </div>
                        <Button 
                            onClick={handleValidation}
                            disabled={!validationCheck({ name, age, gender })}
                            className="w-full mt-4"
                        >
                            Proceed to Payment
                        </Button>
                        </motion.div>
                    )}
                    {currentState === 1 && (
                        <motion.div
                            key="payment"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Payment setBlockLink={setBlockLink} setCurrentState={setCurrentState} />
                        </motion.div>
                    )}
                    {currentState === 2 && (
                        <motion.div
                        key="confirmation"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        >
                            <div className="pt-5">
                                <a
                                    target="_blank"
                                    className="flex items-center gap-x-2 text-blue-400 hover:text-blue-300"
                                    rel="noreferrer"
                                    href={blockExplorerUrl}
                                >
                                    View in Block Explorer
                                <TbExternalLink />
                                <Image
                                    src={BlockScout}
                                    alt="blockscout"
                                    height={90}
                                    width={90}
                                />
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>




                {/*<Dialog
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
                                                Please fill your Details
                                            </DialogTitle>
                                            <div className="text-black pt-2">
                                                <label
                                                    htmlFor="name"
                                                    className="text-sm"
                                                >
                                                    Name*
                                                </label>
                                                <Input
                                                    type="text"
                                                    id="name"
                                                    placeholder="Your Name"
                                                    className="mt-2"
                                                    onChange={(e) => {
                                                        dispatch(
                                                            userData({
                                                                name: e.target
                                                                    .value,
                                                            })
                                                        );
                                                    }}
                                                />
                                            </div>
                                            <div className="text-black pt-2">
                                                <label
                                                    htmlFor="name"
                                                    className="text-sm"
                                                >
                                                    Age*
                                                </label>
                                                <Input
                                                    type="number"
                                                    id="age"
                                                    placeholder="Your Age"
                                                    className="mt-2"
                                                    onChange={(e) => {
                                                        dispatch(
                                                            userData({
                                                                age: e.target
                                                                    .value,
                                                            })
                                                        );
                                                    }}
                                                />
                                            </div>{' '}
                                            <div className="text-black pt-2">
                                                <label
                                                    htmlFor="name"
                                                    className="text-sm"
                                                >
                                                    Gender*
                                                </label>
                                                <Dropdown data={genderData} />
                                            </div>
                                            <div className="mt-4">
                                                <Button
                                                    disabled={
                                                        !validationCheck({
                                                            name,
                                                            age,
                                                            gender,
                                                        })
                                                    }
                                                    className={`${
                                                        !validationCheck({
                                                            name,
                                                            age,
                                                            gender,
                                                        }) &&
                                                        'cursor-not-allowed '
                                                    } disabled:opacity-50 inline-flex items-center mt-2 gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700`}
                                                    onClick={() => {
                                                        handleValidation();
                                                    }}
                                                >
                                                    Proceed to Payment!
                                                </Button>
                                            </div>
                                        </motion.div>
                                    ) : currentState === 1 ? (
                                        <AnimatePresence>
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    scale: 0.8,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                }}
                                                transition={{
                                                    duration: 0.5,
                                                }}
                                            >
                                                <DialogTitle
                                                    as="h3"
                                                    className=" font-medium text-black"
                                                >
                                                    Payment
                                                </DialogTitle>
                                                <Payment
                                                    setBlockLink={setBlockLink}
                                                    setCurrentState={
                                                        setCurrentState
                                                    }
                                                />
                                            </motion.div>
                                        </AnimatePresence>
                                    ) : (
                                        <AnimatePresence>
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
                                                    Appointment Scheduled
                                                    <IoIosCheckmarkCircleOutline
                                                        size={20}
                                                    />
                                                </DialogTitle>
                                                <div className="pt-5 underline cursor-pointer">
                                                    <a
                                                        target="_blank"
                                                        className="flex items-center gap-x-2"
                                                        rel="noreferrer"
                                                        href={`https://base-sepolia.blockscout.com/tx/${blockLink}`}
                                                    >
                                                        Payment link
                                                        <TbExternalLink />
                                                        <Image
                                                            src={BlockScout}
                                                            alt="blockscout"
                                                            height={90}
                                                            width={90}
                                                        />
                                                    </a>
                                                </div>
                                            </motion.div>
                                        </AnimatePresence>
                                    )}
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>*/}
            </DialogContent>
        </Dialog>
    );
}