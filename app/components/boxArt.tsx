'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Game } from '../lib/types';
import FallbackBoxArt from '../../public/fallback-box-art.jpg';

export default function BoxArt({
  game,
  style,
}: {
  game: Game;
  style?: string;
}) {
  const [imageSrc, setImageSrc] = useState(game.boxArt);

  const handleImageError = () => {
    setImageSrc(FallbackBoxArt.src);
  };

  return (
    <Image
      src={imageSrc}
      alt={`${game.name}'s icon`}
      width={600}
      height={900}
      onError={handleImageError} // can't be passed to client component props
      className={style}
    />
  );
}
