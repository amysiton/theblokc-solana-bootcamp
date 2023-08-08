import React from "react";
import { Button } from "../components/Button";

export const Header = ({connected, handleClick, publicKey}) => {
    return (
        <>
            <div className="header container mx-auto py-8">                
                <div className="flex">
                    <div className="w-1/2 py-6 px-2">
                        <h1 className="text-white text-lg text-left">Solana Developer Bootcamp dApp</h1>
                    </div>
                    <div className="w-1/2 py-6 px-2 mx-auto text-right">
                        {
                            !connected ? (
                                <Button 
                                    className="btn-connect"
                                    onClick={handleClick}
                                >
                                    Connect to wallet
                                </Button>
                            ) : (
                                <>
                                    <Button 
                                        className="btn-connect inline-block"
                                        onClick={handleClick}
                                    >
                                        Disconnect to wallet
                                    </Button>
                                    <p className="text-white inline-block align-middle ms-3">Welcome, <span className="truncate w-20 inline-block align-middle" title={publicKey}>{publicKey}</span>!</p>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
