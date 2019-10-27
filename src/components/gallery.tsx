import React, { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { EventObject } from 'react-alice-carousel';

import 'react-alice-carousel/lib/alice-carousel.css';

const defaultResponsive = {
  0: {
    items: 1
  },
  1024: {
    items: 3
  }
};

export interface GalleryProps {
  items: JSX.Element[];
  responsive?: {};
}

const Gallery: React.FC<GalleryProps> = ({
  items,
  responsive = defaultResponsive
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChanged = (e: EventObject) => {
    setCurrentIndex(e.item);
  };

  return (
    <div>
      <AliceCarousel
        responsive={responsive}
        dotsDisabled
        infinite={false}
        items={items}
        startIndex={currentIndex}
        onSlideChanged={handleSlideChanged}
      />
    </div>
  );
};

export default Gallery;
