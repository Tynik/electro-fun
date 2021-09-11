import React from 'react';
import {
  Grid,
  Box,
  Typography,
  useTheme
} from '@material-ui/core';

import {
  ItemOption,
  OptionDefinitionSuffix,
  Item
} from '../types';
import { DbContext } from '../context';
import { useTextProcessor } from '../hooks';
import { AbbrLink } from '../components';

export const sortItemOptions = (allOptions, options: ItemOption[]) =>
  options.sort((optionA, optionB) => {
    const featSecRefIdA = allOptions[optionA.refId].featSecRefId;
    const featSecRefIdB = allOptions[optionB.refId].featSecRefId;

    if (!featSecRefIdA) {
      return -1;
    }
    if (!featSecRefIdB) {
      return 1;
    }
    return featSecRefIdA - featSecRefIdB;
  });

export type ItemInfoOptionsProps = {
  item: Item
}

export const ItemInfoOptions = ({ item }: ItemInfoOptionsProps) => {
  const theme = useTheme();

  const { db } = React.useContext(DbContext);

  const { wordsWrapper } = useTextProcessor();

  const insertFeatureSectionName = React.useCallback((options: ItemOption[], index: number): boolean => {
    const featSectionRef = db.options[options[index].refId].featSecRefId;

    if (!index) {
      return Boolean(featSectionRef);
    }
    const prevFeatSectionRef = db.options[options[index - 1].refId].featSecRefId;

    return !prevFeatSectionRef
      ? Boolean(featSectionRef)
      : featSectionRef !== prevFeatSectionRef;
  }, []);

  const getOptionValue = React.useCallback((option: ItemOption) => {
    const processOptionValue = (values: any, suffix: OptionDefinitionSuffix) => {
      if (!Array.isArray(values)) {
        return [
          values + (
            suffix || ''
          )
        ];
      }
      return values.map(values =>
        ['string', 'number'].includes(typeof values)
          ? processOptionValue(values, suffix)
          : processOptionValue(values.value, suffix[values.type]).join(', ')
      );
    };

    return processOptionValue(
      option.value as any,
      db.options[option.refId].suffix
    ).map((value, index) =>
      <span
        key={`${option.refId}-${index}`}
        style={{ display: 'block' }}
      >
        {value}
      </span>
    );
  }, []);

  const abbreviationsWrapper = React.useCallback((text: string) =>
    wordsWrapper(db.abbreviations, text, (
      (text, abbr, index) => (
        <AbbrLink
          key={`${text}-${abbr}-${index}`}
          href={db.abbreviations[abbr]}
        >
          {abbr}
        </AbbrLink>
      )
    )), []);

  return (
    <>
      <Typography variant={'overline'}>Характеристики</Typography>

      <Box>
        {sortItemOptions(db.options, item.options || []).map(
          (option, index, array) => (
            <div
              key={`${option.refId}-${index}-feature`}
              style={{
                position: 'relative',
                marginBottom: theme.spacing(1)
              }}
            >
              {insertFeatureSectionName(array, index) && (
                <Typography
                  variant={'subtitle2'}
                  marginTop={theme.spacing(1)}
                >
                  {db.featureSections[db.options[option.refId].featSecRefId]}
                </Typography>
              )}
              <Grid container>
                <Grid xs={8} item>
                  <Typography variant={'body1'}>
                    {abbreviationsWrapper(db.options[option.refId].name)}
                  </Typography>
                </Grid>
                <Grid xs={4} sx={{ display: 'flex', alignItems: 'center' }} item>
                  <Typography variant={'body2'}>
                    {getOptionValue(option)}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          ))}
      </Box>
    </>
  );
};
