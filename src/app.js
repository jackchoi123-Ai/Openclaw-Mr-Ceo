import { configured, store as fbStore, watchAuth, login, logout, resetPassword, currentEmail, onWriteError } from './store.js';

/* ===================== 语言 / Language ===================== */
const I18N = {
  zh: {
    app: '集团公司管理器', overview: '总览', mytasks: '我的任务', review: '周检视', exp: '导出', imp: '导入', langBtn: 'EN',
    types: { core: '主体公司', startup: '创业型', restart: '重启型' },
    health: { green: '正常', yellow: '关注', red: '预警' },
    stages: { core: ['稳定运营', '优化提升', '扩张'], startup: ['筹备', '验证', '起步', '增长', '稳定'], restart: ['盘点', '止损', '重组', '重新起步', '增长'] },
    pri: { high: '高', mid: '中', low: '低', none: '无' },
    kinds: { todo: '待办', followup: '长期跟进' },
    loading: '正在载入公司数据…',
    noCompanies: '还没有公司数据', noCompaniesSub: '四家公司的资料建好后会显示在这里。也可以点右上角「导入」恢复备份文件。',
    dueReminders: '到期提醒', pinned: '置顶跟进', companies: '公司',
    pinnedEmpty: '在「我的任务」里点图钉，把长期跟进事项置顶到这里，随时跟进。',
    openTodo: '待办', openFollow: '长期跟进', openRisks: '未解决风险',
    focus: '本期重点', notSet: '未设定', lastLog: '最近更新', noRecord: '暂无记录', daysAgo: n => `${n} 天前`,
    followingDays: n => `已跟进 ${n} 天`, notStarted: '未开始',
    quickUpdate: '写一句跟进进展…', record: '记录', done: '完成', snooze: '明天再提醒',
    lastUpdate: '最近进展', noUpdate: '还没有跟进记录',
    filters: { all: '全部', todo: '待办', followup: '长期跟进', starred: '已加星', pinned: '已置顶', done: '已完成' },
    sortBy: '排序', sorts: { created: '最新添加', priority: '优先级', remind: '提醒时间', start: '开启时间' },
    allCompanies: '所有公司', noCompany: '不属于公司',
    addTask: '添加任务', taskTitle: '任务名称', kind: '类型', company: '公司', owner: '负责人', start: '开启时间', remind: '提醒', priority: '优先级', notes: '备注',
    add: '添加', noTasks: '这里还没有任务', completed: n => `已完成（${n}）`, showDone: '显示', hideDone: '收起',
    star: '加星 / 书签', unstar: '取消加星', pin: '置顶到总览', unpin: '取消置顶', del: '删除', confirmDel: '确认删除',
    followLog: '跟进记录', addUpdate: '添加跟进记录', close: '收起',
    ownerPh: '例如：总经理姓名',
    tabInfo: '概况', tabTasks: '任务', tabLogs: '进展日志', tabRisks: '风险',
    basic: '基本信息', fullName: '公司全名', descZh: '说明（中文）', descEn: '说明（英文）', industry: '行业', type: '类型', healthL: '健康度',
    focusL: '本期重点（一句话）', focusPh: '这个月或这个季度最重要的一件事', stageHint: '点击阶段即可切换当前所处阶段', stageTitle: '设为当前阶段',
    kpi: '关键指标 KPI', kpiName: '指标名称', target: '目标', actual: '实际', unit: '单位', rate: '达成',
    kpiEmpty: '还没有指标。可以加：月营业额、在手合同额、订单数、现金余额、可撑月数。',
    logDate: '日期', logLabel: '进展 / 会议纪要 / 决定', logPh: '这次有什么进展？卡在哪里？做了什么决定？', noLogs: '还没有进展记录',
    riskPh: '风险或问题，例如：现金流只够 3 个月', level: '等级', plan: '应对措施', planNone: '未定', resolved: '已解决', noRisks: '没有登记风险',
    rvRemind: d => `未来 7 天的提醒和已到期提醒（截至 ${d}）`, rvStale: '超过 14 天没有跟进的长期事项', rvHighRisk: '高风险事项', rvLogs: '过去 7 天的进展', rvTable: '各公司状态一览',
    stage: '阶段', none: '没有', noHighRisk: '没有未解决的高风险事项', noWeekLogs: '这周还没有进展记录',
    localMode: '本地模式：现在打开的是离线版，数据只保存在这台设备的浏览器里。在 claude.ai 上打开这个页面，手机、平板、电脑会看到同一份数据。',
    slow: '暂时连不上数据，显示的内容可能不是最新的。', readOnly: '你现在是查看权限，只能看不能改。',
    errRO: '你只有查看权限，修改没有保存。', errQuota: '存储空间已满，请删除一些旧记录后再试。', errSave: '保存失败，请检查网络后再改一次。',
    errConn: '数据连接中断，请刷新页面。', errExport: '导出没有成功，请稍后再试。', errFile: '这个文件不是管理器的备份文件，请选择「导出」得到的 .json 文件。',
    importAsk: (a, b) => `导入备份：${a} 家公司、${b} 个任务，会覆盖同名的当前数据。`, importYes: '确认导入', cancel: '取消',
    footDb: '数据自动保存，手机、平板、电脑同步。建议每月「导出」一次做备份。', footLocal: '数据保存在本浏览器中，请定期「导出」备份。',
    tabDepts: '部门', levels: { normal: '普通', important: '重要', urgent: '着急', priority: '优先' },
    newDept: '新部门名称，例如：Account Department', addDept: '添加部门', presets: '快速添加：',
    deptEmpty: '还没有部门。在上面输入名称添加，或点下面的常用部门。',
    deptTaskPh: '添加 task…', deptNoTasks: '这个部门还没有 task', details: '细节', detailPh: '添加细节…', noDetails: '还没有细节',
    moveL: '往前移', moveR: '往后移', delDept: '删除部门', expand: '展开 / 收起',
    sumOpen: '未完成', sumOverdue: '已逾期', sumDone: '已完成', deptTasks: '部门 task',
    dueLabel: '日期时间', levelLabel: '等级',
    brand: 'GROUP OF COMPANIES', heroSub: n => `${n} 家公司 · 集团公司管理器`, navCompanies: '公司', navTasks: '任务', navReview: '周检视', navSettings: '设置',
    settings: '设置', setAccount: '账号与同步', signedIn: '登录账号', setLang: '语言', setData: '数据备份',
    expDesc: '把全部数据下载成一个备份文件', impDesc: '从备份文件恢复数据',
    statDept: '部门 task 未完成', statHot: '优先 / 着急', statDue: '到期提醒', statPinned: '置顶跟进',
    appearance: '外观', thAuto: '跟随系统', thLight: '白天', thDark: '暗黑', thCustom: '自定义',
    thBase: '底色', thAccent: '主题色', thBg: '背景色', thReset: '恢复默认颜色',
    logoUpload: '上传 Logo', logoChange: '更换 Logo', logoRemove: '移除 Logo', logoHint: '支持 PNG、JPG、SVG 等图片，会自动缩小。',
    logoErr: '这张图片无法使用，请换一张 PNG 或 JPG 图片。',
    people: '负责人名单', peopleHint: '在 task 里输入新名字会自动加入名单。', addPerson: '添加负责人', personPh: '负责人名字',
    allOwners: '全部负责人', noOwner: '未指定负责人', ownerSel: '负责人', removePerson: n => `从名单移除 ${n}`,
    loginTitle: '登录', email: '邮箱', password: '密码', loginBtn: '登录', loggingIn: '正在登录…', forgot: '忘记密码？',
    loginErr: '邮箱或密码不对，请再试一次。', loginOffline: '现在没有网络。第一次登录需要联网，之后就可以离线使用。',
    resetSent: e => `重设密码的邮件已发到 ${e}，请查收。`, resetNeedEmail: '请先在上面填写邮箱，再点「忘记密码」。',
    logout: '退出登录', noAccess: '这个账号没有权限查看数据。请用管理员开通的账号登录。',
    syncOk: '已同步', syncPending: '同步中…', syncOffline: '离线中 · 修改已存在本机，联网后自动同步',
    notConfigured: '尚未连接云端：现在是本地模式，数据只保存在这台设备。连接 Firebase 后即可多设备同步。',
    installHint: '提示：可以把这个页面「添加到主屏幕」，像 App 一样离线使用。',
  },
  en: {
    app: 'Group Company Manager', overview: 'Dashboard', mytasks: 'My Tasks', review: 'Weekly Review', exp: 'Export', imp: 'Import', langBtn: '中文',
    types: { core: 'Core company', startup: 'Startup', restart: 'Restart' },
    health: { green: 'On track', yellow: 'Watch', red: 'At risk' },
    stages: { core: ['Steady ops', 'Optimise', 'Expand'], startup: ['Prepare', 'Validate', 'Launch', 'Grow', 'Stable'], restart: ['Review', 'Stop loss', 'Restructure', 'Relaunch', 'Grow'] },
    pri: { high: 'High', mid: 'Medium', low: 'Low', none: 'None' },
    kinds: { todo: 'To-do', followup: 'Follow-up' },
    loading: 'Loading company data…',
    noCompanies: 'No company data yet', noCompaniesSub: 'The four companies will appear here once they are set up. You can also use Import to restore a backup file.',
    dueReminders: 'Reminders due', pinned: 'Pinned follow-ups', companies: 'Companies',
    pinnedEmpty: 'In My Tasks, tap the pin on a follow-up to keep it here on the dashboard.',
    openTodo: 'To-dos', openFollow: 'Follow-ups', openRisks: 'Open risks',
    focus: 'Focus', notSet: 'Not set', lastLog: 'Last update', noRecord: 'None yet', daysAgo: n => `${n} days ago`,
    followingDays: n => `Following for ${n} days`, notStarted: 'Not started',
    quickUpdate: 'Add a quick progress note…', record: 'Save', done: 'Done', snooze: 'Remind tomorrow',
    lastUpdate: 'Latest progress', noUpdate: 'No follow-up notes yet',
    filters: { all: 'All', todo: 'To-dos', followup: 'Follow-ups', starred: 'Starred', pinned: 'Pinned', done: 'Completed' },
    sortBy: 'Sort', sorts: { created: 'Newest', priority: 'Priority', remind: 'Reminder', start: 'Start date' },
    allCompanies: 'All companies', noCompany: 'No company',
    addTask: 'Add task', taskTitle: 'Task', kind: 'Type', company: 'Company', owner: 'Owner', start: 'Start date', remind: 'Reminder', priority: 'Priority', notes: 'Notes',
    add: 'Add', noTasks: 'No tasks here yet', completed: n => `Completed (${n})`, showDone: 'Show', hideDone: 'Hide',
    star: 'Star / bookmark', unstar: 'Remove star', pin: 'Pin to dashboard', unpin: 'Unpin', del: 'Delete', confirmDel: 'Confirm delete',
    followLog: 'Follow-up log', addUpdate: 'Add follow-up note', close: 'Close',
    ownerPh: 'e.g. general manager',
    tabInfo: 'Overview', tabTasks: 'Tasks', tabLogs: 'Progress log', tabRisks: 'Risks',
    basic: 'Basic info', fullName: 'Company name', descZh: 'Description (Chinese)', descEn: 'Description (English)', industry: 'Industry', type: 'Type', healthL: 'Health',
    focusL: 'Focus this period (one line)', focusPh: 'The single most important thing this month or quarter', stageHint: 'Tap a stage to set the current stage', stageTitle: 'Set as current stage',
    kpi: 'Key metrics (KPI)', kpiName: 'Metric', target: 'Target', actual: 'Actual', unit: 'Unit', rate: 'Achieved',
    kpiEmpty: 'No metrics yet. Try: monthly revenue, contract backlog, orders, cash balance, months of runway.',
    logDate: 'Date', logLabel: 'Progress / meeting notes / decisions', logPh: 'What moved? What is stuck? What was decided?', noLogs: 'No progress notes yet',
    riskPh: 'Risk or issue, e.g. cash covers only 3 months', level: 'Level', plan: 'Mitigation', planNone: 'None yet', resolved: 'Resolved', noRisks: 'No risks logged',
    rvRemind: d => `Reminders in the next 7 days and overdue (to ${d})`, rvStale: 'Follow-ups with no note for over 14 days', rvHighRisk: 'High risks', rvLogs: 'Progress in the past 7 days', rvTable: 'Company status',
    stage: 'Stage', none: 'None', noHighRisk: 'No open high risks', noWeekLogs: 'No progress notes this week',
    localMode: 'Local mode: this offline copy saves data only in this browser. Open the page on claude.ai to see the same data on your phone, tablet and computer.',
    slow: 'Cannot reach the data right now. What you see may be out of date.', readOnly: 'You have view access, so you can look but not change anything.',
    errRO: 'You have view access only, so the change was not saved.', errQuota: 'Storage is full. Delete some old records and try again.', errSave: 'Could not save. Check your connection and make the change again.',
    errConn: 'The data connection dropped. Refresh the page.', errExport: 'Export did not finish. Try again shortly.', errFile: 'This is not a manager backup. Choose a .json file made with Export.',
    importAsk: (a, b) => `Import backup: ${a} companies and ${b} tasks. Matching current data will be replaced.`, importYes: 'Import', cancel: 'Cancel',
    footDb: 'Saved automatically and synced across phone, tablet and computer. Export a backup once a month.', footLocal: 'Data is saved in this browser. Export a backup regularly.',
    tabDepts: 'Departments', levels: { normal: 'Normal', important: 'Important', urgent: 'Urgent', priority: 'Priority' },
    newDept: 'New department, e.g. Account Department', addDept: 'Add department', presets: 'Quick add:',
    deptEmpty: 'No departments yet. Type a name above, or tap a common one below.',
    deptTaskPh: 'Add a task…', deptNoTasks: 'No tasks in this department yet', details: 'Details', detailPh: 'Add a detail…', noDetails: 'No details yet',
    moveL: 'Move earlier', moveR: 'Move later', delDept: 'Delete department', expand: 'Expand / collapse',
    sumOpen: 'Open', sumOverdue: 'Overdue', sumDone: 'Done', deptTasks: 'Department tasks',
    dueLabel: 'Date & time', levelLabel: 'Level',
    brand: 'GROUP OF COMPANIES', heroSub: n => `${n} companies · group company manager`, navCompanies: 'Companies', navTasks: 'Tasks', navReview: 'Review', navSettings: 'Settings',
    settings: 'Settings', setAccount: 'Account & sync', signedIn: 'Signed in as', setLang: 'Language', setData: 'Backup',
    expDesc: 'Download all data as one backup file', impDesc: 'Restore data from a backup file',
    statDept: 'Open department tasks', statHot: 'Priority / urgent', statDue: 'Reminders due', statPinned: 'Pinned follow-ups',
    appearance: 'Appearance', thAuto: 'System', thLight: 'Light', thDark: 'Dark', thCustom: 'Custom',
    thBase: 'Base', thAccent: 'Accent colour', thBg: 'Background', thReset: 'Reset colours',
    logoUpload: 'Upload logo', logoChange: 'Change logo', logoRemove: 'Remove logo', logoHint: 'PNG, JPG, SVG and other images work; they are shrunk automatically.',
    logoErr: 'This image cannot be used. Try a PNG or JPG file.',
    people: 'Owners', peopleHint: 'Typing a new name on a task adds it to this list.', addPerson: 'Add owner', personPh: 'Owner name',
    allOwners: 'All owners', noOwner: 'No owner', ownerSel: 'Owner', removePerson: n => `Remove ${n} from the list`,
    loginTitle: 'Sign in', email: 'Email', password: 'Password', loginBtn: 'Sign in', loggingIn: 'Signing in…', forgot: 'Forgot password?',
    loginErr: 'That email or password is not right. Try again.', loginOffline: 'You are offline. The first sign-in needs a connection; after that the app works offline.',
    resetSent: e => `A password reset email was sent to ${e}.`, resetNeedEmail: 'Enter your email above first, then tap Forgot password.',
    logout: 'Sign out', noAccess: 'This account has no access to the data. Sign in with an account the admin has set up.',
    syncOk: 'Synced', syncPending: 'Syncing…', syncOffline: 'Offline · changes are saved on this device and sync when you reconnect',
    notConfigured: 'Not connected to the cloud: local mode, data stays on this device. Connect Firebase to sync across devices.',
    installHint: 'Tip: add this page to your home screen to use it like an app, even offline.',
  },
};
let lang = 'zh';
try { lang = localStorage.getItem('cm-lang') === 'en' ? 'en' : 'zh'; } catch {}
const L = () => I18N[lang];

