'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleInput = async (e) => {
    e.preventDefault();
    router.push(`/library/${e.target.steamId.value}`);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <form onSubmit={handleInput}>
        <input placeholder="Enter Steam ID" type="text" name="steamId" />
        <button type="submit">GO</button>
      </form>
    </div>
  );
}
