放送大学 Media - スマホ専用PWA

このZIPは「HTMLをスマホで直接開く」ものではなく、Webサーバーへ公開して使います。

最短手順（GitHub Pages）
1. ZIPを展開する
2. GitHubで新しいリポジトリを作る
3. index.html / courses.js / manifest.webmanifest / sw.js / icons フォルダをアップロード
4. Settings → Pages
5. Deploy from a branch を選ぶ
6. Branch: main / Folder: /(root) を選んで Save
7. 表示された https://...github.io/.../ をAndroid版Chromeで開く
8. Chromeのメニュー →「アプリをインストール」または「ホーム画面に追加」

注意:
- PWAのインストールにはHTTPS公開が必要です。
- 映像・音声本体は放送大学公式ストリーミングを使用します。
- ローカルのHTMLファイルをMobiOffice等で開くと、ソースコードが文書として表示されます。