/* ---------- appearance: auto / light / dark / custom (per device) ---------- */
const THEME_DEFAULT = { mode: 'auto', base: 'light', accent: '#0284c7', bg: '' };
const SWATCHES = ['#0284c7', '#0ea5e9', '#0f766e', '#15803d', '#b45309', '#be123c', '#7c3aed', '#334155'];
let theme = { ...THEME_DEFAULT };
try { Object.assign(theme, JSON.parse(localStorage.getItem('cm-theme') || '{}')); } catch {}
if (theme.accent === '#24548f') theme.accent = THEME_DEFAULT.accent;   // old default → new sky default
const saveTheme = () => { try { localStorage.setItem('cm-theme', JSON.stringify(theme)); } catch {} };
const hexOk = h => /^#[0-9a-f]{6}$/i.test(h || '');
function applyTheme() {
  const r = document.documentElement, st = r.style;
  ['--accent', '--accent-soft', '--accent-ink', '--accent-deep', '--sky', '--hero-a', '--hero-b', '--bg', '--panel', '--field', '--line'].forEach(v => st.removeProperty(v));
  const base = theme.mode === 'custom' ? theme.base : theme.mode;
  if (base === 'light' || base === 'dark') r.setAttribute('data-theme', base); else r.removeAttribute('data-theme');
  if (theme.mode === 'custom') {
    const dark = theme.base === 'dark';
    if (hexOk(theme.accent)) {
      const a = theme.accent;
      // pick readable text on the accent
      const n = parseInt(a.slice(1), 16), lum = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
      st.setProperty('--accent', dark ? `color-mix(in srgb, ${a} 70%, white)` : a);
      st.setProperty('--accent-ink', (dark ? lum > 0.35 : lum > 0.62) ? '#10141a' : '#ffffff');
      st.setProperty('--accent-soft', `color-mix(in srgb, ${a} ${dark ? 22 : 12}%, ${dark ? '#0f1e2b' : '#ffffff'})`);
      st.setProperty('--accent-deep', dark ? `color-mix(in srgb, ${a} 55%, white)` : `color-mix(in srgb, ${a} 70%, black)`);
      st.setProperty('--sky', `color-mix(in srgb, ${a} 65%, white)`);
      st.setProperty('--hero-a', dark ? `color-mix(in srgb, ${a} 45%, #08131d)` : `color-mix(in srgb, ${a} 70%, white)`);
      st.setProperty('--hero-b', dark ? `color-mix(in srgb, ${a} 25%, #04090e)` : `color-mix(in srgb, ${a} 80%, black)`);
    }
    if (hexOk(theme.bg)) {
      st.setProperty('--bg', theme.bg);
      st.setProperty('--panel', dark ? `color-mix(in srgb, ${theme.bg} 88%, white)` : `color-mix(in srgb, ${theme.bg} 25%, white)`);
      st.setProperty('--field', dark ? `color-mix(in srgb, ${theme.bg} 94%, white)` : `color-mix(in srgb, ${theme.bg} 70%, white)`);
      st.setProperty('--line', dark ? `color-mix(in srgb, ${theme.bg} 78%, white)` : `color-mix(in srgb, ${theme.bg} 85%, black)`);
    }
  }
  const meta = document.querySelector('meta[name=theme-color]');
  if (meta) meta.content = getComputedStyle(r).getPropertyValue('--panel').trim() || '#24548f';
}
applyTheme();
try { matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme); } catch {}

