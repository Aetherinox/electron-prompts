/*
    Project replicates a bug between Electron v31 and custom-electron-prompt v1.5.7
    Attempting to close a dialog box using the close button in the top-right will
    cause the elctron app to crash.

    application hands in system background
*/

const { app, BrowserWindow, Tray, Menu, MenuItem } = require('electron');
const electronShell = require('electron').shell;
const process = require('process');
const path = require('path');
const Store = require('./store.js');

/*
    Declare > Window
*/

let appIconLoc = app.getAppPath() + '/icon.png';
let winMain, tray;

/*
    Declare > CLI State

    bWinHidden      --hidden    app closes to tray on start
    bDevTools       --dev       dev tools added to menu
    bQuitOnClose    --quit      when pressing top-right close button, app exits instead of going to tray
*/

let bWinHidden = 0;
let bDevTools = 0;
let bQuitOnClose = 0;

/*
    Declare > Fallback

    fallback values in case a user does something unforseen to cause an index error
*/

const _Instance = 'https://google.com';

/*
    Declare > Store Values
*/

const store = new Store({
    configName: 'prefs',
    defaults: {
        instanceURL: 'https://google.com',
        bDevTools: 0,
        bQuitOnClose: 0
    }
});

/*
    Declare > Prompt

    @docs   : https://araxeus.github.io/custom-electron-prompt/
*/

const prompt = require('custom-electron-prompt');

/*
    Debug > Print args
*/

console.log(process.argv);

/*
    Menu > Main

    Entries for the top interface menu

    App | Configure
*/

const menu_Main = [
    {
        label: '&App',
        id: 'app',
        submenu: [
            {
                label: 'Quit',
                accelerator: 'CTRL+Q',
                click: function () {
                    app.isQuiting = true;
                    app.quit();
                }
            }
        ]
    },
    {
        label: '&Configure',
        id: 'configure',
        submenu: [
            {
                label: 'General',
                click: function () {
                    prompt(
                        {
                            title: 'Test Dialog Prompt',
                            label: 'Exit button will cause crash',
                            useHtmlLabel: true,
                            alwaysOnTop: true,
                            type: 'multiInput',
                            resizable: false,
                            customStylesheet: path.join(__dirname, `pages`, `css`, `prompt.css`),
                            height: 400,
                            multiInputOptions:
                                [
                                    {
                                        label: 'Enable dev tools',
                                        selectOptions: { 0: 'Disabled', 1: 'Enabled' },
					                    value: store.get('bDevTools'),
                                    },
                                    {
                                        label: 'Quit on Close',
                                        selectOptions: { 0: 'Disabled', 1: 'Enabled' },
					                    value: store.get('bQuitOnClose')
                                    }
                                ]
                        },
                        winMain
                    )
                    .then((response) => {
                        if (response !== null) {
                            if ( store.get('bDevTools') !== response[0])
                            {
                                store.set('bDevTools', response[0])
                                activeDevTools()
                            }

                            store.set('bQuitOnClose', response[1])
                        }
                    })
                    .catch((response) => {
                        console.error
                    })
                }
            }
        ]
    }];

/*
    Main Menu > Build
*/

const header_menu = Menu.buildFromTemplate(menu_Main);
Menu.setApplicationMenu(header_menu);

/*
    Main Menu > Developer Tools
    slides in top position of 'App' menu

    when user disables dev console, must re-build menu, otherwise dev tools will stick

    App | Configure | Help
*/

function activeDevTools() {
    const header_menu = Menu.buildFromTemplate(menu_Main);
    Menu.setApplicationMenu(header_menu);

    if (bDevTools == 1 || store.get('bDevTools') == 1) {
        let menuItem = header_menu.getMenuItemById('app')

        menuItem.submenu.insert(0, new MenuItem(
        {
            label: 'Toggle Dev Tools',
            accelerator: process.platform === 'darwin' ? 'ALT+CMD+I' : 'CTRL+SHIFT+I',
            click: () => {
                winMain.webContents.toggleDevTools();
            }
        },
        {
            type: 'separator'
        },
        ))
    }
}

/*
    App > Ready
*/

function ready() {

    winMain = new BrowserWindow({
        title: 'Test App',
        width: 1280,
        height: 720,
        backgroundColor: '#212121'
    });

    winMain.loadURL('https://google.com/')

    winMain.on('page-title-updated', (e) => {
        e.preventDefault();
    });

    /*
        Event > Close
    */

    winMain.on('close', function (e) {
        if (!app.isQuiting) {
            e.preventDefault();
            if (bQuitOnClose == 1 || store.get('bQuitOnClose') == 1) {
                app.isQuiting = true;
                app.quit();
            } else {
                winMain.hide();
            }
        }

        return false;
    });

    winMain.on('closed', () => {
        winMain = null;
    });

    /*
        Tray > Context Menu
    */

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show App',
            click: function () {
                winMain.show();
            }
        },
        {
            label: 'Quit',
            click: function () {
                app.isQuiting = true;
                app.quit();
            }
        }
    ]);

    /*
        Tray

        Windows         : left-click opens app, right-click opens context menu
        Linux           : left and right click have same functionality
    */

    tray = new Tray(appIconLoc);
    tray.setToolTip('test app');
    tray.setContextMenu(contextMenu);
    tray.on('click', function () {
        if (bWinHidden) {
            bWinHidden = 0;
            winMain.show();
        } else {
            bWinHidden = 1;
            winMain.hide();
        }
    });

    for (let i = 0; i < process.argv.length; i++) {
        if (process.argv[i] === '--hidden') {
            bWinHidden = 1;
            winMain.hide();
        } else if (process.argv[i] === '--dev') {
            bDevTools = 1;
            activeDevTools()
        }
    }

}

app.on('ready', ready);
