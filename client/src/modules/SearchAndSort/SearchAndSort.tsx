import SearchIcon from '@mui/icons-material/Search';
import { FormControlLabel, Grid, InputAdornment, Radio } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { CustomInput } from 'src/components';
import { CustomRadioGroup } from 'src/components/CustomRadioGroup';
import { SortParams } from 'src/utils/consts';
import { useSearchAndSort } from './SearchAndSort.hook';

export const SearchAndSort = () => {
  const { t } = useTranslation();
  const { control } = useSearchAndSort();

  return (
    <Grid component="form" container columnSpacing={4}>
      <Grid item>
        <CustomInput
          type="search"
          control={control}
          name="search"
          placeholder={t('placeholder.searchInput')}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          sx={{ width: '400px' }}
        />
      </Grid>

      <Grid item>
        <CustomRadioGroup
          row
          control={control}
          name="sort"
          label={t('label.sort')}
        >
          <FormControlLabel
            value={SortParams.ASC}
            control={<Radio />}
            label={SortParams.ASC}
          />
          <FormControlLabel
            value={SortParams.DESC}
            control={<Radio />}
            label={SortParams.DESC}
          />
        </CustomRadioGroup>
      </Grid>
    </Grid>
  );
};
