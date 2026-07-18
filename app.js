const STORAGE_KEY = "life-system-v4";
const CHAT_KEY = "life-system-chat-v3";
const REP_KEY = "life-system-reps-v1";
const PRINCIPLE_KEY = "life-system-principles-v1";
const READ_STATS_KEY = "life-system-read-stats-v1";
const REVIEW_KEY = "life-system-nightly-review-v1";
const CAREER_KEY = "life-system-career-v1";
const CALENDAR_KEY = "life-system-calendar-v1";
const ROUTINE_VERSION = 6;
const EVERYDAY = [0, 1, 2, 3, 4, 5, 6];
const WEEKDAYS = [1, 2, 3, 4, 5];

const defaultTasks = [
  ["morning-start", "07:00", "个人成长", "起床/洗漱", "10min", EVERYDAY, "每天", "7 点起床，洗脸、喝水、把手机放远。今天的主线是实习，不要一睁眼就把注意力交出去。"],
  ["eng-morning", "07:10", "英语精进", "原著阅读", "30min", EVERYDAY, "每天", "英语只维持手感：原著阅读 30 分钟。读慢一点，圈出生词，不在英语上吞掉求职主线。"],
  ["tutor-am-window", "08:00", "财务/副业", "上午家教", "2h", EVERYDAY, "每天", "固定家教 8:00-10:00。认真上课，结束后立刻回家，不在路上刷短视频。"],
  ["career-skill-am", "10:20", "职业核心", "就业硬技能", "1.5h", EVERYDAY, "每天", "上午主工作区：具身智能硬技能。围绕 Linux、Python、ROS2、C/C++、项目代码或岗位 JD 补短板，必须留下笔记或提交。"],
  ["growth-gym", "12:00", "个人成长", "午饭/健身", "1.5h", EVERYDAY, "每天", "12:00 吃饭，12:30-13:30 健身。吃饭和训练合计控制在 1.5 小时内，身体是求职冲刺的底层硬件。"],
  ["growth-reset", "13:30", "个人成长", "休息/出门准备", "45min", EVERYDAY, "每天", "休息、洗漱、整理，准备 14:30 家教。休息不是刷短视频，是恢复精力。"],
  ["tutor-pm-window", "14:30", "财务/副业", "下午家教", "2h", EVERYDAY, "每天", "固定家教 14:30-16:30。上课结束后回家，直接接回职业主线。"],
  ["career-skill-pm", "16:50", "职业核心", "就业硬技能", "1h10min", EVERYDAY, "每天", "下午补一段专业硬技能：把上午没跑通的环境、代码、概念或项目模块继续推进到一个可见结果。"],
  ["dinner-reset", "18:00", "个人成长", "晚饭/恢复", "30min", EVERYDAY, "每天", "简单吃饭、补水、离开屏幕。晚上的 18:30-22:00 是今天最重要的职业冲刺，不要提前把脑子耗掉。"],
  ["career-skill-night", "18:30", "职业核心", "就业硬技能", "2h", EVERYDAY, "每天", "晚上深度工作区：做具身智能项目、整理 README、跑 ROS2 demo、补 C/C++/通信协议。目标是制造能写进简历的证据。"],
  ["career-job-plan", "20:30", "职业核心", "求职规划", "1h", EVERYDAY, "每天", "投递、改简历、看岗位、准备面试表达。今天至少推进 10 份投递或一个简历/项目展示材料。"],
  ["growth-upward", "21:30", "个人成长", "上行部落/阅读", "40min", EVERYDAY, "每天", "上行部落或高质量阅读 40 分钟。只要一个输出：一句观点、一条行动、一个明天能用的判断。"],
  ["night-shutdown", "22:10", "个人成长", "洗澡/晚间复盘", "20min", EVERYDAY, "每天", "洗澡，做简短复盘：今天投递了多少、项目推进了什么、卡在哪里、明天第一步是什么。"],
  ["eng-night", "22:30", "英语精进", "原著阅读", "45min", EVERYDAY, "每天", "睡前英语原著 45 分钟。今天英语总量控制在 1 到 1.5 小时，维持感觉即可，主力仍然是实习。"],
  ["sleep", "23:30", "个人成长", "睡觉", "固定", EVERYDAY, "每天", "23:30 睡觉。不要用娱乐奖励自己熬夜，明天 7 点起才是真正的奖励。"]
].map(([id, time, category, title, duration, days, daysLabel, message]) => ({
  id,
  time,
  category,
  title,
  duration,
  days,
  daysLabel,
  message,
  done: false,
  enabled: true,
  notifiedOn: ""
}));

const legacyDefaultTaskKeys = new Set([
  "个人成长:阅读",
  "职业核心:AI 技能实操",
  "英语精进:原著阅读",
  "职业核心:就业硬技能",
  "财务/副业:副业执行",
  "个人成长:上行部落",
  "英语精进:老友记",
  "个人成长:老王直播",
  "职业核心:求职规划",
  "职业核心:求职规划/职业补时",
  "财务/副业:家教/副业执行",
  "财务/副业:副业执行/家教收尾",
  "财务/副业:晚间家教/副业执行",
  "财务/副业:家教窗口 / AI 技能实操",
  "财务/副业:家教窗口 / 就业硬技能",
  "个人成长:上行部落/阅读",
  "个人成长:睡前收束",
  "英语精进:原著阅读/口语复述",
  "个人成长:起床/洗漱",
  "财务/副业:上午家教",
  "职业核心:就业硬技能",
  "个人成长:午饭/健身",
  "个人成长:休息/出门准备",
  "财务/副业:下午家教",
  "个人成长:晚饭/恢复",
  "个人成长:洗澡/晚间复盘",
  "个人成长:睡觉"
]);

const defaultAvoids = [
  ["avoid-short-video", "短视频", "Huang Mingjie, you never watch short videos. Short videos shatter your attention and steal your day. That waste is disgusting.", "黄铭杰，你从来不刷短视频。短视频会切碎你的注意力，偷走你的一天。这种浪费很恶心。", "慢一点、清楚一点、大声一点。让自己的声音把你从算法里拉回来。"],
  ["avoid-games", "游戏连刷", "Huang Mingjie, you never get addicted to games. Escaping into games weakens your real life. That self-betrayal is disgusting.", "黄铭杰，你从来不沉迷游戏。逃进游戏会削弱你的真实生活。这种背叛自己很恶心。", "游戏可以是娱乐，但不能变成逃避人生的洞。"],
  ["avoid-porn", "色情内容", "Huang Mingjie, you never watch porn. Fake stimulation damages your brain and your real desire. That trap is disgusting.", "黄铭杰，你从来不看色情片。虚假刺激会伤害你的大脑和真实欲望。这个陷阱很恶心。", "这不是道德表演，是保护大脑、注意力和真实关系。"],
  ["avoid-scrolling", "无意识躺刷", "Huang Mingjie, you never waste time scrolling your phone. Mindless scrolling burns your life quietly. That loss is disgusting.", "黄铭杰，你从来不浪费时间刷手机。无意识滑动会安静地烧掉你的人生。这种损失很恶心。", "最危险的是你以为只刷一会儿，然后一整晚没了。"]
].map(([id, title, mantra, chineseMantra, copy]) => ({
  id,
  title,
  mantra,
  chineseMantra,
  copy,
  target: 5,
  active: false
}));

const firstMessage = {
  role: "assistant",
  text: "瘾发作时，先别急着骂自己，也别给欲望找理由。去“戒断”页，按住录音键，用英文把新身份说出来。说完回来，我们一起看事实、漏洞和下一步。"
};

const rayDalioPrinciples = (window.RAY_DALIO_PRINCIPLES || []).map((item) => ({
  id: item.id,
  source: item.source,
  chinese: item.chinese,
  english: item.english,
  target: item.target || 1
}));

const starterPrinciples = [
  ["Ray Dalio", "直面现实，哪怕现实并不舒服。", "I face reality as it is, even when it is uncomfortable."],
  ["Ray Dalio", "把痛苦转化为反思，再转化为进步。", "I turn pain into reflection, and reflection into progress."],
  ["Ray Dalio", "用可信度加权的方式听取不同意见。", "I weigh opinions by credibility, not by comfort."],
  ["Ray Dalio", "发现问题时，不要逃避；把它当成改进系统的线索。", "I treat every problem as a clue to improve the system."],
  ["我的原则", "把注意力投向能产生复利的事。", "I invest my attention in things that compound."]
].map(([source, chinese, english]) => ({
  id: makeId(),
  source,
  chinese,
  english,
  target: 3
}));

