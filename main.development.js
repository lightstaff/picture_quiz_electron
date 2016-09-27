/**
 * Created by Lightstaff on 2016/09/22.
 */

import 'babel-polyfill';

import electron, { app, BrowserWindow, Menu } from 'electron';

let menu;
let template;
let mainWindow = null;

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')();
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

const installExtensions = async() => {
  if (process.env.NODE_ENV === 'development') {
    const installer = require('electron-devtools-installer');
    const extensions = [
      'REACT_DEVELOPER_TOOLS',
      'REDUX_DEVTOOLS',
    ];

    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    for (const name of extensions) {
      await installer.default(installer[name], forceDownload);
    }
  }
};

app.on('ready', async() => {
  await installExtensions();

  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    show: false,
    width,
    height,
    frame: false,
  });

  mainWindow.loadURL(`file://${__dirname}/app/app.html`);

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools();
    mainWindow.webContents.on('context-menu', (e, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([{
        label: 'Inspect element',
        click() {
          mainWindow.inspectElement(x, y);
        },
      }]).popup(mainWindow);
    });
  }

  template = [
    {
      label: '&File',
      submenu: [
        {
          label: '&終了',
          accelerator: 'Ctrl+W',
          click() {
            mainWindow.close();
          },
        },
      ],
    },
    {
      label: '&表示',
      submenu: [
        {
          label: '&Reload',
          accelerator: 'Ctrl+R',
          click() {
            mainWindow.webContents.reload();
          },
        },
        {
          label: '&全画面切替',
          accelerator: 'F11',
          click() {
            mainWindow.setFullScreen(!mainWindow.isFullScreen());
          },
        },
        {
          label: 'Toggle &Developer Tools',
          accelerator: 'Alt+Ctrl+I',
          click() {
            mainWindow.toggleDevTools();
          },
        },
      ],
    },
  ];
  menu = Menu.buildFromTemplate(template);
  mainWindow.setMenu(process.env.NODE_ENV === 'production' ? menu : null);
  mainWindow.setFullScreen(true);
});
