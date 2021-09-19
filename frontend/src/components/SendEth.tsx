import React, { useContext, useEffect, useState } from 'react';
import { ProviderContext, SignerContext } from "./../hardhat/SymfoniContext";
import ethers from 'ethers';
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { Bytes, BytesLike } from "@ethersproject/bytes";

interface Props { }

const to = "0xD5d2cE85D989d6214a9a6797Dac75Ede4d945C67";

export const SendEth: React.FC<Props> = () => {
    const [provider] = useContext(ProviderContext)
    const [signer] = useContext(SignerContext)
    const [aggregatorBalance, setAggregatorBalance] = useState("0");
    const [inputGreeting, setInputGreeting] = useState("");
    const [txHash, setTxHash] = useState("");
    useEffect(() => {
        if (!provider || !signer) {
            return ;
        }

        (async () => {
            const balance = await provider.getBalance(to);
            // const balance = await signer.getBalance();
            setAggregatorBalance(ethers.utils.formatEther(balance));
        })();
    }, [provider, signer, txHash])

    const handleSetGreeting = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!provider || !signer) {
            return ;
        }
        const value = ethers.utils.parseEther(inputGreeting)
        const transaction: {
            to?: string;
            from?: string;
            nonce?: BigNumberish;
            gasLimit?: BigNumberish;
            gasPrice?: BigNumberish;
            data?: BytesLike;
            value?: BigNumberish;
            chainId?: number;
        } = {
            to,
            value,
            chainId: 1
        };
        const txResponse = await signer.sendTransaction(transaction);
        console.log("sendEth tx", txResponse);
        await txResponse.wait();

        const tx = await provider.getTransaction(txResponse.hash);
        const txReceipt = await tx.wait();
        console.log("txReceipt", txReceipt);
        setTxHash(txReceipt.transactionHash);
    }
    return (
        <div>
            <p>{"Aggregator's balance: "}{aggregatorBalance}{" ETH"}</p>
            <div>
                <input type="number" onChange={(e) => setInputGreeting(e.target.value)}></input>
                <span style={{fontSize: "small"}}>{"ETH"}</span>
            </div>
            <button onClick={(e) => handleSetGreeting(e)}>{"Send Ether"}</button>
        </div>
    )
}