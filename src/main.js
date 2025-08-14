import "./style.css";
import encode from "gifski-wasm";

// 다국어 지원
let currentLanguage = localStorage.getItem("zifLanguage") || "ko";

const translations = {
  ko: {
    title: "ZIF",
    subtitle: "Premium Video to GIF Converter",
    tagline: "개인 정보 걱정 없는 최고 품질의 GIF 변환 프로그램",
    uploadText: "비디오 파일을 선택하세요",
    uploadSubtext:
      "클릭하거나 드래그 & 드롭으로 업로드하면 자동으로 GIF가 생성됩니다.",
    previewTitle: "프레임 미리보기",
    outputTitle: "생성된 GIF",
    downloadText: "GIF 다운로드",
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
      "The best quality GIF converter without worrying about your privacy.",
    uploadText: "Select Video File",
    uploadSubtext:
      "Click or drag & drop to upload and automatically generate GIF.",
    previewTitle: "Frame Preview",
    outputTitle: "Generated GIF",
    downloadText: "Download GIF",
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
};

function toggleLanguage() {
  const languages = ["ko", "en", "ja", "zh"];
  const currentIndex = languages.indexOf(currentLanguage);
  currentLanguage = languages[(currentIndex + 1) % languages.length];
  localStorage.setItem("zifLanguage", currentLanguage);
  updateAllTexts();
}

// 툴팁 기능
const tooltips = {
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

function setupTooltips() {
  const settingGroups = document.querySelectorAll(".setting-group");

  settingGroups.forEach((group, index) => {
    const input = group.querySelector("input");
    const inputId = input.id;

    if (tooltips[currentLanguage] && tooltips[currentLanguage][inputId]) {
      // 기존 툴팁 제거
      const existingTooltip = group.querySelector(".tooltip");
      if (existingTooltip) {
        existingTooltip.remove();
      }

      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      tooltip.textContent = tooltips[currentLanguage][inputId];
      group.appendChild(tooltip);

      group.addEventListener("mouseenter", () => {
        tooltip.classList.add("show");
      });

      group.addEventListener("mouseleave", () => {
        tooltip.classList.remove("show");
      });
    }
  });
}

function updateAllTexts() {
  const t = translations[currentLanguage];

  document.getElementById("langToggleText").textContent = t.langToggleText;
  document.getElementById("title").textContent = t.title;
  document.getElementById("subtitle").textContent = t.subtitle;
  document.getElementById("tagline").textContent = t.tagline;
  document.getElementById("uploadText").textContent = t.uploadText;
  document.getElementById("uploadSubtext").textContent = t.uploadSubtext;
  document.getElementById("previewTitle").textContent = t.previewTitle;
  document.getElementById("outputTitle").textContent = t.outputTitle;
  document.getElementById("downloadText").textContent = t.downloadText;
  document.getElementById("advancedSettingsTitle").textContent =
    t.advancedSettingsTitle;
  document.getElementById("intervalLabel").textContent = t.intervalLabel;
  document.getElementById("outputWidthLabel").textContent = t.outputWidthLabel;
  document.getElementById("qualityLabel").textContent = t.qualityLabel;
  document.getElementById("fpsLabel").textContent = t.fpsLabel;
  document.getElementById("reconvertText").textContent = t.reconvertText;

  // 툴팁 업데이트
  setupTooltips();
}

// 페이지 로드 시 언어 설정 적용
updateAllTexts();

// 전역 변수들
let defaultInterval = 0.3;
let defaultwWidth = 420;
let defaultQuality = 80;
let defaultFps = 10;

let frames = [];
let outputWidth = 420;
let outputHeight = 0;
let currentVideoFile = null;

// DOM 요소들
const videoInput = document.getElementById("videoInput");
const reconvertBtn = document.getElementById("reconvertBtn");
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const preview = document.getElementById("preview");
const output = document.getElementById("output");
const downloadLink = document.getElementById("downloadLink");
const intervalInput = document.getElementById("interval");
const qualityInput = document.getElementById("quality");
const fpsInput = document.getElementById("fps");
const outputWidthInput = document.getElementById("outputWidth");
const uploadSection = document.getElementById("uploadSection");
const outputSection = document.getElementById("outputSection");
const previewSection = document.getElementById("previewSection");
const advancedToggle = document.getElementById("advancedToggle");
const advancedContent = document.getElementById("advancedContent");
const toggleIcon = document.getElementById("toggleIcon");

// 고급 설정 토글
advancedToggle.addEventListener("click", () => {
  advancedContent.classList.toggle("expanded");
  toggleIcon.classList.toggle("rotated");
});

// 페이지 로드 시 툴팁 설정
setupTooltips();

// 드래그 앤 드롭 기능
uploadSection.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadSection.classList.add("dragover");
});

