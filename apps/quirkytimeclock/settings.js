(function(back) {
  const SETTINGS_FILE = "quirkytimeclock.json";

  // Initialize with default settings...
  let settings = {'theme':'System', 'showdate':true, 'clkinfoborder':false, buzzOnQuirkyTime: true, isEmulator: false}
  // ...and overwrite them with any saved values
  // This way saved values are preserved if a new version adds more settings
  const storage = require('Storage');
  settings = Object.assign(settings, storage.readJSON(SETTINGS_FILE, 1)||{});

  function save() {
    storage.write(SETTINGS_FILE, settings);
  }

  var theme_options = ['System', 'Light', 'Dark'];

  E.showMenu({
    '': { 'title': 'Quirky Time Clock' },
    /*LANG*/'< Back': back,
    /*LANG*/'Theme': {
      value: 0 | theme_options.indexOf(settings.theme),
      min: 0, max: theme_options.length - 1,
      format: v => theme_options[v],
      onchange: v => {
        settings.theme = theme_options[v];
        save();
      }
    },
    /*LANG*/'Show Date': {
      value: !!settings.showdate,
      onchange: v => {
        settings.showdate = v;
        save();
      }
    },
    /*LANG*/'ClockInfo border': {
      value: !!settings.clkinfoborder,
      onchange: v => {
        settings.clkinfoborder = v;
        save();
      }
    },
    /*LANG*/'Buzz on quirky time': {
      value: !!settings.buzzOnQuirkyTime,
      onchange: v => {
        settings.buzzOnQuirkyTime = v;
        save();
      }
    }
  });
})