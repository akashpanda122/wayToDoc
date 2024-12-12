"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Abstraxion,
  useAbstraxionAccount,
  useAbstraxionSigningClient,
  useModal,
} from "@burnt-labs/abstraxion";
import { Button } from "@burnt-labs/ui";
//import "@burnt-labs/ui/dist/index.css";
import type { ExecuteResult } from "@cosmjs/cosmwasm-stargate";

const seatContractAddress = "xion1z70cvc08qv5764zeg3dykcyymj5z6nu4sqr7x8vl4zjef2gyp69s9mmdka";

type ExecuteResultOrUndefined = ExecuteResult | undefined;

const ConnectButton = () => {

    const { data: { bech32Address }, isConnected, isConnecting } = useAbstraxionAccount();
    const { client } = useAbstraxionSigningClient();
    const [loading, setLoading] = useState(false);

    // General state hooks
    const [, setShow] = useModal();
    const [isOpen, setIsOpen] = useState(false);
    //const [loading, setLoading] = useState(false);
    const [executeResult, setExecuteResult] = useState<ExecuteResultOrUndefined>(undefined);

    function getTimestampInSeconds(date: Date | null): number {
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
            owner: bech32Address,
            token_uri: "",
            extension: {},
          },
        },
      };
  
      try {
        const claimRes = await client?.execute(
          bech32Address,
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

    useEffect(() => {
      console.log({ isConnected, isConnecting });
    }, [isConnected, isConnecting])

  return (
    <main className="m-auto flex min-h-screen max-w-xs flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-2xl font-bold tracking-tighter text-black">
        ABSTRAXION
      </h1>
      <Button
        fullWidth
        onClick={() => {
            setShow(true);
        }}
        structure="base"
        className="bg-black text-white"
      >
        {bech32Address ? (
          <div className="flex items-center justify-center text-white">VIEW ACCOUNT</div>
        ) : (
          "CONNECT"
        )}
      </Button>
      {
          bech32Address &&
            <div className="border-2 border-primary rounded-md p-4 flex flex-row gap-4">
              <div className="flex flex-row gap-6">
                <div>
                  address
                </div>
                <div>
                  {bech32Address}
                </div>
              </div>
            </div>
      }
      <Abstraxion onClose={() => setShow(false)} />
      {client ? (
        <Button
        disabled={loading}
        fullWidth
        onClick={() => {
          void claimSeat();
        }}
        structure="base"
        >
          {loading ? "LOADING..." : "CLAIM SEAT"}
        </Button>
      ) : null}
    </main>
  )
}

export default ConnectButton