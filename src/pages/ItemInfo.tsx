import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Stack,
  Button,
  Grid,
  Typography,
  List,
  ListItem,
  Icon,
  ListItemText,
  Alert,
  useTheme
} from '@material-ui/core';
import {
  Link as LinkIcon,
  ShoppingCart as ShoppingCartIcon
} from '@material-ui/icons';

import { Item, ItemOption, OptionDefinitionSuffix } from '../types';
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
  AbbrLink,
  ImageSlider,
  BackButton
} from '../components';

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
          <Typography variant={'h5'}>{item.title}</Typography>
          <Typography variant={'subtitle1'}>{item.subtitle}</Typography>
        </Grid>

        <Grid xs={12} sm={6} item>
          <ImageSlider
            images={item.images}
            height={'300px'}
          />

          {item.content && (
            <Box marginBottom={theme.spacing(2)}>
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
            <Box marginBottom={theme.spacing(2)}>
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
            <Box>
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
                      <ExternalLink href={externalResource.url}>
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
          <Typography variant={'overline'}>Характеристики</Typography>

          <Box>
            {sortItemOptions(db.options, item.options || []).map(
              (option, index, array) => (
                <div
                  key={`${option.refId}-${index}-feature`}
                  style={{ position: 'relative' }}
                >
                  {insertFeatureSectionName(array, index) && (
                    <Typography
                      variant={'subtitle2'}
                      marginTop={theme.spacing(1)}
                    >
                      {db.featureSections[db.options[option.refId].featSecRefId]}
                    </Typography>
                  )}
                  <Grid
                    sx={{
                      ':hover': {
                        '::after': {
                          width: '100%',
                          borderBottom: '1px dashed #eee',
                          position: 'absolute',
                          display: 'block',
                          content: '""',
                          bottom: 0
                        }
                      }
                    }}
                    container
                  >
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

          <Box marginTop={theme.spacing(2)}>
            <Stack direction={'row'} spacing={2}>
              {Boolean(item.datasheetLink) && (
                <Button
                  component={'a'}
                  variant={'outlined'}
                  target={'_blank'}
                  href={item.datasheetLink}
                  startIcon={<LinkIcon/>}
                >
                  Datasheet
                </Button>
              )}
              {Boolean(item.buyLink) && (
                <Button
                  component={'a'}
                  variant={'contained'}
                  target={'_blank'}
                  href={item.buyLink}
                  color={'success'}
                  startIcon={<ShoppingCartIcon/>}
                >
                  Купить
                </Button>
              )}
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
    ;
};