const defaultPrinciples = [...rayDalioPrinciples, ...starterPrinciples];

const careerRoadmap = [
  {
    range: "7/17-7/24",
    title: "启动与MVP",
    focus: "三版简历、Linux/Git/Python/ROS2入门、turtlesim项目骨架、累计70份投递。"
  },
  {
    range: "7/25-7/31",
    title: "项目展示",
    focus: "自然语言转JSON、ROS2执行节点、日志、测试、README、2分钟演示视频、累计100份投递。"
  },
  {
    range: "8/1-8/14",
    title: "面试与扩展",
    focus: "集中面试，扩展机器人测试、嵌入式测试、IoT、自动化、智能硬件、技术交付岗位。"
  },
  {
    range: "8/15-8/31",
    title: "落地与替代方案",
    focus: "优先进入实习；若暂无offer，完成企业小项目/开源项目，形成可写进简历的证据。"
  }
];

const careerDailyTemplates = [
  ["投递推进", "投递10-15份：5份高匹配、5份中匹配、2-5份挑战岗；记录岗位、渠道、状态、下一步。"],
  ["ROS2项目", "至少1次Git提交。今天围绕自然语言命令、JSON校验、ROS2节点、日志或测试推进一个可见结果。"],
  ["基础栈", "补Linux/Python/Git/ROS2一块最小知识。原则：跑通命令、截图/记录结果，而不是只看课。"],
  ["面试表达", "口述30分钟：Node/Topic/Service/Action、项目数据流、失败降级、AI参与边界。"],
  ["简历证据", "把今天的代码、投递、面试、Bug或演示整理成一句可写进简历/周报的证据。"]
];

const careerPhases = [
  { start: "2026-07-17", end: "2026-07-24", label: "启动期", title: "先进入牌桌", summary: "今天不等准备完。核心是简历上线、投递启动、ROS2最小闭环。" },
  { start: "2026-07-25", end: "2026-07-31", label: "展示期", title: "把项目做成能被看见的证据", summary: "完成MVP、README、架构图、演示视频和模拟面试，不继续躲在学习里。" },
  { start: "2026-08-01", end: "2026-08-14", label: "面试期", title: "用反馈修计划", summary: "面试优先，按JD补短板；无面试就扩大到测试、交付、嵌入式、IoT和自动化。" },
  { start: "2026-08-15", end: "2026-08-31", label: "落地期", title: "拿经历，或者制造可验证经历", summary: "真实实习优先；没有offer就做可演示项目和周报，不能让暑假空过去。" }
];

let state = loadState();
let chat = loadChat();
let repState = loadReps();
let principles = loadPrinciples();
let readStats = loadReadStats();
let reviewState = loadReviewState();
let careerState = loadCareerState();
let editingId = "";
let activeTab = 0;
let activeAvoidId = state.avoids[0]?.id || "";
let activePrincipleId = principles[0]?.id || "";
let recognition = null;
let manualRepTimer = 0;
let repsAtRecordStart = 0;
let activeRecordMode = "urge";
let readingStartedAt = 0;
let readingLabel = "";
let principleTranscript = "";
let reviewStartedAt = 0;
let careerStartedAt = 0;
let careerAutoSubmit = false;
let quickEditStartedAt = 0;
let touchStartX = 0;

function makeId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") return window.crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

const els = {
  dateLabel: document.querySelector("#dateLabel"),
  pages: document.querySelector("#pages"),
  tabs: [...document.querySelectorAll(".tab")],
  nowTitle: document.querySelector("#nowTitle"),
  nowMessage: document.querySelector("#nowMessage"),
  notifyBtn: document.querySelector("#notifyBtn"),
  coachNowBtn: document.querySelector("#coachNowBtn"),
  addTaskBtn: document.querySelector("#addTaskBtn"),
  quickEditBtn: document.querySelector("#quickEditBtn"),
  taskList: document.querySelector("#taskList"),
  avoidList: document.querySelector("#avoidList"),
  resetBtn: document.querySelector("#resetBtn"),
  urgeTitle: document.querySelector("#urgeTitle"),
  urgeInstruction: document.querySelector("#urgeInstruction"),
  repCount: document.querySelector("#repCount"),
  repTarget: document.querySelector("#repTarget"),
  recordBtn: document.querySelector("#recordBtn"),
  listenNote: document.querySelector("#listenNote"),
  dialog: document.querySelector("#taskDialog"),
  form: document.querySelector("#taskForm"),
  cancelDialogBtn: document.querySelector("#cancelDialogBtn"),
  taskTime: document.querySelector("#taskTime"),
  taskTitle: document.querySelector("#taskTitle"),
  taskCategory: document.querySelector("#taskCategory"),
  taskMessage: document.querySelector("#taskMessage"),
  quickEditDialog: document.querySelector("#quickEditDialog"),
  quickEditForm: document.querySelector("#quickEditForm"),
  quickEditText: document.querySelector("#quickEditText"),
  quickEditResult: document.querySelector("#quickEditResult"),
  quickVoiceBtn: document.querySelector("#quickVoiceBtn"),
  quickApplyBtn: document.querySelector("#quickApplyBtn"),
  cancelQuickEditBtn: document.querySelector("#cancelQuickEditBtn"),
  reminderDialog: document.querySelector("#reminderDialog"),
  reminderStatus: document.querySelector("#reminderStatus"),
  syncReminderBtn: document.querySelector("#syncReminderBtn"),
  subscribeCalendarBtn: document.querySelector("#subscribeCalendarBtn"),
  closeReminderBtn: document.querySelector("#closeReminderBtn"),
  chatLog: document.querySelector("#chatLog"),
  chatForm: document.querySelector("#chatForm"),
  chatInput: document.querySelector("#chatInput"),
  modelLabel: document.querySelector("#modelLabel")
};

Object.assign(els, {
  addPrincipleBtn: document.querySelector("#addPrincipleBtn"),
  principleDialog: document.querySelector("#principleDialog"),
  principleForm: document.querySelector("#principleForm"),
  cancelPrincipleBtn: document.querySelector("#cancelPrincipleBtn"),
  principleImportText: document.querySelector("#principleImportText"),
  principleEnglishText: document.querySelector("#principleEnglishText"),
  principleList: document.querySelector("#principleList"),
  principleEnglish: document.querySelector("#principleEnglish"),
  principleChinese: document.querySelector("#principleChinese"),
  principleRepCount: document.querySelector("#principleRepCount"),
  principleRepTarget: document.querySelector("#principleRepTarget"),
  principleRecordBtn: document.querySelector("#principleRecordBtn"),
  principleListenNote: document.querySelector("#principleListenNote"),
  principleSource: document.querySelector("#principleSource"),
  principleSourceInput: document.querySelector("#principleSourceInput"),
  shufflePrinciplesBtn: document.querySelector("#shufflePrinciplesBtn"),
  playPrincipleBtn: document.querySelector("#playPrincipleBtn"),
  pronunciationScore: document.querySelector("#pronunciationScore"),
  wordFeedback: document.querySelector("#wordFeedback"),
  readToday: document.querySelector("#readToday"),
  readTotal: document.querySelector("#readTotal"),
  readSessions: document.querySelector("#readSessions"),
  recentReads: document.querySelector("#recentReads")
});

Object.assign(els, {
  careerPhaseLabel: document.querySelector("#careerPhaseLabel"),
  careerTodayTitle: document.querySelector("#careerTodayTitle"),
  careerTodaySummary: document.querySelector("#careerTodaySummary"),
  careerScore: document.querySelector("#careerScore"),
  careerTodayList: document.querySelector("#careerTodayList"),
  careerRoadmap: document.querySelector("#careerRoadmap"),
  careerQuestion: document.querySelector("#careerQuestion"),
  careerVoiceBtn: document.querySelector("#careerVoiceBtn"),
  careerAskBtn: document.querySelector("#careerAskBtn"),
  careerListenNote: document.querySelector("#careerListenNote"),
  careerAnswer: document.querySelector("#careerAnswer")
});

Object.assign(els, {
  reviewQuestion: document.querySelector("#reviewQuestion"),
  reviewText: document.querySelector("#reviewText"),
  reviewRecordBtn: document.querySelector("#reviewRecordBtn"),
  submitReviewBtn: document.querySelector("#submitReviewBtn"),
  reviewListenNote: document.querySelector("#reviewListenNote"),
  reviewResult: document.querySelector("#reviewResult")
});

init();