/* ===================== 常量 ===================== */
const LOCAL_KEY = 'company-manager-v2', LOCAL_KEY_V1 = 'company-manager-v1';
const TYPE_KEYS = ['core', 'startup', 'restart'], HEALTH_KEYS = ['green', 'yellow', 'red'];
const STAGE_COUNT = { core: 3, startup: 5, restart: 5 };
const PRI_KEYS = ['high', 'mid', 'low', 'none'], PRI_RANK = { high: 0, mid: 1, low: 2, none: 3 };
const LISTS = ['kpis', 'logs', 'risks'];
const DEPT_COMPANIES = ['A', 'B', 'C', 'D'];   // companies that use the department board
const LEVELS = ['normal', 'important', 'urgent', 'priority'], LEVEL_RANK = { priority: 0, urgent: 1, important: 2, normal: 3 };
const DEPT_PRESETS = {
  A: ['Account Department', 'Project Department', 'Purchasing Department', 'HR & Admin Department', 'Safety (HSE) Department', 'Tender & QS Department'],
  B: ['Account Department', 'R&D / Engineering Department', 'Production Department', 'Purchasing Department', 'Sales & Marketing Department', 'Licensing & Compliance Department', 'HR & Admin Department'],
  C: ['Account Department', 'Design Department', 'Project Department', 'Sales & Marketing Department', 'Purchasing Department', 'HR & Admin Department'],
  D: ['Account Department', 'Sales Department', 'Purchasing Department', 'Logistics & Warehouse Department', 'Marketing Department', 'HR & Admin Department'],
};

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const pad = n => String(n).padStart(2, '0');
const localDate = (off = 0) => { const d = new Date(Date.now() + off * 864e5); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
const today = () => localDate(0);
const nowLocal = () => { const d = new Date(); return `${today()}T${pad(d.getHours())}:${pad(d.getMinutes())}`; };

function localSeed() {
  const c = (code, name, cn, en, type, industry) => ({ code, name, cn, en, type, industry, stage: 0, health: 'green', owner: '', focus: '', kpis: [], logs: [], risks: [] });
  return [
    c('A', 'Simbaplus Engineering M Sdn Bhd', '主体建筑公司', 'Core construction company', 'core', '建筑工程'),
    c('B', 'Move Industrial Technology Sdn Bhd', '移动出行 · 电三轮制造', 'Mobility · electric tricycle maker', 'startup', '电动车制造'),
    c('C', 'Lavida Home Concepts Sdn Bhd', '室内设计公司', 'Interior design', 'startup', '室内设计'),
    c('D', 'Eco Space Panel M Sdn Bhd', '建材贸易公司', 'Building materials trading', 'startup', '建材贸易'),
  ];
}

/* ===================== 状态 ===================== */
const state = { mode: 'loading', companies: [], tasks: [], depts: [], canWrite: true, slow: false, error: '', pendingDel: null, pendingImport: null };
let view = { page: 'overview', id: null, tab: 'info' };
const ui = { filter: 'all', company: '', sort: 'created', showDone: false, openTask: null };
try { Object.assign(ui, JSON.parse(localStorage.getItem('cm-ui') || '{}'), { openTask: null }); } catch {}
const saveUi = () => { try { localStorage.setItem('cm-ui', JSON.stringify({ filter: ui.filter, company: ui.company, sort: ui.sort, showDone: ui.showDone })); } catch {} };
let store = null;

const normCompany = c => {
  const o = { ...c };
  LISTS.forEach(k => { o[k] = Array.isArray(c[k]) ? c[k].map(x => ({ ...x })) : []; });
  delete o.milestones;
  if (!TYPE_KEYS.includes(o.type)) o.type = 'startup';
  o.stage = Math.min(Math.max(Number(o.stage) || 0, 0), STAGE_COUNT[o.type] - 1);
  if (!HEALTH_KEYS.includes(o.health)) o.health = 'green';
  o.people = Array.isArray(c.people) ? [...new Set(c.people.map(x => String(x).trim()).filter(Boolean))] : [];
  return o;
};
const normTask = t => ({
  id: t.id || uid(), title: t.title || '', notes: t.notes || '', kind: t.kind === 'followup' ? 'followup' : 'todo',
  company: t.company || '', owner: t.owner || '', start: t.start || '', remind: t.remind || '',
  priority: PRI_KEYS.includes(t.priority) ? t.priority : 'none', starred: !!t.starred, pinned: !!t.pinned, done: !!t.done,
  doneAt: t.doneAt || '', createdAt: t.createdAt || new Date().toISOString(),
  updates: Array.isArray(t.updates) ? t.updates.map(u => ({ ...u })) : [],
});
const setCompanies = list => { state.companies = list.map(normCompany).sort((a, b) => String(a.code).localeCompare(String(b.code))); };
const setTasks = list => { state.tasks = list.map(normTask); };
const normDetail = d => ({ id: d.id || uid(), text: d.text || '', date: d.date || '', done: !!d.done });
const normDTask = t => ({
  id: t.id || uid(), title: t.title || '', owner: (t.owner || '').trim(), due: t.due || '', level: LEVELS.includes(t.level) ? t.level : 'normal',
  done: !!t.done, doneAt: t.doneAt || '', createdAt: t.createdAt || new Date().toISOString(),
  details: Array.isArray(t.details) ? t.details.map(normDetail) : [],
});
const normDept = d => ({ id: d.id || uid(), company: d.company || 'A', name: d.name || '', order: Number(d.order) || 0, tasks: Array.isArray(d.tasks) ? d.tasks.map(normDTask) : [] });
const setDepts = list => { state.depts = list.map(normDept).sort((a, b) => a.order - b.order || a.name.localeCompare(b.name)); };
const dp = id => state.depts.find(x => x.id === id);
const deptsOf = code => state.depts.filter(d => d.company === code);
const co = code => state.companies.find(x => x.code === code);
const tk = id => state.tasks.find(x => x.id === id);

/* old company.tasks → standalone tasks (v1 data / old backups) */
function liftCompanyTasks(companies) {
  const out = [];
  companies.forEach(c => (c.tasks || []).forEach(t => out.push(normTask({ ...t, id: undefined, company: c.code, kind: 'todo', remind: t.due ? t.due + 'T09:00' : '' }))));
  return out;
}

/* ---- writes: one in flight per document, latest state wins ---- */
const writeQ = {};
function saveLocal() { try { localStorage.setItem(LOCAL_KEY, JSON.stringify({ companies: state.companies, tasks: state.tasks, depts: state.depts })); } catch {} }
function queueWrite(coll, id, body) {
  if (state.mode === 'local') return saveLocal();
  if (state.mode !== 'db') return;
  const key = coll + '/' + id;
  const q = writeQ[key] || (writeQ[key] = { busy: false, next: undefined });
  q.next = body === null ? null : JSON.parse(JSON.stringify(body));
  if (!q.busy) flush(coll, id, q);
}
async function flush(coll, id, q) {
  q.busy = true;
  while (q.next !== undefined) {
    const body = q.next; q.next = undefined;
    const ref = store.collection(coll).doc(id);
    try { body === null ? await ref.delete() : await ref.set(body); }
    catch (e) {
      if (e && e.code === 'invalid_argument') { state.canWrite = false; state.error = 'errRO'; }
      else if (e && e.code === 'quota_exceeded') state.error = 'errQuota';
      else state.error = 'errSave';
      render();
    }
  }
  q.busy = false;
}
function mutate(code, fn) {
  const c = co(code);
  if (!c || !state.canWrite) return;
  fn(c);
  queueWrite('companies', c.code, c);
  render();
}
const taskBody = t => { const { id, ...body } = t; return body; };
function mutateTask(id, fn) {
  const t = tk(id);
  if (!t || !state.canWrite) return;
  fn(t);
  queueWrite('mytasks', t.id, taskBody(t));
  render();
}
function addTask(t) {
  if (!state.canWrite) return;
  const task = normTask(t);
  state.tasks.push(task);
  queueWrite('mytasks', task.id, taskBody(task));
  render();
}
const deptBody = d => ({ company: d.company, name: d.name, order: d.order });
const dtaskBody = (d, t) => { const { id, ...body } = t; return { ...body, deptId: d.id, company: d.company }; };
function mutateDept(id, fn) {
  const d = dp(id);
  if (!d || !state.canWrite) return;
  fn(d);
  queueWrite('departments', d.id, deptBody(d));
  render();
}
function mutateDTask(did, tid, fn) {
  const d = dp(did), t = d && d.tasks.find(x => x.id === tid);
  if (!t || !state.canWrite) return;
  fn(t);
  queueWrite('dtasks', t.id, dtaskBody(d, t));
  render();
}
function addDTask(did, data) {
  const d = dp(did);
  if (!d || !state.canWrite) return;
  const t = normDTask(data);
  d.tasks.push(t);
  queueWrite('dtasks', t.id, dtaskBody(d, t));
  render();
}
function removeDTask(did, tid) {
  const d = dp(did); if (!d) return;
  d.tasks = d.tasks.filter(t => t.id !== tid);
  queueWrite('dtasks', tid, null);
  render();
}
/* in cloud mode departments and their tasks arrive as separate collections */
let deptMeta = [], dtaskDocs = [];
function rebuildDepts() {
  const by = {};
  dtaskDocs.forEach(t => (by[t.deptId] = by[t.deptId] || []).push(t));
  setDepts(deptMeta.map(d => ({ ...d, tasks: by[d.id] || [] })));
}
function addDept(company, name) {
  if (!state.canWrite || !name) return;
  const mine = deptsOf(company);
  const d = normDept({ company, name, order: mine.length ? Math.max(...mine.map(x => x.order)) + 1 : 1 });
  state.depts.push(d);
  queueWrite('departments', d.id, deptBody(d));
  render();
}
function moveDept(id, dir) {
  const d = dp(id); if (!d || !state.canWrite) return;
  const list = deptsOf(d.company), i = list.indexOf(d), j = i + dir;
  if (j < 0 || j >= list.length) return;
  list.forEach((x, k) => { x.order = k + 1; });
  [list[i].order, list[j].order] = [list[j].order, list[i].order];
  setDepts(state.depts);
  list.forEach(x => queueWrite('departments', x.id, deptBody(x)));
  render();
}
function removeDept(id) {
  const d = dp(id);
  state.depts = state.depts.filter(x => x.id !== id);
  queueWrite('departments', id, null);
  if (d && state.mode === 'db') d.tasks.forEach(t => queueWrite('dtasks', t.id, null));
  render();
}
function removeTask(id) {
  state.tasks = state.tasks.filter(x => x.id !== id);
  if (ui.openTask === id) ui.openTask = null;
  queueWrite('mytasks', id, null);
  render();
}

/* ===================== 工具 ===================== */
const esc = s => String(s ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
const daysBetween = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / 864e5);
const ro = () => state.canWrite ? '' : 'disabled';
const isDue = t => !t.done && t.remind && t.remind <= nowLocal();
const fmtRemind = r => r ? r.replace('T', ' ') : '';
const cDesc = c => (lang === 'en' ? (c.en || c.cn) : (c.cn || c.en)) || '';
const lastUpd = t => t.updates.slice().sort((a, b) => b.date.localeCompare(a.date))[0];
const opt = (keys, labels, cur) => keys.map(k => `<option value="${k}" ${cur === k ? 'selected' : ''}>${esc(labels[k])}</option>`).join('');
const companyOpts = (cur, allLabel) => `<option value="">${esc(allLabel)}</option>` + state.companies.map(c => `<option value="${esc(c.code)}" ${cur === c.code ? 'selected' : ''}>${esc(c.code)} · ${esc(c.name)}</option>`).join('');
const SVG_STAR = on => `<svg viewBox="0 0 24 24" fill="${on ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>`;
const SVG_PIN = on => `<svg viewBox="0 0 24 24" fill="${on ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"><path d="M9 3h6l-1 6 4 3v2H6v-2l4-3z"/><path d="M12 14v7"/></svg>`;
const SVG_BELL = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" style="vertical-align:-1px"><path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>`;

function summary(c) {
  const mine = state.tasks.filter(t => t.company === c.code && !t.done);
  const lastLog = c.logs.map(l => l.date).sort().pop();
  return {
    todo: mine.filter(t => t.kind === 'todo').length, follow: mine.filter(t => t.kind === 'followup').length,
    due: mine.filter(isDue).length, risks: c.risks.filter(r => !r.closed).length,
    lastLog, stale: lastLog ? daysBetween(lastLog, today()) : null,
  };
}
/* company badge: uploaded logo, or the company letter */
function badge(code, size = '') {
  const c = co(code), cls = 'code' + (size ? ' ' + size : '');
  const name = c ? c.name : code;
  return c && c.logo
    ? `<span class="${cls} has-logo" title="${esc(name)}"><img src="${esc(c.logo)}" alt="${esc(name)}"></span>`
    : `<span class="${cls}" title="${esc(name)}">${esc(code)}</span>`;
}
const LOGO_PX = 256;
/* shrink an uploaded image to a small square (keeps its shape, transparent padding) */
async function logoFromFile(file) {
  if (!file || !/^image\//.test(file.type)) throw new Error('type');
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((ok, bad) => { const i = new Image(); i.onload = () => ok(i); i.onerror = bad; i.src = url; });
    const cv = document.createElement('canvas'); cv.width = cv.height = LOGO_PX;
    const g = cv.getContext('2d');
    const k = Math.min(LOGO_PX / img.naturalWidth, LOGO_PX / img.naturalHeight);
    const w = img.naturalWidth * k, h = img.naturalHeight * k;
    g.imageSmoothingQuality = 'high';
    g.drawImage(img, (LOGO_PX - w) / 2, (LOGO_PX - h) / 2, w, h);
    let out = cv.toDataURL('image/webp', 0.9);
    if (!out.startsWith('data:image/webp')) out = cv.toDataURL('image/png');
    if (out.length > 400000) throw new Error('size');
    return out;
  } finally { URL.revokeObjectURL(url); }
}
let logoTarget = null;
const healthChip = h => `<span class="health ${h}">${esc(L().health[h])}</span>`;
function pipeline(c, clickable) {
  return `<div class="pipeline">${L().stages[c.type].map((s, i) => {
    const cls = i < c.stage ? 'done' : i === c.stage ? 'now' : '';
    return clickable && state.canWrite
      ? `<button class="${cls}" data-act="stage" data-i="${i}" title="${esc(L().stageTitle)}">${esc(s)}</button>`
      : `<span class="${cls}">${esc(s)}</span>`;
  }).join('')}</div>`;
}
function delBtn(kind, id) {
  if (!state.canWrite) return '';
  const key = kind + ':' + id;
  return state.pendingDel === key
    ? `<button class="danger" data-act="del" data-kind="${kind}" data-item="${id}">${esc(L().confirmDel)}</button>`
    : `<button class="ghost" data-act="del-ask" data-key="${key}" aria-label="${esc(L().del)}" title="${esc(L().del)}">✕</button>`;
}

/* ===================== 任务列表组件 ===================== */
function taskMeta(t, showCompany = true) {
  const m = [];
  m.push(`<span class="tag ${t.kind === 'followup' ? 'follow' : ''}">${esc(L().kinds[t.kind])}</span>`);
  if (showCompany && t.company) m.push(badge(t.company, 'sm'));
  if (t.priority !== 'none') m.push(`<span class="pri ${t.priority}">${esc(L().pri[t.priority])}</span>`);
  if (t.owner) m.push(`<span>👤 ${esc(t.owner)}</span>`);
  if (t.start) m.push(`<span class="mono">▶ ${esc(t.start)}</span>`);
  if (t.remind) m.push(`<span class="${isDue(t) ? 'tag due' : 'mono'}">${SVG_BELL} ${esc(fmtRemind(t.remind))}</span>`);
  if (t.kind === 'followup' && t.updates.length) m.push(`<span>📝 ${t.updates.length}</span>`);
  return `<div class="task-meta">${m.join('')}</div>`;
}

function taskRow(t, opts = {}) {
  const open = ui.openTask === t.id;
  const T = L();
  return `<div class="task ${t.done ? 'is-done' : ''} ${open ? 'open' : ''}" id="task-${t.id}">
    <button class="circle ${t.done ? 'checked' : ''}" data-act="t-done" data-tid="${t.id}" aria-label="${esc(T.done)}" ${ro()}>✓</button>
    <div class="task-main">
      <div data-act="t-open" data-tid="${t.id}">
        <div class="task-title">${esc(t.title)}</div>
        ${t.notes && !open ? `<div class="task-notes">${esc(t.notes)}</div>` : ''}
        ${taskMeta(t, !opts.hideCompany)}
      </div>
      ${open ? taskEditor(t) : ''}
    </div>
    <div class="task-acts">
      <button class="icon-btn ${t.starred ? 'on-star' : ''}" data-act="t-star" data-tid="${t.id}" title="${esc(t.starred ? T.unstar : T.star)}" aria-label="${esc(t.starred ? T.unstar : T.star)}" aria-pressed="${t.starred}" ${ro()}>${SVG_STAR(t.starred)}</button>
      <button class="icon-btn ${t.pinned ? 'on-pin' : ''}" data-act="t-pin" data-tid="${t.id}" title="${esc(t.pinned ? T.unpin : T.pin)}" aria-label="${esc(t.pinned ? T.unpin : T.pin)}" aria-pressed="${t.pinned}" ${ro()}>${SVG_PIN(t.pinned)}</button>
    </div>
  </div>`;
}

function taskEditor(t) {
  const T = L(), d = ro(), id = t.id;
  const ups = t.updates.slice().sort((a, b) => b.date.localeCompare(a.date));
  return `<div class="editor">
    <div><label for="te-title-${id}">${esc(T.taskTitle)}</label><input id="te-title-${id}" data-tfield="title" data-tid="${id}" value="${esc(t.title)}" ${d}></div>
    <div><label for="te-notes-${id}">${esc(T.notes)}</label><textarea id="te-notes-${id}" data-tfield="notes" data-tid="${id}" ${d}>${esc(t.notes)}</textarea></div>
    <div class="row">
      <div><label for="te-kind-${id}">${esc(T.kind)}</label><select id="te-kind-${id}" data-tfield="kind" data-tid="${id}" ${d}>${opt(['todo', 'followup'], T.kinds, t.kind)}</select></div>
      <div><label for="te-company-${id}">${esc(T.company)}</label><select id="te-company-${id}" data-tfield="company" data-tid="${id}" ${d}>${companyOpts(t.company, T.noCompany)}</select></div>
      <div><label for="te-owner-${id}">${esc(T.owner)}</label><input id="te-owner-${id}" data-tfield="owner" data-tid="${id}" value="${esc(t.owner)}" placeholder="${esc(T.ownerPh)}" list="${t.company ? 'people-' + esc(t.company) : 'people-all'}" autocomplete="off" ${d}></div>
    </div>
    <div class="row">
      <div><label for="te-start-${id}">${esc(T.start)}</label><input type="date" id="te-start-${id}" data-tfield="start" data-tid="${id}" value="${esc(t.start)}" ${d}></div>
      <div><label for="te-remind-${id}">${esc(T.remind)}</label><input type="datetime-local" id="te-remind-${id}" data-tfield="remind" data-tid="${id}" value="${esc(t.remind)}" ${d}></div>
      <div><label for="te-pri-${id}">${esc(T.priority)}</label><select id="te-pri-${id}" data-tfield="priority" data-tid="${id}" ${d}>${opt(PRI_KEYS, T.pri, t.priority)}</select></div>
    </div>
    <div>
      <label>${esc(T.followLog)}</label>
      ${state.canWrite ? `<form data-form="tupdate" data-tid="${id}" id="tu-form-${id}" style="display:flex;gap:6px">
        <input name="text" id="tu-text-${id}" placeholder="${esc(T.quickUpdate)}" required aria-label="${esc(T.addUpdate)}">
        <button class="primary small">${esc(T.record)}</button></form>` : ''}
      ${ups.length ? ups.map(u => `<div class="upd"><span class="date">${esc(u.date)}</span><div class="grow">${esc(u.text)}</div>${delBtn('upd-' + id, u.id)}</div>`).join('') : `<div class="sub" style="padding-top:4px">${esc(T.noUpdate)}</div>`}
    </div>
    <div class="row" style="justify-content:space-between">
      <button class="fixed" data-act="t-close">${esc(T.close)}</button>
      <span class="fixed">${delBtn('task', id)}</span>
    </div>
  </div>`;
}

function addTaskForm(fixedCompany) {
  if (!state.canWrite) return '';
  const T = L(), p = fixedCompany ? 'ac' : 'at';
  const defKind = ui.filter === 'followup' && !fixedCompany ? 'followup' : 'todo';
  return `<div class="card add-card"><form data-form="task" id="${p}-form" ${fixedCompany ? `data-company="${esc(fixedCompany)}"` : ''}>
    <div class="row">
      <div style="flex-basis:260px"><label for="${p}-title">${esc(T.taskTitle)}</label><input name="title" id="${p}-title" required placeholder="${esc(T.addTask)}…"></div>
      <div class="w-sm"><label for="${p}-kind">${esc(T.kind)}</label><select name="kind" id="${p}-kind">${opt(['todo', 'followup'], T.kinds, defKind)}</select></div>
      ${fixedCompany ? '' : `<div><label for="${p}-company">${esc(T.company)}</label><select name="company" id="${p}-company">${companyOpts(ui.company, T.noCompany)}</select></div>`}
    </div>
    <div class="row" style="margin-top:8px">
      <div><label for="${p}-owner">${esc(T.owner)}</label><input name="owner" id="${p}-owner" placeholder="${esc(T.ownerPh)}" list="${fixedCompany ? 'people-' + esc(fixedCompany) : 'people-all'}" autocomplete="off"></div>
      <div class="w-date"><label for="${p}-start">${esc(T.start)}</label><input type="date" name="start" id="${p}-start" value="${today()}"></div>
      <div style="flex:0 1 210px"><label for="${p}-remind">${esc(T.remind)}</label><input type="datetime-local" name="remind" id="${p}-remind"></div>
      <div class="w-sm"><label for="${p}-pri">${esc(T.priority)}</label><select name="priority" id="${p}-pri">${opt(PRI_KEYS, T.pri, 'none')}</select></div>
      <button class="primary">${esc(T.add)}</button>
    </div>
  </form></div>`;
}

function sortTasks(list) {
  const cmp = {
    created: (a, b) => b.createdAt.localeCompare(a.createdAt),
    priority: (a, b) => PRI_RANK[a.priority] - PRI_RANK[b.priority] || b.createdAt.localeCompare(a.createdAt),
    remind: (a, b) => (a.remind || '9').localeCompare(b.remind || '9'),
    start: (a, b) => (a.start || '9').localeCompare(b.start || '9'),
  }[ui.sort] || (() => 0);
  return list.slice().sort(cmp);
}

function taskList(list, opts = {}) {
  const T = L();
  const open = sortTasks(list.filter(t => !t.done));
  const done = list.filter(t => t.done).sort((a, b) => (b.doneAt || '').localeCompare(a.doneAt || ''));
  if (opts.onlyDone) return `<div class="card">${done.length ? done.map(t => taskRow(t, opts)).join('') : `<div class="empty">${esc(T.noTasks)}</div>`}</div>`;
  return `<div class="card">${open.length ? open.map(t => taskRow(t, opts)).join('') : `<div class="empty">${esc(T.noTasks)}</div>`}
    ${done.length ? `<div class="section-toggle"><button class="small" data-act="toggle-done" aria-expanded="${ui.showDone}">${esc(T.completed(done.length))} · ${esc(ui.showDone ? T.hideDone : T.showDone)}</button></div>
      ${ui.showDone ? done.map(t => taskRow(t, opts)).join('') : ''}` : ''}
  </div>`;
}

/* ===================== 页面：我的任务 ===================== */
const FILTERS = {
  all: x => true, todo: x => x.kind === 'todo', followup: x => x.kind === 'followup',
  starred: x => x.starred, pinned: x => x.pinned, done: x => x.done,
};
function renderTasks() {
  const T = L();
  let list = state.tasks;
  if (ui.company) list = list.filter(t => t.company === ui.company);
  if (!FILTERS[ui.filter]) ui.filter = 'all';
  const counts = {};
  Object.keys(FILTERS).forEach(k => { counts[k] = list.filter(x => FILTERS[k](x) && (k === 'done' || !x.done)).length; });
  const shown = list.filter(FILTERS[ui.filter]);
  return `
  <div class="filters" role="tablist">${Object.keys(FILTERS).map(k => `<button role="tab" aria-selected="${ui.filter === k}" class="${ui.filter === k ? 'active' : ''}" data-act="filter" data-f="${k}">${esc(T.filters[k])} <span class="num">${counts[k]}</span></button>`).join('')}</div>
  <div class="toolbar">
    <select id="flt-company" data-ui="company" aria-label="${esc(T.company)}">${companyOpts(ui.company, T.allCompanies)}</select>
    <select id="flt-sort" data-ui="sort" aria-label="${esc(T.sortBy)}">${opt(Object.keys(T.sorts), T.sorts, ui.sort)}</select>
  </div>
  ${ui.filter === 'done' ? '' : addTaskForm(null)}
  ${taskList(shown, { onlyDone: ui.filter === 'done' })}`;
}

/* ===================== 页面：总览 ===================== */
function renderOverview() {
  const T = L();
  if (!state.companies.length && !state.tasks.length) return `<div class="card"><h3>${esc(T.noCompanies)}</h3><div class="sub">${esc(T.noCompaniesSub)}</div></div>`;
  const due = state.tasks.filter(isDue).sort((a, b) => a.remind.localeCompare(b.remind));
  const pinned = sortTasks(state.tasks.filter(t => t.pinned && !t.done));
  const ds = state.companies.reduce((acc, c) => { const x = deptStats(c.code); acc.open += x.open; acc.hot += x.byLevel.priority + x.byLevel.urgent; return acc; }, { open: 0, hot: 0 });
  const dateLine = new Date().toLocaleDateString(lang === 'en' ? 'en-GB' : 'zh-CN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const stat = (n, label, act, alert) => `<button class="hero-stat ${alert && n ? 'alert' : ''}" ${act}><b>${n}</b><span>${esc(label)}</span></button>`;
  return `
  <section class="hero">
    <div class="hero-eyebrow">${esc(dateLine)}</div>
    <h1 class="hero-title">${esc(T.brand)}</h1>
    <div class="hero-sub">${esc(T.heroSub(state.companies.length))}</div>
    <div class="hero-stats">
      ${stat(ds.open, T.statDept, 'data-act="page" data-page="companies"')}
      ${stat(ds.hot, T.statHot, 'data-act="page" data-page="companies"', true)}
      ${stat(due.length, T.statDue, 'data-act="page" data-page="review"', true)}
      ${stat(pinned.length, T.statPinned, 'data-act="page" data-page="tasks"')}
    </div>
  </section>
  ${due.length ? `<h2>${SVG_BELL.replace('width="12" height="12"', 'width="16" height="16"')} ${esc(T.dueReminders)} <span class="badge">${due.length}</span></h2>
    <div class="card">${due.map(t => `<div class="list-item">
      ${t.company ? badge(t.company, 'sm') : ''}
      <div class="grow"><div style="cursor:pointer" data-act="goto-task" data-tid="${t.id}" tabindex="0" role="button">${esc(t.title)}</div>
        <div class="sub mono">${esc(fmtRemind(t.remind))}${t.owner ? ' · ' + esc(t.owner) : ''}</div></div>
      ${state.canWrite ? `<div class="chips"><button class="small" data-act="t-snooze" data-tid="${t.id}">${esc(T.snooze)}</button><button class="small primary" data-act="t-done" data-tid="${t.id}">${esc(T.done)}</button></div>` : ''}
    </div>`).join('')}</div>` : ''}

  <h2>${SVG_PIN(true).replace('<svg ', '<svg width="16" height="16" style="color:var(--accent)" ')} ${esc(T.pinned)}</h2>
  ${pinned.length ? `<div class="pin-grid">${pinned.map(pinCard).join('')}</div>` : `<div class="card empty">${esc(T.pinnedEmpty)}</div>`}

  <h2>${esc(T.companies)} <span class="count">${state.companies.length}</span></h2>
  ${companyGrid()}`;
}

function companyGrid() {
  const T = L();
  return `<div class="grid">${state.companies.map(c => { const s = summary(c); return `
    <div class="card company-card h-${c.health}" data-act="open" data-id="${esc(c.code)}" tabindex="0" role="button" aria-label="${esc(c.name)}">
      <div class="title-row">${badge(c.code, 'lg')}
        <div style="min-width:0"><div class="cname">${esc(c.name)}</div><div class="sub">${esc(cDesc(c))}</div></div></div>
      <div class="chips"><span class="tag">${esc(T.types[c.type])}</span>${healthChip(c.health)}${s.due ? `<span class="tag due">${SVG_BELL} ${s.due}</span>` : ''}</div>
      <div class="stats">
        <div><b>${s.todo}</b><span>${esc(T.openTodo)}</span></div>
        <div><b>${s.follow}</b><span>${esc(T.openFollow)}</span></div>
        <div><b class="${s.risks ? 'warn' : ''}">${s.risks}</b><span>${esc(T.openRisks)}</span></div>
      </div>
      ${DEPT_COMPANIES.includes(c.code) && deptsOf(c.code).length ? (() => { const ds = deptStats(c.code); return `<div class="sub chips"><b>${esc(T.deptTasks)}：</b><span class="num">${ds.open}</span> ${esc(T.sumOpen)}
        ${ds.byLevel.priority ? `<span class="lv priority">${esc(T.levels.priority)} ${ds.byLevel.priority}</span>` : ''}
        ${ds.byLevel.urgent ? `<span class="lv urgent">${esc(T.levels.urgent)} ${ds.byLevel.urgent}</span>` : ''}
        ${ds.overdue ? `<span class="tag due">${esc(T.sumOverdue)} ${ds.overdue}</span>` : ''}</div>`; })() : ''}
      <div class="sub"><b>${esc(T.focus)}：</b>${c.focus ? esc(c.focus) : esc(T.notSet)}</div>
      <div class="sub ${s.stale === null || s.stale > 14 ? 'warn' : ''}"><b>${esc(T.lastLog)}：</b>${s.lastLog ? `<span class="num">${s.lastLog}</span>（${esc(T.daysAgo(s.stale))}）` : esc(T.noRecord)}</div>
    </div>`; }).join('')}
  </div>`;
}

function pinCard(t) {
  const T = L(), lu = lastUpd(t);
  const days = t.start ? daysBetween(t.start, today()) : null;
  return `<div class="card pin-card">
    <div class="title-row" style="align-items:flex-start;gap:8px">
      ${t.company ? badge(t.company, 'sm') : ''}
      <div class="ttl grow" data-act="goto-task" data-tid="${t.id}" tabindex="0" role="button">${esc(t.title)}</div>
      <button class="icon-btn ${t.starred ? 'on-star' : ''}" data-act="t-star" data-tid="${t.id}" aria-label="${esc(t.starred ? T.unstar : T.star)}" title="${esc(t.starred ? T.unstar : T.star)}" ${ro()}>${SVG_STAR(t.starred)}</button>
      <button class="icon-btn on-pin" data-act="t-pin" data-tid="${t.id}" aria-label="${esc(T.unpin)}" title="${esc(T.unpin)}" ${ro()}>${SVG_PIN(true)}</button>
    </div>
    <div class="task-meta">
      <span class="tag ${t.kind === 'followup' ? 'follow' : ''}">${esc(T.kinds[t.kind])}</span>
      ${t.priority !== 'none' ? `<span class="pri ${t.priority}">${esc(T.pri[t.priority])}</span>` : ''}
      ${t.owner ? `<span>👤 ${esc(t.owner)}</span>` : ''}
      ${days === null ? '' : `<span>${esc(days < 0 ? T.notStarted : T.followingDays(days))}</span>`}
      ${t.remind ? `<span class="${isDue(t) ? 'tag due' : 'mono'}">${SVG_BELL} ${esc(fmtRemind(t.remind))}</span>` : ''}
    </div>
    <div class="last">${lu ? `<span class="date">${esc(lu.date)}</span> ${esc(lu.text)}` : `<span class="sub">${esc(T.noUpdate)}</span>`}</div>
    ${state.canWrite ? `<form data-form="tupdate" data-tid="${t.id}" id="pu-form-${t.id}">
      <input name="text" id="pu-text-${t.id}" placeholder="${esc(T.quickUpdate)}" required aria-label="${esc(T.addUpdate)}">
      <button class="primary small">${esc(T.record)}</button></form>` : ''}
  </div>`;
}

/* ===================== 页面：周检视 ===================== */
function renderReview() {
  const T = L(), weekAgo = localDate(-7), in7 = localDate(7) + 'T23:59';
  const C = state.companies;
  const remind = state.tasks.filter(t => !t.done && t.remind && t.remind <= in7);
  const stale = state.tasks.filter(t => !t.done && t.kind === 'followup').filter(t => { const lu = lastUpd(t); const ref = lu ? lu.date : (t.start || t.createdAt.slice(0, 10)); return daysBetween(ref, today()) > 14; });
  const logs = C.flatMap(c => c.logs.filter(l => l.date >= weekAgo).map(l => ({ c, l }))).sort((a, b) => b.l.date.localeCompare(a.l.date));
  const risks = C.flatMap(c => c.risks.filter(r => !r.closed && r.level === 'high').map(r => ({ c, r })));
  return `
  <h2>${esc(T.rvRemind(localDate(7)))}</h2>${remind.length ? taskList(remind) : `<div class="card empty">${esc(T.none)}</div>`}
  <h2>${esc(T.rvStale)}</h2>${stale.length ? taskList(stale) : `<div class="card empty">${esc(T.none)}</div>`}
  <h2>${esc(T.rvHighRisk)}</h2>
  <div class="card">${risks.length ? risks.map(({ c, r }) => `<div class="list-item">${badge(c.code, 'sm')}
    <div class="grow"><div>${esc(r.text)}</div><div class="sub">${esc(T.plan)}：${esc(r.plan || T.planNone)}</div></div></div>`).join('') : `<div class="empty">${esc(T.noHighRisk)}</div>`}</div>
  <h2>${esc(T.rvLogs)}</h2>
  <div class="card">${logs.length ? logs.map(({ c, l }) => `<div class="list-item">${badge(c.code, 'sm')}
    <div class="grow">${esc(l.text).replace(/\n/g, '<br>')}</div><span class="date">${l.date}</span></div>`).join('') : `<div class="empty">${esc(T.noWeekLogs)}</div>`}</div>
  <h2>${esc(T.rvTable)}</h2>
  <div class="card table-wrap"><table><tr><th>${esc(T.company)}</th><th>${esc(T.type)}</th><th>${esc(T.healthL)}</th><th>${esc(T.openTodo)}</th><th>${esc(T.openFollow)}</th><th>${esc(T.lastLog)}</th></tr>
    ${C.map(c => { const s = summary(c); return `<tr><td><b class="mono">${esc(c.code)}</b> ${esc(cDesc(c))}</td><td>${esc(T.types[c.type])}</td>
      <td>${healthChip(c.health)}</td>
      <td class="num">${s.todo}</td><td class="num">${s.follow}</td><td class="date">${s.lastLog || '—'}</td></tr>`; }).join('')}
  </table></div>`;
}

/* ===================== 页面：公司详情 ===================== */
function renderDetail() {
  const T = L(), c = co(view.id);
  if (!c) { view = { page: 'overview', id: null, tab: 'info' }; return renderOverview(); }
  const s = summary(c);
  const tabs = {};
  if (DEPT_COMPANIES.includes(c.code)) tabs.depts = T.tabDepts + ' ' + deptStats(c.code).open;
  Object.assign(tabs, { info: T.tabInfo, tasks: `${T.tabTasks} ${s.todo + s.follow}`, logs: `${T.tabLogs} ${c.logs.length}`, risks: `${T.tabRisks} ${s.risks}` });
  if (!tabs[view.tab]) view.tab = Object.keys(tabs)[0];
  return `
  <div class="switcher" role="tablist" aria-label="${esc(T.companies)}">${state.companies.map(x => `<button role="tab" aria-selected="${x.code === c.code}" class="${x.code === c.code ? 'active' : ''}" data-act="open" data-id="${esc(x.code)}" title="${esc(x.name)}">${badge(x.code)}${esc(x.name.replace(/\s+(M\s+)?Sdn\.?\s*Bhd\.?$/i, ''))}</button>`).join('')}</div>
  <div class="card">
    <div class="detail-head">
      <div class="title-row">${state.canWrite ? `<button class="logo-btn" data-act="logo-pick" data-company="${esc(c.code)}" title="${esc(T.logoChange)}" aria-label="${esc(T.logoChange)}">${badge(c.code, 'lg')}</button>` : badge(c.code, 'lg')}
        <div style="min-width:0"><div class="cname">${esc(c.name)}</div><div class="sub">${esc(cDesc(c))}${c.industry ? ' · ' + esc(c.industry) : ''}</div></div></div>
      <div class="chips"><span class="tag">${esc(T.types[c.type])}</span>${healthChip(c.health)}</div>
    </div>
  </div>
  <div class="tabs" role="tablist">${Object.entries(tabs).map(([k, v]) => `<button role="tab" aria-selected="${view.tab === k}" class="${view.tab === k ? 'active' : ''}" data-act="tab" data-tab="${k}">${esc(v)}</button>`).join('')}</div>
  ${({ depts: tabDepts, info: tabInfo, tasks: tabTasks, logs: tabLogs, risks: tabRisks })[view.tab](c)}`;
}

/* ---------- 部门看板 ---------- */
const openD = new Set();
const dOverdue = t => !t.done && t.due && t.due <= nowLocal();
function deptStats(code) {
  const all = deptsOf(code).flatMap(d => d.tasks);
  const open = all.filter(t => !t.done);
  return { open: open.length, done: all.length - open.length, overdue: open.filter(dOverdue).length,
    byLevel: Object.fromEntries(LEVELS.map(l => [l, open.filter(t => t.level === l).length])) };
}
const sortDTasks = list => [
  ...list.filter(t => !t.done).sort((a, b) => LEVEL_RANK[a.level] - LEVEL_RANK[b.level] || (a.due || '9').localeCompare(b.due || '9') || a.createdAt.localeCompare(b.createdAt)),
  ...list.filter(t => t.done).sort((a, b) => (b.doneAt || '').localeCompare(a.doneAt || '')),
];
const lvOpts = cur => opt(LEVELS, L().levels, cur);

/* owners: each company keeps its own list; names typed on tasks join it */
const byName = (a, b) => a.localeCompare(b, 'zh');
const peopleOf = code => {
  const c = co(code), set = new Set(c ? c.people : []);
  deptsOf(code).forEach(d => d.tasks.forEach(t => t.owner && set.add(t.owner)));
  state.tasks.forEach(t => t.company === code && t.owner && set.add(t.owner));
  return [...set].sort(byName);
};
const allPeople = () => [...new Set([...state.companies.flatMap(c => peopleOf(c.code)), ...state.tasks.map(t => t.owner).filter(Boolean)])].sort(byName);
const peopleList = (id, names) => `<datalist id="${id}">${names.map(n => `<option value="${esc(n)}"></option>`).join('')}</datalist>`;
function rememberPerson(code, name) {
  const c = co(code);
  if (!c || !name || c.people.includes(name)) return;
  mutate(code, x => { x.people = [...x.people, name].sort(byName); });
}
const deptOwner = {};   // per-company owner filter on the department board

function tabDepts(c) {
  const T = L(), list = deptsOf(c.code), st = deptStats(c.code), people = peopleOf(c.code);
  if (deptOwner[c.code] && deptOwner[c.code] !== '__none__' && !people.includes(deptOwner[c.code])) delete deptOwner[c.code];
  return `
  ${list.length ? `<div class="dept-summary">
    <span class="pill"><b>${st.open}</b>${esc(T.sumOpen)}</span>
    ${['priority', 'urgent', 'important'].map(l => `<span class="pill"><b>${st.byLevel[l]}</b><span class="lv ${l}">${esc(T.levels[l])}</span></span>`).join('')}
    <span class="pill"><b class="${st.overdue ? 'warn' : ''}">${st.overdue}</b>${esc(T.sumOverdue)}</span>
    <span class="pill"><b>${st.done}</b>${esc(T.sumDone)}</span>
    <select id="own-flt-${esc(c.code)}" data-owner-filter="${esc(c.code)}" class="owner-filter" aria-label="${esc(T.owner)}">
      <option value="">${esc(T.allOwners)}</option>
      ${people.map(n => `<option value="${esc(n)}" ${deptOwner[c.code] === n ? 'selected' : ''}>👤 ${esc(n)}</option>`).join('')}
      <option value="__none__" ${deptOwner[c.code] === '__none__' ? 'selected' : ''}>${esc(T.noOwner)}</option>
    </select>
  </div>` : ''}

  ${state.canWrite ? `<div class="card add-card">
    <form data-form="dept" id="nd-form" data-company="${esc(c.code)}" class="new-dept">
      <input name="name" id="nd-name" required placeholder="${esc(T.newDept)}" aria-label="${esc(T.addDept)}">
      <button class="primary">${esc(T.addDept)}</button>
    </form>
    ${(() => { const have = new Set(list.map(d => d.name.toLowerCase())); const left = (DEPT_PRESETS[c.code] || DEPT_PRESETS.A).filter(p => !have.has(p.toLowerCase()));
      return left.length ? `<div class="dept-presets"><span class="sub">${esc(T.presets)}</span>${left.map(p => `<button class="small" data-act="dept-preset" data-company="${esc(c.code)}" data-name="${esc(p)}">+ ${esc(p)}</button>`).join('')}</div>` : ''; })()}
    <div class="people">
      <div class="people-head"><b>${esc(T.people)}</b><span class="sub">${esc(T.peopleHint)}</span></div>
      <div class="chips">
        ${c.people.map(n => `<span class="person">👤 ${esc(n)}<button class="ghost" data-act="person-del" data-company="${esc(c.code)}" data-name="${esc(n)}" aria-label="${esc(T.removePerson(n))}" title="${esc(T.removePerson(n))}">✕</button></span>`).join('')}
        <form data-form="person" data-company="${esc(c.code)}" id="np-form-${esc(c.code)}" class="person-add">
          <input name="name" id="np-name-${esc(c.code)}" required placeholder="${esc(T.personPh)}" aria-label="${esc(T.addPerson)}">
          <button class="small">+ ${esc(T.addPerson)}</button>
        </form>
      </div>
    </div>
  </div>` : ''}
  ${list.length ? `<div class="dept-board">${list.map((d, i) => deptCard(d, i, list.length, deptOwner[c.code])).join('')}</div>` : `<div class="card empty">${esc(T.deptEmpty)}</div>`}`;
}

function deptCard(d, i, n, ownerFilter) {
  const T = L(), open = d.tasks.filter(t => !t.done).length;
  const shown = !ownerFilter ? d.tasks : d.tasks.filter(t => ownerFilter === '__none__' ? !t.owner : t.owner === ownerFilter);
  return `<section class="card dept" aria-label="${esc(d.name)}">
    <div class="dept-head">
      <input class="dept-name" id="dn-${d.id}" data-dname="${d.id}" value="${esc(d.name)}" aria-label="${esc(T.tabDepts)}" ${ro()}>
      <span class="dept-count">${open}/${d.tasks.length}</span>
      ${state.canWrite ? `<button class="ghost" data-act="dept-move" data-did="${d.id}" data-dir="-1" title="${esc(T.moveL)}" aria-label="${esc(T.moveL)}" ${i === 0 ? 'disabled' : ''}>‹</button>
      <button class="ghost" data-act="dept-move" data-did="${d.id}" data-dir="1" title="${esc(T.moveR)}" aria-label="${esc(T.moveR)}" ${i === n - 1 ? 'disabled' : ''}>›</button>` : ''}
      ${delBtn('dept', d.id)}
    </div>
    <div class="dept-body">
      ${state.canWrite ? `<form data-form="dtask" data-did="${d.id}" id="dt-form-${d.id}" class="dept-add">
        <input name="title" id="dt-title-${d.id}" required placeholder="${esc(T.deptTaskPh)}" aria-label="${esc(T.deptTaskPh)}">
        <input name="owner" id="dt-owner-${d.id}" list="people-${esc(d.company)}" placeholder="👤 ${esc(T.ownerSel)}" aria-label="${esc(T.owner)}" autocomplete="off" value="${ownerFilter && ownerFilter !== '__none__' ? esc(ownerFilter) : ''}">
        <input type="datetime-local" name="due" id="dt-due-${d.id}" aria-label="${esc(T.dueLabel)}">
        <select name="level" id="dt-lv-${d.id}" aria-label="${esc(T.levelLabel)}">${lvOpts('normal')}</select>
        <button class="primary small">${esc(T.add)}</button>
      </form>` : ''}
      ${shown.length ? sortDTasks(shown).map(t => dTaskRow(d, t)).join('') : `<div class="empty">${esc(T.deptNoTasks)}</div>`}
    </div>
  </section>`;
}

function dTaskRow(d, t) {
  const T = L(), open = openD.has(t.id), dd = t.details.filter(x => x.done).length;
  return `<div class="dtask lv-${t.level} ${t.done ? 'is-done' : ''}">
    <div class="dtask-row">
      <input type="checkbox" data-act="dt-done" data-did="${d.id}" data-tid="${t.id}" ${t.done ? 'checked' : ''} aria-label="${esc(T.done)}" ${ro()}>
      <div class="dtask-main" data-act="dt-open" data-tid="${t.id}" role="button" tabindex="0" aria-expanded="${open}" aria-label="${esc(T.expand)}">
        <div class="dtask-title">${esc(t.title)}</div>
        <div class="dtask-meta">
          <span class="lv ${t.level}">${esc(T.levels[t.level])}</span>
          ${t.owner ? `<span class="owner-chip">👤 ${esc(t.owner)}</span>` : ''}
          ${t.due ? `<span class="mono ${dOverdue(t) ? 'warn' : ''}">${SVG_BELL} ${esc(fmtRemind(t.due))}</span>` : ''}
          ${t.details.length ? `<span>${esc(T.details)} <span class="num">${dd}/${t.details.length}</span></span>` : ''}
          <span class="chev ${open ? 'open' : ''}">▶</span>
        </div>
      </div>
    </div>
    ${open ? `<div class="dtask-detail">
      ${state.canWrite ? `<div class="dtask-edit">
        <input id="dte-title-${t.id}" data-dtf="title" data-did="${d.id}" data-tid="${t.id}" value="${esc(t.title)}" aria-label="${esc(T.taskTitle)}">
        <input id="dte-owner-${t.id}" data-dtf="owner" data-did="${d.id}" data-tid="${t.id}" value="${esc(t.owner)}" list="people-${esc(d.company)}" placeholder="👤 ${esc(T.ownerSel)}" aria-label="${esc(T.owner)}" autocomplete="off">
        <input type="datetime-local" id="dte-due-${t.id}" data-dtf="due" data-did="${d.id}" data-tid="${t.id}" value="${esc(t.due)}" aria-label="${esc(T.dueLabel)}">
        <select id="dte-lv-${t.id}" data-dtf="level" data-did="${d.id}" data-tid="${t.id}" aria-label="${esc(T.levelLabel)}">${lvOpts(t.level)}</select>
        ${delBtn('dtask.' + d.id, t.id)}
      </div>` : ''}
      <div class="sub">${esc(T.details)}</div>
      ${t.details.map(x => `<div class="ddet ${x.done ? 'is-done' : ''}">
        <input type="checkbox" data-act="dd-done" data-did="${d.id}" data-tid="${t.id}" data-xid="${x.id}" ${x.done ? 'checked' : ''} aria-label="${esc(T.done)}" ${ro()}>
        <span class="ddet-text">${esc(x.text)}</span>
        ${x.date ? `<span class="date">${esc(x.date)}</span>` : ''}
        ${delBtn('ddet.' + d.id + '.' + t.id, x.id)}
      </div>`).join('') || `<div class="sub">${esc(T.noDetails)}</div>`}
      ${state.canWrite ? `<form data-form="ddetail" data-did="${d.id}" data-tid="${t.id}" id="dd-form-${t.id}" class="ddet-form">
        <input name="text" id="dd-text-${t.id}" required placeholder="${esc(T.detailPh)}" aria-label="${esc(T.detailPh)}">
        <input type="date" name="date" id="dd-date-${t.id}" aria-label="${esc(T.logDate)}">
        <button class="small">${esc(T.add)}</button>
      </form>` : ''}
    </div>` : ''}
  </div>`;
}

function tabInfo(c) {
  const T = L(), d = ro();
  return `<div class="two">
    <div class="card"><h3>${esc(T.basic)}</h3>
      <div class="logo-row">
        ${badge(c.code, 'xl')}
        <div class="logo-acts">
          <div class="sub">${esc(T.logoHint)}</div>
          ${state.canWrite ? `<div class="chips"><button class="small primary" data-act="logo-pick" data-company="${esc(c.code)}">${esc(c.logo ? T.logoChange : T.logoUpload)}</button>
          ${c.logo ? `<button class="small" data-act="logo-del" data-company="${esc(c.code)}">${esc(T.logoRemove)}</button>` : ''}</div>` : ''}
        </div>
      </div>
      <label for="f-name">${esc(T.fullName)}</label><input id="f-name" data-field="name" value="${esc(c.name)}" ${d}>
      <label for="f-cn">${esc(T.descZh)}</label><input id="f-cn" data-field="cn" value="${esc(c.cn)}" ${d}>
      <label for="f-en">${esc(T.descEn)}</label><input id="f-en" data-field="en" value="${esc(c.en)}" ${d}>
      <label for="f-industry">${esc(T.industry)}</label><input id="f-industry" data-field="industry" value="${esc(c.industry)}" ${d}>
      <div class="row">
        <div><label for="f-type">${esc(T.type)}</label><select id="f-type" data-field="type" ${d}>${opt(TYPE_KEYS, T.types, c.type)}</select></div>
        <div><label for="f-health">${esc(T.healthL)}</label><select id="f-health" data-field="health" ${d}>${opt(HEALTH_KEYS, T.health, c.health)}</select></div>
      </div>
      <label for="f-owner">${esc(T.owner)}</label><input id="f-owner" data-field="owner" value="${esc(c.owner)}" placeholder="${esc(T.ownerPh)}" ${d}>
      <label for="f-focus">${esc(T.focusL)}</label><textarea id="f-focus" data-field="focus" placeholder="${esc(T.focusPh)}" ${d}>${esc(c.focus)}</textarea>
    </div>
    <div class="card"><h3>${esc(T.kpi)}</h3>
      ${c.kpis.length ? `<div class="table-wrap"><table><tr><th>${esc(T.kpiName)}</th><th>${esc(T.target)}</th><th>${esc(T.actual)}</th><th>${esc(T.rate)}</th><th></th></tr>
        ${c.kpis.map(k => { const pct = Number(k.target) && String(k.actual).trim() ? Math.round(Number(k.actual) / Number(k.target) * 100) : null; return `<tr>
          <td class="t">${esc(k.name)}</td><td class="num">${esc(k.target)} ${esc(k.unit)}</td>
          <td><input class="kpi-in num" id="kpi-${k.id}" data-kpi="${k.id}" value="${esc(k.actual)}" inputmode="decimal" aria-label="${esc(k.name)}" ${d}></td>
          <td class="num ${pct !== null && pct < 70 ? 'warn' : ''}">${pct === null ? '—' : pct + '%'}</td>
          <td>${delBtn('kpis', k.id)}</td></tr>`; }).join('')}
      </table></div>` : `<div class="empty">${esc(T.kpiEmpty)}</div>`}
      ${state.canWrite ? `<form data-form="kpis" id="form-kpis" class="row" style="margin-top:10px">
        <input name="name" id="kpis-name" placeholder="${esc(T.kpiName)}" required aria-label="${esc(T.kpiName)}">
        <input name="target" id="kpis-target" placeholder="${esc(T.target)}" class="w-sm" inputmode="decimal" aria-label="${esc(T.target)}">
        <input name="unit" id="kpis-unit" placeholder="${esc(T.unit)}" class="w-sm" aria-label="${esc(T.unit)}">
        <button class="primary">${esc(T.add)}</button>
      </form>` : ''}
    </div>
  </div>`;
}

function tabTasks(c) {
  return addTaskForm(c.code) + taskList(state.tasks.filter(t => t.company === c.code), { hideCompany: true });
}

function tabLogs(c) {
  const T = L(), ls = [...c.logs].sort((a, b) => b.date.localeCompare(a.date));
  return `${state.canWrite ? `<div class="card">
    <form data-form="logs" id="form-logs">
      <div class="row"><div class="w-date"><label for="logs-date">${esc(T.logDate)}</label><input name="date" id="logs-date" type="date" value="${today()}"></div></div>
      <label for="logs-text">${esc(T.logLabel)}</label>
      <textarea name="text" id="logs-text" required placeholder="${esc(T.logPh)}"></textarea>
      <div style="margin-top:8px"><button class="primary">${esc(T.record)}</button></div>
    </form>
  </div>` : ''}
  <div class="card" style="margin-top:14px">
    ${ls.length ? ls.map(l => `<div class="list-item"><span class="date">${l.date}</span>
      <div class="grow">${esc(l.text).replace(/\n/g, '<br>')}</div>${delBtn('logs', l.id)}</div>`).join('') : `<div class="empty">${esc(T.noLogs)}</div>`}
  </div>`;
}

function tabRisks(c) {
  const T = L(), rs = [...c.risks].sort((a, b) => a.closed - b.closed);
  return `<div class="card">
    ${state.canWrite ? `<form data-form="risks" id="form-risks">
      <div class="row">
        <input name="text" id="risks-text" placeholder="${esc(T.riskPh)}" required style="flex-basis:220px" aria-label="${esc(T.riskPh)}">
        <select name="level" id="risks-level" class="w-sm" aria-label="${esc(T.level)}">${opt(['high', 'mid', 'low'], T.pri, 'mid')}</select>
      </div>
      <div class="row" style="margin-top:8px"><input name="plan" id="risks-plan" placeholder="${esc(T.plan)}" aria-label="${esc(T.plan)}"><button class="primary">${esc(T.add)}</button></div>
    </form>` : ''}
    ${rs.length ? rs.map(r => `<div class="list-item">
      <input type="checkbox" title="${esc(T.resolved)}" aria-label="${esc(T.resolved)}" data-act="toggle-risk" data-item="${r.id}" ${r.closed ? 'checked' : ''} ${ro()}>
      <div class="grow ${r.closed ? 'struck' : ''}">
        <div><span class="pri ${r.level}">${esc(T.pri[r.level] || '')}</span> ${esc(r.text)}</div>
        <div class="sub">${esc(T.plan)}：${esc(r.plan || T.planNone)}</div></div>
      ${delBtn('risks', r.id)}</div>`).join('') : `<div class="empty">${esc(T.noRisks)}</div>`}
  </div>`;
}

/* ===================== 渲染 ===================== */
function themePanel() {
  const T = L(), m = theme.mode;
  const mb = (k, label) => `<button class="${m === k ? 'active' : ''}" data-act="theme-mode" data-mode="${k}" aria-pressed="${m === k}">${esc(label)}</button>`;
  return `<section class="card">
    <h3>${esc(T.appearance)}</h3>
    <div class="seg">${mb('auto', T.thAuto)}${mb('light', T.thLight)}${mb('dark', T.thDark)}${mb('custom', T.thCustom)}</div>
    ${m === 'custom' ? `<div class="theme-custom">
      <div><label>${esc(T.thBase)}</label><div class="chips">
        <button class="small ${theme.base === 'light' ? 'active' : ''}" data-act="theme-base" data-base="light">${esc(T.thLight)}</button>
        <button class="small ${theme.base === 'dark' ? 'active' : ''}" data-act="theme-base" data-base="dark">${esc(T.thDark)}</button></div></div>
      <div><label for="th-accent">${esc(T.thAccent)}</label><div class="chips">
        ${SWATCHES.map(sw => `<button class="swatch ${theme.accent === sw ? 'on' : ''}" style="background:${sw}" data-act="theme-swatch" data-color="${sw}" aria-label="${sw}"></button>`).join('')}
        <input type="color" id="th-accent" data-theme-color="accent" value="${esc(theme.accent)}" aria-label="${esc(T.thAccent)}"></div></div>
      <div><label for="th-bg">${esc(T.thBg)}</label><div class="chips">
        <input type="color" id="th-bg" data-theme-color="bg" value="${esc(theme.bg || (theme.base === 'dark' ? '#08131d' : '#f3f8fc'))}" aria-label="${esc(T.thBg)}">
        <button class="small" data-act="theme-reset">${esc(T.thReset)}</button></div></div>
    </div>` : ''}
  </section>`;
}

/* ===================== 页面：设置 ===================== */
function renderSettings() {
  const T = L();
  const seg = (act, attr, cur, opts) => `<div class="seg">${opts.map(([k, label]) => `<button class="${cur === k ? 'active' : ''}" data-act="${act}" ${attr}="${k}" aria-pressed="${cur === k}">${esc(label)}</button>`).join('')}</div>`;
  return `<h2>${esc(T.settings)}</h2>
  <div class="settings">
    ${state.mode === 'db' ? `<section class="card"><h3>${esc(T.setAccount)}</h3>
      <div class="set-row"><div><div class="sub">${esc(T.signedIn)}</div><div class="lbl">${esc(currentEmail())}</div></div>${syncPill(true)}</div>
      <div class="set-row"><span></span><button data-act="logout">${esc(T.logout)}</button></div>
    </section>` : ''}
    <section class="card"><h3>${esc(T.setLang)}</h3>${seg('lang-set', 'data-l', lang, [['zh', '中文'], ['en', 'English']])}</section>
    ${themePanel()}
    <section class="card"><h3>${esc(T.setData)}</h3>
      <div class="set-row"><span class="sub">${esc(T.expDesc)}</span><button data-act="export" ${state.companies.length ? '' : 'disabled'}>${esc(T.exp)}</button></div>
      ${state.canWrite ? `<div class="set-row"><span class="sub">${esc(T.impDesc)}</span><button data-act="import">${esc(T.imp)}</button></div>` : ''}
    </section>
  </div>`;
}

/* ===================== 页面：公司 ===================== */
function renderCompanies() {
  const T = L();
  return `<h2>${esc(T.companies)} <span class="count">${state.companies.length}</span></h2>${companyGrid()}`;
}
function banners() {
  const T = L(), out = [];
  if (state.mode === 'local') out.push(`<div class="banner warn">${esc(configured ? T.localMode : T.notConfigured)}</div>`);
  if (state.mode === 'db' && state.slow) out.push(`<div class="banner warn">${esc(T.slow)}</div>`);
  if (state.mode === 'db' && !state.canWrite) out.push(`<div class="banner">${esc(T.readOnly)}</div>`);
  if (state.error) out.push(`<div class="banner warn">${esc(T[state.error] || state.error)}</div>`);
  if (state.pendingImport) out.push(`<div class="banner warn confirm-bar"><span>${esc(T.importAsk(state.pendingImport.companies.length, state.pendingImport.tasks.length))}</span>
    <button class="primary" data-act="import-yes">${esc(T.importYes)}</button><button data-act="import-no">${esc(T.cancel)}</button></div>`);
  return out.join('');
}

function captureForm() {
  const a = document.activeElement, vals = {};
  document.querySelectorAll('#app form [id]').forEach(el => { vals[el.id] = el.value; });
  return { vals, focus: a && a.id && a.closest('#app') ? { id: a.id, value: a.value, s: a.selectionStart, e: a.selectionEnd } : null };
}
function restoreForm(snap) {
  Object.entries(snap.vals).forEach(([id, v]) => { const el = document.getElementById(id); if (el && el.closest('form')) el.value = v; });
  if (snap.focus) {
    const el = document.getElementById(snap.focus.id);
    if (el) { if (snap.focus.value !== undefined && el.tagName !== 'BUTTON') el.value = snap.focus.value; el.focus({ preventScroll: true }); try { el.setSelectionRange(snap.focus.s, snap.focus.e); } catch {} }
  }
}

const ICON = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg>',
  tasks: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5L16 9.5"/></svg>',
  review: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  companies: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18"/><path d="M5 21V8l6-3v16"/><path d="M11 21V3l8 4v14"/><path d="M14 10h2M14 14h2M7.5 12h1M7.5 16h1"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
};
function syncPill(long) {
  const T = L();
  const sync = !navigator.onLine ? { cls: 'off', text: T.syncOffline } : pending.size ? { cls: 'pend', text: T.syncPending } : { cls: 'ok', text: T.syncOk };
  return `<span class="sync ${sync.cls}" role="status" title="${esc(sync.text)}"><span class="sync-text">${esc(long || sync.cls !== 'off' ? sync.text : T.syncOffline.split(' · ')[0])}</span></span>`;
}
let composing = false, renderWanted = false;
document.addEventListener('compositionstart', () => { composing = true; });
document.addEventListener('compositionend', () => { composing = false; if (renderWanted) { renderWanted = false; render(); } });

function render() {
  if (composing) { renderWanted = true; return; }
  const T = L();
  document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
  document.title = 'Group of Companies';
  const snap = captureForm();
  const dueCount = state.tasks.filter(isDue).length;
  const active = k => view.page === k || (k === 'companies' && view.page === 'detail');
  const items = [
    ['overview', T.overview, ICON.home, dueCount],
    ['tasks', T.navTasks, ICON.tasks, 0],
    ['review', T.navReview, ICON.review, 0],
    ['companies', T.navCompanies, ICON.companies, 0],
    ['settings', T.navSettings, ICON.settings, 0],
  ];
  const signedIn = !['login', 'denied', 'loading'].includes(state.mode);
  document.getElementById('nav').innerHTML = signedIn ? items.slice(0, 4).map(([k, label, , n]) =>
    `<button class="${active(k) ? 'active' : ''}" data-act="page" data-page="${k}" ${active(k) ? 'aria-current="page"' : ''}>${esc(k === 'tasks' ? T.mytasks : label)}${n ? `<span class="badge">${n}</span>` : ''}</button>`).join('') : '';
  document.getElementById('tabbar').innerHTML = signedIn ? items.map(([k, label, icon, n]) =>
    `<button class="${active(k) ? 'active' : ''}" data-act="page" data-page="${k}" ${active(k) ? 'aria-current="page"' : ''}>${icon}<span>${esc(label)}</span>${n ? `<span class="badge">${n}</span>` : ''}</button>`).join('') : '';
  document.getElementById('barRight').innerHTML = signedIn
    ? (state.mode === 'db' ? syncPill() : '') + `<button class="icon-round settings ${view.page === 'settings' ? 'active' : ''}" data-act="page" data-page="settings" aria-label="${esc(T.settings)}" title="${esc(T.settings)}">${ICON.settings}</button>`
    : `<button class="small" data-act="lang">${esc(T.langBtn)}</button>`;
  const app = document.getElementById('app');
  if (state.mode === 'loading') { app.innerHTML = banners() + `<div class="card empty">${esc(T.loading)}</div>`; return; }
  if (state.mode === 'login') { app.innerHTML = loginView(); restoreForm(snap); return; }
  if (state.mode === 'denied') { app.innerHTML = `<div class="card login-wrap"><p>${esc(T.noAccess)}</p><p class="sub">${esc(currentEmail())}</p><button data-act="logout">${esc(T.logout)}</button></div>`; return; }
  const page = { overview: renderOverview, tasks: renderTasks, review: renderReview, detail: renderDetail, companies: renderCompanies, settings: renderSettings }[view.page] || renderOverview;
  app.innerHTML = banners() + page() + `<div class="foot">${esc(state.mode === 'db' ? T.footDb : T.footLocal)}</div>`
    + state.companies.map(c => peopleList('people-' + c.code, peopleOf(c.code))).join('') + peopleList('people-all', allPeople());
  restoreForm(snap);
}

/* ===================== 事件 ===================== */
function gotoTask(id) {
  const t = tk(id); if (!t) return;
  view = { page: 'tasks', id: null, tab: 'info' };
  ui.filter = t.done ? 'done' : 'all'; ui.company = ''; ui.openTask = id;
  render();
  document.getElementById('task-' + id)?.scrollIntoView({ block: 'center' });
}

document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]');
  const act = el && el.dataset.act;
  if (act !== 'del-ask' && act !== 'del' && state.pendingDel) { state.pendingDel = null; if (!el) return render(); }
  if (!el) return;
  const code = view.id, tid = el.dataset.tid;
  switch (act) {
    case 'page': view = { page: el.dataset.page, id: null, tab: 'info' }; ui.openTask = null; window.scrollTo(0, 0); break;
    case 'open': view = { page: 'detail', id: el.dataset.id, tab: DEPT_COMPANIES.includes(el.dataset.id) ? 'depts' : 'info' }; ui.openTask = null; window.scrollTo(0, 0); break;
    case 'logo-pick': logoTarget = el.dataset.company; document.getElementById('logoFile').click(); return;
    case 'logo-del': return mutate(el.dataset.company, c => { delete c.logo; c.logo = ''; });
    case 'theme-toggle': view = { page: 'settings', id: null, tab: 'info' }; break;
    case 'lang-set': lang = el.dataset.l === 'en' ? 'en' : 'zh'; try { localStorage.setItem('cm-lang', lang); } catch {} break;
    case 'theme-mode': theme.mode = el.dataset.mode; saveTheme(); applyTheme(); break;
    case 'theme-base': theme.base = el.dataset.base; saveTheme(); applyTheme(); break;
    case 'theme-swatch': theme.accent = el.dataset.color; saveTheme(); applyTheme(); break;
    case 'theme-reset': theme.accent = THEME_DEFAULT.accent; theme.bg = ''; saveTheme(); applyTheme(); break;
    case 'dept-preset': return addDept(el.dataset.company, el.dataset.name);
    case 'person-del': return mutate(el.dataset.company, c => { c.people = c.people.filter(n => n !== el.dataset.name); });
    case 'dept-move': return moveDept(el.dataset.did, Number(el.dataset.dir));
    case 'dt-open': openD.has(tid) ? openD.delete(tid) : openD.add(tid); break;
    case 'dt-done': return mutateDTask(el.dataset.did, tid, t => { t.done = !t.done; t.doneAt = t.done ? new Date().toISOString() : ''; });
    case 'dd-done': return mutateDTask(el.dataset.did, tid, t => { const x = t.details.find(y => y.id === el.dataset.xid); if (x) x.done = !x.done; });
    case 'logout': return logout();
    case 'tab': view.tab = el.dataset.tab; ui.openTask = null; break;
    case 'lang': lang = lang === 'en' ? 'zh' : 'en'; try { localStorage.setItem('cm-lang', lang); } catch {} break;
    case 'filter': ui.filter = el.dataset.f; ui.openTask = null; saveUi(); break;
    case 'toggle-done': ui.showDone = !ui.showDone; saveUi(); break;
    case 'stage': return mutate(code, c => { c.stage = Number(el.dataset.i); });
    case 'toggle-risk': return mutate(code, c => { const it = c.risks.find(x => x.id === el.dataset.item); if (it) it.closed = !it.closed; });
    case 't-open': ui.openTask = ui.openTask === tid ? null : tid; break;
    case 't-close': ui.openTask = null; break;
    case 'goto-task': return gotoTask(tid);
    case 't-done': return mutateTask(tid, t => { t.done = !t.done; t.doneAt = t.done ? new Date().toISOString() : ''; });
    case 't-star': return mutateTask(tid, t => { t.starred = !t.starred; });
    case 't-pin': return mutateTask(tid, t => { t.pinned = !t.pinned; });
    case 't-snooze': return mutateTask(tid, t => { const time = t.remind.split('T')[1] || '09:00'; t.remind = localDate(1) + 'T' + time; });
    case 'del-ask': state.pendingDel = el.dataset.key; break;
    case 'del': {
      state.pendingDel = null;
      const kind = el.dataset.kind, item = el.dataset.item;
      if (kind === 'task') return removeTask(item);
      if (kind === 'dept') return removeDept(item);
      if (kind.startsWith('dtask.')) { openD.delete(item); return removeDTask(kind.split('.')[1], item); }
      if (kind.startsWith('ddet.')) { const [, did, dtid] = kind.split('.'); return mutateDTask(did, dtid, t => { t.details = t.details.filter(x => x.id !== item); }); }
      if (kind.startsWith('upd-')) return mutateTask(kind.slice(4), t => { t.updates = t.updates.filter(u => u.id !== item); });
      return mutate(code, c => { c[kind] = c[kind].filter(x => x.id !== item); });
    }
    case 'export': return exportData();
    case 'import': return document.getElementById('importFile').click();
    case 'import-yes': {
      const { companies, tasks, depts = [] } = state.pendingImport; state.pendingImport = null;
      depts.forEach(raw => {
        const d = normDept(raw), i = state.depts.findIndex(x => x.id === d.id);
        if (i >= 0) state.depts[i] = d; else state.depts.push(d);
        if (state.mode === 'db') { queueWrite('departments', d.id, deptBody(d)); d.tasks.forEach(t => queueWrite('dtasks', t.id, dtaskBody(d, t))); }
      });
      setDepts(state.depts);
      companies.forEach(raw => {
        const c = normCompany(raw), i = state.companies.findIndex(x => x.code === c.code);
        if (i >= 0) state.companies[i] = c; else state.companies.push(c);
        if (state.mode === 'db') queueWrite('companies', c.code, c);
      });
      tasks.forEach(raw => {
        const t = normTask(raw), i = state.tasks.findIndex(x => x.id === t.id);
        if (i >= 0) state.tasks[i] = t; else state.tasks.push(t);
        if (state.mode === 'db') queueWrite('mytasks', t.id, taskBody(t));
      });
      setCompanies(state.companies);
      if (state.mode === 'local') saveLocal();
      view = { page: 'overview', id: null, tab: 'info' };
      break;
    }
    case 'import-no': state.pendingImport = null; break;
    default: return;
  }
  render();
});
document.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches?.('[role=button][data-act]')) { e.preventDefault(); e.target.click(); }
});

