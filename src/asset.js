// public/ 配下のファイルを参照するためのパス解決。
//
// 配信のルートは公開先で変わる(Vercel は '/'、GitHub Pages は '/tomoki-arai-portfolio/')。
// vite の base は index.html の中しか書き換えないので、JS に直接書いたパスは
// '/images/...' のまま残り、サブパス配信の Pages では 404 になる。
// public/ のファイルを指すときは必ずこれを通すこと。
//
//   asset('/images/projects/a.png')
//     Vercel        -> '/images/projects/a.png'
//     GitHub Pages  -> '/tomoki-arai-portfolio/images/projects/a.png'
export const asset = (path) => import.meta.env.BASE_URL + String(path).replace(/^\//, '');
