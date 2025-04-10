'use client';

import { Game } from '../lib/types';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import Link from 'next/link';
import BoxArt from './boxArt';

export default function GameCard({
  game,
  steamId,
}: {
  game: Game;
  steamId: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateXSpring = useSpring(x);
  const rotateYSpring = useSpring(y);

  const rotateX = useTransform(rotateYSpring, [-0.5, 0.5], ['22deg', '-22deg']);
  const rotateY = useTransform(rotateXSpring, [-0.5, 0.5], ['22deg', '-22deg']);

  const handleMouseMove = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY }}
      whileHover={{ scale: 1.3 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="shadow-lg shadow-black/70 group">
        <p
          className={`absolute ${
            game.name.length > 25 ? ' w-[175px]' : 'w-max'
          } -top-[25px] left-1/2 transform -translate-x-1/2 left-0 bg-gray-900 text-white px-[6px] rounded-md invisible group-hover:visible text-center z-10`}
        >
          {game.name}
          <br />
          {(game.playtime / 60).toFixed(1)} hours
        </p>
        <Link
          key={game.id}
          href={`/library/${steamId}/game/${game.id}`}
          className="grid justify-items-center"
        >
          <BoxArt game={game} key={game.id} style="w-full" />
        </Link>
      </div>
    </motion.div>
  );
}
