import React from 'react';

interface Props {
  name: string;
  itemNumber: string;
  quantity: number;
  onQuantityChanged: (itemNumber: string, quantity: number) => void;
}

const AccessoryItem: React.FC<Props> = ({
  name,
  itemNumber,
  quantity,
  onQuantityChanged
}) => {
  const addDelete = (add: boolean) => {
    add
      ? onQuantityChanged(itemNumber, quantity + 1)
      : onQuantityChanged(itemNumber, quantity - 1);
  };

  return (
    <div>
      <div className="row">
        <div className="col-sm-12"></div>
      </div>
      <h4>{name}</h4>
      {quantity >= 1 ? (
        <div className="row">
          <div className="col-sm-12">
            <div className="btn-group" role="group">
              <button type="button" onClick={() => addDelete(false)}>
                -
              </button>
              <input
                type="text"
                name="quantity"
                style={{ width: '55px' }}
                value={quantity}
                readOnly
              />
              <button type="button" onClick={() => addDelete(true)}>
                +
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-sm-12">
            <button type="button" onClick={() => addDelete(true)}>
              Select
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessoryItem;
