import React from 'react';
import { useQuery } from 'react-query';
import { Box, Grid, Typography, Alert, Divider, useTheme } from '@mui/material';

import { getStripeProduct } from '~/api';
import { ProductMicrodata } from '~/helpers';
import { useTextProcessor, useSmoothScroll, useSeo, useCurrentItem } from '~/hooks';
import { Loader, ExternalLink, ImageSlider, BackButton } from '~/components';

import { ItemInfoFeatures } from './ItemInfoFeatures';
import { ItemInfoOptions } from './ItemInfoOptions';
import { ItemInfoExternalLinks } from './ItemInfoExternalLinks';
import { ItemInfoApplications } from './ItemInfoApplications';
import { ItemInfoAccessories } from './ItemInfoAccessories';
import { ItemInfoActions } from './ItemInfoActions';
import { ItemInfoContributors } from './ItemInfoContributors';
import { ItemInfoRelatedDatasheets } from './ItemInfoRelatedDatasheets';
import { ItemInfoHeader } from './ItemInfoHeader';
import { ItemInfoPeculiarities } from './ItemInfoPeculiarities';

export const ItemInfoPage = () => {
  const theme = useTheme();

  const { db, item, price, images, seo, errors, printErrors } = useCurrentItem();

  const { wordsWrapper } = useTextProcessor();

  useSmoothScroll({ top: 0, left: 0 });

  useSeo(Object.keys(seo).length ? seo : null);

  const { data: stripeProduct, isFetching: isStripeProductFetching } = useQuery(
    ['stripe-product', item?.id],
    () => getStripeProduct(item!.stripeProductId),
    {
      enabled: Boolean(item?.stripeProductId),
    },
  );

  const clarificationsWrapper = React.useCallback(
    (text: string) =>
      wordsWrapper(Object.keys(db.clarifications), text, (text, phrase, index) =>
        phrase ? (
          <ExternalLink
            key={`${text}-${phrase}-${index}`}
            href={db.clarifications[phrase].url}
            hrefLang={db.clarifications[phrase].lang}
          >
            {phrase}
          </ExternalLink>
        ) : (
          <span key={`${text}`} dangerouslySetInnerHTML={{ __html: text }} />
        ),
      ),
    [],
  );

  // high priority to show errors
  if (errors.length) {
    return printErrors();
  }

  if (item === null || isStripeProductFetching) {
    return <Loader />;
  }

  return (
    <Grid spacing={2} container>
      <ProductMicrodata item={item} />

      <Grid xs={12} item>
        <BackButton />
      </Grid>

      <Grid xs={12} item>
        <ItemInfoHeader item={item} />
      </Grid>

      <Grid xs={12} md={6} item>
        <ImageSlider images={images} height={'300px'} />

        {item.content && (
          <Box component={'main'} marginTop={theme.spacing(2)}>
            <Typography variant={'overline'}>Description</Typography>

            <Typography
              variant={'body1'}
              sx={{ whiteSpace: 'pre-line', textAlign: 'justify' }}
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          </Box>
        )}

        {item.warningContent && (
          <Box marginTop={2}>
            <Alert
              severity={'warning'}
              sx={{
                whiteSpace: 'pre-line',
                marginTop: 2,
                paddingTop: 0,
                paddingBottom: 0,
                alignItems: 'center',
              }}
            >
              <span dangerouslySetInnerHTML={{ __html: item.warningContent }} />
            </Alert>
          </Box>
        )}

        {item.relatedDatasheetIds && item.relatedDatasheetIds.length > 0 && (
          <Box marginTop={theme.spacing(2)}>
            <ItemInfoRelatedDatasheets relatedDatasheetIds={item.relatedDatasheetIds} />
          </Box>
        )}

        {item.peculiarities && item.peculiarities.length > 0 && (
          <Box marginTop={theme.spacing(2)}>
            <ItemInfoPeculiarities peculiarities={item.peculiarities} />
          </Box>
        )}

        {item.applicationIds && item.applicationIds.length > 0 && (
          <Box marginTop={theme.spacing(2)}>
            <ItemInfoApplications applicationIds={item.applicationIds} />
          </Box>
        )}

        {item.accessories && item.accessories.length > 0 && (
          <Box marginTop={theme.spacing(2)}>
            <ItemInfoAccessories accessories={item.accessories} />
          </Box>
        )}

        {item.externalLinks && item.externalLinks.length > 0 && (
          <Box marginTop={theme.spacing(2)}>
            <ItemInfoExternalLinks externalLinks={item.externalLinks} />
          </Box>
        )}

        {item.contributors && item.contributors.length > 0 && (
          <Box marginTop={theme.spacing(2)}>
            <ItemInfoContributors contributors={item.contributors} />
          </Box>
        )}

        {item.codeExamples && item.codeExamples.length > 0 && (
          <Box marginTop={theme.spacing(2)}>
            {item.codeExamples.map(codeExample => (
              <pre key={codeExample.name}>{codeExample.code}</pre>
            ))}
          </Box>
        )}
      </Grid>

      <Grid xs={12} md={6} item>
        {item.features && item.features.length > 0 && (
          <>
            <ItemInfoFeatures item={item} />
            <Divider sx={{ marginTop: theme.spacing(2) }} />
          </>
        )}

        {item.options && Object.keys(item.options).length > 0 && (
          <Box
            sx={{
              marginTop: theme.spacing(2),
            }}
          >
            <ItemInfoOptions item={item} />
          </Box>
        )}

        {Boolean(price) && (
          <Box
            sx={{
              marginTop: theme.spacing(2),
              textAlign: 'center',
            }}
          >
            <Typography variant={'h5'} component={'div'}>
              {price.toFixed(2)} £
            </Typography>
          </Box>
        )}

        <Box marginTop={theme.spacing(2)}>
          <ItemInfoActions item={item} stripeProduct={stripeProduct} />
        </Box>
      </Grid>
    </Grid>
  );
};
