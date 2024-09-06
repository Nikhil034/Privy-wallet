"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useAccount } from "wagmi";

const ConnectWalletButton = () => {
  const { login, ready, authenticated, user } = usePrivy();
  const { address, chain } = useAccount();

  if (!ready) return null;

  if (authenticated) {
    return (
      <div>
        {address && (
          <>
            <p>Connected Address: {address}</p>
            <p>Chain: {chain?.name}</p>
          </>
        )}
        {user?.farcaster && (
          <p>Farcaster Username: {user.farcaster.username}</p>
        )}
      </div>
    );
  }

  return <button onClick={login}>Connect Wallet</button>;
};

export default ConnectWalletButton;
