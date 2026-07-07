import { SectionLabel } from './PageShared.jsx';

const NAME_VARIANTS = [
  '新井智己',
  'あらいともき',
  'あらとも',
  'アライトモキ',
  'Tomoki Arai',
];

export function SeoIdentity() {
  return (
    <section className="block identity-block" aria-labelledby="identity-title">
      <div className="wrap">
        <div className="identity-panel">
          <div>
            <SectionLabel>Official Profile</SectionLabel>
            <h2 id="identity-title">新井智己の公式ポートフォリオ</h2>
            <p>
              このサイトは、新井智己（あらいともき / あらとも / アライトモキ / Tomoki Arai）の本人公式ポートフォリオです。
              Web制作、アプリ開発、3D制作の作品、考え方、公開データをまとめています。
            </p>
          </div>
          <dl className="identity-names" aria-label="検索で使われる名前の表記">
            <dt>検索用の表記</dt>
            <dd>
              {NAME_VARIANTS.map((name) => (
                <span key={name}>{name}</span>
              ))}
            </dd>
          </dl>
        </div>
      </div>
    </section>
  );
}
