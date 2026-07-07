import { useState } from 'react';
import { Icon } from '../components/Icon.jsx';

const CONTACT_EMAIL = 'toki.zeno.0508@gmail.com';

function buildContactMessage(form) {
  return [
    `お名前: ${form.name.trim()}`,
    `メール: ${form.email.trim()}`,
    `相談内容: ${form.type}`,
    '',
    form.message.trim(),
  ].join('\n');
}

function buildMailLinks(form) {
  const subject = `Portfolio inquiry: ${form.type}`;
  const body = buildContactMessage(form);
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  return {
    mailto: `mailto:${CONTACT_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`,
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}&su=${encodedSubject}&body=${encodedBody}`,
  };
}

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const canSubmit = Boolean(form.name.trim() && form.email.trim() && form.type && form.message.trim());
  const submit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    const { gmail } = buildMailLinks(form);
    window.open(gmail, '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  };

  const mailLinks = canSubmit ? buildMailLinks(form) : null;

  return (
    <div className="page-enter">
      <section className="page-header simple">
        <div className="wrap contact-layout">
          <div>
            <h1 className="page-title">Contact</h1>
            <p className="page-kicker">お問い合わせ</p>
            <p className="page-body">制作のご依頼、共同制作のご相談、3Dデータの利用についてなど、お気軽にご連絡ください。内容を確認の上、できるだけ早く返信いたします。</p>
            <div className="contact-info">
              <div className="contact-info-row">
                <strong>Email</strong>
                <div className="email-actions">
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                  <button type="button" className={`copy-btn ${copied ? 'copied' : ''}`} onClick={copyEmail} aria-label="メールアドレスをコピー">
                    {copied ? <Icon.Check/> : <Icon.Copy/>}
                  </button>
                </div>
                <span className="contact-helper">{copied ? 'メールアドレスをコピーしました。' : 'メールアプリが開かない場合はコピーして使えます。'}</span>
              </div>
              <p><strong>Location</strong><br/>Japan</p>
              <p><strong>GitHub</strong><br/><a href="https://github.com/toki-0508" target="_blank" rel="noreferrer">github.com/toki-0508</a></p>
            </div>
          </div>
          <form className="contact-card" onSubmit={submit}>
            <div className="field">
              <label htmlFor="contact-name">お名前</label>
              <input id="contact-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="例）新井 太郎" autoComplete="name" required/>
            </div>
            <div className="field">
              <label htmlFor="contact-email">メールアドレス</label>
              <input id="contact-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="例）example@gmail.com" autoComplete="email" required/>
            </div>
            <div className="field">
              <label htmlFor="contact-type">お問い合わせの種類</label>
              <select id="contact-type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} required>
                <option value="">選択してください</option>
                <option>制作の相談</option>
                <option>3Dデータについて</option>
                <option>コラボレーション</option>
                <option>その他</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="contact-message">メッセージ</label>
              <textarea id="contact-message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="ご相談内容をご記入ください" required/>
            </div>
            <button type="submit" className="submit-btn" disabled={!canSubmit}>
              {sent ? 'Gmail作成画面を開きました' : 'Gmailで送信内容を作成する'}
              <Icon.Send/>
            </button>
            {mailLinks && (
              <div className="contact-fallback" aria-live="polite">
                <p>Gmailが開かない場合はこちらから送信できます。</p>
                <a href={mailLinks.mailto}>メールアプリで開く</a>
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
