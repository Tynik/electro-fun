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
  ListItemText,
  ListItemIcon,
  useTheme
} from '@material-ui/core';
import {
  Link as LinkIcon,
  ShoppingCart as ShoppingCartIcon
} from '@material-ui/icons';

import { DbOptions, ItemOption, OptionDefinitionSuffix } from '../types';
import { AppContext } from '../context';
import { getItemById } from '../utils';
import { ImageSlider } from './ImageSlider';
import { BackButton } from './BackButton';
import { Icon } from '@material-ui/core';

export const sortItemOptions = (allOptions, options: ItemOption[]) =>
  options.sort((optionA, optionB) => {
    const featureSectionRefA = allOptions[optionA.idRef].featureSectionRef;
    const featureSectionRefB = allOptions[optionB.idRef].featureSectionRef;

    if (!featureSectionRefA) {
      return -1;
    }
    if (!featureSectionRefB) {
      return 1;
    }
    return featureSectionRefA - featureSectionRefB;
  });

export const ItemInfo = () => {
  const theme = useTheme();

  const { id } = useParams<any>();
  const { db } = React.useContext(AppContext);

  const item = getItemById(db, id);

  React.useEffect(() => {
    document.title = `${db.seo.title} - ${item.title}`;
    return () => {
      document.title = db.seo.title;
    }
  }, [item]);

  const insertFeatureSectionName = (
    allOptions: DbOptions, options: ItemOption[], index: number
  ): boolean => {
    const featSectionRef = allOptions[options[index].idRef].featureSectionRef;

    if (!index) {
      return Boolean(featSectionRef);
    }
    const prevFeatSectionRef = allOptions[options[index - 1].idRef].featureSectionRef;

    return !prevFeatSectionRef
      ? Boolean(featSectionRef)
      : featSectionRef !== prevFeatSectionRef;
  };

  const getOptionValue = (allOptions: DbOptions, option: ItemOption) => {
    const a = (values: any, suffix: OptionDefinitionSuffix) => {
      if (!Array.isArray(values)) {
         return [values + (suffix || '')];
      }
      return values.map(values =>
         ['string', 'number'].includes(typeof values)
          ? a(values, suffix)
          : a(values.value, suffix[values.type]).join(', ')
      )
    }

    return a(option.value as any, allOptions[option.idRef].suffix).map((value, index) =>
      <span
        key={`${option.idRef}-${index}`}
        style={{ display: 'block' }}
      >{value}</span>
    )
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
        </Grid>

        <Grid xs={12} sm={6} item>
          <Typography variant={'overline'}>Характеристики</Typography>

          <Box>
            {sortItemOptions(db.options, item.options || []).map((option, index, array) => (
              <div key={`${option.idRef}-feature`} style={{ position: 'relative' }}>
                {insertFeatureSectionName(db.options, array, index) && (
                  <Typography
                    variant={'subtitle2'}
                    marginTop={theme.spacing(1)}
                  >
                    {db.featureSections[db.options[option.idRef].featureSectionRef]}
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
                    <Typography variant={'body1'}>{db.options[option.idRef].name}: </Typography>
                  </Grid>
                  <Grid xs={4} sx={{ display: 'flex', alignItems: 'center' }} item>
                    <Typography variant={'body2'}>
                      {getOptionValue(db.options, option)}
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
                >Datasheet</Button>
              )}

              <Button
                component={'a'}
                variant={'contained'}
                target={'_blank'}
                href={item.buyLink}
                color={'success'}
                startIcon={<ShoppingCartIcon/>}
              >Купить</Button>
            </Stack>
          </Box>
        </Grid>

        <Grid xs={12} sm={6} item>
          <Typography variant={'overline'}>Описание</Typography>

          <Typography
            variant={'body1'}
            sx={{ whiteSpace: 'pre-line' }}
          >{item.content}</Typography>

          {item.externalResources && (
            <Box marginTop={theme.spacing(2)}>
              <Typography variant={'overline'}>Ссылки на внешние ресурсы</Typography>

              <List disablePadding>
                {item.externalResources.map(externalResource => (
                  <ListItem
                    component={'a'}
                    key={externalResource.name}
                    href={externalResource.url}
                    target={'_blank'}
                    disablePadding
                  >
                    {externalResource.icon && (
                      <Icon
                        fontSize={'small'}
                        sx={{ display: 'flex', alignItems: 'center'}}
                      >
                        <img
                          src={`/icons/${externalResource.icon}`}
                          alt={externalResource.iconAlt}
                          width={16}
                          height={16}/>
                      </Icon>
                    )}
                    <ListItemText>{externalResource.name}</ListItemText>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};