document.addEventListener('change', e => {
  const el = e.target;
  if (el.dataset.themeColor) { theme[el.dataset.themeColor] = el.value; saveTheme(); applyTheme(); return render(); }
  if (el.dataset.ui) { ui[el.dataset.ui] = el.value; saveUi(); return render(); }
  if (el.dataset.ownerFilter) { const code = el.dataset.ownerFilter; if (el.value) deptOwner[code] = el.value; else delete deptOwner[code]; return render(); }
  if (el.dataset.dname) {
    const v = el.value.trim();
    if (!v) return render();
    return mutateDept(el.dataset.dname, d => { d.name = v; });
  }
  if (el.dataset.dtf) {
    const f = el.dataset.dtf, v = el.value, tid = el.dataset.tid;
    if (f === 'title' && !v.trim()) return render();
    mutateDTask(el.dataset.did, tid, t => { t[f] = f === 'title' || f === 'owner' ? v.trim() : v; });
    if (f === 'owner') { const d = dp(el.dataset.did); if (d) rememberPerson(d.company, v.trim()); }
    return;
  }
  if (el.dataset.tfield) {
    const f = el.dataset.tfield, v = el.value;
    if (f === 'title' && !v.trim()) return render();
    return mutateTask(el.dataset.tid, t => { t[f] = v; });
  }
  if (el.dataset.field) {
    const f = el.dataset.field, v = el.value;
    return mutate(view.id, c => { c[f] = v; if (f === 'type') c.stage = Math.min(c.stage, STAGE_COUNT[c.type] - 1); });
  }
  if (el.dataset.kpi) {
    const id = el.dataset.kpi, v = el.value;
    return mutate(view.id, c => { const k = c.kpis.find(x => x.id === id); if (k) k.actual = v; });
  }
});

