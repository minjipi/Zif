(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
  new MutationObserver((o) => {
    for (const i of o)
      if (i.type === "childList")
        for (const a of i.addedNodes)
          a.tagName === "LINK" && a.rel === "modulepreload" && r(a);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(o) {
    const i = {};
    return (
      o.integrity && (i.integrity = o.integrity),
      o.referrerPolicy && (i.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : o.crossOrigin === "anonymous"
        ? (i.credentials = "omit")
        : (i.credentials = "same-origin"),
      i
    );
  }
  function r(o) {
    if (o.ep) return;
    o.ep = !0;
    const i = n(o);
    fetch(o.href, i);
  }
})();
let d;
const H =
  typeof TextDecoder < "u"
    ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 })
    : {
        decode: () => {
          throw Error("TextDecoder not available");
        },
      };
typeof TextDecoder < "u" && H.decode();
let F = null;
function U() {
  return (
    (F === null || F.byteLength === 0) && (F = new Uint8Array(d.memory.buffer)),
    F
  );
}
function K(e, t) {
  return (e = e >>> 0), H.decode(U().subarray(e, e + t));
}
let G = 0;
function X(e, t) {
  const n = t(e.length * 1, 1) >>> 0;
  return U().set(e, n / 1), (G = e.length), n;
}
function m(e) {
  return e == null;
}
let x = null;
function Y() {
  return (
    (x === null || x.byteLength === 0) &&
      (x = new Uint32Array(d.memory.buffer)),
    x
  );
}
function $(e, t) {
  const n = t(e.length * 4, 4) >>> 0;
  return Y().set(e, n / 4), (G = e.length), n;
}
let L = null;
function R() {
  return (
    (L === null || L.byteLength === 0) && (L = new Int32Array(d.memory.buffer)),
    L
  );
}
function J(e, t) {
  return (e = e >>> 0), U().subarray(e / 1, e / 1 + t);
}
function ee(e, t, n, r, o, i, a, u, c, g) {
  try {
    const S = d.__wbindgen_add_to_stack_pointer(-16),
      Z = X(e, d.__wbindgen_malloc),
      Q = G;
    var w = m(i) ? 0 : $(i, d.__wbindgen_malloc),
      b = G;
    d.encode(
      S,
      Z,
      Q,
      t,
      n,
      r,
      m(o) ? 16777215 : o,
      w,
      b,
      m(a) ? 16777215 : a,
      !m(u),
      m(u) ? 0 : u,
      !m(c),
      m(c) ? 0 : c,
      !m(g),
      m(g) ? 0 : g
    );
    var v = R()[S / 4 + 0],
      h = R()[S / 4 + 1],
      f = J(v, h).slice();
    return d.__wbindgen_free(v, h * 1, 1), f;
  } finally {
    d.__wbindgen_add_to_stack_pointer(16);
  }
}
async function te(e, t) {
  if (typeof Response == "function" && e instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming == "function")
      try {
        return await WebAssembly.instantiateStreaming(e, t);
      } catch (r) {
        if (e.headers.get("Content-Type") != "application/wasm")
          console.warn(
            "`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",
            r
          );
        else throw r;
      }
    const n = await e.arrayBuffer();
    return await WebAssembly.instantiate(n, t);
  } else {
    const n = await WebAssembly.instantiate(e, t);
    return n instanceof WebAssembly.Instance ? { instance: n, module: e } : n;
  }
}
function ne() {
  const e = {};
  return (
    (e.wbg = {}),
    (e.wbg.__wbindgen_throw = function (t, n) {
      throw new Error(K(t, n));
    }),
    e
  );
}
function ie(e, t) {
  return (
    (d = e.exports),
    (D.__wbindgen_wasm_module = t),
    (L = null),
    (x = null),
    (F = null),
    d
  );
}
async function D(e) {
  if (d !== void 0) return d;
  typeof e > "u" &&
    (e = new URL("/assets/gifski_wasm_bg-C7lNWbiX.wasm", import.meta.url));
  const t = ne();
  (typeof e == "string" ||
    (typeof Request == "function" && e instanceof Request) ||
    (typeof URL == "function" && e instanceof URL)) &&
    (e = fetch(e));
  const { instance: n, module: r } = await te(await e, t);
  return ie(n, r);
}
let C;
async function oe(e) {
  return C || (C = D(e)), C;
}
function ae(e) {
  const t = e.reduce((o, i) => {
      const a = "data" in i ? i.data : i;
      return o + a.length;
    }, 0),
    n = new Uint8Array(t);
  let r = 0;
  return (
    e.forEach((o) => {
      const i = "data" in o ? o.data : o;
      n.set(i, r), (r += i.length);
    }),
    n
  );
}
async function re(
  e,
  {
    frames: t,
    width: n,
    height: r,
    fps: o,
    frameDurations: i,
    quality: a,
    repeat: u,
    resizeWidth: c,
    resizeHeight: g,
  }
) {
  if (t.length === 1)
    throw new Error(
      "At least 2 frames are required to encode a GIF with gifski"
    );
  if ("duration" in t[0] && i)
    throw new Error(
      "frameDurations cannot be provided when frames have durations"
    );
  if (
    ("duration" in t[0] &&
      "imageData" in t[0] &&
      ((i = t.map((f) => {
        if ("duration" in f) return f.duration;
        throw new Error("All frames must have a duration");
      })),
      (t = t.map((f) => {
        if ("imageData" in f) return f.imageData;
        throw new Error("All frames must have an imageData");
      }))),
    !o && !i)
  )
    throw new Error("Either fps or frameDurations must be provided");
  if (o && i)
    throw new Error(
      "fps and frameDurations cannot be provided at the same time"
    );
  if (i && i.length !== t.length)
    throw new Error(
      "The number of frame durations must match the number of frames"
    );
  const w = t.length,
    b = ae(t),
    v = i ? new Uint32Array(i) : void 0,
    h = await e(b, w, n, r, o, v, a, u, c, g);
  if (!h) throw new Error("Encoding error.");
  return h;
}
async function le(e) {
  return await oe(), re(ee, e);
}
let E = localStorage.getItem("zifLanguage") || "ko";
const se = {
    ko: {
      title: "ZIF",
      subtitle: "Premium Video to GIF Converter",
      tagline: "개인 정보 걱정 없는 최고 품질의 GIF 변환 프로그램",
      uploadText: "비디오 파일을 선택하세요",
      uploadSubtext:
        "클릭하거나 드래그 & 드롭으로 업로드하면 자동으로 GIF가 생성됩니다.",
      previewTitle: "프레임 미리보기",
      outputTitle: "생성된 GIF",
      downloadText: "📥 GIF 다운로드",
      advancedSettingsTitle: "고급 설정",
      intervalLabel: "프레임 간격 (초)",
      outputWidthLabel: "출력 가로 크기 (px)",
      qualityLabel: "품질 (1~100)",
      fpsLabel: "FPS (프레임/초)",
      reconvertText: "🔄 새 설정으로 GIF 재생성",
      loadingVideo: "비디오를 로딩 중...",
      extractingFrames: "프레임을 추출 중...",
      generatingGif: "GIF 생성 중...",
      completed: "GIF 생성 완료!",
      completedSubtext: "아래 고급 설정에서 다른 옵션으로 재생성할 수 있습니다",
      regeneratingGif: "GIF 재생성 중...",
      langToggleText: "한국어",
    },
    en: {
      title: "ZIF",
      subtitle: "Premium Video to GIF Converter",
      tagline:
        "Safe and innovative solution for highest quality GIF conversion",
      uploadText: "Select Video File",
      uploadSubtext:
        "Click or drag & drop to upload and automatically generate GIF.",
      previewTitle: "Frame Preview",
      outputTitle: "Generated GIF",
      downloadText: "📥 Download GIF",
      advancedSettingsTitle: "Advanced Settings",
      intervalLabel: "Frame Interval (seconds)",
      outputWidthLabel: "Output Width (px)",
      qualityLabel: "Quality (1~100)",
      fpsLabel: "FPS (frames/second)",
      reconvertText: "🔄 Regenerate GIF with New Settings",
      loadingVideo: "Loading video...",
      extractingFrames: "Extracting frames...",
      generatingGif: "Generating GIF...",
      completed: "GIF Generation Complete!",
      completedSubtext:
        "You can regenerate with different options in advanced settings below",
      regeneratingGif: "Regenerating GIF...",
      langToggleText: "English",
    },
    ja: {
      title: "ZIF",
      subtitle: "プレミアム Video to GIF コンバーター",
      tagline: "最高品質のGIF変換のための安全で革新的なソリューション",
      uploadText: "ビデオファイルを選択してください",
      uploadSubtext:
        "クリックまたはドラッグ&ドロップでアップロードすると自動的にGIFが生成されます。",
      previewTitle: "フレームプレビュー",
      outputTitle: "生成されたGIF",
      downloadText: "📥 GIFダウンロード",
      advancedSettingsTitle: "詳細設定",
      intervalLabel: "フレーム間隔（秒）",
      outputWidthLabel: "出力幅（px）",
      qualityLabel: "品質（1~100）",
      fpsLabel: "FPS（フレーム/秒）",
      reconvertText: "🔄 新しい設定でGIF再生成",
      loadingVideo: "ビデオを読み込み中...",
      extractingFrames: "フレームを抽出中...",
      generatingGif: "GIF生成中...",
      completed: "GIF生成完了！",
      completedSubtext: "下の詳細設定で他のオプションで再生成できます",
      regeneratingGif: "GIF再生成中...",
      langToggleText: "日本語",
    },
    zh: {
      title: "ZIF",
      subtitle: "高级视频转GIF转换器",
      tagline: "用于最高质量GIF转换的安全创新解决方案",
      uploadText: "选择视频文件",
      uploadSubtext: "点击或拖放上传，自动生成GIF。",
      previewTitle: "帧预览",
      outputTitle: "生成的GIF",
      downloadText: "📥 下载GIF",
      advancedSettingsTitle: "高级设置",
      intervalLabel: "帧间隔（秒）",
      outputWidthLabel: "输出宽度（px）",
      qualityLabel: "质量（1~100）",
      fpsLabel: "FPS（帧/秒）",
      reconvertText: "🔄 使用新设置重新生成GIF",
      loadingVideo: "正在加载视频...",
      extractingFrames: "正在提取帧...",
      generatingGif: "正在生成GIF...",
      completed: "GIF生成完成！",
      completedSubtext: "您可以在下面的高级设置中使用不同选项重新生成",
      regeneratingGif: "正在重新生成GIF...",
      langToggleText: "中文",
    },
  },
  W = {
    ko: {
      interval:
        "비디오에서 프레임을 추출하는 시간 간격입니다. 값이 작을수록 더 부드러운 GIF가 생성되지만 파일 크기가 커집니다.",
      outputWidth:
        "GIF의 가로 픽셀 크기입니다. 값이 클수록 화질이 좋아지지만 파일 크기가 커집니다.",
      quality:
        "GIF의 압축 품질입니다. 1이 최고 품질(최대 파일 크기), 100이 최저 품질(최소 파일 크기)입니다.",
      fps: "초당 표시되는 프레임 수입니다. 값이 클수록 빠르게 재생되고, 작을수록 느리게 재생됩니다.",
    },
    en: {
      interval:
        "Time interval for extracting frames from video. Smaller values create smoother GIFs but larger file sizes.",
      outputWidth:
        "Horizontal pixel size of the GIF. Larger values improve quality but increase file size.",
      quality:
        "GIF compression quality. 1 is highest quality (largest file size), 100 is lowest quality (smallest file size).",
      fps: "Frames displayed per second. Higher values play faster, lower values play slower.",
    },
    ja: {
      interval:
        "ビデオからフレームを抽出する時間間隔です。値が小さいほどスムーズなGIFが生成されますが、ファイルサイズが大きくなります。",
      outputWidth:
        "GIFの横ピクセルサイズです。値が大きいほど画質が良くなりますが、ファイルサイズが大きくなります。",
      quality:
        "GIFの圧縮品質です。1が最高品質（最大ファイルサイズ）、100が最低品質（最小ファイルサイズ）です。",
      fps: "1秒間に表示されるフレーム数です。値が大きいほど高速再生され、小さいほど低速再生されます。",
    },
    zh: {
      interval:
        "从视频中提取帧的时间间隔。值越小生成的GIF越流畅，但文件大小越大。",
      outputWidth: "GIF的水平像素大小。值越大画质越好，但文件大小越大。",
      quality:
        "GIF压缩质量。1为最高质量（最大文件大小），100为最低质量（最小文件大小）。",
      fps: "每秒显示的帧数。值越大播放越快，越小播放越慢。",
    },
  };
