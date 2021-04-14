/*
    Copyright (c) 2021 Alethea Katherine Flowers.
    Published under the standard MIT License.
    Full text available at: https://opensource.org/licenses/MIT
*/

export default class MIDI {
    constructor(port_name) {
        this.port_name = port_name;
    }

    async connect() {
        let access = await navigator.requestMIDIAccess({ sysex: true });

        for (const port of access.inputs.values()) {
            if (port.name === self.port_name) {
                self.input = port;
            }
        }
        for (const port of access.outputs.values()) {
            if (port.name === self.port_name) {
                self.output = port;
            }
        }

        if (self.input == undefined || self.output == undefined) {
            throw `Unable to connect to ${this.port_name}`;
        }
    }

    send(data) {
        this.output.send(data);
    }

    async receive() {
        const done = new Promise(function (resolve) {
            this.input.onmidimessage = function (msg) {
                resolve(msg);
            };
        });

        return await done;
    }

    async transact(data) {
        const done = new Promise(function (resolve) {
            this.input.onmidimessage = function (msg) {
                resolve(msg);
            };
            this.output.send(data);
        });

        return await done;
    }
}
