# 离线版 App 设置步骤（Firebase）

这一套只需要做一次，大约 20 分钟。全部在网页上点选，不需要安装任何软件。
项目会属于你自己的 Google 账号，数据也只存在你的项目里。

---

## 第 1 步：创建 Firebase 项目

1. 用你的 Google 账号打开 <https://console.firebase.google.com>
2. 点 **Create a project**（创建项目）
3. 项目名称填 `simbaplus-manager`（可以换别的名字，网址会用到它）
4. Google Analytics 选 **不启用**，然后点 **Create project**

## 第 2 步：添加网页应用，取得配置

1. 在项目首页点 **</>**（Web）图标
2. App nickname 填 `manager`，然后点 **Register app**
3. 页面会出现一段 `const firebaseConfig = { ... }`。**把这一整段复制发给我**
   （这段只是项目地址，本来就会公开在网页里，不是密码）
4. 后面的步骤直接点 **Continue to console** 跳过

## 第 3 步：开启登录，创建你的账号

1. 左边菜单 **Build → Authentication**，点 **Get started**
2. **Sign-in method** 标签 → 选 **Email/Password** → 打开第一个开关 → **Save**
3. **Users** 标签 → **Add user** → 填：
   - Email：`jackchoi123@gmail.com`
   - Password：设一个**强密码**（不要和其他网站相同）
4. **Settings** 标签 → **User actions** → 把 **Enable create (sign-up)** 的勾**取消** → **Save**
   （这样别人不能自己注册账号）

## 第 4 步：创建数据库

1. 左边菜单 **Build → Firestore Database** → **Create database**
2. 如果问版本，选 **Standard edition**
3. Location 选 **asia-southeast1 (Singapore)**（离马来西亚最近，选了以后不能改）
4. 选 **Start in production mode** → **Create**

## 第 5 步：开启网页托管

1. 左边菜单 **Build → Hosting** → **Get started**
2. 一路点 **Next** / **Continue to console** 即可（页面上提到的命令不用执行，自动发布会处理）

## 第 6 步：生成自动发布用的密钥

> ⚠️ 这个密钥是**真正的机密**。只能粘贴到 GitHub 的 Secret 里，**不要发给我，也不要发给任何人**。

1. 左上角齿轮 ⚙️ → **Project settings** → **Service accounts** 标签
2. 点 **Generate new private key** → **Generate key**，会下载一个 `.json` 文件
3. 给这个账号加发布权限：
   1. 打开 <https://console.cloud.google.com/iam-admin/iam>，左上角选择你的项目 `simbaplus-manager`
   2. 找到名字是 `firebase-adminsdk-…@….iam.gserviceaccount.com` 的那一行，点右边的 ✏️ 编辑
   3. **Add another role**，加入 **Firebase Admin**
   4. 再 **Add another role**，加入 **Service Usage Consumer**
   5. **Save**

## 第 7 步：把密钥放进 GitHub

1. 打开 <https://github.com/jackchoi123-Ai/Openclaw-Mr-Ceo/settings/secrets/actions>
2. 点 **New repository secret**
3. Name 填：`FIREBASE_SERVICE_ACCOUNT`
4. Secret：用记事本打开第 6 步下载的 `.json` 文件，**全部内容复制粘贴**进去
5. 点 **Add secret**
6. 电脑里下载的那个 `.json` 文件可以删掉

## 第 8 步：告诉我已完成

把第 2 步的 `firebaseConfig` 发给我。我会：

1. 填好配置并提交
2. 请你合并 Pull Request（合并后会自动发布）
3. 确认网站上线：`https://simbaplus-manager.web.app`（以你的项目名为准）

---

## 上线后：搬数据

1. 打开旧的 claude.ai 版本 → 点 **导出**，保存备份文件
2. 打开新网址，登录 → 点 **导入** → 选刚才的备份文件 → **确认导入**
3. 之后只用新版本

## 装到手机、平板上

- **iPhone / iPad**：用 **Safari** 打开网址 → 分享按钮 → **添加到主屏幕**
- **Android**：用 **Chrome** 打开网址 → 右上角 ⋮ → **安装应用** 或 **添加到主屏幕**
- **电脑**：Chrome / Edge 地址栏右边会出现安装图标

第一次打开要联网并登录，之后没有网络也可以使用，恢复网络会自动同步。

## 以后给同事开账号

1. Firebase → Authentication → Users → **Add user**，建同事的账号
2. 告诉我同事的邮箱，我把它加进 `firestore.rules` 的名单，推送后自动生效
