async function S(e, n, t) {
    if (t.numThreads() === 0)
        throw new Error("num_threads must be > 0.");
    const o = {
        module: e,
        memory: n,
        receiver: t.receiver()
    };
    await Promise.all(Array.from({
        length: t.numThreads()
    }, async () => {
        const i = new Worker(new URL("/assets/workerHelpers.worker-qPwsmBm4.js", import.meta.url), {
            type: "module"
        });
        return i.postMessage(o),
            await new Promise(g => i.addEventListener("message", g, {
                once: !0
            })),
            i
    }
    )),
        t.build()
}
let r;
const _ = new Array(128).fill(void 0);
_.push(void 0, null, !0, !1);
function c(e) {
    return _[e]
}
let w = _.length;
function D(e) {
    e < 132 || (_[e] = w,
        w = e)
}
function d(e) {
    const n = c(e);
    return D(e),
        n
}
const j = typeof TextDecoder < "u" ? new TextDecoder("utf-8", {
    ignoreBOM: !0,
    fatal: !0
}) : {
    decode: () => {
        throw Error("TextDecoder not available")
    }
};
typeof TextDecoder < "u" && j.decode();
let f = null;
function T() {
    return (f === null || f.buffer !== r.memory.buffer) && (f = new Uint8Array(r.memory.buffer)),
        f
}
function M(e, n) {
    return e = e >>> 0,
        j.decode(T().slice(e, e + n))
}
function s(e) {
    w === _.length && _.push(_.length + 1);
    const n = w;
    return w = _[n],
        _[n] = e,
        n
}
let m = 0;
function B(e, n) {
    const t = n(e.length * 1, 1) >>> 0;
    return T().set(e, t / 1),
        m = e.length,
        t
}
function a(e) {
    return e == null
}
let l = null;
function q() {
    return (l === null || l.buffer !== r.memory.buffer) && (l = new Uint32Array(r.memory.buffer)),
        l
}
function C(e, n) {
    const t = n(e.length * 4, 4) >>> 0;
    return q().set(e, t / 4),
        m = e.length,
        t
}
let b = null;
function R() {
    return (b === null || b.buffer !== r.memory.buffer) && (b = new Int32Array(r.memory.buffer)),
        b
}
function H(e, n) {
    return e = e >>> 0,
        T().subarray(e / 1, e / 1 + n)
}
function G(e, n, t, o, i, g, A, y, h, p) {
    try {
        const F = r.__wbindgen_add_to_stack_pointer(-16)
            , I = B(e, r.__wbindgen_malloc)
            , P = m;
        var E = a(g) ? 0 : C(g, r.__wbindgen_malloc)
            , O = m;
        r.encode(F, I, P, n, t, o, a(i) ? 16777215 : i, E, O, a(A) ? 16777215 : A, !a(y), a(y) ? 0 : y, !a(h), a(h) ? 0 : h, !a(p), a(p) ? 0 : p);
        var k = R()[F / 4 + 0]
            , v = R()[F / 4 + 1]
            , L = H(k, v).slice();
        return r.__wbindgen_free(k, v * 1, 1),
            L
    } finally {
        r.__wbindgen_add_to_stack_pointer(16)
    }
}
function u(e, n) {
    try {
        return e.apply(this, n)
    } catch (t) {
        r.__wbindgen_exn_store(s(t))
    }
}
function K(e) {
    const n = r.initThreadPool(e);
    return d(n)
}
const U = typeof FinalizationRegistry > "u" ? {
    register: () => { }
    ,
    unregister: () => { }
} : new FinalizationRegistry(e => r.__wbg_wbg_rayon_poolbuilder_free(e >>> 0));
class W {
    static __wrap(n) {
        n = n >>> 0;
        const t = Object.create(W.prototype);
        return t.__wbg_ptr = n,
            U.register(t, t.__wbg_ptr, t),
            t
    }
    __destroy_into_raw() {
        const n = this.__wbg_ptr;
        return this.__wbg_ptr = 0,
            U.unregister(this),
            n
    }
    free() {
        const n = this.__destroy_into_raw();
        r.__wbg_wbg_rayon_poolbuilder_free(n)
    }
    numThreads() {
        return r.wbg_rayon_poolbuilder_numThreads(this.__wbg_ptr) >>> 0
    }
    receiver() {
        return r.wbg_rayon_poolbuilder_receiver(this.__wbg_ptr) >>> 0
    }
    build() {
        r.wbg_rayon_poolbuilder_build(this.__wbg_ptr)
    }
}
async function N(e, n) {
    if (typeof Response == "function" && e instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming == "function")
            try {
                return await WebAssembly.instantiateStreaming(e, n)
            } catch (o) {
                if (e.headers.get("Content-Type") != "application/wasm")
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", o);
                else
                    throw o
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
function J() {
    const e = {};
    return e.wbg = {},
        e.wbg.__wbg_self_ce0dbfc45cf2f5be = function () {
            return u(function () {
                const n = self.self;
                return s(n)
            }, arguments)
        }
        ,
        e.wbg.__wbg_window_c6fb939a7f436783 = function () {
            return u(function () {
                const n = window.window;
                return s(n)
            }, arguments)
        }
        ,
        e.wbg.__wbindgen_object_drop_ref = function (n) {
            d(n)
        }
        ,
        e.wbg.__wbg_globalThis_d1e6af4856ba331b = function () {
            return u(function () {
                const n = globalThis.globalThis;
                return s(n)
            }, arguments)
        }
        ,
        e.wbg.__wbg_global_207b558942527489 = function () {
            return u(function () {
                const n = global.global;
                return s(n)
            }, arguments)
        }
        ,
        e.wbg.__wbindgen_is_undefined = function (n) {
            return c(n) === void 0
        }
        ,
        e.wbg.__wbg_newnoargs_e258087cd0daa0ea = function (n, t) {
            const o = new Function(M(n, t));
            return s(o)
        }
        ,
        e.wbg.__wbg_call_27c0f87801dedf93 = function () {
            return u(function (n, t) {
                const o = c(n).call(c(t));
                return s(o)
            }, arguments)
        }
        ,
        e.wbg.__wbindgen_throw = function (n, t) {
            throw new Error(M(n, t))
        }
        ,
        e.wbg.__wbindgen_module = function () {
            const n = x.__wbindgen_wasm_module;
            return s(n)
        }
        ,
        e.wbg.__wbindgen_memory = function () {
            const n = r.memory;
            return s(n)
        }
        ,
        e.wbg.__wbg_startWorkers_2ee336a9694dda13 = function (n, t, o) {
            const i = S(d(n), d(t), W.__wrap(o));
            return s(i)
        }
        ,
        e.wbg.__wbindgen_object_clone_ref = function (n) {
            const t = c(n);
            return s(t)
        }
        ,
        e.wbg.__wbg_instanceof_Window_f401953a2cf86220 = function (n) {
            let t;
            try {
                t = c(n) instanceof Window
            } catch {
                t = !1
            }
            return t
        }
        ,
        e
}
function V(e, n) {
    e.wbg.memory = n || new WebAssembly.Memory({
        initial: 18,
        maximum: 16384,
        shared: !0
    })
}
function z(e, n) {
    return r = e.exports,
        x.__wbindgen_wasm_module = n,
        b = null,
        l = null,
        f = null,
        r.__wbindgen_start(),
        r
}
async function x(e, n) {
    if (r !== void 0)
        return r;
    typeof e > "u" && (e = new URL("/assets/gifski_wasm_bg-4foSJFoi.wasm", import.meta.url));
    const t = J();
    (typeof e == "string" || typeof Request == "function" && e instanceof Request || typeof URL == "function" && e instanceof URL) && (e = fetch(e)),
        V(t, n);
    const { instance: o, module: i } = await N(await e, t);
    return z(o, i)
}
export { x as default, G as encode, K as initThreadPool, W as wbg_rayon_PoolBuilder };
