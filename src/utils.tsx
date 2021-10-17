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
  Keyboard as KeyboardIcon,
  WbTwilight as WbTwilightIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Apps as AppsIcon,
} from '@material-ui/icons';

import { Item, Db, ItemDriverSrc, ItemDriverSrcSource } from './types';

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
    keyboard: <KeyboardIcon {...props}/>,
    led: <WbTwilightIcon {...props}/>,
    measure: <SpeedIcon {...props}/>,
    fuse: <SecurityIcon {...props}/>,
    apps: <AppsIcon {...props}/>,
  }[name];
};

export const wordsWrapper = (
  words: string[],
  text: string,
  wrapper: (text: string, word: string, index: number) => any
): (string | JSX.Element)[] => {

  const wrap = (words: string[], text: string) => {
    let textParts, word;

    while (1) {
      if (!words.length) {
        return text;
      }
      word = words.pop();

      textParts = text.split(word);
      if (textParts.length > 1) {
        break;
      }
    }

    return textParts.reduce((result, textPart, index) => {
      if (textPart) {
        const leftAbbreviations = words.filter(a => a !== word);

        result.push(wrap(leftAbbreviations, textPart));
      }
      if (index !== textParts.length - 1) {
        result.push(wrapper(text, word, index));
      }
      return result;
    }, []);
  };

  return wrap(words, text);
};

export const getItemDriverAvatarSrc = (itemDriverSrc: ItemDriverSrc): string => {
  if (itemDriverSrc.source === ItemDriverSrcSource.GITHUB) {
    return `https://avatars.githubusercontent.com/u/${itemDriverSrc.userId}?s=60&v=4`
  }
  throw new Error('Driver avatar src cannot be found');
}
