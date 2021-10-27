import React from 'react';
import { SvgIconProps } from '@material-ui/core';
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
  DoubleArrow as DoubleArrowIcon
} from '@material-ui/icons';

export const getIcon = (name: string, props: SvgIconProps = {}): any => {
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
    doubleArrow: <DoubleArrowIcon {...props}/>,
  }[name];
};
