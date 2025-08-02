async function h(e, n, t) {
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
        const a = new Worker(self.location.href, {
            type: "module"
        });
        return a.postMessage(o),
            await new Promise(y => a.addEventListener("message", y, {
                once: !0
            })),
            a
    }
    )),
        t.build()
}
let r;
const s = new Array(128).fill(void 0);
s.push(void 0, null, !0, !1);
function _(e) {
    return s[e]
}
let f = s.length;
function p(e) {
    e < 132 || (s[e] = f,
        f = e)
}
function w(e) {
    const n = _(e);
    return p(e),
        n
}
const m = typeof TextDecoder < "u" ? new TextDecoder("utf-8", {
    ignoreBOM: !0,
    fatal: !0
}) : {
    decode: () => {
        throw Error("TextDecoder not available")
    }
};
typeof TextDecoder < "u" && m.decode();
let u = null;
function W() {
    return (u === null || u.buffer !== r.memory.buffer) && (u = new Uint8Array(r.memory.buffer)),
        u
}
function l(e, n) {
    return e = e >>> 0,
        m.decode(W().slice(e, e + n))
}
function i(e) {
    f === s.length && s.push(s.length + 1);
    const n = f;
    return f = s[n],
        s[n] = e,
        n
}
function c(e, n) {
    try {
        return e.apply(this, n)
    } catch (t) {
        r.__wbindgen_exn_store(i(t))
    }
}
function T(e) {
    r.wbg_rayon_start_worker(e)
}
const d = typeof FinalizationRegistry > "u" ? {
    register: () => { }
    ,
    unregister: () => { }
} : new FinalizationRegistry(e => r.__wbg_wbg_rayon_poolbuilder_free(e >>> 0));
class b {
    static __wrap(n) {
        n = n >>> 0;
        const t = Object.create(b.prototype);
        return t.__wbg_ptr = n,
            d.register(t, t.__wbg_ptr, t),
            t
    }
    __destroy_into_raw() {
        const n = this.__wbg_ptr;
        return this.__wbg_ptr = 0,
            d.unregister(this),
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
async function A(e, n) {
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
function k() {
    const e = {};
    return e.wbg = {},
        e.wbg.__wbg_self_ce0dbfc45cf2f5be = function () {
            return c(function () {
                const n = self.self;
                return i(n)
            }, arguments)
        }
        ,
        e.wbg.__wbg_window_c6fb939a7f436783 = function () {
            return c(function () {
                const n = window.window;
                return i(n)
            }, arguments)
        }
        ,
        e.wbg.__wbindgen_object_drop_ref = function (n) {
            w(n)
        }
        ,
        e.wbg.__wbg_globalThis_d1e6af4856ba331b = function () {
            return c(function () {
                const n = globalThis.globalThis;
                return i(n)
            }, arguments)
        }
        ,
        e.wbg.__wbg_global_207b558942527489 = function () {
            return c(function () {
                const n = global.global;
                return i(n)
            }, arguments)
        }
        ,
        e.wbg.__wbindgen_is_undefined = function (n) {
            return _(n) === void 0
        }
        ,
        e.wbg.__wbg_newnoargs_e258087cd0daa0ea = function (n, t) {
            const o = new Function(l(n, t));
            return i(o)
        }
        ,
        e.wbg.__wbg_call_27c0f87801dedf93 = function () {
            return c(function (n, t) {
                const o = _(n).call(_(t));
                return i(o)
            }, arguments)
        }
        ,
        e.wbg.__wbindgen_throw = function (n, t) {
            throw new Error(l(n, t))
        }
        ,
        e.wbg.__wbindgen_module = function () {
            const n = g.__wbindgen_wasm_module;
            return i(n)
        }
        ,
        e.wbg.__wbindgen_memory = function () {
            const n = r.memory;
            return i(n)
        }
        ,
        e.wbg.__wbg_startWorkers_2ee336a9694dda13 = function (n, t, o) {
            const a = h(w(n), w(t), b.__wrap(o));
            return i(a)
        }
        ,
        e.wbg.__wbindgen_object_clone_ref = function (n) {
            const t = _(n);
            return i(t)
        }
        ,
        e.wbg.__wbg_instanceof_Window_f401953a2cf86220 = function (n) {
            let t;
            try {
                t = _(n) instanceof Window
            } catch {
                t = !1
            }
            return t
        }
        ,
        e
}
function R(e, n) {
    e.wbg.memory = n || new WebAssembly.Memory({
        initial: 18,
        maximum: 16384,
        shared: !0
    })
}
function j(e, n) {
    return r = e.exports,
        g.__wbindgen_wasm_module = n,
        u = null,
        r.__wbindgen_start(),
        r
}
async function g(e, n) {
    if (r !== void 0)
        return r;
    typeof e > "u" && (e = new URL("/assets/gifski_wasm_bg-4foSJFoi.wasm", import.meta.url));
    const t = k();
    (typeof e == "string" || typeof Request == "function" && e instanceof Request || typeof URL == "function" && e instanceof URL) && (e = fetch(e)),
        R(t, n);
    const { instance: o, module: a } = await A(await e, t);
    return j(o, a)
}
onmessage = async ({ data: { module: e, memory: n, receiver: t } }) => {
    await g(e, n),
        postMessage(!0),
        T(t)
}
    ;
