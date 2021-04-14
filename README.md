# WinterJS

*WinterJS* is a set of JavaScript libraries used by [Winterbloom](https://winterbloom.com) projects.

## What's in here?

**This is (probably) an incomplete list!**

* [`winterjs/forms.js`](winterjs/forms.js) provides rudimentary databinding between form controls and a data object.
* [`winterjs/midi.js`](winterjs/midi.js) provides some helpers for using the Web MIDI API.
* [`winterjs/oscilloscope.js`](winterjs/oscilloscope.js) provides a neat audio player widget, see [examples/oscilloscope.html](examples/oscilloscope.html).
* [`winterjs/teeth.js`](winterjs/teeth.js) provides *Teeth* encoding which is used to encode binary data across MIDI SysEx messages. There are matching implementation in [Python](https://github.com/wntrblm/wintertools/blob/main/wintertools/teeth.py) and [C](https://github.com/wntrblm/libwinter/blob/main/src/teeth.c).
* [`winterjs/utils.js`](winterjs/utils.js) provides some common utilities and helpers.

## Contributing

While I don't really expect anyone outside of Winterbloom to use these, by all means, contributions are welcome. File an issue or reach out to us before you write code, so we can make sure it's something that'll be beneficial for all of us. :)

## Running tests

Even though this is a JavaScript project we still use [Nox](https://nox.thea.codes) since Winterbloom favors Python tooling. Just run `nox` to run the tests and lints.

Linting requires `eslint` and tests require `deno`.

## License

WinterJS is published under the [MIT License](LICENSE).
