//Styles / MUID
import createMuiTheme from "material-ui/styles/createMuiTheme";
import createPalette from "material-ui/styles/createPalette";
import { green, indigo } from "material-ui/colors";

//Create MUID themes
const muiTheme = createMuiTheme({
  palette: createPalette({
    fontFamily: "Roboto, sans-serif",
    primary: {
      main: indigo["200"]
    },
    secondary: {
      main: green["200"]
    }
  })
});

export default muiTheme;