function init() {
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("./sw.js");

  els.dateLabel.textContent = new Intl.DateTimeFormat("zh-CN", {
    month: "long",
    day: "numeric",
    weekday: "long"
  }).format(new Date());

  els.tabs.forEach((tab) => tab.addEventListener("click", () => setTab(Number(tab.dataset.tab))));
  els.pages.addEventListener("touchstart", (event) => {
    touchStartX = event.touches[0].clientX;
  });
  els.pages.addEventListener("touchend", (event) => {
    const delta = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 54) setTab(activeTab + (delta < 0 ? 1 : -1));
  });
  els.pages.addEventListener("scroll", syncTabFromScroll);

  els.notifyBtn.addEventListener("click", openReminderDialog);
  els.syncReminderBtn.addEventListener("click", syncSystemReminders);
  els.closeReminderBtn.addEventListener("click", () => els.reminderDialog.close());
  els.coachNowBtn.addEventListener("click", () => {
    setTab(4);
    askCoach("我现在不想做，想继续刷手机。你把我拉回来。");
  });
  els.addTaskBtn.addEventListener("click", () => openTaskDialog());
  els.quickEditBtn.addEventListener("click", () => els.quickEditDialog.showModal());
  els.cancelQuickEditBtn.addEventListener("click", () => els.quickEditDialog.close());
  els.quickApplyBtn.addEventListener("click", applyQuickEdit);
  els.quickVoiceBtn.addEventListener("pointerdown", startQuickEditVoice);
  els.quickVoiceBtn.addEventListener("pointerup", stopQuickEditVoice);
  els.quickVoiceBtn.addEventListener("pointerleave", stopQuickEditVoice);
  els.quickVoiceBtn.addEventListener("contextmenu", (event) => event.preventDefault());
  els.cancelDialogBtn.addEventListener("click", () => els.dialog.close());
  els.form.addEventListener("submit", saveTaskFromDialog);
  els.addPrincipleBtn.addEventListener("click", () => els.principleDialog.showModal());
  els.cancelPrincipleBtn.addEventListener("click", () => els.principleDialog.close());
  els.principleForm.addEventListener("submit", importPrinciples);
  els.shufflePrinciplesBtn.addEventListener("click", shufflePrinciplesNow);
  els.playPrincipleBtn.addEventListener("click", playPrincipleAudio);
  els.resetBtn.addEventListener("click", resetDay);
  els.chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = els.chatInput.value.trim();
    if (message) askCoach(message);
  });
  els.recordBtn.addEventListener("pointerdown", startRecording);
  els.recordBtn.addEventListener("pointerup", stopRecording);
  els.recordBtn.addEventListener("pointerleave", stopRecording);
  els.recordBtn.addEventListener("contextmenu", (event) => event.preventDefault());
  els.principleRecordBtn.addEventListener("pointerdown", startPrincipleRecording);
  els.principleRecordBtn.addEventListener("pointerup", stopRecording);
  els.principleRecordBtn.addEventListener("pointerleave", stopRecording);
  els.principleRecordBtn.addEventListener("contextmenu", (event) => event.preventDefault());
  els.reviewRecordBtn.addEventListener("pointerdown", startReviewRecording);
  els.reviewRecordBtn.addEventListener("pointerup", stopReviewRecording);
  els.reviewRecordBtn.addEventListener("pointerleave", stopReviewRecording);
  els.reviewRecordBtn.addEventListener("contextmenu", (event) => event.preventDefault());
  els.submitReviewBtn.addEventListener("click", submitNightlyReview);
  els.careerAskBtn.addEventListener("click", askCareerCoach);
  els.careerVoiceBtn.addEventListener("pointerdown", startCareerVoice);
  els.careerVoiceBtn.addEventListener("pointerup", stopCareerVoice);
  els.careerVoiceBtn.addEventListener("pointerleave", stopCareerVoice);
  els.careerVoiceBtn.addEventListener("contextmenu", (event) => event.preventDefault());

  render();
  tick();
  setInterval(tick, 15000);
}

function loadState() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  if (!saved) return { tasks: defaultTasks, avoids: defaultAvoids, lastReset: todayKey(), routineVersion: ROUTINE_VERSION };
  if (saved.routineVersion === ROUTINE_VERSION) return saved;

  const builtInIds = new Set(defaultTasks.map((task) => task.id));
  const customTasks = (saved.tasks || []).filter((task) => {
    const key = `${task.category}:${task.title}`;
    return !builtInIds.has(task.id) && !legacyDefaultTaskKeys.has(key);
  });
  const migrated = { ...saved, tasks: [...defaultTasks, ...customTasks], avoids: defaultAvoids, routineVersion: ROUTINE_VERSION };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
  return migrated;
}

function loadChat() {
  return JSON.parse(localStorage.getItem(CHAT_KEY) || "null") || [firstMessage];
}

function loadReps() {
  return JSON.parse(localStorage.getItem(REP_KEY) || "{}");
}

function loadPrinciples() {
  const saved = JSON.parse(localStorage.getItem(PRINCIPLE_KEY) || "null");
  if (saved) return syncBuiltInPrinciples(saved);
  localStorage.setItem(PRINCIPLE_KEY, JSON.stringify(defaultPrinciples));
  return defaultPrinciples;
}

function syncBuiltInPrinciples(existing) {
  if (!rayDalioPrinciples.length) return existing;
  const builtInsById = new Map(rayDalioPrinciples.map((item) => [item.id, item]));
  const seen = new Set();
  const updated = existing.map((item) => {
    const builtIn = builtInsById.get(item.id);
    if (!builtIn) return item;
    seen.add(item.id);
    return { ...item, ...builtIn };
  });
  const missing = rayDalioPrinciples.filter((item) => !seen.has(item.id));
  const merged = [...missing, ...updated];
  localStorage.setItem(PRINCIPLE_KEY, JSON.stringify(merged));
  return merged;
}

function loadReadStats() {
  return JSON.parse(localStorage.getItem(READ_STATS_KEY) || "[]");
}

function loadReviewState() {
  return JSON.parse(localStorage.getItem(REVIEW_KEY) || "{}");
}

function loadCareerState() {
  return JSON.parse(localStorage.getItem(CAREER_KEY) || '{"backlog":[]}');
}

