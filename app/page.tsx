'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { tomorrow } from './lib/fonts';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import FindSteamIdImage from '../public/find-steam-id.jpg';
import Image from 'next/image';

export default function Home() {
  const [showHelp, setShowHelp] = useState(false);
  const router = useRouter();

  const handleInput = async (e) => {
    e.preventDefault();
    router.push(`/library/${e.target.steamId.value}`);
  };

  const onClickHelpIcon = () => {
    setShowHelp((prev) => !prev);
  };

  return (
    <div className="grid h-screen flex justify-items-center content-center">
      <div className="flex items-center pb-4">
        <p className={`${tomorrow.className} text-white text-3xl pr-2`}>
          Enter your unique Steam id
        </p>
        <button onClick={onClickHelpIcon}>
          <HelpOutlineIcon color="primary" fontSize="large" sx={{}} />
        </button>
      </div>
      <div
        className={`${
          showHelp ? 'block' : 'hidden'
        } border-2 rounded-md border-gray-900 m-4 shadow-sm shadow-black/50 p-4`}
      >
        <p className={`${tomorrow.className} text-white text-xl p-2`}>
          Q: How do I find my Steam id?
        </p>
        <p className={`${tomorrow.className} text-white text-sm p-2`}>
          1. Open the Steam client or website and navigate to your profile in
          the dropdown under your name. <br />
          2. In the client, you will notice a url formatted like so:
          https://steamcommunity.com/profiles/&lt;SteamId&gt;/. On the website,
          it will be the same format, but in the page&apos;s url.
          <br />
          3. Your id is inside &lt;SteamId&gt; of the url.
        </p>
        <Image
          src={FindSteamIdImage}
          alt="Steam profile with id"
          width={500}
          height={300}
        />
      </div>
      <form onSubmit={handleInput}>
        <div className="grid justify-items-center">
          <input
            type="text"
            name="steamId"
            className={`${tomorrow.className} text-6xl caret-white outline-none text-white bg-gray-500 rounded-lg w-<1/2> p-4 mb-4`}
            autoFocus
            onBlur={({ target }) => target.focus()}
          />
          <button
            type="submit"
            className={`${tomorrow.className} bg-blue-600 hover:bg-blue-800 text-4xl p-4 rounded-lg text-white`}
          >
            LOAD MY LIBRARY
          </button>
        </div>
      </form>
    </div>
  );
}
