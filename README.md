# File System API 練習

作者：Dalufishe

### 甚麼是 File System API?

根據 MDN 描述：
The File System API — with extensions provided via the File System Access API to access files on the device file system — allows read, write and file management capabilities.

File System API 是一套基於 File System Access API，具備磁盤存取權，提供強大的本地檔案讀寫操作和管理能力。

### 為甚麼使用 File System API ?

傳統 Web 開發上涉及檔案操作，基於安全性考量種種因素，我們使用 html input 標籤搭配 type=file 及的一系列 Javascript 實踐操作檔案。這種方式不具備磁盤直接操作的能力，取而代之使用檔案上傳、下載操作文件:

- 一個簡單的示例，來自 MDN：

```html
<form method="post" enctype="multipart/form-data">
  <div>
    <label for="file">Choose file to upload</label>
    <input type="file" id="file" name="file" multiple />
  </div>
  <div>
    <button>Submit</button>
  </div>
</form>
```

這種操作方式有強烈的侷限性，當涉及到複雜的操作 (如線上 IDE，文字編輯器等) 會變得舉步維艱。

2014 年，新一代的 File System API 被納入標準，使用了不同的實現方式，在保證安全性的前提下提供直接操作本地磁盤的能力。File System API 的出現使開發者能在 Web 端開發傳統上需在本地開發，涉及複雜檔案操作的應用 (如讀取整個目錄，並即時存檔，同步更新)，像是鼎鼎大名的 VsCode 網頁版本 (vscode.dev) 也是這樣實現的。

File System API 可以說是目前瀏覽器上最佳的檔案操作解決方案，特別是現今的 PWA 應用，File System API 也是一種瀏覽器支持原生功能的體現，非常值得一看。

#### File System API 優勢

- 具備磁盤操作能力，不須經由伺服器
- 更強大的 API，支持檔案管理，讀寫操作，開發更複雜的應用

#### File System API 劣勢

- 瀏覽器兼容差，當前仍然還有須多瀏覽器不支持
- 生態系較小，當前仍然不多人認識這個 API，資源相對 input-input-file 少。

#### File System API 和 html-file 差異

- File System API 具備讀、寫、更新、刪除權，input-input-file 僅具備上傳和下載功能。
- File System API 支持目錄，input-input-file 只支持文件。
- input-input-file 需和 html 標籤搭配使用，File System API 純 JS 環境即可使用。

### API 用法