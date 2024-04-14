import React from 'react';
import { Grid, Box, Typography, Popover, Paper, useTheme } from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';

import type {
  Product,
  ProductFeature,
  FeatureDefinitionSuffix,
  ProductFeatureValue,
} from '~/types';

import { DbContext } from '~/providers';
import { sortProductFeatures } from '~/helpers';
import { useTextProcessor } from '~/hooks';
import { AbbrLink } from '~/components';
import { useProductFeatures } from '~/hooks';

export type ProductInfoFeaturesProps = {
  product: Product;
};

export const ProductInfoFeatures = ({ product }: ProductInfoFeaturesProps) => {
  const theme = useTheme();

  const { db } = React.useContext(DbContext);

  const { wordsWrapper } = useTextProcessor();

  const [featureInfo, setFeatureInfo] = React.useState<ProductFeature['info']>('');
  const [featureInfoAnchorEl, setFeatureInfoAnchorEl] = React.useState(null);

  const isInsertProductFeatureSectionName = (
    features: ProductFeature[],
    index: number,
  ): boolean => {
    const featSectionRef = db.itemFeatures[features[index].refId].featSecRefId;

    if (!index) {
      return Boolean(featSectionRef);
    }
    const prevFeatSectionRef = db.itemFeatures[features[index - 1].refId].featSecRefId;

    return !prevFeatSectionRef ? Boolean(featSectionRef) : featSectionRef !== prevFeatSectionRef;
  };

  const onFeatureInfoClick = (featureInfo: ProductFeature['info'], e) => {
    setFeatureInfoAnchorEl(e.currentTarget);
    setFeatureInfo(featureInfo);
  };

  const getProductFeatureValue = (productFeature: ProductFeature) => {
    const processFeatureValue = (
      featureValue: ProductFeatureValue,
      suffix: FeatureDefinitionSuffix | undefined,
    ) => {
      if (!Array.isArray(featureValue)) {
        return [featureValue.toString() + (suffix ?? '')];
      }

      return featureValue.map(value =>
        typeof value === 'string' || typeof value === 'number'
          ? processFeatureValue(value, suffix)
          : processFeatureValue(
              value.value,
              suffix && value.type ? suffix[value.type] : undefined,
            ).join(', '),
      );
    };

    return processFeatureValue(
      productFeature.value,
      db.itemFeatures[productFeature.refId].suffix,
    ).map((value, index) => (
      <span
        key={`${productFeature.refId}-${index}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap',
        }}
      >
        {value}

        {productFeature.info && (
          <InfoIcon
            fontSize={'small'}
            color={'info'}
            sx={{ marginLeft: theme.spacing(1), cursor: 'pointer' }}
            onClick={e => onFeatureInfoClick(productFeature.info, e)}
            aria-owns={featureInfo ? 'mouse-feature-info-click-popover' : undefined}
            aria-haspopup
          />
        )}
      </span>
    ));
  };

  const abbreviationsWrapper = React.useCallback(
    (text: string) =>
      wordsWrapper(Object.keys(db.abbreviations), text, (text, abbr, index) =>
        abbr ? (
          <AbbrLink
            key={`${text}-${abbr}-${index}`}
            href={db.abbreviations[abbr].url}
            hrefLang={db.abbreviations[abbr].lang}
          >
            {abbr}
          </AbbrLink>
        ) : (
          <span key={`${text}`} dangerouslySetInnerHTML={{ __html: text }} />
        ),
      ),
    [],
  );

  const productFeatures = useProductFeatures(product);

  return (
    <>
      <Typography variant={'overline'}>Features</Typography>

      <Box>
        {sortProductFeatures(db.itemFeatures, productFeatures).map(
          (feature, featureIndex, features) => (
            <div
              key={`${feature.refId}-${featureIndex}-feature`}
              style={{
                marginBottom: theme.spacing(0.5),
              }}
            >
              {isInsertProductFeatureSectionName(features, featureIndex) && (
                <Typography variant={'subtitle2'} marginTop={2}>
                  {db.featureSections[db.itemFeatures[feature.refId].featSecRefId]}
                </Typography>
              )}

              <Grid
                marginLeft={1.5}
                sx={{
                  padding: theme.spacing(0.5, 1),
                  borderRadius: 1,
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: theme.palette.grey.A100,
                  },
                }}
                container
              >
                <Grid xs={8} item>
                  <Typography variant={'body1'}>
                    {abbreviationsWrapper(db.itemFeatures[feature.refId].name)}
                  </Typography>
                </Grid>

                <Grid xs={4} sx={{ display: 'flex', alignItems: 'center' }} item>
                  <Typography variant={'body2'}>{getProductFeatureValue(feature)}</Typography>
                </Grid>
              </Grid>
            </div>
          ),
        )}
      </Box>

      <Popover
        id={'mouse-feature-info-click-popover'}
        open={Boolean(featureInfo)}
        anchorEl={featureInfoAnchorEl}
        onClose={() => setFeatureInfo('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Paper sx={{ padding: 1, backgroundColor: '#212121', color: 'white' }}>
          <Typography
            variant={'body2'}
            dangerouslySetInnerHTML={{
              __html: Array.isArray(featureInfo) ? featureInfo.join('<br/>') : featureInfo,
            }}
          />
        </Paper>
      </Popover>
    </>
  );
};
