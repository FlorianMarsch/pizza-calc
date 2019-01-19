import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Slider from '@material-ui/lab/Slider';
import AddPizzaDialog from './AddPizzaDialog';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  speedDial: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,

  },
});

const defaultState = [];

const getPersistedState = () => {
  const persisted = localStorage.getItem("pizza-calc.pizzas");
  if (persisted) {
    return JSON.parse(persisted);
  } else {
    return defaultState;
  }
}

const setPersistedState = (pizzas) => {
  localStorage.setItem("pizza-calc.pizzas", JSON.stringify(pizzas));
}

class App extends Component {

  state = {
    dialogOpen: false,
    pizzas: getPersistedState(),
  }

  handleDialogOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };
  handleAddPizza = (pizza) => {
    this.state.pizzas.push({
      ...pizza, cm2price: this.getSquareMeterPrice({ ...pizza })
    });
    setPersistedState(this.state.pizzas);

    this.setState({ dialogOpen: false, pizzas: this.state.pizzas });
  };

  getSquareMeterPrice = ({ price, size }) => {
    const radius = size / 200;
    const area = (radius * radius * 3.1415);
    return price * (1 / area);
  }

  render() {
    const { classes } = this.props;
    const { dialogOpen, pizzas } = this.state;
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" >
              πizza calc
          </Typography>
          </Toolbar>
        </AppBar>
        <AddPizzaDialog open={dialogOpen} handleClose={this.handleDialogClose} addPizza={this.handleAddPizza} />
        <List >
          {pizzas.map((pizza, index) => {
            return (
              <ListItem>
                <Grid container spacing={16}>
                  <Grid item xs={3}>
                    <ListItemText
                      primary={pizza.name}
                      secondary={`${pizza.size} cm`}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <div>
                      <Typography id="label">Price : {pizza.price.toFixed(2)}€</Typography>
                      <Slider
                        min={0}
                        max={15}
                        step={0.1}
                        value={pizza.price}
                        aria-labelledby="label"
                        onChange={(e, value) => {
                          let changed = pizzas;
                          changed[index] = { ...pizza, price: value, cm2price: this.getSquareMeterPrice({ ...pizza, price: value }) };
                          this.setState({
                            ...this.state,
                            pizzas: changed
                          });
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={1}>
                  </Grid>
                  <Grid item xs={3}>
                    <ListItemText
                      primary={`${pizza.cm2price.toFixed(2)} €`}
                      secondary={'per m2'}
                    />
                  </Grid>
                </Grid>
              </ListItem>
            );
          })}
        </List>


        <Zoom
          in={true}
          unmountOnExit
        >
          <Fab className={classes.speedDial} onClick={this.handleDialogOpen}>
            <AddIcon></AddIcon>
          </Fab>
        </Zoom>
      </div>
    );
  }
}

export default withStyles(styles)(App);