document.addEventListener('submit', e => {
  const form = e.target.closest('[data-form]');
  if (!form) return;
  e.preventDefault();
  const kind = form.dataset.form;
  const data = Object.fromEntries([...new FormData(form)].map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v]));
  const clear = () => { form.reset(); };
  if (kind === 'task') {
    if (!data.title) return;
    if (form.dataset.company) data.company = form.dataset.company;
    clear();
    return addTask({ ...data, createdAt: new Date().toISOString() });
  }
  if (kind === 'dept') { clear(); return addDept(form.dataset.company, data.name); }
  if (kind === 'person') { clear(); return rememberPerson(form.dataset.company, data.name); }
  if (kind === 'dtask') {
    if (!data.title) return;
    clear();
    addDTask(form.dataset.did, { title: data.title, due: data.due, level: data.level, owner: data.owner });
    const d = dp(form.dataset.did); if (d && data.owner) rememberPerson(d.company, data.owner);
    return;
  }
  if (kind === 'ddetail') {
    if (!data.text) return;
    clear();
    return mutateDTask(form.dataset.did, form.dataset.tid, t => { t.details.push(normDetail({ text: data.text, date: data.date })); });
  }
  if (kind === 'tupdate') {
    if (!data.text) return;
    clear();
    return mutateTask(form.dataset.tid, t => { t.updates.push({ id: uid(), date: today(), text: data.text }); });
  }
  const item = { id: uid(), ...data };
  if (kind === 'kpis') item.actual = '';
  if (kind === 'risks') item.closed = false;
  if (kind === 'logs' && !item.date) item.date = today();
  clear();
  mutate(view.id, c => { c[kind].push(item); });
});