function O() {
  document.querySelectorAll(".setting-group").forEach((t, n) => {
    const o = t.querySelector("input").id;
    if (W[E] && W[E][o]) {
      const i = t.querySelector(".tooltip");
      i && i.remove();
      const a = document.createElement("div");
      (a.className = "tooltip"),
        (a.textContent = W[E][o]),
        t.appendChild(a),
        t.addEventListener("mouseenter", () => {
          a.classList.add("show");
        }),
        t.addEventListener("mouseleave", () => {
          a.classList.remove("show");
        });
    }
  });
}
function de() {
  const e = se[E];
  (document.getElementById("langToggleText").textContent = e.langToggleText),
    (document.getElementById("title").textContent = e.title),
    (document.getElementById("subtitle").textContent = e.subtitle),
    (document.getElementById("tagline").textContent = e.tagline),
    (document.getElementById("uploadText").textContent = e.uploadText),
    (document.getElementById("uploadSubtext").textContent = e.uploadSubtext),
    (document.getElementById("previewTitle").textContent = e.previewTitle),
    (document.getElementById("outputTitle").textContent = e.outputTitle),
    (document.getElementById("downloadText").textContent = e.downloadText),
    (document.getElementById("advancedSettingsTitle").textContent =
      e.advancedSettingsTitle),
    (document.getElementById("intervalLabel").textContent = e.intervalLabel),
    (document.getElementById("outputWidthLabel").textContent =
      e.outputWidthLabel),
    (document.getElementById("qualityLabel").textContent = e.qualityLabel),
    (document.getElementById("fpsLabel").textContent = e.fpsLabel),
    (document.getElementById("reconvertText").textContent = e.reconvertText),
    O();
}
de();
let M = 1,
  _ = 420,
  ce = 70,
  ue = 1,
  B = [],
  I = 420,
  T = 0,
  P = null;
