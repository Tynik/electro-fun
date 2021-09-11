import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Stack,
  Grid,
  Typography,
  List,
  ListItem,
  Icon,
  Chip,
  ListItemText,
  Alert,
  useTheme
} from '@material-ui/core';
import {
  Link as LinkIcon,
  ShoppingCart as ShoppingCartIcon
} from '@material-ui/icons';

import { Item } from '../types';
import { DbContext } from '../context';
import {
  useTextProcessor,
  useSmoothScroll,
  useStaticErrors,
  useDbSearch
} from '../hooks';
import {
  Loader,
  ExternalLink,
  ImageSlider,
  BackButton,
  ExternalButtonLink
} from '../components';
import { ItemInfoFeatures } from './ItemInfoFeatures';

export const ItemInfo = () => {
  const theme = useTheme();

  const { id } = useParams<any>();

  const [item, setItem] = React.useState<Item>(null);

  const { db, loadNextDbPart } = React.useContext(DbContext);
  const { search, foundItems } = useDbSearch(db, loadNextDbPart);

  const { wordsWrapper } = useTextProcessor();
  const { errors, setErrors, printErrors } = useStaticErrors();

  useSmoothScroll({ top: 0, left: 0 });

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

  React.useEffect(() => {
    if (item === null) {
      return;
    }
    let originalDocumentTitle,
      originalDescription,
      originalKeywords,
      meta;

    originalDocumentTitle = document.title;

    if (item.seo) {
      if (item.seo.title) {
        document.title = `${db.seo.title} - ${item.seo.title}`;
      }
      setTimeout(() => {
        meta = document.getElementsByTagName('meta');
        originalDescription = meta['description'].content;
        originalKeywords = meta['keywords'].content;

        meta['description'].content = item.seo.description;
        meta['keywords'].content = item.seo.keywords;
      });
    }
    if (!item.seo || !item.seo.title) {
      document.title = `${db.seo.title} - ${item.title}`;
    }

    return () => {
      document.title = originalDocumentTitle;

      if (meta) {
        meta['description'].content = originalDescription;
        meta['keywords'].content = originalKeywords;
      }
    };
  }, [item]);

  const clarificationsWrapper = React.useCallback((text: string) =>
    wordsWrapper(db.clarifications, text, (
      (text, phrase, index) => (
        <ExternalLink
          key={`${text}-${phrase}-${index}`}
          href={db.clarifications[phrase]}
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
  // item is loading in progress
  if (item === null) {
    return <Loader/>;
  }

  return (
    <Container>
      <Grid spacing={2} container>
        <Grid xs={12} item>
          <BackButton/>
        </Grid>

        <Grid xs={12} item>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant={'h5'} role={'heading'} aria-level={1}>
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
            images={item.images}
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

          {item.externalLinks && item.externalLinks.length > 0 && (
            <Box marginTop={theme.spacing(2)}>
              <Typography variant={'overline'}>
                Ссылки на внешние ресурсы
              </Typography>

              <List disablePadding>
                {item.externalLinks.map(externalResource => (
                  <ListItem key={externalResource.name} disablePadding>
                    {externalResource.icon && (
                      <Icon
                        fontSize={'small'}
                        sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        <img
                          src={`/icons/${externalResource.icon}`}
                          alt={externalResource.iconAlt}
                          width={16}
                          height={16}/>
                      </Icon>
                    )}
                    <ListItemText>
                      <ExternalLink
                        href={externalResource.url}
                        hrefLang={externalResource.lang}
                      >
                        {externalResource.name}
                      </ExternalLink>
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Grid>

        <Grid xs={12} sm={6} item>
          <ItemInfoFeatures item={item}/>

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
        </Grid>
      </Grid>
    </Container>
  );
};
