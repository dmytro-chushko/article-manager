import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import PublishIcon from '@mui/icons-material/Publish';
import { Box, ClickAwayListener, Fab, FormControl, Grid } from '@mui/material';

import noImage from 'src/assets/no_image.webp';
import { CustomInput } from 'src/components';
import { useAddArticle } from './AddArticle.hook';

export const AddArticle = () => {
  const {
    isAddFormShown,
    control,
    handleSubmitForm,
    handleClickAddButton,
    handleClickAway,
  } = useAddArticle();

  return (
    <Grid container direction="column" spacing={2} mb={2}>
      <Grid item container spacing={2}>
        <Grid item>
          <Fab color="primary" onClick={handleClickAddButton}>
            {isAddFormShown ? <CloseIcon /> : <AddIcon />}
          </Fab>
        </Grid>
        {isAddFormShown && (
          <Grid item>
            <Fab color="primary" type="submit" onClick={handleSubmitForm}>
              <PublishIcon />
            </Fab>
          </Grid>
        )}
      </Grid>
      {isAddFormShown && (
        <Grid item>
          <ClickAwayListener onClickAway={handleClickAway}>
            <Grid
              item
              component="form"
              container
              direction="column"
              spacing={2}
              id="add-form"
            >
              <Grid item>
                <FormControl fullWidth>
                  <CustomInput fullWidth control={control} name="title" />
                </FormControl>
              </Grid>
              <Grid container spacing={2} item flexWrap="nowrap">
                <Grid item xs="auto">
                  <Box
                    component="img"
                    width={270}
                    alt="no image"
                    src={noImage}
                  />
                </Grid>
                <Grid item flexGrow={1}>
                  <FormControl fullWidth>
                    <CustomInput
                      multiline
                      rows={10}
                      control={control}
                      name="description"
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </ClickAwayListener>
        </Grid>
      )}
    </Grid>
  );
};
