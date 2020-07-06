export const NAV_ITEMS = {
  SETTINGS: {
    name: 'Kontoeinstellungen',
    link: '/kontoeinstellungen',
  },
  COURSES: {
    name: 'Vorlesungspläne',
    link: '/kurse',
  },
  LECTURERS: {
    name: 'Dozenten',
    link: '/dozenten',
  },
  MODULECATALOG: {
    name: 'Modulkataloge',
    link: '/modulkatalog',
  },
  LOGIN: {
    name: 'Login',
    link: '/',
  },
  RESET: {
    name: 'Reset',
    link: '/reset',
  },
  PASSWORD_RESET_FORCED: {
    name: 'Passwort zurücksetzen',
    link: '/password_reset_forced',
  },
  ADMIN: {
    name: 'Adminstrationsbereich',
    link: '/admin',
    showOnlyIfAdmin: true,
  },
  DATA: {
    name: 'Datenverwaltung',
    link: '/daten',
  },
};
export const NAV_LINKS = [
  NAV_ITEMS.COURSES,
  NAV_ITEMS.LECTURERS,
  NAV_ITEMS.MODULECATALOG,
  NAV_ITEMS.DATA,
  NAV_ITEMS.ADMIN,
];