async function exportData() {
  const json = JSON.stringify({ version: 3, exportedAt: new Date().toISOString(), companies: state.companies, tasks: state.tasks, depts: state.depts }, null, 2);
  const filename = `company-manager-backup-${today()}.json`;
  try {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
    a.download = filename; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  } catch { state.error = 'errExport'; render(); }
}

document.getElementById('importFile').addEventListener('change', async e => {
  const f = e.target.files[0];
  e.target.value = '';
  if (!f) return;
  try {
    const data = JSON.parse(await f.text());
    const companies = (Array.isArray(data) ? data : data.companies || []).map(x => ({ ...x, code: x.code || x.id }));
    if (!companies.every(x => x && x.code)) throw new Error();
    const tasks = [...(Array.isArray(data.tasks) ? data.tasks : []), ...liftCompanyTasks(companies)];
    const depts = Array.isArray(data.depts) ? data.depts : [];
    if (!companies.length && !tasks.length && !depts.length) throw new Error();
    state.pendingImport = { companies: companies.map(({ id, tasks, milestones, ...rest }) => rest), tasks, depts };
  } catch { state.error = 'errFile'; }
  render();
});

/* ===================== 启动 ===================== */
function startLocal() {
  state.mode = 'local';
  let saved = null, v1 = null;
  try { saved = JSON.parse(localStorage.getItem(LOCAL_KEY)); } catch {}
  if (!saved) { try { v1 = JSON.parse(localStorage.getItem(LOCAL_KEY_V1)); } catch {} }
  if (saved && Array.isArray(saved.companies)) { setCompanies(saved.companies); setTasks(saved.tasks || []); setDepts(saved.depts || []); }
  else if (v1) {
    const list = (Array.isArray(v1) ? v1 : v1.companies || []).map(x => ({ ...x, code: x.code || x.id }));
    setCompanies(list.length ? list : localSeed()); setTasks(liftCompanyTasks(list)); saveLocal();
  } else { setCompanies(localSeed()); setTasks([]); }
  render();
}

