/*
    Copyright (c) 2021 Alethea Katherine Flowers.
    Published under the standard MIT License.
    Full text available at: https://opensource.org/licenses/MIT
*/

// deno-lint-ignore-file camelcase

import { assertEquals } from "https://deno.land/std@0.83.0/testing/asserts.ts";
import * as Teeth from "winterjs/teeth.js";

function* generate_data(length) {
    for (let i = 0; i < length; i++) {
        yield i % 256;
    }
}

Deno.test("Encode/decode", () => {
    for (let n = 1; n < 128; n++) {
        const original = Uint8Array.from(generate_data(n));
        const encoded = Teeth.encode(original);
        const decoded = Teeth.decode(encoded);

        assertEquals(encoded.length, Teeth.encoded_length(original));
        assertEquals(decoded, original);
    }
});

function* generate_random_data(length) {
    for (let i = 0; i < length; i++) {
        yield Math.floor(Math.random() * 255);
    }
}

Deno.test("Encode/decode (randomized)", () => {
    for (let n = 1; n < 128; n++) {
        const original = Uint8Array.from(generate_random_data(n));
        const encoded = Teeth.encode(original);
        const decoded = Teeth.decode(encoded);

        assertEquals(encoded.length, Teeth.encoded_length(original));
        assertEquals(decoded, original);
    }
});
