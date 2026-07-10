import { Icon } from '../components/Icon.jsx';
import { SectionLabel } from '../components/PageShared.jsx';

export function AboutPage() {
  const mvvItems = [
    {
      label: 'Mission',
      title: '身近な不便を、触って楽しい体験に変える',
      text: '日常の中にある小さな困りごとや退屈を、Web・アプリ・3Dの力で使いやすく、少しワクワクする形にしていきます。',
    },
    {
      label: 'Vision',
      title: '全てのものに愛着が持てる社会を作る',
      text: '身の回りにあるものにはこだわって欲しいしそれを好きになるということはとても幸せでQOLが高くてより幸せな世界だと思います。',
    },
    {
      label: 'Values',
      title: 'わかりやすく、気持ちよく、続けて磨く',
      text: '見た目の良さだけでなく、使う人が迷わないこと、触って心地よいこと、作った後も使い続けられることを大切にします。',
    },
  ];
  const interests = [
    ['つくること', 'アイデアを形にするのが好きです。', Icon.PenTool],
    ['あそぶこと', '作ったものを自分で触って試すのが好きです。', Icon.Play],
    ['3Dと空間表現', '思ったものを簡単に形にできるのが好きです。', Icon.Box],
    ['データ・仕組み', 'AIと一緒に最適解を導き出すのが楽しいです。', Icon.Chart],
  ];
  const skillGroups = [
    ['Frontend', ['React', 'TypeScript', 'JavaScript', 'Next.js', 'Three.js', 'Tailwind CSS']],
    ['Backend / Tools', ['Node.js', 'Firebase', 'Supabase', 'GitHub']],
    ['3D / Design', ['Blender', 'Three.js', 'Figma', 'Adobe Illustrator', 'Adobe Photoshop']],
    ['AIs', ['ChatGPT', 'Codex', 'Claude', 'qwen']],
    ['Other', ['Git', 'VS Code', 'Vite', 'Notion']],
  ];
  const history = [
    ['小学生の頃〜', 'ものづくり(工作)に興味を持つ'],
    ['中学時代', 'ゲームに触れプログラミングに興味を持つ'],
    ['高専時代〜現在', 'バイブコーディングでWeb・アプリ制作を学ぶ、3Dは独学'],
    ['これから', '身近な人が今よりちょっと幸せになれるようなものを作っていきたい'],
  ];

  return (
    <div className="page-enter">
      <section className="about-hero">
        <div className="wrap hero-grid">
          <div className="fade-in">
            <SectionLabel>MVV</SectionLabel>
            <h1 className="h-display about-title">つくる理由を、いつも近くに置く。</h1>
            <p className="h-body">
              ただ動くものを作るだけではなく、誰かが「使ってよかった」と感じられる体験に近づけたい。
              そのために、Mission / Vision / Values を小さな判断軸として持ちながら、Web・アプリ・3Dを制作しています。
            </p>
            <div className="mvv-points" aria-label="制作で大切にしている軸">
              <span>Touch</span>
              <span>Useful</span>
              <span>Playful</span>
            </div>
          </div>
          <div className="fade-in d2">
            <div className="mvv-visual" aria-label="Mission Vision Values">
              <div className="mvv-core">
                <span>MVV</span>
                <strong>Mission / Vision / Values</strong>
              </div>
              {mvvItems.map((item, index) => (
                <article key={item.label} className={`mvv-card mvv-card-${index + 1}`}>
                  <span>{item.label}</span>
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="block about-dashboard">
        <div className="wrap about-grid">
          <div>
            <SectionLabel>好きなこと</SectionLabel>
            <div className="interest-grid">
              {interests.map(([title, desc, Ico]) => (
                <div key={title} className="interest-item">
                  <div className="interest-icon"><Ico/></div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionLabel>Skills</SectionLabel>
            <div className="skill-groups">
              {skillGroups.map(([title, skills]) => (
                <div key={title} className="skill-group">
                  <h3>{title}</h3>
                  <div className="tags">{skills.map((skill) => <span key={skill} className="tag">{skill}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="history-card">
            <SectionLabel>これまでのこと</SectionLabel>
            <div className="mini-timeline">
              {history.map(([time, text]) => (
                <div key={time} className="mini-timeline-item">
                  <strong>{time}</strong>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="block">
        <div className="wrap now-panel">
          <SectionLabel>Now</SectionLabel>
          <p>日々、新しい技術や表現を学びながら、ワクワクするアイデアを形にしています。</p>
          {[
            ['制作中のこと', '3Dインタラクション作品'],
            ['学んでいること', 'WebGL / Shader / UIアニメーション'],
            ['興味があること', 'AI / XR / データビジュアライズ'],
          ].map(([title, text]) => (
            <div key={title} className="now-chip"><strong>{title}</strong><span>{text}</span></div>
          ))}
        </div>
      </section>
    </div>
  );
}