uploadSection.addEventListener("dragleave", (e) => {
  e.preventDefault();
  uploadSection.classList.remove("dragover");
});

uploadSection.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadSection.classList.remove("dragover");
  const files = e.dataTransfer.files;
  if (files.length > 0 && files[0].type.startsWith("video/")) {
    handleVideoFile(files[0]);
  }
});

uploadSection.addEventListener("click", () => {
  videoInput.click();
});

// 기존 기능 유지
videoInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  handleVideoFile(file);
});

// async function handleVideoFile(file) {
//   currentVideoFile = file;

//   // 로딩 표시
//   uploadSection.innerHTML = `
//                 <div class="loading">
//                     <div class="spinner"></div>
//                     <span>비디오를 로딩 중...</span>
//                 </div>
//             `;

//   video.src = URL.createObjectURL(file);
//   await video.play();
//   video.pause();

//   // 기본 설정값 적용
//   outputWidth = defaultwWidth;
//   const aspectRatio = video.videoHeight / video.videoWidth;
//   outputHeight = Math.round(outputWidth * aspectRatio);

//   // 프레임 추출 표시
//   uploadSection.innerHTML = `
//                 <div class="loading">
//                     <div class="spinner"></div>
//                     <span>프레임을 추출 중...</span>
//                 </div>
//             `;

//   // 기본값으로 프레임 추출
//   frames = await extractFrames(video, defaultInterval);

//   // 미리보기 섹션 표시
//   previewSection.style.display = "block";

//   // GIF 자동 생성 시작
//   uploadSection.innerHTML = `
//                 <div class="loading">
//                     <div class="spinner"></div>
//                     <span>GIF 생성 중...</span>
//                 </div>
//             `;

//   // 자동으로 GIF 생성
//   await generateGIF(frames, defaultwWidth, defaultQuality, defaultFps);

//   // 완료 표시
//   uploadSection.innerHTML = `
//                 <div class="upload-icon">✅</div>
//                 <div class="upload-text">GIF 생성 완료!</div>
//                 <div class="upload-subtext">아래 고급 설정에서 다른 옵션으로 재생성할 수 있습니다</div>
//             `;

//   // 출력 섹션 표시
//   outputSection.style.display = "block";
// }

