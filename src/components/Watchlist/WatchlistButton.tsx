'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Bookmark } from 'lucide-react';
import { addItem, removeItem } from '@/utils/localStorageData';
import { useLocalStorageContext } from '@/lib/context/LocalStorageContext';
import { Movie } from '@/types/global';
import { Button } from '../Elements/Button';

interface WatchlistButtonProps {
  item: Movie;
  type?: 'button' | 'icon';
}

export const WatchlistButton = ({
  item,
  type = 'button'
}: WatchlistButtonProps) => {
  const [buttonLabel, setButtonLabel] = useState<string>('');
  const [buttonColor, setButtonColor] = useState<string>('transparent');

  const { watchlist, setWatchlist } = useLocalStorageContext();

  const itemExists = useCallback(() => {
    return watchlist.some((dataItem) => dataItem.id === item.id);
  }, [watchlist, item]);

  useEffect(() => {
    setButtonLabel(
      itemExists() ? '- Remove from Watchlist' : '+ Add to Watchlist'
    );
    setButtonColor(itemExists() ? 'white' : 'transparent');
  }, [watchlist, itemExists]);

  const handleAddToWatchlist = () => {
    if (itemExists()) {
      removeItem(item.id, setWatchlist, 'watchlist');
    } else {
      addItem(item, setWatchlist, 'watchlist', 20);
    }
  };

  return (
    <>
      {type === 'button' ? (
        <Button label={buttonLabel} onClick={handleAddToWatchlist} />
      ) : (
        <Bookmark
          size={32}
          fill={buttonColor}
          className='cursor-pointer'
          onClick={handleAddToWatchlist}
        />
      )}
    </>
  );
};
