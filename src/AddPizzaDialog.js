import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class AddPizzaDialog extends React.Component {

    state = {
        name: "",
        size: 0,
        price: 5,
    }

    render() {
        const { classes } = this.props;
        const { name, size } = this.state;

        let items = [];
        for (let i = 10; i < 60; i++) {
            items.push(<MenuItem key={1} value={i}>{i} cm</MenuItem>);
        }



        return (
            <div>

                <Dialog
                    fullScreen
                    open={this.props.open}
                    onClose={this.props.handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={() => {
                                this.props.handleClose();
                                this.setState({
                                    name: "",
                                    size: 0,
                                    price: 5,
                                });
                            }} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.flex}>
                                Add a Pizza Format
              </Typography>
                            <Button disabled={size === 0 || name === ""} color="inherit" onClick={() => {
                                this.props.addPizza(this.state);
                                this.setState({
                                    name: "",
                                    size: 0,
                                    price: 5,
                                });
                            }}>
                                save
              </Button>
                        </Toolbar>
                    </AppBar>
                    <List>
                        <ListItem >
                            <TextField
                                id="standard-name"
                                label="Big / Medium / Small"
                                value={this.state.name}
                                onChange={(e) => {
                                    this.setState({
                                        ...this.state,
                                        name: e.target.value ? e.target.value : ""
                                    });
                                }}
                                margin="normal"
                            />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <InputLabel>Size</InputLabel>
                            <Select
                                value={this.state.size}
                                onChange={(e) => {
                                    this.setState({
                                        ...this.state,
                                        size: e.target.value ? e.target.value : ""
                                    });
                                }}

                            >
                                <MenuItem value={0}>
                                    <em>None</em>
                                </MenuItem>
                                {items}

                            </Select>
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        );
    }
}

AddPizzaDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddPizzaDialog);