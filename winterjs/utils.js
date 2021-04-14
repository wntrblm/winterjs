/*
    Copyright (c) 2021 Alethea Katherine Flowers.
    Published under the standard MIT License.
    Full text available at: https://opensource.org/licenses/MIT
*/

export function Uint8Array_to_hex(buf) {
    return Array.prototype.map
        .call(buf, (x) => ("00" + x.toString(16)).slice(-2))
        .join("");
}
