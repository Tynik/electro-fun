import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Alert,
  Divider,
  useTheme
} from '@mui/material';

import type { ItemT } from '~/types';

import { DbContext } from '~/contexts';
import { getItemPrice, ProductSEO } from '~/helpers';
import {
  useTextProcessor,
  useSmoothScroll,
  useStaticErrors,
  useJsonDbSearch,
  useSeo,
  useSelectedItemOptionId,
  useItemImages,
  useCurrentItem,
} from '~/hooks';
import {
  Loader,
  ExternalLink,
  ImageSlider,
  BackButton
} from '~/components';
import { ItemInfoFeatures } from './ItemInfoFeatures';
import { ItemInfoOptions } from './ItemInfoOptions';
import { ItemInfoExternalLinks } from './ItemInfoExternalLinks';
import { ItemInfoApplications } from './ItemInfoApplications';
import { ItemInfoAccessories } from './ItemInfoAccessories';
import { ItemInfoActions } from './ItemInfoActions';
import { ItemInfoContributors } from './ItemInfoContributors';
import { ItemInfoRelatedDatasheets } from './ItemInfoRelatedDatasheets';
import { ItemInfoHeader } from './ItemInfoHeader';

export const ItemInfoPage = () => {
  const theme = useTheme();

  const {
    db,
    item,
    price,
    images,
    seo,
    errors,
    printErrors
  } = useCurrentItem();

  const { wordsWrapper } = useTextProcessor();

  useSmoothScroll({ top: 0, left: 0 });

  useSeo(Object.keys(seo).length ? seo : null);

  const clarificationsWrapper = React.useCallback((text: string) =>
    wordsWrapper(Object.keys(db.clarifications), text, (
      (text, phrase, index) => (
        phrase ? (
          <ExternalLink
            key={`${text}-${phrase}-${index}`}
            href={db.clarifications[phrase].url}
            hrefLang={db.clarifications[phrase].lang}
          >
            {phrase}
          </ExternalLink>
        ) : (
          <span key={`${text}`} dangerouslySetInnerHTML={{ __html: text }}/>
        )
      )
    )), []);

  // high priority to show errors
  if (errors.length) {
    return printErrors();
  }
  if (item === null) {
    return <Loader/>;
  }

  return (
    <Grid spacing={2} container>
      <ProductSEO item={item}/>

      <Grid xs={12} item>
        <BackButton/>
      </Grid>

      <Grid xs={12} item>
        <ItemInfoHeader item={item}/>
      </Grid>

      <Grid xs={12} md={6} item>
        <ImageSlider
          images={images}
          height={'300px'}
        />

        {item.content && (
          <Box component={'main'} marginTop={theme.spacing(2)}>
            <Typography variant={'overline'}>Описание</Typography>

            <Typography
              variant={'body1'}
              sx={{ whiteSpace: 'pre-line', textAlign: 'justify' }}
            >
              {clarificationsWrapper(item.content)}
            </Typography>
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
                alignItems: 'center'
              }}
            >
              <span dangerouslySetInnerHTML={{ __html: item.warningContent }}/>
            </Alert>
          </Box>
        )}

        {item.relatedDatasheetIds && item.relatedDatasheetIds.length > 0 && (
          <Box marginTop={theme.spacing(2)}>
            <ItemInfoRelatedDatasheets relatedDatasheetIds={item.relatedDatasheetIds}/>
          </Box>
        )}

        {item.applicationIds && item.applicationIds.length > 0 && (
          <Box marginTop={theme.spacing(2)}>
            <ItemInfoApplications applicationIds={item.applicationIds}/>
          </Box>
        )}

        {item.accessories && item.accessories.length > 0 && (
          <Box marginTop={theme.spacing(2)}>
            <ItemInfoAccessories accessories={item.accessories}/>
          </Box>
        )}

        {item.externalLinks && item.externalLinks.length > 0 && (
          <Box marginTop={theme.spacing(2)}>
            <ItemInfoExternalLinks externalLinks={item.externalLinks}/>
          </Box>
        )}

        {item.contributors && item.contributors.length > 0 && (
          <Box marginTop={theme.spacing(2)}>
            <ItemInfoContributors contributors={item.contributors}/>
          </Box>
        )}

        {item.codeExamples && item.codeExamples.length > 0 && (
          <Box marginTop={theme.spacing(2)}>
            {item.codeExamples.map(codeExample => (
              <pre key={codeExample.name}>
                {codeExample.code}
              </pre>
            ))}
          </Box>
        )}
      </Grid>

      <Grid xs={12} md={6} item>
        {item.features && item.features.length > 0 && (
          <>
            <ItemInfoFeatures item={item}/>
            <Divider sx={{ marginTop: theme.spacing(2) }}/>
          </>
        )}

        {item.options && Object.keys(item.options).length > 0 && (
          <Box sx={{
            marginTop: theme.spacing(2)
          }}>
            <ItemInfoOptions item={item}/>
          </Box>
        )}

        {Boolean(price) && (
          <Box sx={{
            marginTop: theme.spacing(2),
            textAlign: 'center'
          }}>
            <Typography variant={'h5'} component={'div'}>
              {price.toFixed(2)} UAH
            </Typography>
          </Box>
        )}

        <Box marginTop={theme.spacing(2)}>
          <ItemInfoActions item={item}/>
        </Box>
      </Grid>
    </Grid>
  );
};