function saveState() {
  state.routineVersion = ROUTINE_VERSION;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function saveChat() {
  localStorage.setItem(CHAT_KEY, JSON.stringify(chat.slice(-30)));
}

function saveReps() {
  localStorage.setItem(REP_KEY, JSON.stringify(repState));
}

function savePrinciples() {
  localStorage.setItem(PRINCIPLE_KEY, JSON.stringify(principles));
}

function saveReadStats() {
  localStorage.setItem(READ_STATS_KEY, JSON.stringify(readStats.slice(-300)));
}

function saveReviewState() {
  localStorage.setItem(REVIEW_KEY, JSON.stringify(reviewState));
}

function saveCareerState() {
  localStorage.setItem(CAREER_KEY, JSON.stringify(careerState));
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function minutesNow() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

function minutesFromTime(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function isTaskActiveToday(task) {
  return !task.days || task.days.includes(new Date().getDay());
}

function setTab(index) {
  activeTab = Math.max(0, Math.min(els.tabs.length - 1, index));
  els.pages.scrollTo({ left: activeTab * els.pages.clientWidth, behavior: "smooth" });
  els.tabs.forEach((tab, tabIndex) => tab.classList.toggle("active", tabIndex === activeTab));
}

function syncTabFromScroll() {
  const nextTab = Math.round(els.pages.scrollLeft / els.pages.clientWidth);
  if (nextTab === activeTab) return;
  activeTab = Math.max(0, Math.min(els.tabs.length - 1, nextTab));
  els.tabs.forEach((tab, tabIndex) => tab.classList.toggle("active", tabIndex === activeTab));
}

function render() {
  renderTasks();
  renderCareer();
  renderAvoids();
  renderNow();
  renderChat();
  renderUrge();
  renderPrinciples();
  renderReadStats();
  renderReview();
  updateNotifyButton();
}

function currentTask() {
  const active = state.tasks
    .filter((task) => task.enabled && isTaskActiveToday(task) && !task.done)
    .sort((a, b) => minutesFromTime(a.time) - minutesFromTime(b.time));
  const pastTasks = active.filter((task) => minutesFromTime(task.time) < minutesNow());

  return (
    active.find((task) => minutesFromTime(task.time) >= minutesNow()) ||
    pastTasks[pastTasks.length - 1] ||
    null
  );
}

function renderNow() {
  const task = currentTask();
  if (!task) {
    els.nowTitle.textContent = "今天先收束";
    els.nowMessage.textContent = "别把剩下的时间交给高刺激。安静下来，给明天留一点余地。";
    return;
  }

  els.nowTitle.textContent = task.title;
  els.nowMessage.textContent = task.message;
}

function renderTasks() {
  els.taskList.replaceChildren(
    ...state.tasks
      .slice()
      .sort((a, b) => minutesFromTime(a.time) - minutesFromTime(b.time))
      .map((task) => {
        const row = document.createElement("article");
        row.className = `goal-row${task.done ? " done" : ""}${isDue(task) ? " due" : ""}${isTaskActiveToday(task) ? "" : " inactive"}`;
        row.innerHTML = `
          <div class="goal-main">
            <div class="goal-meta"><span class="goal-time">${task.time}</span><span class="goal-duration"></span><span class="goal-days"></span><span class="goal-category"></span></div>
            <div class="goal-title"></div>
            <p class="goal-message"></p>
          </div>
          <div class="goal-actions">
            <button type="button" aria-label="完成">${task.done ? "↺" : "✓"}</button>
            <button type="button" aria-label="求助">?</button>
          </div>
        `;
        row.querySelector(".goal-category").textContent = task.category;
        row.querySelector(".goal-duration").textContent = task.duration || "";
        row.querySelector(".goal-days").textContent = task.daysLabel || "";
        row.querySelector(".goal-title").textContent = task.title;
        row.querySelector(".goal-message").textContent = task.message;
        const [doneBtn, coachBtn] = row.querySelectorAll("button");
        doneBtn.addEventListener("click", () => toggleDone(task.id));
        coachBtn.addEventListener("click", () => {
          setTab(4);
          askCoach(`我现在不想做「${task.title}」，怎么办？`, task);
        });
        row.addEventListener("dblclick", () => openTaskDialog(task));
        return row;
      })
  );
}

function careerPhaseForToday() {
  const today = todayKey();
  return (
    careerPhases.find((phase) => today >= phase.start && today <= phase.end) ||
    (today < careerPhases[0].start ? careerPhases[0] : careerPhases[careerPhases.length - 1])
  );
}

function renderCareer() {
  if (!els.careerTodayList) return;
  const phase = careerPhaseForToday();
  els.careerPhaseLabel.textContent = `${phase.label} / ${todayKey()}`;
  els.careerTodayTitle.textContent = phase.title;
  els.careerTodaySummary.textContent = phase.summary;

  const backlogToday = (careerState.backlog || []).filter((item) => item.date <= todayKey());
  const doneToday = Object.entries(careerState.done || {}).filter(([key, value]) => key.startsWith(todayKey()) && value).length;
  els.careerScore.replaceChildren(
    careerMetric("今日硬指标", "10-15投递"),
    careerMetric("Git提交", "至少1次"),
    careerMetric("口述面试", "30分钟"),
    careerMetric("已勾选", `${doneToday}项`)
  );

  const tasks = [...careerDailyTemplates];
  backlogToday.forEach((item) => tasks.unshift(["顺延任务", `${item.text}（${item.from || "复盘顺延"}）`]));
  els.careerTodayList.replaceChildren(
    ...tasks.map(([title, text], index) => {
      const key = `${todayKey()}-${index}-${title}`;
      const row = document.createElement("article");
      row.className = `career-task${careerState.done?.[key] ? " done" : ""}`;
      row.innerHTML = `
        <button type="button" aria-label="完成">${careerState.done?.[key] ? "↺" : "✓"}</button>
        <div>
          <strong></strong>
          <p></p>
        </div>
      `;
      row.querySelector("strong").textContent = title;
      row.querySelector("p").textContent = text;
      row.querySelector("button").addEventListener("click", () => {
        careerState.done = careerState.done || {};
        careerState.done[key] = !careerState.done[key];
        saveCareerState();
        renderCareer();
      });
      return row;
    })
  );

  els.careerRoadmap.replaceChildren(
    ...careerRoadmap.map((item) => {
      const row = document.createElement("article");
      row.className = "roadmap-row";
      row.innerHTML = `<span></span><div><strong></strong><p></p></div>`;
      row.querySelector("span").textContent = item.range;
      row.querySelector("strong").textContent = item.title;
      row.querySelector("p").textContent = item.focus;
      return row;
    })
  );
}

function careerMetric(label, value) {
  const item = document.createElement("div");
  item.innerHTML = `<span></span><strong></strong>`;
  item.querySelector("span").textContent = label;
  item.querySelector("strong").textContent = value;
  return item;
}

async function askCareerCoach() {
  const message = els.careerQuestion.value.trim();
  if (!message) {
    els.careerListenNote.textContent = "先说一个问题，或者说今天完成了什么、没完成什么。";
    return;
  }

  els.careerAnswer.textContent = "正在判断下一步...";
  els.careerAskBtn.disabled = true;
  try {
    const response = await fetch("./api/career-coach", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        message,
        phase: careerPhaseForToday(),
        todayTasks: careerDailyTemplates,
        backlog: (careerState.backlog || []).slice(-10),
        done: careerState.done || {}
      })
    });
    const data = await response.json();
    els.careerAnswer.textContent = data.reply || localCareerReply(message);
    if (data.model) els.careerListenNote.textContent = `已回复：${data.model}`;
  } catch {
    els.careerAnswer.textContent = localCareerReply(message);
    els.careerListenNote.textContent = "网络或模型接口暂时不可用，先用本地判断给你顶上。";
  } finally {
    maybeAddCareerBacklog(message);
    els.careerAskBtn.disabled = false;
    els.careerQuestion.value = "";
    saveCareerState();
    renderCareer();
  }
}

function startCareerVoice() {
  careerAutoSubmit = false;
  careerStartedAt = Date.now();
  els.careerVoiceBtn.classList.add("recording");
  els.careerVoiceBtn.textContent = "听着";
  els.careerListenNote.textContent = "按住说，松开后我会整理你的问题或复盘。";

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    els.careerListenNote.textContent = "当前浏览器不支持语音识别，可以直接打字。";
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "zh-CN";
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onresult = (event) => {
    els.careerQuestion.value = [...event.results].map((result) => result[0].transcript).join("");
    careerAutoSubmit = true;
  };
  recognition.onerror = () => {
    els.careerListenNote.textContent = "语音识别不可用，可以直接打字提问。";
  };
  recognition.start();
}

function stopCareerVoice() {
  if (!careerStartedAt) return;
  els.careerVoiceBtn.classList.remove("recording");
  els.careerVoiceBtn.textContent = "按住提问";
  careerStartedAt = 0;
  if (recognition) {
    recognition.stop();
    recognition = null;
  }
  if (careerAutoSubmit && els.careerQuestion.value.trim()) askCareerCoach();
}

function maybeAddCareerBacklog(message) {
  if (!/没做|未完成|没完成|卡住|延期|顺延|补到|明天|做不完|没搞定/.test(message)) return;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const date = tomorrow.toISOString().slice(0, 10);
  careerState.backlog = careerState.backlog || [];
  careerState.backlog.push({
    id: makeId(),
    date,
    from: todayKey(),
    text: `补处理：${message.slice(0, 72)}`
  });
  careerState.backlog = careerState.backlog.slice(-24);
  els.careerListenNote.textContent = `已把未完成内容顺延到 ${date}。`;
}

function renderAvoids() {
  els.avoidList.replaceChildren(
    ...state.avoids.map((item) => {
      const row = document.createElement("article");
      row.className = "avoid-row";
      row.innerHTML = `
        <div class="avoid-main">
          <div class="avoid-title"></div>
          <p class="avoid-copy"></p>
        </div>
        <button type="button" aria-label="选择戒断对象">${item.active ? "!" : "+"}</button>
      `;
      row.querySelector(".avoid-title").textContent = item.title;
      row.querySelector(".avoid-copy").textContent = item.copy;
      const button = row.querySelector("button");
      button.classList.toggle("active", item.id === activeAvoidId);
      button.addEventListener("click", () => selectAvoid(item.id, true));
      row.addEventListener("click", () => selectAvoid(item.id, false));
      return row;
    })
  );
}

function renderUrge() {
  const item = activeAvoid();
  if (!item) return;
  const key = repKey(item);
  els.urgeTitle.textContent = item.mantra;
  els.urgeTitle.classList.toggle("long-principle", item.mantra.length > 110);
  els.urgeInstruction.textContent = `${item.chineseMantra} 按住录音键，用英文慢一点、足够清楚、足够大声地说 ${item.target} 遍。每遍尽量超过 5 秒，让声音从嘴里出来，进到耳朵，再落回大脑。`;
  els.repCount.textContent = repState[key] || 0;
  els.repTarget.textContent = item.target;
}

function renderPrinciples() {
  const active = activePrinciple();
  if (active) {
    els.principleSource.textContent = active.source || "今日原则";
    els.principleEnglish.textContent = active.english;
    els.principleEnglish.classList.toggle("long-principle", active.english.length > 120);
    els.principleChinese.textContent = active.chinese;
    els.principleRepCount.textContent = repState[principleRepKey(active)] || 0;
    els.principleRepTarget.textContent = active.target;
    renderPronunciationFeedback(null, active.english);
  }

  els.principleList.replaceChildren(
    ...dailyPrinciples().map((principle) => {
      const row = document.createElement("article");
      row.className = `principle-row${principle.id === activePrincipleId ? " active" : ""}`;
      row.innerHTML = `
        <div class="principle-main">
          <span class="principle-source"></span>
          <div class="principle-cn"></div>
          <p class="principle-en"></p>
        </div>
        <button type="button" aria-label="删除原则">×</button>
      `;
      row.querySelector(".principle-source").textContent = principle.source || "我的原则";
      row.querySelector(".principle-cn").textContent = principle.chinese;
      row.querySelector(".principle-en").textContent = principle.english;
      row.addEventListener("click", () => selectPrinciple(principle.id));
      row.querySelector("button").addEventListener("click", (event) => {
        event.stopPropagation();
        deletePrinciple(principle.id);
      });
      return row;
    })
  );
}

function renderReadStats() {
  const today = todayKey();
  const todaySeconds = readStats
    .filter((entry) => entry.date === today)
    .reduce((sum, entry) => sum + entry.seconds, 0);
  const totalSeconds = readStats.reduce((sum, entry) => sum + entry.seconds, 0);
  els.readToday.textContent = formatDuration(todaySeconds);
  els.readTotal.textContent = formatDuration(totalSeconds);
  els.readSessions.textContent = `${readStats.length} 次`;
  els.recentReads.replaceChildren(
    ...readStats
      .slice(-3)
      .reverse()
      .map((entry) => {
        const row = document.createElement("div");
        row.className = "recent-read";
        row.innerHTML = `<span></span><strong></strong>`;
        row.querySelector("span").textContent = entry.label;
        row.querySelector("strong").textContent = formatDuration(entry.seconds);
        return row;
      })
  );
}

function renderReview() {
  const today = todayKey();
  const entry = reviewState[today] || {};
  els.reviewText.value = entry.text || "";
  els.reviewResult.textContent = entry.result || "";
}

function dailyPrinciples() {
  if (principles.length <= 5) return principles;
  const seed = Number(todayKey().replace(/-/g, "")) + Number(localStorage.getItem("life-system-principle-shuffle") || 0);
  return principles
    .map((principle, index) => ({ principle, score: seededScore(seed + index * 97) }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 5)
    .map((item) => item.principle);
}

function seededScore(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function shufflePrinciplesNow() {
  const current = Number(localStorage.getItem("life-system-principle-shuffle") || 0);
  localStorage.setItem("life-system-principle-shuffle", String(current + 1));
  const list = dailyPrinciples();
  activePrincipleId = list[0]?.id || activePrincipleId;
  renderPrinciples();
}

function renderChat() {
  els.chatLog.replaceChildren(
    ...chat.map((message) => {
      const bubble = document.createElement("div");
      bubble.className = `bubble ${message.role}`;
      bubble.textContent = message.text;
      return bubble;
    })
  );
  els.chatLog.scrollTop = els.chatLog.scrollHeight;
}

function activeAvoid() {
  return state.avoids.find((item) => item.id === activeAvoidId) || state.avoids[0];
}

function activePrinciple() {
  return principles.find((item) => item.id === activePrincipleId) || principles[0];
}

function repKey(item) {
  return `${todayKey()}-${item.id}`;
}

function principleRepKey(item) {
  return `${todayKey()}-principle-${item.id}`;
}

function selectPrinciple(id) {
  activePrincipleId = id;
  renderPrinciples();
}

function deletePrinciple(id) {
  principles = principles.filter((principle) => principle.id !== id);
  activePrincipleId = principles[0]?.id || "";
  savePrinciples();
  renderPrinciples();
}

function selectAvoid(id, askForHelp) {
  activeAvoidId = id;
  renderAvoids();
  renderUrge();
  if (askForHelp) {
    const item = activeAvoid();
    askCoach(`我现在想碰「${item.title}」，我准备用英文身份句打断：${item.mantra}`);
  }
}

function isDue(task) {
  return task.enabled && isTaskActiveToday(task) && !task.done && minutesFromTime(task.time) <= minutesNow();
}

function toggleDone(id) {
  const task = state.tasks.find((item) => item.id === id);
  task.done = !task.done;
  saveState();
  render();
}

function openTaskDialog(task = null) {
  editingId = task?.id || "";
  els.taskTime.value = task?.time || "09:00";
  els.taskTitle.value = task?.title || "";
  els.taskCategory.value = task?.category || "个人成长";
  els.taskMessage.value = task?.message || "";
  els.dialog.showModal();
  els.taskTitle.focus();
}

function saveTaskFromDialog(event) {
  event.preventDefault();
  const title = els.taskTitle.value.trim();
  const data = {
    time: els.taskTime.value,
    category: els.taskCategory.value,
    title,
    message: els.taskMessage.value.trim() || `到${title}时间了。你不一定想做，但先做 5 分钟，别把时间交给高刺激。`,
    done: false,
    enabled: true,
    notifiedOn: ""
  };

  if (editingId) {
    const index = state.tasks.findIndex((task) => task.id === editingId);
    state.tasks[index] = { ...state.tasks[index], ...data };
  } else {
    state.tasks.push({ id: makeId(), ...data });
  }

  saveState();
  els.dialog.close();
  render();
}

function startQuickEditVoice() {
  quickEditStartedAt = Date.now();
  els.quickVoiceBtn.classList.add("recording");
  els.quickVoiceBtn.textContent = "听着";
  els.quickEditResult.textContent = "按住说一句修改指令，松开后我会尝试应用。";

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    els.quickEditResult.textContent = "当前浏览器不支持语音识别，可以直接打字修改。";
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "zh-CN";
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onresult = (event) => {
    els.quickEditText.value = [...event.results].map((result) => result[0].transcript).join("");
  };
  recognition.onerror = () => {
    els.quickEditResult.textContent = "语音识别不可用，可以直接打字修改。";
  };
  recognition.start();
}

function stopQuickEditVoice() {
  if (!quickEditStartedAt) return;
  els.quickVoiceBtn.classList.remove("recording");
  els.quickVoiceBtn.textContent = "按住说";
  quickEditStartedAt = 0;
  if (recognition) {
    recognition.stop();
    recognition = null;
  }
  if (els.quickEditText.value.trim()) applyQuickEdit();
}

function applyQuickEdit() {
  const command = els.quickEditText.value.trim();
  if (!command) {
    els.quickEditResult.textContent = "先说一句或写一句要改什么。";
    return;
  }

  const result = parseQuickEdit(command);
  els.quickEditResult.textContent = result.message;
  if (!result.changed) return;
  saveState();
  render();
  els.quickEditText.value = "";
}

function parseQuickEdit(command) {
  if (/恢复默认|重置日程|还原日程/.test(command)) {
    state.tasks = defaultTasks.map((task) => ({ ...task, done: false, notifiedOn: "" }));
    return { changed: true, message: "已恢复默认日程。你这台手机会从新版固定流程重新开始。" };
  }

  if (/新增|添加|加一个|加个/.test(command)) return addTaskFromCommand(command);

  const task = findTaskFromCommand(command);
  if (!task) return { changed: false, message: "我没找到要改哪一项。你可以说：把就业硬技能改到19点，或：今天不做上行部落。" };

  if (/今天不做|取消|跳过|完成/.test(command)) {
    task.done = true;
    return { changed: true, message: `已把「${task.title}」标记为今天不做/已完成。` };
  }

  const time = extractTime(command);
  const duration = extractDuration(command);
  if (time) task.time = time;
  if (duration) task.duration = duration;
  if (time || duration) {
    return { changed: true, message: `已修改「${task.title}」：${time ? `时间 ${time}` : ""}${time && duration ? "，" : ""}${duration ? `时长 ${duration}` : ""}。` };
  }

  return { changed: false, message: "这句话我还不会改。现在支持：改时间、改时长、新增任务、今天不做、恢复默认。" };
}

function addTaskFromCommand(command) {
  const time = extractTime(command) || "09:00";
  const duration = extractDuration(command) || "30min";
  const title = cleanNewTaskTitle(command, time, duration);
  state.tasks.push({
    id: makeId(),
    time,
    category: inferCategory(command),
    title,
    duration,
    days: EVERYDAY,
    daysLabel: "每天",
    message: `新增任务：${title}。先做最小一步，不要让它只停留在想法里。`,
    done: false,
    enabled: true,
    notifiedOn: ""
  });
  return { changed: true, message: `已新增「${title}」：${time}，${duration}。` };
}

function findTaskFromCommand(command) {
  const normalized = command.replace(/\s+/g, "");
  const aliases = [
    ["上午家教", ["早上家教", "八点家教", "8点家教"]],
    ["下午家教", ["下午家教", "两点半家教", "2点半家教"]],
    ["就业硬技能", ["专业硬技能", "具身智能", "学习", "职业硬技能"]],
    ["求职规划", ["投简历", "投递", "简历", "找实习"]],
    ["上行部落/阅读", ["上行部落", "阅读"]],
    ["午饭/健身", ["健身", "午饭"]],
    ["原著阅读", ["英语", "英文", "原著"]],
    ["洗澡/晚间复盘", ["洗澡", "复盘"]],
    ["睡觉", ["睡觉", "睡眠"]]
  ];
  const aliasHit = aliases.find(([title, words]) => normalized.includes(title.replace(/\s+/g, "")) || words.some((word) => normalized.includes(word)));
  if (aliasHit) return state.tasks.find((task) => task.title === aliasHit[0]) || state.tasks.find((task) => task.title.includes(aliasHit[0].split("/")[0]));
  return state.tasks
    .slice()
    .sort((a, b) => b.title.length - a.title.length)
    .find((task) => normalized.includes(task.title.replace(/\s+/g, "")));
}

function extractTime(command) {
  const normalized = normalizeTimeWords(command);
  const match = normalized.match(/(早上|上午|中午|下午|晚上)?\s*([0-2]?\d)(?:[:：点]\s*([0-5]?\d|半))?/);
  if (!match) return "";
  let hour = Number(match[2]);
  let minute = match[3] === "半" ? 30 : Number(match[3] || 0);
  const period = match[1] || "";
  if ((period === "下午" || period === "晚上") && hour < 12) hour += 12;
  if (period === "中午" && hour < 11) hour += 12;
  if (hour > 23 || minute > 59) return "";
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function normalizeTimeWords(text) {
  const numbers = { 零: 0, 一: 1, 二: 2, 两: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 };
  return text
    .replace(/十二/g, "12")
    .replace(/十一/g, "11")
    .replace(/十/g, "10")
    .replace(/[零一二两三四五六七八九]/g, (char) => String(numbers[char]))
    .replace(/点半/g, "点半");
}

function extractDuration(command) {
  const normalized = normalizeTimeWords(command);
  const hourMatch = normalized.match(/([0-9.]+)\s*(个)?小时/);
  const minuteMatch = normalized.match(/([0-9]+)\s*分钟/);
  if (hourMatch && minuteMatch) return `${hourMatch[1]}h${minuteMatch[1]}min`;
  if (hourMatch) return `${hourMatch[1]}h`;
  if (minuteMatch) return `${minuteMatch[1]}min`;
  return "";
}

function cleanNewTaskTitle(command, time, duration) {
  const title = normalizeTimeWords(command)
    .replace(/新增|添加|加一个|加个|任务|提醒/g, "")
    .replace(/[0-9.]+\s*(个)?小时|[0-9]+\s*分钟/g, "")
    .replace(time, "")
    .replace(duration, "")
    .replace(/(早上|上午|中午|下午|晚上)?\s*[0-2]?\d\s*[:：点]\s*([0-5]?\d|半)?/g, "")
    .replace(/时长|持续|做/g, "")
    .trim();
  return title.slice(0, 18) || "临时任务";
}

function inferCategory(command) {
  if (/英语|英文|原著|老友记/.test(command)) return "英语精进";
  if (/家教|副业/.test(command)) return "财务/副业";
  if (/实习|简历|投递|求职|具身|ROS|代码|硬技能|面试/.test(command)) return "职业核心";
  return "个人成长";
}

function resetDay() {
  state.tasks.forEach((task) => {
    task.done = false;
    task.notifiedOn = "";
  });
  state.lastReset = todayKey();
  repState = {};
  saveState();
  saveReps();
  render();
}

async function importPrinciples(event) {
  event.preventDefault();
  const source = els.principleSourceInput.value;
  const lines = els.principleImportText.value
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
  const englishLines = els.principleEnglishText.value
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (!lines.length) return;

  const created = await Promise.all(lines.map((line, index) => createPrincipleFromChinese(line, source, englishLines[index])));
  principles = [...principles, ...created];
  activePrincipleId = created[0]?.id || activePrincipleId;
  savePrinciples();
  els.principleImportText.value = "";
  els.principleEnglishText.value = "";
  els.principleDialog.close();
  renderPrinciples();
}

async function createPrincipleFromChinese(chinese, source, manualEnglish = "") {
  if (manualEnglish) return { id: makeId(), source, chinese, english: manualEnglish, target: 3 };
  try {
    const response = await fetch("./api/principle-english", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ chinese })
    });
    const data = await response.json();
    return { id: makeId(), source, chinese, english: data.english || localPrincipleEnglish(chinese), target: 3 };
  } catch {
    return { id: makeId(), source, chinese, english: localPrincipleEnglish(chinese), target: 3 };
  }
}

