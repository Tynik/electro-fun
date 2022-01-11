import React from 'react';
import {
  Grid,
  Box,
  Typography,
  Popover,
  Paper,
  useTheme
} from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';

import type { ItemT, ItemFeatureT, FeatureDefinitionSuffixT } from '~/types';

import { DbContext } from '~/contexts';
import { sortItemFeatures } from '~/helpers';
import { useTextProcessor } from '~/hooks';
import { AbbrLink } from '~/components';
import { useSelectedItemOptionId } from '~/hooks';

export type ItemInfoFeaturesProps = {
  item: ItemT
}

export const ItemInfoFeatures = ({ item }: ItemInfoFeaturesProps) => {
  const theme = useTheme();

  const { db } = React.useContext(DbContext);

  const { wordsWrapper } = useTextProcessor();

  const [featureInfo, setFeatureInfo] = React.useState('');
  const [featureInfoAnchorEl, setFeatureInfoAnchorEl] = React.useState(null);

  const isInsertItemFeatureSectionName = React.useCallback(
    (features: ItemFeatureT[], index: number): boolean => {
      const featSectionRef = db.itemFeatures[features[index].refId].featSecRefId;

      if (!index) {
        return Boolean(featSectionRef);
      }
      const prevFeatSectionRef = db.itemFeatures[features[index - 1].refId].featSecRefId;

      return !prevFeatSectionRef
        ? Boolean(featSectionRef)
        : featSectionRef !== prevFeatSectionRef;
    }, []
  );

  const onFeatureInfoClick = (featureInfo: string, e) => {
    setFeatureInfoAnchorEl(e.currentTarget);
    setFeatureInfo(featureInfo);
  };

  const getItemFeatureValue = React.useCallback((feature: ItemFeatureT) => {
    const processFeatureValue = (values: any, suffix: FeatureDefinitionSuffixT) => {
      if (!Array.isArray(values)) {
        return [
          values + (
            suffix || ''
          )
        ];
      }
      return values.map(values =>
        ['string', 'number'].includes(typeof values)
          ? processFeatureValue(values, suffix)
          : processFeatureValue(values.value, suffix && suffix[values.type]).join(', ')
      );
    };

    return processFeatureValue(
      feature.value,
      db.itemFeatures[feature.refId].suffix
    ).map((value, index) =>
      <span
        key={`${feature.refId}-${index}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap'
        }}
      >
        {value}

        {Boolean(feature.info) && (
          <InfoIcon
            fontSize={'small'}
            color={'info'}
            sx={{ marginLeft: theme.spacing(1) }}
            onClick={(e) =>
              onFeatureInfoClick(feature.info, e)
            }
            aria-owns={featureInfo ? 'mouse-feature-info-click-popover' : undefined}
            aria-haspopup
          />
        )}
      </span>
    );
  }, []);

  const abbreviationsWrapper = React.useCallback((text: string) =>
    wordsWrapper(Object.keys(db.abbreviations), text, (
      (text, abbr, index) => (
        <AbbrLink
          key={`${text}-${abbr}-${index}`}
          href={db.abbreviations[abbr].url}
          hrefLang={db.abbreviations[abbr].lang}
        >
          {abbr}
        </AbbrLink>
      )
    )), []);

  const selectedItemOptionId = useSelectedItemOptionId(item);

  const itemFeatures = React.useMemo(() =>
      item.features.filter(itemFeature =>
        !itemFeature.optionId || itemFeature.optionId === selectedItemOptionId
      ) || [],
    [selectedItemOptionId]
  );

  return (
    <>
      <Typography variant={'overline'}>
        Характеристики
      </Typography>

      <Box>
        {sortItemFeatures(db.itemFeatures, itemFeatures).map(
          (feature, index, features) => (
            <div
              key={`${feature.refId}-${index}-feature`}
              style={{
                position: 'relative',
                marginBottom: theme.spacing(1)
              }}
            >
              {isInsertItemFeatureSectionName(features, index) && (
                <Typography
                  variant={'subtitle2'}
                  marginTop={theme.spacing(1)}
                >
                  {db.featureSections[db.itemFeatures[feature.refId].featSecRefId]}
                </Typography>
              )}
              <Grid container>
                <Grid xs={8} item>
                  <Typography variant={'body1'}>
                    {abbreviationsWrapper(db.itemFeatures[feature.refId].name)}
                  </Typography>
                </Grid>
                <Grid xs={4} sx={{ display: 'flex', alignItems: 'center' }} item>
                  <Typography variant={'body2'}>
                    {getItemFeatureValue(feature)}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          ))}
      </Box>

      <Popover
        id={'mouse-feature-info-click-popover'}
        open={Boolean(featureInfo)}
        anchorEl={featureInfoAnchorEl}
        onClose={() => setFeatureInfo('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Paper sx={{ padding: 1, backgroundColor: '#212121', color: 'white' }}>
          <Typography variant={'body2'}>{featureInfo}</Typography>
        </Paper>
      </Popover>
    </>
  );
};