const V = document.getElementById("videoInput"),
  y = document.getElementById("reconvertBtn"),
  p = document.getElementById("video"),
  s = document.getElementById("canvas"),
  k = document.getElementById("preview"),
  q = document.getElementById("output"),
  A = document.getElementById("downloadLink"),
  ge = document.getElementById("interval"),
  me = document.getElementById("quality"),
  pe = document.getElementById("fps"),
  fe = document.getElementById("outputWidth"),
  l = document.getElementById("uploadSection"),
  ve = document.getElementById("outputSection"),
  ye = document.getElementById("previewSection"),
  Ie = document.getElementById("advancedToggle"),
  we = document.getElementById("advancedContent"),
  be = document.getElementById("toggleIcon");
Ie.addEventListener("click", () => {
  we.classList.toggle("expanded"), be.classList.toggle("rotated");
});
O();
l.addEventListener("dragover", (e) => {
  e.preventDefault(), l.classList.add("dragover");
});
l.addEventListener("dragleave", (e) => {
  e.preventDefault(), l.classList.remove("dragover");
});
l.addEventListener("drop", (e) => {
  e.preventDefault(), l.classList.remove("dragover");
  const t = e.dataTransfer.files;
  t.length > 0 && t[0].type.startsWith("video/") && N(t[0]);
});
l.addEventListener("click", () => {
  V.click();
});
V.addEventListener("change", async (e) => {
  const t = e.target.files[0];
  t && N(t);
});
async function N(e) {
  (P = e),
    (l.innerHTML = `
                <div class="loading">
                    <div class="spinner"></div>
                    <span>비디오를 로딩 중...</span>
                </div>
            `),
    (p.src = URL.createObjectURL(e)),
    await p.play(),
    p.pause(),
    (I = _);
  const t = p.videoHeight / p.videoWidth;
  (T = Math.round(I * t)),
    (l.innerHTML = `
                <div class="loading">
                    <div class="spinner"></div>
                    <span>프레임을 추출 중...</span>
                </div>
            `),
    (B = await z(p, M)),
    (ye.style.display = "block"),
    (l.innerHTML = `
                <div class="loading">
                    <div class="spinner"></div>
                    <span>GIF 생성 중...</span>
                </div>
            `),
    await j(B, _, ce, ue),
    (l.innerHTML = `
                <div class="upload-icon">✅</div>
                <div class="upload-text">GIF 생성 완료!</div>
                <div class="upload-subtext">아래 고급 설정에서 다른 옵션으로 재생성할 수 있습니다</div>
            `),
    (ve.style.display = "block");
}
y.addEventListener("click", async () => {
  if (!P) return;
  (q.innerHTML = ""),
    (A.style.display = "none"),
    (l.innerHTML = `
                <div class="loading">
                    <div class="spinner"></div>
                    <span>GIF 생성 중...</span>
                </div>
            `);
  const e = y.textContent;
  (y.innerHTML = `
                <div class="loading">
                    <div class="spinner"></div>
                    <span>GIF 재생성 중...</span>
                </div>
            `),
    (y.disabled = !0);
  const t = parseFloat(ge.value) || 1,
    n = parseInt(fe.value, 10) || 420,
    r = parseInt(me.value, 10) || 1,
    o = parseInt(pe.value, 10) || 10;
  if (n !== _ || t !== M) {
    (_ = n), (M = t), (I = n);
    const i = p.videoHeight / p.videoWidth;
    (T = Math.round(I * i)),
      (l.innerHTML = `
                <div class="loading">
                    <div class="spinner"></div>
                    <span>프레임을 추출 중...</span>
                </div>
            `),
      (B = await z(p, t));
  }
  await j(B, n, r, o),
    (y.textContent = e),
    (y.disabled = !1),
    (l.innerHTML = `
                <div class="upload-icon">✅</div>
                <div class="upload-text">GIF 생성 완료!</div>
                <div class="upload-subtext">아래 고급 설정에서 다른 옵션으로 재생성할 수 있습니다</div>
            `);
});
async function j(e, t, n, r) {
  const o = s.getContext("2d"),
    i = [];
  (s.width = t), (s.height = T);
  for (const w of e) {
    const b = await Fe(w);
    o.drawImage(b, 0, 0, t, s.height);
    const v = o.getImageData(0, 0, t, s.height);
    i.push(v);
  }
  const a = await le({
      frames: i,
      width: t,
      height: s.height,
      quality: n,
      fps: r,
    }),
    u = new Blob([a], { type: "image/gif" }),
    c = URL.createObjectURL(u),
    g = document.createElement("img");
  (g.src = c),
    (q.innerHTML = ""),
    q.appendChild(g),
    (A.href = c),
    (A.style.display = "inline-block");
}
async function z(e, t) {
  let n = s.width;
  (s.width = 0), (s.width = n);
  const r = s.getContext("2d"),
    o = e.duration,
    i = [];
  (s.width = I), (s.height = T), (k.innerHTML = "");
  for (let a = 0; a < o; a += t) {
    (e.currentTime = a), await he(e), r.drawImage(e, 0, 0, I, T);
    const u = await new Promise((g) => s.toBlob(g, "image/png")),
      c = document.createElement("img");
    (c.src = URL.createObjectURL(u)), k.appendChild(c), i.push(u);
  }
  return i;
}
function he(e) {
  return new Promise((t) => {
    const n = () => {
      e.removeEventListener("seeked", n), t();
    };
    e.addEventListener("seeked", n);
  });
}
function Fe(e) {
  return new Promise((t) => {
    const n = new Image();
    (n.onload = () => t(n)), (n.src = URL.createObjectURL(e));
  });
}
document.addEventListener("dragover", (e) => e.preventDefault());
document.addEventListener("drop", (e) => e.preventDefault());
