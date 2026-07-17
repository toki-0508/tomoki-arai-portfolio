import { useState } from 'react';
import { Icon } from '../components/Icon.jsx';

const CONTACT_EMAIL = 'toki.zeno.0508@gmail.com';

// Vercel(本番)では未設定 → 空文字 → 従来どおり同一オリジンの /api/contact を叩く。
// GitHub Pages(サブ公開)ではビルド時に Vercel の絶対 URL が入り、そちらへ転送する。
// GitHub Pages は静的配信のみでサーバー処理を持てないため、この切り替えで
// どちらの公開先でも問い合わせ体験を同一に保つ。
const CONTACT_API_BASE = import.meta.env.VITE_CONTACT_API_BASE ?? '';

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
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '', website: '' });
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const [copied, setCopied] = useState(false);
  const canSubmit = Boolean(form.name.trim() && form.email.trim() && form.type && form.message.trim());

  const submit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus({ state: 'loading', message: '送信しています...' });

    try {
      const response = await fetch(`${CONTACT_API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        setStatus({
          state: 'error',
          message: result.message || '送信ができなかったため、メールアプリから送信お願いします。',
        });
        return;
      }

      setStatus({ state: 'success', message: result.message || 'お問い合わせを送信しました。' });
      setForm({ name: '', email: '', type: '', message: '', website: '' });
    } catch {
      setStatus({
        state: 'error',
        message: '通信に失敗してしまったため、メールアプリから送信お願いします。',
      });
    }
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
  const isSubmitting = status.state === 'loading';

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
              <p><strong>X</strong><br/><a href="https://x.com/zeno_arai" target="_blank" rel="noreferrer">x.com/zeno_arai</a></p>
            </div>
          </div>
          <form className="contact-card" onSubmit={submit}>
            <input
              type="hidden"
              name="website"
              value={form.website}
              className="contact-honeypot"
              autoComplete="off"
              aria-hidden="true"
            />
            <div className="field">
              <label htmlFor="contact-name">お名前</label>
              <input id="contact-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="例）新井 太郎" autoComplete="name" disabled={isSubmitting} required/>
            </div>
            <div className="field">
              <label htmlFor="contact-email">メールアドレス</label>
              <input id="contact-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="例）example@gmail.com" autoComplete="email" disabled={isSubmitting} required/>
            </div>
            <div className="field">
              <label htmlFor="contact-type">お問い合わせの種類</label>
              <select id="contact-type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} disabled={isSubmitting} required>
                <option value="">選択してください</option>
                <option>制作の相談</option>
                <option>3Dデータについて</option>
                <option>コラボレーション</option>
                <option>その他</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="contact-message">メッセージ</label>
              <textarea id="contact-message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="ご相談内容をご記入ください" disabled={isSubmitting} required/>
            </div>
            <button type="submit" className="submit-btn" disabled={!canSubmit || isSubmitting}>
              {isSubmitting ? '送信中...' : '送信する'}
              <Icon.Send/>
            </button>
            {status.message && (
              <div className={`contact-status ${status.state}`} role="status" aria-live="polite">
                {status.message}
              </div>
            )}
            {(mailLinks || status.state === 'error') && (
              <div className="contact-fallback" aria-live="polite">
                <p>うまく送れない場合はこちらから送信できます。</p>
                <div className="contact-fallback-links">
                  {mailLinks ? <a href={mailLinks.mailto}>メールアプリで開く</a> : null}
                  {mailLinks ? <a href={mailLinks.gmail} target="_blank" rel="noreferrer">Gmailで開く</a> : null}
                </div>
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
