const loginStyles = (theme) => ({
  html: {
    height: '100%',
  },
  body: {
    height: '100%',
  },
  backgroundImage: {
    height: '100vh',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  main: {
    paddingTop: theme.spacing.unit * 20,
    height: '100%',
    overflow: 'unset',
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    backgroundColor: '#fafafaed',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  loginHeadingContainer: {
    display: 'flex',
    height: '50px',
    alignItems: 'center',
    marginBottom: '35px',
  },

  loginHeadingLogo: {
    display: 'block',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: '1rem',
    marginBottom: '2rem',
    width: '10rem',
    height: 'auto',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  dialogActions: {
    paddingRight: "16px",
    paddingBottom: "10px"
  }
});

export default loginStyles;
