import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  Alert
} from '@mui/material';

import type { ItemsT, FoundDatasheetsT } from '~/types';

import { DbContext } from '~/contexts';
import { getIcon } from '~/utils';
import { SearchResultsPage } from './SearchResultsPage';

export type HomePageProps = {
  items: ItemsT
  foundItems?: ItemsT
  foundDatasheets?: FoundDatasheetsT
  isSearching?: boolean
  onSearchReset?: () => void
}

const TOP_MENU_HEIGHT = 64;

export const HomePage = (props: HomePageProps) => {
  const {
    items,
    foundItems,
    foundDatasheets,
    isSearching,
    onSearchReset
  } = props;

  const theme = useTheme();

  const { db } = React.useContext(DbContext);

  const searchResultsContainerRef = React.useRef<HTMLDivElement>();

  const goToSearchResultsHandler = () => {
    if (searchResultsContainerRef.current) {
      const y = searchResultsContainerRef.current.getBoundingClientRect().top
        + window.scrollY - TOP_MENU_HEIGHT;

      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      {!foundItems && !isSearching && (
        <>
          <Box sx={{
            position: 'relative',
            height: `calc(100vh - ${TOP_MENU_HEIGHT}px - 32px)`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            textAlign: 'center'
          }}>
            <Typography variant={'h1'}>
              <strong>{db.siteName}</strong>
            </Typography>

            <Typography variant={'h5'} alignSelf={'end'}>
              Устройства для создания умного дома и прочего своими руками
            </Typography>

            <IconButton
              sx={{
                bottom: theme.spacing(2),
                position: 'absolute',
                cursor: 'pointer'
              }}
              aria-label={'Перейти к просмотру товаров'}
              onClick={goToSearchResultsHandler}
            >
              {getIcon('doubleArrowDown')}
            </IconButton>
          </Box>
        </>
      )}

      <Box ref={searchResultsContainerRef}>
        <SearchResultsPage
          isSearching={isSearching}
          items={items}
          foundItems={foundItems}
          foundDatasheets={foundDatasheets}
          onSearchReset={onSearchReset}
        />
      </Box>
    </>
  );
};