function openReminderDialog() {
  const calendar = loadCalendarState();
  updateReminderDialog(calendar);
  els.reminderDialog.showModal();
}

function updateNotifyButton() {
  const calendar = loadCalendarState();
  els.notifyBtn.textContent = calendar.calendarUrl || calendar.exportedAt ? "提醒已同步" : "系统提醒";
}

function loadCalendarState() {
  return JSON.parse(localStorage.getItem(CALENDAR_KEY) || "null") || {};
}

function updateReminderDialog(calendar) {
  const syncedAt = calendar.syncedAt ? new Date(calendar.syncedAt).toLocaleString("zh-CN", { hour12: false }) : "";
  els.reminderStatus.textContent = syncedAt ? `已同步：${syncedAt}。修改日程后，请再同步一次。` : "尚未同步当前日程。";
  els.subscribeCalendarBtn.classList.toggle("ready", Boolean(calendar.calendarUrl));
  if (calendar.calendarUrl) {
    els.subscribeCalendarBtn.href = calendar.calendarUrl.replace(/^https:/, "webcal:");
  }
}

async function syncSystemReminders() {
  const calendar = loadCalendarState();
  const id = calendar.id || crypto.randomUUID();
  const editSecret = calendar.editSecret || crypto.randomUUID();
  const tasks = state.tasks
    .filter((task) => task.enabled)
    .map(({ id: taskId, time, title, message, duration, days }) => ({ id: taskId, time, title, message, duration, days }));

  els.syncReminderBtn.disabled = true;
  els.syncReminderBtn.textContent = "正在同步...";
  els.reminderStatus.textContent = "正在把当前日程写入手机可订阅的系统日历。";

  try {
    const response = await fetch("./api/calendar-schedule", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id, editSecret, tasks })
    });
    if (!response.ok) throw new Error("sync failed");
    const result = await response.json();
    const next = { id, editSecret, calendarUrl: result.calendarUrl, syncedAt: new Date().toISOString() };
    localStorage.setItem(CALENDAR_KEY, JSON.stringify(next));
    updateReminderDialog(next);
    updateNotifyButton();
    els.reminderStatus.textContent = "同步完成。现在点“订阅到手机日历”，只需订阅一次。";
  } catch {
    downloadCalendarFile(tasks);
    const next = { ...calendar, exportedAt: new Date().toISOString() };
    localStorage.setItem(CALENDAR_KEY, JSON.stringify(next));
    updateNotifyButton();
    els.reminderStatus.textContent = "在线同步暂不可用，已生成手机日历文件。请在弹出的文件中把日程全部添加到系统日历。";
  } finally {
    els.syncReminderBtn.disabled = false;
    els.syncReminderBtn.textContent = "同步当前日程";
  }
}