const loginUi = { busy: false, msg: '', err: false };
function loginView() {
  const T = L();
  return `<div class="login-wrap"><section class="hero"><div class="hero-eyebrow">${esc(T.app)}</div><h1 class="hero-title">${esc(T.brand)}</h1></section><div class="card">
    <h3>${esc(T.loginTitle)}</h3>
    <form id="login-form">
      <label for="login-email">${esc(T.email)}</label><input type="email" name="email" id="login-email" autocomplete="username" required>
      <label for="login-pw">${esc(T.password)}</label><input type="password" name="password" id="login-pw" autocomplete="current-password" required>
      ${loginUi.msg ? `<div class="banner ${loginUi.err ? 'warn' : ''}" style="margin:12px 0 0">${esc(loginUi.msg)}</div>` : ''}
      <div class="row" style="margin-top:14px;justify-content:space-between;align-items:center">
        <button class="primary" ${loginUi.busy ? 'disabled' : ''}>${esc(loginUi.busy ? T.loggingIn : T.loginBtn)}</button>
        <button type="button" class="ghost" data-act="forgot">${esc(T.forgot)}</button>
      </div>
    </form>
    <p class="sub" style="margin-top:14px">${esc(T.installHint)}</p>
  </div></div>`;
}
document.addEventListener('submit', async e => {
  if (e.target.id !== 'login-form') return;
  e.preventDefault(); e.stopImmediatePropagation();
  const f = new FormData(e.target), T = L();
  loginUi.busy = true; loginUi.msg = ''; render();
  try { await login(String(f.get('email')).trim(), String(f.get('password'))); loginUi.msg = ''; }
  catch (err) { loginUi.err = true; loginUi.msg = !navigator.onLine || (err && err.code === 'auth/network-request-failed') ? T.loginOffline : T.loginErr; }
  loginUi.busy = false; render();
}, true);
document.addEventListener('click', async e => {
  if (!e.target.closest('[data-act=forgot]')) return;
  const email = (document.getElementById('login-email')?.value || '').trim(), T = L();
  if (!email) { loginUi.err = true; loginUi.msg = T.resetNeedEmail; return render(); }
  try { await resetPassword(email); loginUi.err = false; loginUi.msg = T.resetSent(email); }
  catch (err) { loginUi.err = true; loginUi.msg = !navigator.onLine ? T.loginOffline : T.loginErr; }
  render();
});

