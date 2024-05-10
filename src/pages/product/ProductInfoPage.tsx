import React from 'react';
import { Box, Grid, Typography, Alert, Divider, useTheme } from '@mui/material';

import { ProductMicrodata } from '~/helpers';
import { useTextProcessor, useSmoothScroll, useSeo, useCurrentProduct } from '~/hooks';
import { Loader, ExternalLink, ImageSlider, BackButton } from '~/components';

import { ProductInfoFeatures } from './ProductInfoFeatures';
import { ProductInfoOptions } from './ProductInfoOptions';
import { ProductInfoExternalLinks } from './ProductInfoExternalLinks';
import { ProductInfoApplications } from './ProductInfoApplications';
import { ProductInfoAccessories } from './ProductInfoAccessories';
import { ProductInfoActions } from './ProductInfoActions';
import { ProductInfoContributors } from './ProductInfoContributors';
import { ProductInfoRelatedDatasheets } from './ProductInfoRelatedDatasheets';
import { ProductInfoHeader } from './ProductInfoHeader';
import { ProductInfoPeculiarities } from './ProductInfoPeculiarities';

export const ProductInfoPage = () => {
  const theme = useTheme();

  const {
    db,
    product,
    price,
    images,
    seo,
    errors,
    printErrors,
    stripeProduct,
    isStripeProductFetching,
  } = useCurrentProduct();

  const { wordsWrapper } = useTextProcessor();

  useSmoothScroll({ top: 0, left: 0 });

  useSeo(Object.keys(seo).length ? seo : null);

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

  if (product === null || isStripeProductFetching) {
    return <Loader />;
  }

  return (
    <Grid spacing={2} container>
      <ProductMicrodata product={product} stripeProduct={stripeProduct} />

      <Grid xs={12} item>
        <BackButton />
      </Grid>

      <Grid xs={12} item>
        <ProductInfoHeader product={product} />
      </Grid>

      <Grid xs={12} md={6} item>
        <ImageSlider images={images} height="300px" />

        {product.content && (
          <Box component="main" marginTop={theme.spacing(2)}>
            <Typography variant="overline">Description</Typography>

            <Typography
              variant="body1"
              sx={{ whiteSpace: 'pre-line', textAlign: 'justify' }}
              dangerouslySetInnerHTML={{ __html: product.content }}
            />
          </Box>
        )}

        {product.warningContent && (
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
              <span dangerouslySetInnerHTML={{ __html: product.warningContent }} />
            </Alert>
          </Box>
        )}

        {product.relatedDatasheetIds && product.relatedDatasheetIds.length > 0 && (
          <Box marginTop={theme.spacing(2)}>
            <ProductInfoRelatedDatasheets relatedDatasheetIds={product.relatedDatasheetIds} />
          </Box>
        )}

        {product.peculiarities && product.peculiarities.length > 0 && (
          <Box marginTop={theme.spacing(2)}>
            <ProductInfoPeculiarities peculiarities={product.peculiarities} />
          </Box>
        )}

        {product.applicationIds && product.applicationIds.length > 0 && (
          <Box marginTop={theme.spacing(2)}>
            <ProductInfoApplications applicationIds={product.applicationIds} />
          </Box>
        )}

        {product.accessories && product.accessories.length > 0 && (
          <Box marginTop={theme.spacing(2)}>
            <ProductInfoAccessories accessories={product.accessories} />
          </Box>
        )}

        {product.externalLinks && product.externalLinks.length > 0 && (
          <Box marginTop={theme.spacing(2)}>
            <ProductInfoExternalLinks externalLinks={product.externalLinks} />
          </Box>
        )}

        {product.contributors && product.contributors.length > 0 && (
          <Box marginTop={theme.spacing(2)}>
            <ProductInfoContributors contributors={product.contributors} />
          </Box>
        )}

        {product.codeExamples && product.codeExamples.length > 0 && (
          <Box marginTop={theme.spacing(2)}>
            {product.codeExamples.map(codeExample => (
              <pre key={codeExample.name}>{codeExample.code}</pre>
            ))}
          </Box>
        )}
      </Grid>

      <Grid xs={12} md={6} item>
        {product.features && product.features.length > 0 && (
          <>
            <ProductInfoFeatures product={product} />
            <Divider sx={{ marginTop: theme.spacing(2) }} />
          </>
        )}

        {product.options && Object.keys(product.options).length > 0 && (
          <Box
            sx={{
              marginTop: theme.spacing(2),
            }}
          >
            <ProductInfoOptions product={product} />
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
          <ProductInfoActions product={product} stripeProduct={stripeProduct} />
        </Box>
      </Grid>
    </Grid>
  );
};