function downloadCalendarFile(tasks) {
  const weekDays = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
  const now = new Date();
  const stamp = calendarDate(now, true);
  const events = tasks.map((task) => {
    const start = new Date(now);
    start.setHours(Number(task.time.slice(0, 2)), Number(task.time.slice(3, 5)), 0, 0);
    while (!task.days.includes(start.getDay()) || start < now) start.setDate(start.getDate() + 1);
    const end = new Date(start.getTime() + 30 * 60 * 1000);
    const byDay = task.days.map((day) => weekDays[day]).join(",");
    return [
      "BEGIN:VEVENT",
      `UID:${task.id}@mingjie-life-system`,
      `DTSTAMP:${stamp}`,
      `DTSTART;TZID=Asia/Shanghai:${calendarDate(start)}`,
      `DTEND;TZID=Asia/Shanghai:${calendarDate(end)}`,
      `RRULE:FREQ=WEEKLY;BYDAY=${byDay}`,
      `SUMMARY:${escapeCalendarText(`人生系统：${task.title}`)}`,
      `DESCRIPTION:${escapeCalendarText(task.message)}`,
      "BEGIN:VALARM",
      "TRIGGER:PT0M",
      "ACTION:DISPLAY",
      `DESCRIPTION:${escapeCalendarText(task.message)}`,
      "END:VALARM",
      "END:VEVENT"
    ].join("\r\n");
  });
  const content = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Mingjie Life System//ZH-CN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:人生系统",
    ...events,
    "END:VCALENDAR"
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([content], { type: "text/calendar;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "人生系统日程.ics";
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 30000);
}

function calendarDate(date, utc = false) {
  const year = utc ? date.getUTCFullYear() : date.getFullYear();
  const month = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
  const day = utc ? date.getUTCDate() : date.getDate();
  const hour = utc ? date.getUTCHours() : date.getHours();
  const minute = utc ? date.getUTCMinutes() : date.getMinutes();
  return `${year}${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}T${String(hour).padStart(2, "0")}${String(minute).padStart(2, "0")}00${utc ? "Z" : ""}`;
}

function escapeCalendarText(value = "") {
  return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

function tick() {
  if (state.lastReset !== todayKey()) resetDay();

  state.tasks.forEach((task) => {
    if (!task.enabled || !isTaskActiveToday(task) || task.done || task.notifiedOn === todayKey()) return;
    if (minutesFromTime(task.time) <= minutesNow()) {
      task.notifiedOn = todayKey();
      showReminder(task.title, task.message);
      addAssistant(`${task.time} 到了：${task.message}`);
    }
  });

  maybeSendReviewReminder();

  saveState();
  renderTasks();
  renderNow();
}

function maybeSendReviewReminder() {
  const now = new Date();
  const today = todayKey();
  const entry = reviewState[today] || {};
  if (entry.remindedOn === today) return;
  if (now.getHours() === 23 && now.getMinutes() <= 20) {
    reviewState[today] = { ...entry, remindedOn: today };
    saveReviewState();
    showReminder("晚间复盘", "今天你学到了什么？做了什么？你的状态怎么样？用口述复盘一下。");
    addAssistant("23 点复盘：今天学到了什么、做了什么、状态如何？去“对话”页按住复盘。");
  }
}

function showReminder(title, body) {
  if ("Notification" in window && Notification.permission === "granted") {
    navigator.serviceWorker?.ready.then((registration) => registration.showNotification(`人生系统：${title}`, {
      body,
      icon: "./assets/icon-192.png",
      badge: "./assets/icon-192.png",
      tag: `life-system-${todayKey()}-${title}`,
      data: { url: "./index.html" }
    }));
  }

  els.nowTitle.textContent = title;
  els.nowMessage.textContent = body;
  if (navigator.vibrate && navigator.userActivation?.hasBeenActive) navigator.vibrate([80, 40, 80]);
}

function startRecording() {
  activeRecordMode = "urge";
  const item = activeAvoid();
  repsAtRecordStart = repState[repKey(item)] || 0;
  readingStartedAt = Date.now();
  readingLabel = `戒断：${item.title}`;
  els.recordBtn.classList.add("recording");
  els.recordBtn.textContent = "听着";
  els.listenNote.textContent = `Slow, clear, loud: ${item.mantra}`;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    manualRepTimer = window.setInterval(() => addRep(1), 5500);
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "zh-CN";
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onresult = (event) => {
    const transcript = [...event.results].map((result) => result[0].transcript).join("");
    const count = countMantra(transcript, item);
    if (count) addRep(count);
  };
  recognition.onerror = () => {
    els.listenNote.textContent = "语音识别不可用。继续按住会手动计数。";
    manualRepTimer = window.setInterval(() => addRep(1), 5500);
  };
  recognition.start();
}

function startPrincipleRecording() {
  activeRecordMode = "principle";
  const item = activePrinciple();
  if (!item) return;
  principleTranscript = "";
  repsAtRecordStart = repState[principleRepKey(item)] || 0;
  readingStartedAt = Date.now();
  readingLabel = `原则：${item.source || "我的原则"}`;
  els.principleRecordBtn.classList.add("recording");
  els.principleRecordBtn.textContent = "听着";
  els.principleListenNote.textContent = `Read: ${item.english}`;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    manualRepTimer = window.setInterval(() => addPrincipleRep(1), 1400);
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onresult = (event) => {
    const transcript = [...event.results].map((result) => result[0].transcript).join("");
    principleTranscript = transcript;
    const count = countEnglishPhrase(transcript, item.english);
    if (count) addPrincipleRep(count);
  };
  recognition.onerror = () => {
    els.principleListenNote.textContent = "语音识别不可用。继续按住会手动计数。";
    manualRepTimer = window.setInterval(() => addPrincipleRep(1), 1400);
  };
  recognition.start();
}

function startReviewRecording() {
  activeRecordMode = "review";
  reviewStartedAt = Date.now();
  els.reviewRecordBtn.classList.add("recording");
  els.reviewRecordBtn.textContent = "听着";
  els.reviewListenNote.textContent = "说：今天学到了什么、做了什么、状态如何。";

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    els.reviewListenNote.textContent = "当前浏览器不支持语音识别，可以直接打字复盘。";
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "zh-CN";
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onresult = (event) => {
    els.reviewText.value = [...event.results].map((result) => result[0].transcript).join("");
  };
  recognition.onerror = () => {
    els.reviewListenNote.textContent = "语音识别不可用，可以直接打字复盘。";
  };
  recognition.start();
}

function stopReviewRecording() {
  if (!reviewStartedAt) return;
  els.reviewRecordBtn.classList.remove("recording");
  els.reviewRecordBtn.textContent = "按住复盘";
  reviewStartedAt = 0;
  if (recognition) {
    recognition.stop();
    recognition = null;
  }
  persistReviewText();
  els.reviewListenNote.textContent = "已记录。可以补充文字，然后提交评分。";
}

function stopRecording() {
  if (!readingStartedAt) return;
  const isPrinciple = activeRecordMode === "principle";
  const button = isPrinciple ? els.principleRecordBtn : els.recordBtn;
  button.classList.remove("recording");
  button.textContent = isPrinciple ? "按住读" : "按住说";
  window.clearInterval(manualRepTimer);
  manualRepTimer = 0;
  if (recognition) {
    recognition.stop();
    recognition = null;
  }

  recordReadingSession();

  if (isPrinciple) {
    stopPrincipleRecording();
    return;
  }

  const item = activeAvoid();
  if ((repState[repKey(item)] || 0) === repsAtRecordStart) addRep(1);
  const reps = repState[repKey(item)] || 0;
  if (reps >= item.target) {
    els.listenNote.textContent = "完成。你已经从自动反应里退出来了，现在做一个小动作。";
    setTab(3);
    askCoach(`我刚刚把「${item.mantra}」说了 ${reps} 遍。现在我该做什么？`);
  } else {
    els.listenNote.textContent = `已经 ${reps} 遍。还差一点，继续说。`;
  }
}

function persistReviewText() {
  const today = todayKey();
  const entry = reviewState[today] || {};
  reviewState[today] = { ...entry, text: els.reviewText.value.trim() };
  saveReviewState();
}

async function submitNightlyReview() {
  persistReviewText();
  const text = els.reviewText.value.trim();
  if (!text) {
    els.reviewListenNote.textContent = "先说一点或写一点，再提交评分。";
    return;
  }

  els.reviewResult.textContent = "正在评分...";
  try {
    const response = await fetch("./api/nightly-review", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        text,
        goals: state.tasks.map(({ title, category, done }) => ({ title, category, done })),
        principles: dailyPrinciples().map(({ source, chinese, english }) => ({ source, chinese, english }))
      })
    });
    const data = await response.json();
    saveReviewResult(data.review || localReviewScore(text));
  } catch {
    saveReviewResult(localReviewScore(text));
  }
}

function saveReviewResult(result) {
  const today = todayKey();
  reviewState[today] = { ...(reviewState[today] || {}), text: els.reviewText.value.trim(), result };
  saveReviewState();
  els.reviewResult.textContent = result;
}

