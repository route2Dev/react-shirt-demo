import {
  CatalogState,
  ShirtPageViewModel,
  sizes,
  styles
} from './catalog-models';

export const processSelection = (
  itemState: CatalogState,
  viewState: ShirtPageViewModel
) => {
  const workingItem = { ...itemState };
  const workingLookups: ShirtPageViewModel = JSON.parse(
    JSON.stringify(viewState)
  );

  // need to add state for available values (PageViewModel)
  // certain colors available for men, certain available for women
  if (workingItem.style === 'C') {
    if (workingItem.size === 'S') {
      workingItem.size = '';
    }

    workingLookups.sizes = sizes.filter(x => x.value !== 'S');
  } else {
    workingLookups.sizes = [...sizes];
  }

  if (workingItem.size === 'S') {
    const crewStyle = workingLookups.styles.find(x => x.value === 'C')!;
    crewStyle.disabled = true;
  } else {
    workingLookups.styles = styles;
  }

  return { workingItem, workingLookups };
};
