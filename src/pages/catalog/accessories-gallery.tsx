import React from 'react';
import Gallery from '../../components/gallery';
import { AccessoryOrder } from './catalog-models';
import AccessoryItem from '../../components/accessory-item.component';

interface Props {
  accessories: AccessoryOrder[];
  onQuantityChanged: (itemNumber: string, quantity: number) => void;
}

const AccessoriesGallery: React.FC<Props> = ({
  accessories,
  onQuantityChanged
}) => {
  const items = accessories.map(a => (
    <AccessoryItem
      name={a.name}
      itemNumber={a.itemNumber}
      quantity={a.quantity}
      onQuantityChanged={onQuantityChanged}
    />
  ));
  return (
    <div>
      <Gallery items={items} />
    </div>
  );
};

export default AccessoriesGallery;
