export const NAVBAR_ITEMS = {
  DATA: {
    name: 'Datenverwaltung',
    link: '/daten',
  },
  ADMIN: {
    name: 'Adminstrationsbereich',
    link: '/admin',
    showOnlyIfAdmin: true,
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
};
export const NAV_LINKS = [
  NAVBAR_ITEMS.COURSES,
  NAVBAR_ITEMS.LECTURERS,
  NAVBAR_ITEMS.MODULECATALOG,
  NAVBAR_ITEMS.DATA,
  NAVBAR_ITEMS.ADMIN,
];
