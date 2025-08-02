const L = () => (async e => {
    try {
        return typeof MessageChannel < "u" && new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),
            WebAssembly.validate(e)
    } catch {
        return !1
    }
}
)(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 4, 1, 3, 1, 1, 10, 11, 1, 9, 0, 65, 0, 254, 16, 2, 0, 26, 11]));
let o;
const T = typeof TextDecoder < "u" ? new TextDecoder("utf-8", {
    ignoreBOM: !0,
    fatal: !0
}) : {
    decode: () => {
        throw Error("TextDecoder not available")
    }
};
typeof TextDecoder < "u" && T.decode();
let y = null;
function E() {
    return (y === null || y.byteLength === 0) && (y = new Uint8Array(o.memory.buffer)),
        y
}
function R(e, n) {
    return e = e >>> 0,
        T.decode(E().subarray(e, e + n))
}
let _ = 0;
function S(e, n) {
    const t = n(e.length * 1, 1) >>> 0;
    return E().set(e, t / 1),
        _ = e.length,
        t
}
function s(e) {
    return e == null
}
let g = null;
function C() {
    return (g === null || g.byteLength === 0) && (g = new Uint32Array(o.memory.buffer)),
        g
}
function x(e, n) {
    const t = n(e.length * 4, 4) >>> 0;
    return C().set(e, t / 4),
        _ = e.length,
        t
}
let b = null;
function W() {
    return (b === null || b.byteLength === 0) && (b = new Int32Array(o.memory.buffer)),
        b
}
function B(e, n) {
    return e = e >>> 0,
        E().subarray(e / 1, e / 1 + n)
}
function D(e, n, t, a, i, r, f, l, u, d) {
    try {
        const v = o.__wbindgen_add_to_stack_pointer(-16)
            , U = S(e, o.__wbindgen_malloc)
            , k = _;
        var p = s(r) ? 0 : x(r, o.__wbindgen_malloc)
            , A = _;
        o.encode(v, U, k, n, t, a, s(i) ? 16777215 : i, p, A, s(f) ? 16777215 : f, !s(l), s(l) ? 0 : l, !s(u), s(u) ? 0 : u, !s(d), s(d) ? 0 : d);
        var m = W()[v / 4 + 0]
            , w = W()[v / 4 + 1]
            , c = B(m, w).slice();
        return o.__wbindgen_free(m, w * 1, 1),
            c
    } finally {
        o.__wbindgen_add_to_stack_pointer(16)
    }
}
async function I(e, n) {
    if (typeof Response == "function" && e instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming == "function")
            try {
                return await WebAssembly.instantiateStreaming(e, n)
            } catch (a) {
                if (e.headers.get("Content-Type") != "application/wasm")
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", a);
                else
                    throw a
            }
        const t = await e.arrayBuffer();
        return await WebAssembly.instantiate(t, n)
    } else {
        const t = await WebAssembly.instantiate(e, n);
        return t instanceof WebAssembly.Instance ? {
            instance: t,
            module: e
        } : t
    }
}
function O() {
    const e = {};
    return e.wbg = {},
        e.wbg.__wbindgen_throw = function (n, t) {
            throw new Error(R(n, t))
        }
        ,
        e
}
function G(e, n) {
    return o = e.exports,
        M.__wbindgen_wasm_module = n,
        b = null,
        g = null,
        y = null,
        o
}
async function M(e) {
    if (o !== void 0)
        return o;
    typeof e > "u" && (e = new URL("/assets/gifski_wasm_bg-C7lNWbiX.wasm", import.meta.url));
    const n = O();
    (typeof e == "string" || typeof Request == "function" && e instanceof Request || typeof URL == "function" && e instanceof URL) && (e = fetch(e));
    const { instance: t, module: a } = await I(await e, n);
    return G(t, a)
}
var N = Object.freeze({
    __proto__: null,
    default: M,
    encode: D
});
function q(e) {
    const n = e.reduce((i, r) => {
        const f = "data" in r ? r.data : r;
        return i + f.length
    }
        , 0)
        , t = new Uint8Array(n);
    let a = 0;
    return e.forEach(i => {
        const r = "data" in i ? i.data : i;
        t.set(r, a),
            a += r.length
    }
    ),
        t
}
async function j(e, { frames: n, width: t, height: a, fps: i, frameDurations: r, quality: f, repeat: l, resizeWidth: u, resizeHeight: d }) {
    if (n.length === 1)
        throw new Error("At least 2 frames are required to encode a GIF with gifski");
    if ("duration" in n[0] && r)
        throw new Error("frameDurations cannot be provided when frames have durations");
    if ("duration" in n[0] && "imageData" in n[0] && (r = n.map(c => {
        if ("duration" in c)
            return c.duration;
        throw new Error("All frames must have a duration")
    }
    ),
        n = n.map(c => {
            if ("imageData" in c)
                return c.imageData;
            throw new Error("All frames must have an imageData")
        }
        )),
        !i && !r)
        throw new Error("Either fps or frameDurations must be provided");
    if (i && r)
        throw new Error("fps and frameDurations cannot be provided at the same time");
    if (r && r.length !== n.length)
        throw new Error("The number of frame durations must match the number of frames");
    const p = n.length
        , A = q(n)
        , m = r ? new Uint32Array(r) : void 0
        , w = await e(A, p, t, a, i, m, f, l, u, d);
    if (!w)
        throw new Error("Encoding error.");
    return w
}
async function H(e) {
    const { default: n, initThreadPool: t, encode: a } = await import("./gifski_wasm-B8nIu-el.js");
    return await n(e),
        await t(globalThis.navigator.hardwareConcurrency),
    {
        encode: a
    }
}
async function P(e) {
    const { default: n, encode: t } = await Promise.resolve().then(function () {
        return N
    });
    return await n(e),
    {
        encode: t
    }
}
let h;
async function V(e) {
    var n;
    if (!h) {
        const t = ((n = globalThis.navigator) == null ? void 0 : n.hardwareConcurrency) > 1;
        typeof self < "u" && typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && t && await L() ? h = H(e) : h = P(e)
    }
    return h
}
async function X(e) {
    const { encode: n } = await V();
    return j(n, e)
}
let F = !1;
addEventListener("message", async function (e) {
    if (F)
        return;
    F = !0,
        console.log("starting encoding");
    let n = performance.now();
    const t = await X(e.data);
    console.log("finished encoding", performance.now() - n, "ms"),
        postMessage(t)
});
