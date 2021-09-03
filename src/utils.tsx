import React from 'react';
import {
  Dashboard as DashboardIcon,
  AcUnit as AcUnitIcon,
  Memory as MemoryIcon,
  Sensors as SensorsIcon,
  FlashOn as FlashOnIcon,
  Explore as ExploreIcon,
  CallMerge as CallMergeIcon,
  Wifi as WifiIcon,
  SettingsInputAntenna as SettingsInputAntennaIcon,
  MultipleStop as MultipleStopIcon,
  ViewHeadline as ViewHeadlineIcon,
  Description as DescriptionIcon,
} from '@material-ui/icons';

import { Item, Db } from './types';

export const generateItemId = (itemTitle: string) =>
  itemTitle.replaceAll(' ', '-').toLowerCase();

export const preprocessItems = (items: Item[]) =>
  items.map(item => (
    {
      ...item,
      id: generateItemId(item.title)
    }
  ));

export const preprocessDb = (db: Db) => (
  {
    ...db,
    items: preprocessItems(db.items)
  }
);

export const getItemById = (db: Db, id: Pick<Item, 'id'>) =>
  db.items.find(item => item.id === id);

export function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

export function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, { [key]: {} });
        }
        mergeDeep(target[key], source[key]);

      } else if (Array.isArray(source[key])) {
        Object.assign(target, {
          [key]: target[key]
            ? [...target[key], ...source[key]]
            : source[key]
        });

      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  return mergeDeep(target, ...sources);
}

export const getIcon = (name, props = {}) => {
  return {
    cpu: <MemoryIcon {...props}/>,
    sensor: <SensorsIcon {...props}/>,
    snow: <AcUnitIcon {...props}/>,
    dashboard: <DashboardIcon {...props}/>,
    flash: <FlashOnIcon {...props}/>,
    compass: <ExploreIcon {...props}/>,
    mosfet: <CallMergeIcon {...props}/>,
    wifi: <WifiIcon {...props}/>,
    antenna: <SettingsInputAntennaIcon {...props}/>,
    convertors: <MultipleStopIcon {...props}/>,
    coil: <ViewHeadlineIcon {...props}/>,
    document: <DescriptionIcon {...props}/>,
  }[name];
};
