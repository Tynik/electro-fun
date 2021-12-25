import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Alert,
  useTheme
} from '@material-ui/core';

import type { ItemT } from '../../types';

import { DbContext } from '../../contexts';
import {
  useTextProcessor,
  useSmoothScroll,
  useStaticErrors,
  useJsonDbSearch,
  useSeo
} from '../../hooks';
import {
  Loader,
  ExternalLink,
  ImageSlider,
  BackButton
} from '../../components';
import { ItemInfoFeatures } from './ItemInfoFeatures';
import { ItemInfoOptions } from './ItemInfoOptions';
import { ItemInfoExternalLinks } from './ItemInfoExternalLinks';
import { ItemInfoApplications } from './ItemInfoApplications';
import { ItemInfoActions } from './ItemInfoActions';
import { ItemInfoDrivers } from './ItemInfoDrivers';
import { ItemInfoRelatedDatasheets } from './ItemInfoRelatedDatasheets';
import { ItemInfoHeader } from './ItemInfoHeader';

export const ItemInfoPage = () => {
  const theme = useTheme();

  const { id } = useParams<any>();

  const [item, setItem] = React.useState<ItemT>(null);

  const { db, loadNextDbPart } = React.useContext(DbContext);
  const { search, foundItems } = useJsonDbSearch(db, loadNextDbPart);

  const { wordsWrapper } = useTextProcessor();
  const { errors, setErrors, printErrors } = useStaticErrors();

  useSmoothScroll({ top: 0, left: 0 });

  const seoEntity = React.useMemo(() => (
    {
      ...(
        item && {
          ...(
            item.seo || {}
          ),
          title: item.seo && item.seo.title
            ? `${db.seo.title} - ${item.seo.title}`
            : `${db.seo.title} - ${item.title}`
        }
      )
    }
  ), [db, item]);

  useSeo(Object.keys(seoEntity).length ? seoEntity : null);

  React.useEffect(() => {
    search({ ids: [id] });
  }, []);

  React.useEffect(() => {
    if (!foundItems) {
      return;
    }
    if (foundItems.length) {
      setItem(foundItems[0]);
    } else {
      setErrors([`"${id}" не найден или был переименован`]);
    }
  }, [foundItems]);

  const clarificationsWrapper = React.useCallback((text: string) =>
    wordsWrapper(Object.keys(db.clarifications), text, (
      (text, phrase, index) => (
        <ExternalLink
          key={`${text}-${phrase}-${index}`}
          href={db.clarifications[phrase].url}
          hrefLang={db.clarifications[phrase].lang}
        >
          {phrase}
        </ExternalLink>
      )
    )), []);

  const processItemContent = (itemContent: string) => {
    return clarificationsWrapper(itemContent);
  };

  // high priority to show errors
  if (errors.length) {
    return printErrors();
  }
  // item loading in progress
  if (item === null) {
    return <Loader/>;
  }

  return (
    <Grid spacing={2} container>
      <Grid xs={12} item>
        <BackButton/>
      </Grid>

      <Grid xs={12} item>
        <ItemInfoHeader item={item}/>
      </Grid>

      <Grid xs={12} sm={6} item>
        <ImageSlider
          images={item.images || []}
          height={'300px'}
        />

        {item.content && (
          <Box component={'main'} marginTop={theme.spacing(2)}>
            <Typography variant={'overline'}>Описание</Typography>

            <Typography
              variant={'body1'}
              sx={{ whiteSpace: 'pre-line', textAlign: 'justify' }}
            >
              {processItemContent(item.content)}
            </Typography>
          </Box>
        )}

        {item.warningContent && (
          <Box marginTop={theme.spacing(2)}>
            <Alert
              severity={'warning'}
              sx={{
                whiteSpace: 'pre-line',
                marginTop: theme.spacing(2)
              }}
            >
              {item.warningContent}
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

        {item.externalLinks && item.externalLinks.length > 0 && (
          <Box marginTop={theme.spacing(2)}>
            <ItemInfoExternalLinks externalLinks={item.externalLinks}/>
          </Box>
        )}
      </Grid>

      <Grid xs={12} sm={6} item>
        <ItemInfoFeatures features={item.features}/>

        {item.options && Object.keys(item.options).length > 0 && (
          <ItemInfoOptions options={item.options}/>
        )}

        {Boolean(item.price) && (
          <Box marginTop={theme.spacing(2)} textAlign={'center'}>
            <Typography variant={'h5'} component={'div'}>
              {item.price.toFixed(2)} UAH
            </Typography>
          </Box>
        )}

        <Box marginTop={theme.spacing(2)}>
          <ItemInfoActions item={item}/>
        </Box>

        {item.drivers && item.drivers.length > 0 && (
          <Box marginTop={theme.spacing(2)}>
            <ItemInfoDrivers drivers={item.drivers}/>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};