/* sync state: which collections still hold local changes not yet on the server */
const pending = new Set();
window.addEventListener('online', () => render());
window.addEventListener('offline', () => render());
onWriteError(code => {
  state.error = code === 'permission-denied' ? 'errRO' : code === 'resource-exhausted' ? 'errQuota' : 'errSave';
  if (code === 'permission-denied') state.canWrite = false;
  render();
});

let unsubs = [], seeded = false;
function stopListening() { unsubs.forEach(u => u()); unsubs = []; pending.clear(); }
function startCloud() {
  store = fbStore;
  state.mode = 'db'; state.canWrite = true; state.error = ''; state.slow = false;
  render();
  const live = { companies: false, mytasks: false, departments: false, dtasks: false };
  const timer = setTimeout(() => { if (!Object.values(live).every(Boolean) && navigator.onLine) { state.slow = true; render(); } }, 10000);
  const onErr = err => {
    clearTimeout(timer);
    if (err && err.code === 'permission-denied') { stopListening(); state.mode = 'denied'; }
    else state.error = 'errConn';
    render();
  };
  const handle = (name, apply) => snap => {
    apply(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    snap.metadata.hasPendingWrites ? pending.add(name) : pending.delete(name);
    if (!snap.metadata.fromCache) { live[name] = true; if (Object.values(live).every(Boolean)) { clearTimeout(timer); state.slow = false; } }
    render();
  };
  unsubs = [
    store.collection('companies').onSnapshot(snap => {
      // first sign-in on an empty cloud database: create the four companies
      if (!snap.metadata.fromCache && !snap.docs.length && !seeded) { seeded = true; localSeed().forEach(c => queueWrite('companies', c.code, normCompany(c))); }
      handle('companies', docs => setCompanies(docs.map(d => ({ ...d, code: d.id }))))(snap);
    }, onErr),
    store.collection('mytasks').onSnapshot(handle('mytasks', docs => setTasks(docs)), onErr),
    store.collection('departments').onSnapshot(handle('departments', docs => { deptMeta = docs; rebuildDepts(); }), onErr),
    store.collection('dtasks').onSnapshot(handle('dtasks', docs => { dtaskDocs = docs; rebuildDepts(); }), onErr),
  ];
}

document.getElementById('logoFile')?.addEventListener('change', async e => {
  const f = e.target.files[0], code = logoTarget;
  e.target.value = ''; logoTarget = null;
  if (!f || !code) return;
  try { const data = await logoFromFile(f); mutate(code, c => { c.logo = data; }); }
  catch { state.error = 'logoErr'; render(); }
});
function start() {
  render();
  if (!configured) return startLocal();
  watchAuth(user => {
    stopListening();
    if (user) startCloud();
    else { state.mode = 'login'; state.companies = []; state.tasks = []; state.depts = []; render(); }
  });
}

/* keep reminder badges current */
setInterval(() => { const a = document.activeElement; if (!(a && a.closest && a.closest('#app') && /INPUT|TEXTAREA|SELECT/.test(a.tagName))) render(); }, 60000);
start();