function recordReadingSession() {
  const seconds = Math.max(1, Math.round((Date.now() - readingStartedAt) / 1000));
  readStats.push({
    id: makeId(),
    date: todayKey(),
    at: new Date().toISOString(),
    mode: activeRecordMode,
    label: readingLabel || "朗读",
    seconds
  });
  readingStartedAt = 0;
  readingLabel = "";
  saveReadStats();
  renderReadStats();
}

function stopPrincipleRecording() {
  const item = activePrinciple();
  if (!item) return;
  renderPronunciationFeedback(principleTranscript, item.english);
  if ((repState[principleRepKey(item)] || 0) === repsAtRecordStart) addPrincipleRep(1);
  const reps = repState[principleRepKey(item)] || 0;
  if (reps >= item.target) {
    els.principleListenNote.textContent = "完成。今天这条原则已经读进脑子里了。";
  } else {
    els.principleListenNote.textContent = `已经 ${reps} 遍。再读几遍，让它更熟。`;
  }
}

function countMantra(transcript, item) {
  const normalized = transcript.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "");
  const phrase = item.mantra.toLowerCase().replace(/[^a-z0-9]+/g, "");
  const chinesePhrase = item.chineseMantra.replace(/\s+/g, "");
  const shortName = item.title.replace(/\s+/g, "");
  const exact = normalized.split(phrase).length - 1 || normalized.split(chinesePhrase).length - 1;
  if (exact) return exact;
  return normalized.includes(shortName) && normalized.includes("从来") ? 1 : 0;
}

function addRep(count) {
  const item = activeAvoid();
  const key = repKey(item);
  repState[key] = Math.min(item.target, (repState[key] || 0) + count);
  saveReps();
  renderUrge();
  if (navigator.vibrate && navigator.userActivation?.hasBeenActive) navigator.vibrate(35);
}

function addPrincipleRep(count) {
  const item = activePrinciple();
  if (!item) return;
  const key = principleRepKey(item);
  repState[key] = Math.min(item.target, (repState[key] || 0) + count);
  saveReps();
  renderPrinciples();
  if (navigator.vibrate && navigator.userActivation?.hasBeenActive) navigator.vibrate(35);
}

function countEnglishPhrase(transcript, phrase) {
  const normalized = normalizeEnglish(transcript);
  const target = normalizeEnglish(phrase);
  const exact = normalized.split(target).length - 1;
  if (exact) return exact;
  const words = target.split(" ").filter((word) => word.length > 2);
  const hits = words.filter((word) => normalized.includes(word)).length;
  return hits >= Math.max(2, Math.ceil(words.length * 0.6)) ? 1 : 0;
}

function playPrincipleAudio() {
  const item = activePrinciple();
  if (!item || !("speechSynthesis" in window)) {
    els.principleListenNote.textContent = "当前浏览器不支持标准发音播放。";
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(item.english);
  utterance.lang = "en-US";
  utterance.rate = 0.86;
  utterance.pitch = 1;
  const voices = window.speechSynthesis.getVoices();
  const usVoice = voices.find((voice) => voice.lang === "en-US") || voices.find((voice) => voice.lang.startsWith("en"));
  if (usVoice) utterance.voice = usVoice;
  window.speechSynthesis.speak(utterance);
}

function renderPronunciationFeedback(transcript, target) {
  if (!transcript) {
    els.pronunciationScore.textContent = "未评分";
    els.wordFeedback.textContent = "读完后会显示匹配度，没读准的词会标红。";
    return;
  }

  const targetWords = wordsForScore(target);
  const spokenWords = new Set(wordsForScore(transcript));
  const matched = targetWords.filter((word) => spokenWords.has(word)).length;
  const score = targetWords.length ? Math.round((matched / targetWords.length) * 100) : 0;
  els.pronunciationScore.textContent = `${score} 分`;
  els.wordFeedback.replaceChildren(
    ...targetWords.map((word) => {
      const span = document.createElement("span");
      span.textContent = word;
      span.className = spokenWords.has(word) ? "word-ok" : "word-miss";
      return span;
    })
  );
}

function wordsForScore(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9' ]+/g, " ")
    .split(/\s+/)
    .map((word) => word.replace(/^'+|'+$/g, ""))
    .filter(Boolean);
}

function normalizeEnglish(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function formatDuration(seconds) {
  if (seconds < 60) return `${seconds} 秒`;
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  if (minutes < 60) return rest ? `${minutes}分${rest}秒` : `${minutes} 分钟`;
  const hours = Math.floor(minutes / 60);
  const remainMinutes = minutes % 60;
  return remainMinutes ? `${hours}小时${remainMinutes}分` : `${hours} 小时`;
}

async function askCoach(message, task = null) {
  const activeTask = task || currentTask();
  chat.push({ role: "user", text: message });
  chat.push({ role: "assistant", text: "我在想怎么把你拉回来..." });
  els.chatInput.value = "";
  renderChat();

  try {
    const response = await fetch("./api/coach", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        message,
        currentTask: activeTask,
    avoidList: state.avoids.map(({ title, mantra, chineseMantra }) => ({ title, mantra, chineseMantra, active: title === activeAvoid()?.title })),
        recentChat: chat.slice(-8)
      })
    });
    const data = await response.json();
    chat[chat.length - 1] = { role: "assistant", text: data.reply || localCoachReply(message, activeTask) };
    els.modelLabel.textContent = data.model || "local";
  } catch {
    chat[chat.length - 1] = { role: "assistant", text: localCoachReply(message, activeTask) };
    els.modelLabel.textContent = "local";
  }

  saveChat();
  renderChat();
}

function addAssistant(text) {
  chat.push({ role: "assistant", text });
  saveChat();
  renderChat();
}

function localCoachReply(message, task) {
  const title = task?.title || "该做的事";
  if (/短视频|游戏|色情|躺刷|上瘾|瘾|想刷/.test(message)) {
    return "结论：现在继续刷，是把注意力卖给算法，不划算。你不是没救，只是被高刺激拽住了；但你已经意识到它在发生，这一步很关键。去戒断页，按住录音键，用英文说 5 遍“I never...”。然后喝水，坐起来。";
  }
  return `结论：别等状态变好，状态通常是行动之后才来的。打开「${title}」，只做 5 分钟；做完你再决定要不要继续。今天不需要演英雄，先把方向拉回来，这就已经比原地刷手机强。`;
}

function localPrincipleEnglish(chinese) {
  return "I turn this principle into action every day.";
}

function localReviewScore(text) {
  const score = Math.min(95, Math.max(55, Math.round(text.length / 8)));
  return `评分：${score}/100。肯定：你完成了复盘，这不是表演，是把人生拿回自己手里的一小步。漏洞：内容还不够具体，知识点、完成事项、状态原因和改进动作都要落到事实。明天只抓一个动作，别贪多，真实推进最重要。`;
}

function localCareerReply(message) {
  if (/C语言|手搓|代码/.test(message)) {
    return "结论：AI时代仍然要会手搓最小代码，但目标不是当苦力，而是建立判断力。你至少要能看懂变量、指针、结构体、函数、编译报错和基本调试。学习方式别刷课：每天写一个很小的程序，用AI解释，再自己改坏一次、修回来一次。这样你不是背C语言，而是在训练工程直觉。";
  }
  if (/ROS|ros|节点|Topic|Service|Action|turtlesim/.test(message)) {
    return "先别把ROS2想成巨大知识体系。今天只抓一条线：一个节点发布命令，另一个节点接收状态，你能画出数据流并跑通demo，就已经比空看教程强。卡住时记录：命令、报错、你试过什么、下一步假设。工程能力就是这样长出来的。";
  }
  if (/简历|投递|实习|岗位|面试/.test(message)) {
    return "你现在最该避免的是“学够了再投”。现实是：投递会反过来告诉你缺什么。今天至少投10份，岗位可以分三层：高匹配、中匹配、挑战岗。每份不是碰运气，而是收集市场反馈。投递、项目、面试表达要同步推进。";
  }
  if (/没做|未完成|没完成|卡住|做不完|拖延/.test(message)) {
    return "事实：没完成不是世界末日，但如果不复盘，它会变成惯性。现在只问三个问题：卡在环境、知识、情绪，还是任务太大？把未完成内容切成明天第一个25分钟能启动的动作。我已经先帮你顺延，明天不要重新谈理想，直接处理这个缺口。";
  }
  return "结论：具身智能这条路现在别幻想一步到核心算法。你更现实的入场身份是机器人系统工程型候选人：Linux、Git、Python、ROS2、项目演示、投递和面试表达。今天最重要的是制造证据：一条提交、一批投递、一段能讲清楚的项目解释。";
}
