import {withStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";

export const ColorButton = withStyles((theme) => ({
    root: {
        color: "#111",
        backgroundColor: 'rgba(127, 142, 212, 0.73)',
        margin:"20px 20px 0 0",
        '&:hover': {
            backgroundColor: 'rgba(168, 181, 238, 0.73)',
        },
    },
}))(Button);