async function handleVideoFile(file) {
  currentVideoFile = file;

  // 1) 비디오 로딩 UI
  uploadSection.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      <span>비디오를 로딩 중...</span>
    </div>
  `;

  // 2) 비디오 소스 지정
  video.src = URL.createObjectURL(file);

  // 3) 메타데이터 로드 대기 (videoWidth/Height 안전 접근)
  await new Promise((resolve) => {
    if (video.readyState >= 1) return resolve(); // HAVE_METADATA
    video.addEventListener("loadedmetadata", resolve, { once: true });
  });

  // 4) 기본 출력 폭 = 원본 가로폭(최대 900px)
  defaultwWidth = Math.min(video.videoWidth, 900);
  outputWidth = defaultwWidth;
  outputWidthInput.value = defaultwWidth;

  // 5) 비율 유지하여 높이 계산
  const aspectRatio = video.videoHeight / video.videoWidth;
  outputHeight = Math.round(outputWidth * aspectRatio);

  // 6) 프레임 추출 UI
  uploadSection.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      <span>프레임을 추출 중...</span>
    </div>
  `;

  // 7) 기본값으로 프레임 추출
  frames = await extractFrames(video, defaultInterval);

  // 8) 미리보기 섹션 표시
  previewSection.style.display = "block";

  // 9) GIF 생성 UI
  uploadSection.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      <span>GIF 생성 중...</span>
    </div>
  `;

  // 10) 자동으로 GIF 생성 (quality/fps는 기존 기본값 사용)
  await generateGIF(frames, defaultwWidth, defaultQuality, defaultFps);

  // 11) 완료 UI
  uploadSection.innerHTML = `
    <div class="upload-icon">✅</div>
    <div class="upload-text">GIF 생성 완료!</div>
    <div class="upload-subtext">아래 고급 설정에서 다른 옵션으로 재생성할 수 있습니다</div>
  `;

  // 12) 출력 섹션 표시
  outputSection.style.display = "block";
}

// 재변환 버튼 이벤트
reconvertBtn.addEventListener("click", async () => {
  if (!currentVideoFile) return;
  output.innerHTML = "";
  downloadLink.style.display = "none";

  uploadSection.innerHTML = `
                <div class="loading">
                    <div class="spinner"></div>
                    <span>GIF 생성 중...</span>
                </div>
            `;

  const originalText = reconvertBtn.textContent;
  reconvertBtn.innerHTML = `
                <div class="loading">
                    <div class="spinner"></div>
                    <span>GIF 재생성 중...</span>
                </div>
            `;
  reconvertBtn.disabled = true;

  // 새로운 설정값 적용
  const newInterval = parseFloat(intervalInput.value) || 1;
  const newWidth = parseInt(outputWidthInput.value, 10) || 420;
  const newQuality = parseInt(qualityInput.value, 10) || 1;
  const newFps = parseInt(fpsInput.value, 10) || 10;

  // 크기가 변경되었으면 프레임 재추출
  if (newWidth !== defaultwWidth || newInterval !== defaultInterval) {
    defaultwWidth = newWidth;
    defaultInterval = newInterval;
    outputWidth = newWidth;
    const aspectRatio = video.videoHeight / video.videoWidth;
    outputHeight = Math.round(outputWidth * aspectRatio);

    // 프레임 추출 표시
    uploadSection.innerHTML = `
                <div class="loading">
                    <div class="spinner"></div>
                    <span>프레임을 추출 중...</span>
                </div>
            `;

    frames = await extractFrames(video, newInterval);
  }

  await generateGIF(frames, newWidth, newQuality, newFps);

  reconvertBtn.textContent = originalText;
  reconvertBtn.disabled = false;

  // 완료 표시
  uploadSection.innerHTML = `
                <div class="upload-icon">✅</div>
                <div class="upload-text">GIF 생성 완료!</div>
                <div class="upload-subtext">아래 고급 설정에서 다른 옵션으로 재생성할 수 있습니다</div>
            `;
});
async function generateGIF(frameList, width, quality, fps) {
  const ctx = canvas.getContext("2d");
  const imageDatas = [];

  canvas.width = width;
  canvas.height = outputHeight;

  for (const blob of frameList) {
    const img = await blobToImage(blob);
    ctx.drawImage(img, 0, 0, width, canvas.height);
    const imageData = ctx.getImageData(0, 0, width, canvas.height);
    imageDatas.push(imageData);
  }

  // gifski-wasm은 직접 Web Worker를 쓰지 않음, encode는 메인 스레드에서 동작
  const gifBuffer = await encode({
    frames: imageDatas,
    width,
    height: canvas.height,
    quality, // optional: 1~100
    fps,
  });

  const gifBlob = new Blob([gifBuffer], { type: "image/gif" });
  const gifUrl = URL.createObjectURL(gifBlob);

  const gifImg = document.createElement("img");
  gifImg.src = gifUrl;

  output.innerHTML = "";
  output.appendChild(gifImg);

  downloadLink.href = gifUrl;
  downloadLink.style.display = "inline-block";
}

async function extractFrames(video, interval) {
  let w = canvas.width;
  canvas.width = 0;
  canvas.width = w;
  const ctx = canvas.getContext("2d");
  const duration = video.duration;
  const frameList = [];

  canvas.width = outputWidth;
  canvas.height = outputHeight;

  preview.innerHTML = "";

  for (let t = 0; t < duration; t += interval) {
    video.currentTime = t;
    await waitForSeek(video);

    ctx.drawImage(video, 0, 0, outputWidth, outputHeight);
    const blob = await new Promise((res) => canvas.toBlob(res, "image/png"));

    const img = document.createElement("img");
    img.src = URL.createObjectURL(blob);
    preview.appendChild(img);

    frameList.push(blob);
  }

  return frameList;
}

function waitForSeek(video) {
  return new Promise((resolve) => {
    const handler = () => {
      video.removeEventListener("seeked", handler);
      resolve();
    };
    video.addEventListener("seeked", handler);
  });
}

function blobToImage(blob) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = URL.createObjectURL(blob);
  });
}

// 전체 페이지 드래그 방지
document.addEventListener("dragover", (e) => e.preventDefault());
document.addEventListener("drop", (e) => e.preventDefault());
