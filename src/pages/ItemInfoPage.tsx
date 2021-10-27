import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Stack,
  Grid,
  Typography,
  Chip,
  AvatarGroup,
  Avatar,
  Alert,
  useTheme
} from '@material-ui/core';
import {
  Link as LinkIcon,
  ShoppingCart as ShoppingCartIcon
} from '@material-ui/icons';

import { ItemT } from '../types';
import { DbContext } from '../context';
import {
  useTextProcessor,
  useSmoothScroll,
  useStaticErrors,
  useJsonDbSearch,
  useSeo
} from '../hooks';
import {
  Loader,
  InternalLink,
  ExternalLink,
  ImageSlider,
  BackButton,
  ExternalButtonLink,
  Datasheets
} from '../components';
import { ItemInfoFeatures } from './ItemInfoFeatures';
import { ItemInfoOptions } from './ItemInfoOptions';
import { ItemInfoExternalLinks } from './ItemInfoExternalLinks';
import { getIcon, getItemDriverAvatarSrc } from '../utils';

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
    search({ id });
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

  const category = React.useMemo(
    () =>
      item ? db.categories.find(category => category.id === item.categoryId) : null,
    [item]
  );

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
  if (item === null || !category) {
    return <Loader/>;
  }

  return (
    <Grid spacing={2} container>
      <Grid xs={12} item>
        <BackButton/>
      </Grid>

      <Grid xs={12} item>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant={'subtitle1'}>
            <InternalLink
              underline={'hover'}
              color={'inherit'}
              startIcon={getIcon(category.icon)}
              endIcon={getIcon('doubleArrow')}
              to={`/category/${category.id}`}
            >
              {category.name}
            </InternalLink>
          </Typography>

          <Typography
            variant={'h5'}
            role={'heading'}
            aria-level={1}
            sx={{ marginLeft: theme.spacing(1) }}
          >
            {item.title}
          </Typography>

          {item.original === false && (
            <Chip
              size={'small'}
              label={'копия'}
              color={'info'}
              sx={{ marginLeft: theme.spacing(1) }}
            />
          )}
        </Box>
        <Typography variant={'subtitle1'} role={'heading'} aria-level={2}>
          {item.subtitle}
        </Typography>
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
            <Typography variant={'overline'}>
              Связанные datasheets
            </Typography>

            <Datasheets
              datasheets={item.relatedDatasheetIds.reduce((datasheets, datasheetId) => (
                {
                  ...datasheets,
                  [datasheetId]: db.datasheets[datasheetId]
                }
              ), {})}
            />
          </Box>
        )}

        {item.externalLinks && item.externalLinks.length > 0 && (
          <Box marginTop={theme.spacing(2)}>
            <ItemInfoExternalLinks item={item}/>
          </Box>
        )}
      </Grid>

      <Grid xs={12} sm={6} item>
        <ItemInfoFeatures features={item.features}/>

        {item.options && Object.keys(item.options).length > 0 && (
          <ItemInfoOptions options={item.options}/>
        )}

        <Box marginTop={theme.spacing(2)}>
          <Stack direction={'row'} spacing={2}>
            {Boolean(item.datasheetId) && (
              <ExternalButtonLink
                href={db.datasheets[item.datasheetId].url}
                hrefLang={db.datasheets[item.datasheetId].lang}
                variant={'outlined'}
                startIcon={<LinkIcon/>}
              >
                Datasheet
              </ExternalButtonLink>
            )}
            {Boolean(item.buyLink) && (
              <ExternalButtonLink
                href={item.buyLink}
                variant={'contained'}
                color={'success'}
                startIcon={<ShoppingCartIcon/>}
              >
                Купить
              </ExternalButtonLink>
            )}
          </Stack>
        </Box>

        {item.drivers && item.drivers.length > 0 && (
          <Box marginTop={theme.spacing(2)}>
            <Typography variant={'overline'}>
              Драйверы
            </Typography>

            <AvatarGroup
              max={10}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              {item.drivers.map(driver => (
                <ExternalLink
                  key={driver.name}
                  href={driver.url}
                  hrefLang={'en'}
                  title={driver.name}
                  sx={{ textDecoration: 'none' }}
                >
                  <Avatar
                    alt={driver.name}
                    src={getItemDriverAvatarSrc(driver.src)}
                  />
                </ExternalLink>
              ))}
            </AvatarGroup>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};
