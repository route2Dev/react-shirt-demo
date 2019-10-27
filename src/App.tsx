import React, { useState, useEffect, useMemo } from 'react';
import Icon from '@mdi/react';
import { mdiTshirtCrew, mdiTshirtV, mdiCartPlus } from '@mdi/js';
import { CirclePicker, ColorResult } from 'react-color';
import { Nav, Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  CatalogState,
  shirtPageLookups,
  ShirtPageViewModel,
  accessories,
  AccessoryOrder
} from './pages/catalog/catalog-models';
import { processSelection } from './pages/catalog/inventory-rules';
import AccessoriesGallery from './pages/catalog/accessories-gallery';

const defaultColor = '#f44336';

const defaultState: CatalogState = {
  style: 'C',
  color: defaultColor,
  size: ''
};

const defaultLookups: ShirtPageViewModel = JSON.parse(
  JSON.stringify(shirtPageLookups)
);

const defaultAccessories: AccessoryOrder[] = accessories.map(a => {
  return { itemNumber: a.itemNumber, name: a.name, quantity: 0 };
});

const items = [1, 2, 3, 4, 5];

const App: React.FC = () => {
  const [lookupState, setLookupState] = useState<ShirtPageViewModel | null>(
    null
  );
  const [state, setState] = useState<CatalogState | null>(null);
  const [hoverColor, setHoverColor] = useState('');
  const [accessories, setAccessories] = useState<AccessoryOrder[]>(
    defaultAccessories
  );

  const galleryItems = useMemo(() => {
    return items.map(i => <h2 key={i}> {i}</h2>);
  }, []);

  useEffect(() => {
    const defaults = processSelection(defaultState, defaultLookups);
    setLookupState(defaults.workingLookups);
    setState(defaults.workingItem);
  }, []);

  const handleChange = (name: string, value: any) => {
    const pending: CatalogState = { ...state!, [name]: value };
    const processed = processSelection(pending, lookupState!);

    setLookupState(processed.workingLookups);
    setState(processed.workingItem);
  };

  const handleAccessoryChange = (itemNumber: string, quantity: number) => {
    setAccessories(prevState => {
      const list = prevState.map(item => {
        if (item.itemNumber === itemNumber) {
          return { ...item, quantity: quantity };
        }
        return item;
      });

      return list;
    });
  };

  const handleSwatchHover = (color: ColorResult, event: MouseEvent): void => {
    setHoverColor(color.hex);
  };

  const handleSwatchLeave = (): void => {
    setHoverColor('');
  };

  const handleSwatchChange = (color: ColorResult): void => {
    handleChange('color', color.hex);
  };

  const handleNavClick = (value: string): void => {
    handleChange('style', value);
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLElement>) => {};

  const handleReset = (e: React.MouseEvent<HTMLElement>) => {
    setState({ ...defaultState });
  };

  const myItems = galleryItems;

  return (
    <>
      {lookupState && state && (
        <div className="App">
          <header className="App-header">
            <h1>Design Your Shirt</h1>
            <div className="gutter-top">
              <Nav variant="pills" defaultActiveKey="C">
                {lookupState.styles.map(s => (
                  <Nav.Item>
                    <Nav.Link
                      eventKey={s.value}
                      disabled={s.disabled}
                      onClick={() => handleNavClick(s.value)}
                    >
                      {s.text}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </div>
            <div>
              <Icon
                path={state.style === 'C' ? mdiTshirtCrew : mdiTshirtV}
                size={10}
                color={hoverColor || state.color}
              />
            </div>
            <h2>Color</h2>
            <div onMouseLeave={handleSwatchLeave}>
              <CirclePicker
                width="300"
                colors={lookupState.colors}
                color={state.color}
                onSwatchHover={handleSwatchHover}
                onChange={handleSwatchChange}
              />
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-4 offset-4">
                  <div className="form-group gutter-top">
                    <label htmlFor="select-size">Size</label>
                    <select
                      className="form-control"
                      id="select-size"
                      name="size"
                      onChange={handleSizeChange}
                      value={state.size}
                    >
                      <option value="">Please Select</option>
                      {lookupState.sizes.map(s => (
                        <option value={s.value}>{s.text}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  {myItems && (
                    <AccessoriesGallery
                      accessories={accessories}
                      onQuantityChanged={handleAccessoryChange}
                    />
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 offset-4">
                  <Button variant="primary" onClick={handleAddToCart}>
                    Add To Cart{' '}
                    <Icon path={mdiCartPlus} size={1} color="white" />
                  </Button>{' '}
                  <Button variant="secondary" onClick={handleReset}>
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          </header>
        </div>
      )}
    </>
  );
};

export default App;
